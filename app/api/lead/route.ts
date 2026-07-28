type ProtectionId = "auto" | "vida" | "empresa" | "rc" | "viagem";

type LeadPayload = {
  nome?: unknown;
  telefone?: unknown;
  seguro?: unknown;
  consentimento?: unknown;
  website?: unknown;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const protectionLabels: Record<ProtectionId, string> = {
  auto: "Seguro Automóvel",
  vida: "Seguro de Vida",
  empresa: "Seguro Empresarial",
  rc: "Responsabilidade Civil Profissional",
  viagem: "Seguro Viagem, Carta Verde ou Kit Mercosul",
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_BODY_SIZE = 3_000;
const DEFAULT_DESTINATION_EMAIL = "rspalmaetec@gmail.com";

const globalRateLimit = globalThis as typeof globalThis & {
  santosCoLeadRateLimit?: Map<string, RateLimitEntry>;
};

const rateLimitStore =
  globalRateLimit.santosCoLeadRateLimit ??
  new Map<string, RateLimitEntry>();

globalRateLimit.santosCoLeadRateLimit = rateLimitStore;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
  additionalHeaders: HeadersInit = {},
) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...additionalHeaders,
    },
  });
}

function normalizeOrigin(value: string) {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function getPublicOrigin(request: Request) {
  const forwardedHost = request.headers
    .get("x-forwarded-host")
    ?.split(",")[0]
    ?.trim();
  const host = forwardedHost || request.headers.get("host")?.trim();
  const forwardedProto = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim();

  if (host) {
    const protocol =
      forwardedProto ||
      (host.startsWith("localhost") || host.startsWith("127.0.0.1")
        ? "http"
        : "https");

    return normalizeOrigin(`${protocol}://${host}`);
  }

  return normalizeOrigin(request.url);
}

function getAllowedOrigins(request: Request) {
  const allowedOrigins = new Set<string>();

  const configuredOrigins = [
    getPublicOrigin(request),
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : undefined,
    process.env.VERCEL_BRANCH_URL
      ? `https://${process.env.VERCEL_BRANCH_URL}`
      : undefined,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined,
    ...(process.env.LEAD_ALLOWED_ORIGINS ?? "").split(","),
  ];

  for (const configuredOrigin of configuredOrigins) {
    if (!configuredOrigin?.trim()) continue;

    const normalizedOrigin = normalizeOrigin(configuredOrigin.trim());

    if (normalizedOrigin) {
      allowedOrigins.add(normalizedOrigin);
    }
  }

  return allowedOrigins;
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function consumeRateLimit(ip: string) {
  const now = Date.now();
  const currentEntry = rateLimitStore.get(ip);

  if (rateLimitStore.size > 1_000) {
    for (const [storedIp, entry] of rateLimitStore.entries()) {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(storedIp);
      }
    }
  }

  if (!currentEntry || currentEntry.resetAt <= now) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;

    rateLimitStore.set(ip, {
      count: 1,
      resetAt,
    });

    return {
      allowed: true,
      retryAfter: 0,
    };
  }

  if (currentEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((currentEntry.resetAt - now) / 1_000),
    };
  }

  currentEntry.count += 1;
  rateLimitStore.set(ip, currentEntry);

  return {
    allowed: true,
    retryAfter: 0,
  };
}

function normalizeName(value: unknown) {
  if (typeof value !== "string") return "";

  return value.trim().replace(/\s+/g, " ");
}

function normalizePhone(value: unknown) {
  if (typeof value !== "string") return "";

  return value.replace(/\D/g, "").slice(0, 13);
}

function formatPhone(value: string) {
  const localDigits = value.startsWith("55") ? value.slice(2) : value;

  if (localDigits.length === 10) {
    return `(${localDigits.slice(0, 2)}) ${localDigits.slice(2, 6)}-${localDigits.slice(6)}`;
  }

  if (localDigits.length === 11) {
    return `(${localDigits.slice(0, 2)}) ${localDigits.slice(2, 7)}-${localDigits.slice(7)}`;
  }

  return value;
}

function isValidProtectionId(value: string): value is ProtectionId {
  return Object.prototype.hasOwnProperty.call(protectionLabels, value);
}

export async function POST(request: Request) {
  const requestOrigin = request.headers.get("origin");
  const normalizedRequestOrigin = requestOrigin
    ? normalizeOrigin(requestOrigin)
    : null;

  const allowedOrigins = getAllowedOrigins(request);

  if (
    !normalizedRequestOrigin ||
    !allowedOrigins.has(normalizedRequestOrigin)
  ) {
    return jsonResponse(
      {
        success: false,
        message: "Origem da solicitação não permitida.",
      },
      403,
    );
  }

  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return jsonResponse(
      {
        success: false,
        message: "Formato da solicitação inválido.",
      },
      415,
    );
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse(
      {
        success: false,
        message: "Não foi possível ler os dados enviados.",
      },
      400,
    );
  }

  if (!rawBody || rawBody.length > MAX_BODY_SIZE) {
    return jsonResponse(
      {
        success: false,
        message: "Dados enviados são inválidos ou muito grandes.",
      },
      413,
    );
  }

  let payload: LeadPayload;

  try {
    payload = JSON.parse(rawBody) as LeadPayload;
  } catch {
    return jsonResponse(
      {
        success: false,
        message: "Os dados enviados estão em formato inválido.",
      },
      400,
    );
  }

  /*
   * Campo invisível anti-robô.
   * Usuários reais deixam o campo vazio.
   */
  const honeypot =
    typeof payload.website === "string"
      ? payload.website.trim()
      : "";

  if (honeypot) {
    return jsonResponse({
      success: true,
      message: "Solicitação recebida.",
    });
  }

  const clientIp = getClientIp(request);
  const rateLimit = consumeRateLimit(clientIp);

  if (!rateLimit.allowed) {
    return jsonResponse(
      {
        success: false,
        message:
          "Muitas solicitações foram enviadas. Aguarde alguns minutos.",
      },
      429,
      {
        "Retry-After": String(rateLimit.retryAfter),
      },
    );
  }

  const name = normalizeName(payload.nome);
  const phone = normalizePhone(payload.telefone);

  const protectionId =
    typeof payload.seguro === "string"
      ? payload.seguro
      : "";

  const consent = payload.consentimento === true;

  const containsControlCharacters =
    /[\u0000-\u001F\u007F]/.test(name);

  if (
    name.length < 2 ||
    name.length > 80 ||
    containsControlCharacters
  ) {
    return jsonResponse(
      {
        success: false,
        message: "Informe um nome válido.",
      },
      400,
    );
  }

  if (phone.length < 10 || phone.length > 13) {
    return jsonResponse(
      {
        success: false,
        message: "Informe um telefone válido.",
      },
      400,
    );
  }

  if (!isValidProtectionId(protectionId)) {
    return jsonResponse(
      {
        success: false,
        message: "Selecione um seguro válido.",
      },
      400,
    );
  }

  if (!consent) {
    return jsonResponse(
      {
        success: false,
        message: "É necessário autorizar o contato.",
      },
      400,
    );
  }

  const destinationEmail =
    process.env.LEAD_DESTINATION_EMAIL?.trim() ||
    DEFAULT_DESTINATION_EMAIL;

  const validDestinationEmail =
    destinationEmail &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(destinationEmail);

  if (!validDestinationEmail) {
    console.error(
      "LEAD_DESTINATION_EMAIL não está configurado corretamente.",
    );

    return jsonResponse(
      {
        success: false,
        message:
          "O formulário está temporariamente indisponível.",
      },
      503,
    );
  }

  const protectionLabel = protectionLabels[protectionId];
  const sourceOrigin =
    normalizedRequestOrigin ||
    getPublicOrigin(request) ||
    "https://santoscocorretora.com.br";
  const sourceUrl = `${sourceOrigin}/#cotacao`;

  try {
    const providerResponse = await fetch(
      `https://formsubmit.co/ajax/${destinationEmail}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: sourceOrigin,
          Referer: sourceUrl,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
        body: JSON.stringify({
          nome: name,
          whatsapp: formatPhone(phone),
          interesse: protectionLabel,
          origem: "Formulário do site Santos Co.",
          consentimento: "Autorizado",
          _subject: `Novo lead pelo site: ${protectionLabel}`,
          _template: "table",
          _url: sourceUrl,

          /*
           * O CAPTCHA do próprio FormSubmit fica desligado,
           * pois adicionaremos o Cloudflare Turnstile depois.
           */
          _captcha: "false",
        }),
      },
    );

    const providerData = (await providerResponse
      .json()
      .catch(() => null)) as
      | { success?: boolean | string; message?: string }
      | null;

    const providerReportedFailure =
      providerData?.success === false ||
      providerData?.success === "false";

    if (!providerResponse.ok || providerReportedFailure) {
      console.error(
        "Falha no serviço de envio:",
        providerResponse.status,
        providerData?.message ?? "Resposta sem detalhes.",
      );

      return jsonResponse(
        {
          success: false,
          message:
            "Não foi possível enviar agora. Utilize o WhatsApp.",
        },
        502,
      );
    }

    const providerMessage = providerData?.message?.toLowerCase() ?? "";
    const activationRequired =
      providerMessage.includes("activat") ||
      providerMessage.includes("confirm");

    return jsonResponse({
      success: true,
      message: activationRequired
        ? "Solicitação recebida. Abra o e-mail de teste e confirme a ativação do formulário."
        : "Solicitação recebida com sucesso. A equipe entrará em contato pelo WhatsApp informado.",
    });
  } catch (error) {
    console.error(
      "Falha inesperada durante o envio do formulário:",
      error,
    );

    return jsonResponse(
      {
        success: false,
        message:
          "Não foi possível enviar agora. Utilize o WhatsApp.",
      },
      502,
    );
  }
}