import { siteConfig } from "@/lib/site-config";

export function buildWhatsAppUrl(message: string): string {
  const normalizedMessage = message.trim();
  const baseUrl = `https://wa.me/${siteConfig.whatsapp.number}`;

  return normalizedMessage.length > 0
    ? `${baseUrl}?text=${encodeURIComponent(normalizedMessage)}`
    : baseUrl;
}

export const whatsappLinks = {
  general: buildWhatsAppUrl(
    "Olá, vim pelo site da Santos Co. e gostaria de receber uma cotação.",
  ),
  travel: buildWhatsAppUrl(
    "Olá, vim pela página de Viagens e gostaria de orientação para preparar minha viagem.",
  ),
  travelInsurance: buildWhatsAppUrl(
    "Olá, gostaria de cotar um Seguro Viagem Internacional.",
  ),
  safetyKit: buildWhatsAppUrl(
    "Olá, gostaria de informações sobre o Kit de Segurança para viagem ao Mercosul.",
  ),
} as const;
