import type { Metadata, Viewport } from "next";
import { MarketingIntegrations } from "@/components/integrations/marketing-integrations";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "SantosCo Corretora",
    template: "%s | SantosCo Corretora",
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Seguros",
  keywords: [
    "corretora de seguros",
    "seguro responsabilidade civil",
    "seguro viagem",
    "carta verde",
    "seguro de vida",
    "seguro empresarial",
    "seguro residencial",
    "seguro garantia",
    "seguro automóvel",
  ],
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico?v=104", sizes: "any" },
      { url: "/images/favicon-32.png?v=104", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png?v=104", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "SantosCo Corretora",
    description:
      "Proteção sob medida, atendimento humano e soluções para cada momento.",
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/og-santos-co.png",
        width: 1200,
        height: 630,
        alt: "Santos Co. Corretora de Seguros — proteção sob medida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SantosCo Corretora",
    description: "Seguros personalizados com atendimento humano.",
    images: ["/images/og-santos-co.png"],
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification
      ? { other: { "msvalidate.01": bingVerification } }
      : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteConfig.brand.primary },
    { media: "(prefers-color-scheme: dark)", color: siteConfig.brand.primary },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
        <MarketingIntegrations />
      </body>
    </html>
  );
}
