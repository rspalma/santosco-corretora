import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viagens: Carta Verde, Seguro Viagem e Kit de Segurança",
  description:
    "Carta Verde com emissão online, Seguro Viagem Internacional e orientação sobre Kit de Segurança para viagens pelo Mercosul.",
  alternates: { canonical: "/viagens" },
  openGraph: {
    title: "Viagens | Santos Co. Corretora",
    description:
      "Prepare sua viagem com Carta Verde, Seguro Viagem e Kit de Segurança.",
    url: "/viagens",
    type: "website",
  },
};

export default function ViagensLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
