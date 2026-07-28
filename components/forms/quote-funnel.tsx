"use client";

import {
  BriefcaseBusiness,
  Building2,
  Car,
  Check,
  HeartPulse,
  LoaderCircle,
  MessageCircle,
  Plane,
  Send,
} from "lucide-react";
import { useId, useMemo, useState } from "react";
import type { FormEvent } from "react";

import { buildWhatsAppUrl } from "@/lib/whatsapp";

type ProtectionId = "auto" | "vida" | "empresa" | "rc" | "viagem";
type SubmitStatus = "idle" | "sending" | "success" | "error";

type LeadApiResponse = {
  success?: boolean | string;
  message?: string;
};
type LeadChannel = "callback" | "whatsapp";

type ProtectionOption = {
  id: ProtectionId;
  label: string;
  icon: typeof Car;
  message: string;
};

const DEFAULT_LEAD_FORM_ENDPOINT =
  "https://formsubmit.co/ajax/rspalmaetec@gmail.com";

const leadFormEndpoint =
  process.env.NEXT_PUBLIC_LEAD_FORM_ENDPOINT?.trim() ||
  DEFAULT_LEAD_FORM_ENDPOINT;

const protections: readonly ProtectionOption[] = [
  {
    id: "auto",
    label: "Auto",
    icon: Car,
    message: "Seguro Automóvel",
  },
  {
    id: "vida",
    label: "Vida",
    icon: HeartPulse,
    message: "Seguro de Vida",
  },
  {
    id: "empresa",
    label: "Empresa",
    icon: Building2,
    message: "Seguro Empresarial",
  },
  {
    id: "rc",
    label: "Resp. Civil",
    icon: BriefcaseBusiness,
    message: "Responsabilidade Civil Profissional",
  },
  {
    id: "viagem",
    label: "Viagem",
    icon: Plane,
    message: "Seguro Viagem, Carta Verde ou Kit Mercosul",
  },
] as const;

function trackLeadIntent(protection: string, channel: LeadChannel) {
  const payload = {
    event: "quote_funnel_submit",
    lead_product: protection,
    lead_channel: channel,
  };

  window.dataLayer?.push(payload);
  window.gtag?.("event", "generate_lead", {
    lead_product: protection,
    lead_channel: channel,
  });
  window.fbq?.("track", "Lead", {
    content_name: protection,
    content_category: channel,
  });
  window.clarity?.("event", `quote_funnel_${channel}`);
}

function normalizePhone(value: string) {
  return value.replace(/\D/g, "").slice(0, 13);
}

function formatPhone(value: string) {
  const digits = normalizePhone(value);
  const localDigits = digits.startsWith("55") ? digits.slice(2) : digits;

  if (localDigits.length <= 2) return localDigits;
  if (localDigits.length <= 7) {
    return `(${localDigits.slice(0, 2)}) ${localDigits.slice(2)}`;
  }
  if (localDigits.length <= 10) {
    return `(${localDigits.slice(0, 2)}) ${localDigits.slice(2, 6)}-${localDigits.slice(6)}`;
  }

  return `(${localDigits.slice(0, 2)}) ${localDigits.slice(2, 7)}-${localDigits.slice(7, 11)}`;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export function QuoteFunnel() {
  const [protectionId, setProtectionId] = useState<ProtectionId>("auto");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const nameId = useId();
  const phoneId = useId();
  const consentId = useId();

  const selectedProtection = useMemo(
    () =>
      protections.find((protection) => protection.id === protectionId) ??
      protections[0]!,
    [protectionId],
  );

  const normalizedName = name.trim();
  const normalizedPhone = normalizePhone(phone);
  const formIsValid =
    normalizedName.length >= 2 && normalizedPhone.length >= 10 && consent;

  function resetFeedback() {
    setStatus("idle");
    setFeedbackMessage("");
  }

  function buildMessage() {
    return [
      `Olá, meu nome é ${normalizedName} e vim pelo site da Santos Co.`,
      `Tenho interesse em: ${selectedProtection.message}.`,
      `Meu WhatsApp para retorno é: ${formatPhone(normalizedPhone)}.`,
      "Gostaria de receber uma cotação personalizada, gratuita e sem compromisso.",
    ].join("\n\n");
  }

  function handleWhatsApp() {
    if (!formIsValid) return;

    trackLeadIntent(selectedProtection.message, "whatsapp");
    window.open(buildWhatsAppUrl(buildMessage()), "_blank", "noopener,noreferrer");
  }

  async function handleCallback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formIsValid || status === "sending") return;

    setStatus("sending");
    setFeedbackMessage("");

    try {
      /*
       * O envio é feito diretamente pelo navegador para o endpoint AJAX
       * oficial do FormSubmit. Isso evita bloqueios de chamadas servidor a
       * servidor no Vercel e mantém o mesmo comportamento no localhost.
       */
      const response = await fetch(leadFormEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nome: normalizedName,
          Whatsapp: formatPhone(normalizedPhone),
          Interesse: selectedProtection.message,
          Origem: window.location.href,
          Consentimento: "Autorizado",
          _subject: `Novo lead pelo site: ${selectedProtection.message}`,
          _template: "table",
          _url: window.location.href,
          _captcha: "false",
          _honey: website,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | LeadApiResponse
        | null;

      const providerMessage = data?.message?.trim() || "";
      const normalizedProviderMessage = providerMessage.toLowerCase();
      const activationRequired =
        normalizedProviderMessage.includes("activat") ||
        normalizedProviderMessage.includes("confirm") ||
        normalizedProviderMessage.includes("verif");
      const providerReportedFailure =
        data?.success === false || data?.success === "false";

      /*
       * No primeiro envio, o FormSubmit pode responder que a ativação ainda
       * precisa ser confirmada. A solicitação já foi registrada e o e-mail de
       * confirmação foi disparado, portanto isso é mostrado como orientação,
       * e não como falha do formulário.
       */
      if (!response.ok || (providerReportedFailure && !activationRequired)) {
        throw new Error(
          providerMessage ||
            "Não foi possível enviar agora. Revise os dados ou use o WhatsApp.",
        );
      }

      trackLeadIntent(selectedProtection.message, "callback");
      setStatus("success");
      setFeedbackMessage(
        activationRequired
          ? "Pedido registrado. Abra o e-mail rspalmaetec@gmail.com e confirme a ativação do formulário; depois faça mais um teste."
          : providerMessage ||
              "Recebemos seus dados. A equipe entrará em contato pelo WhatsApp informado.",
      );
      setName("");
      setPhone("");
      setConsent(false);
      setWebsite("");
    } catch (error) {
      setStatus("error");
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar agora. Revise os dados ou use o WhatsApp.",
      );
    }
  }

  return (
    <div
      id="cotacao"
      className="relative rounded-[2rem] border border-white/15 bg-white p-5 text-navy shadow-[0_32px_100px_rgba(0,0,0,.28)] sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gold-dark">
            Cotação gratuita
          </p>
          <h2 className="mt-2 font-serif text-3xl leading-tight">
            O que você deseja proteger hoje?
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Escolha uma opção e receba atendimento personalizado.
          </p>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy text-gold">
          <MessageCircle aria-hidden="true" />
        </span>
      </div>

      <form className="mt-6" onSubmit={handleCallback}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[10000px] h-px w-px overflow-hidden"
        >
          <label>
            Não preencha este campo
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </label>
        </div>

        <fieldset>
          <legend className="sr-only">Tipo de seguro desejado</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {protections.map((protection) => {
              const Icon = protection.icon;
              const active = protection.id === protectionId;

              return (
                <button
                  key={protection.id}
                  type="button"
                  onClick={() => {
                    setProtectionId(protection.id);
                    resetFeedback();
                  }}
                  aria-pressed={active}
                  className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border px-2 text-center text-xs font-extrabold transition sm:min-h-24 ${
                    active
                      ? "border-gold bg-gold/15 text-navy shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-gold/50 hover:bg-white"
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-xl ${
                      active ? "bg-navy text-gold" : "bg-white text-blue"
                    }`}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  {protection.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor={nameId} className="text-sm font-extrabold text-navy">
              Seu nome
            </label>
            <input
              id={nameId}
              required
              autoComplete="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                resetFeedback();
              }}
              placeholder="Como podemos chamar você?"
              className="mt-2 h-13 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-gold"
            />
          </div>
          <div>
            <label htmlFor={phoneId} className="text-sm font-extrabold text-navy">
              Seu WhatsApp
            </label>
            <input
              id={phoneId}
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => {
                setPhone(formatPhone(event.target.value));
                resetFeedback();
              }}
              placeholder="(00) 00000-0000"
              className="mt-2 h-13 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-gold"
            />
          </div>
        </div>

        <label
          htmlFor={consentId}
          className="mt-4 flex cursor-pointer items-start gap-3 text-xs leading-5 text-slate-500"
        >
          <input
            id={consentId}
            type="checkbox"
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked);
              resetFeedback();
            }}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#d6b56d]"
          />
          Autorizo o contato da Santos Co. pelos dados informados para tratar desta cotação.
        </label>

        <button
          type="submit"
          disabled={!formIsValid || status === "sending"}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 font-extrabold text-navy transition hover:-translate-y-0.5 hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
        >
          {status === "sending" ? (
            <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
          ) : (
            <Send size={18} aria-hidden="true" />
          )}
          {status === "sending" ? "Enviando..." : "Quero receber minha cotação"}
        </button>

        <button
          type="button"
          disabled={!formIsValid}
          onClick={handleWhatsApp}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/45 bg-[#25D366]/10 px-6 py-3.5 font-extrabold text-[#147a3b] transition hover:bg-[#25D366]/18 disabled:cursor-not-allowed disabled:opacity-45"
        >
          <MessageCircle size={18} aria-hidden="true" />
          Chamar no WhatsApp agora
        </button>

        {status === "success" && (
          <p role="status" className="mt-4 rounded-2xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
            {feedbackMessage}
          </p>
        )}

        {status === "error" && (
          <p role="alert" className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">
            {feedbackMessage}
          </p>
        )}

        <div className="mt-4 grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
          <span className="flex items-center gap-2">
            <Check size={15} className="shrink-0 text-gold-dark" aria-hidden="true" />
            Atendimento gratuito e sem compromisso.
          </span>
          <span className="flex items-center gap-2">
            <Check size={15} className="shrink-0 text-gold-dark" aria-hidden="true" />
            Resposta rápida pelo WhatsApp.
          </span>
        </div>
      </form>
    </div>
  );
}
