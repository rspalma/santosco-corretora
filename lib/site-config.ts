const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
  "https://santoscocorretora.com.br";

export const siteConfig = {
  name: "Santos Co. Corretora de Seguros",
  shortName: "SantosCo Corretora",
  description:
    "Seguros personalizados para pessoas, profissionais, empresas e viagens, com atendimento humano e consultivo.",
  url: siteUrl,
  locale: "pt_BR",
  cnpj: "44.246.036/0001-25",
  email: "contato@santoscocorretora.com.br",
  whatsapp: {
    number: "554391291007",
    display: "(43) 9129-1007",
  },
  social: {
    instagram: "https://www.instagram.com/santoscocorretora/",
  },
  cartaVerdeUrl:
    "https://cartaverde.seg.link/pt/santoscocorretora/home?t=",
  brand: {
    primary: "#071b2c",
    accent: "#d6b56d",
  },
} as const;

export type SiteConfig = typeof siteConfig;
