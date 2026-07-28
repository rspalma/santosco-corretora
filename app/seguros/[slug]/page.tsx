import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/ui/json-ld";
import { WhatsAppFloatingButton } from "@/components/ui/whatsapp-floating-button";
import {
  getInsuranceProduct,
  insuranceProducts,
} from "@/data/insurance-products";
import { siteConfig } from "@/lib/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return insuranceProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getInsuranceProduct(slug);

  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    alternates: { canonical: `/seguros/${product.slug}` },
    openGraph: {
      title: `${product.title} | Santos Co.`,
      description: product.description,
      url: `/seguros/${product.slug}`,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getInsuranceProduct(slug);

  if (!product) notFound();

  const Icon = product.icon;
  const whatsappUrl = buildWhatsAppUrl(product.whatsappMessage);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: product.title,
    description: product.description,
    provider: {
      "@type": "InsuranceAgency",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "BR",
    url: `${siteConfig.url}/seguros/${product.slug}`,
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <SiteHeader activePath="/seguros" ctaHref={whatsappUrl} />

      <main id="conteudo">
        <section className="relative overflow-hidden bg-navy pb-24 pt-36 text-white">
          <div className="noise absolute inset-0 opacity-30" />
          <div className="absolute -right-24 top-20 h-96 w-96 rounded-full bg-[#1d628f]/35 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <Link
              href="/seguros"
              className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-white/70 transition hover:text-white"
            >
              <ArrowLeft size={17} aria-hidden="true" />
              Voltar para seguros
            </Link>
            <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1fr_.45fr]">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold">
                  {product.eyebrow}
                </p>
                <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                  {product.title}
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-white/75">
                  {product.description}
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 font-extrabold text-navy transition hover:-translate-y-1 hover:bg-gold-light"
                >
                  Conversar com especialista
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>
              <div className="glass grid min-h-64 place-items-center rounded-[2rem] p-10">
                <Icon size={112} className="text-gold" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream py-24">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-3 lg:px-8">
            <article className="rounded-[1.8rem] bg-white p-7 shadow-sm">
              <BadgeCheck size={32} className="text-gold-dark" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-2xl text-navy">
                Possibilidades de proteção
              </h2>
              <ul className="mt-6 space-y-4">
                {product.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-gold-dark"
                      aria-hidden="true"
                    />
                    <span className="leading-6">{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[1.8rem] bg-navy p-7 text-white shadow-sm">
              <ShieldCheck size={32} className="text-gold" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-2xl">Principais benefícios</h2>
              <ul className="mt-6 space-y-4">
                {product.benefits.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/80">
                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <span className="leading-6">{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[1.8rem] bg-white p-7 shadow-sm">
              <MessageCircle size={32} className="text-gold-dark" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-2xl text-navy">
                Para quem pode fazer sentido
              </h2>
              <ul className="mt-6 space-y-4">
                {product.idealFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-gold-dark"
                      aria-hidden="true"
                    />
                    <span className="leading-6">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold-dark">
              Informação importante
            </p>
            <h2 className="mt-4 font-serif text-4xl text-navy sm:text-5xl">
              A proteção certa depende dos detalhes.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Coberturas, limites, franquias, carências, exclusões, assistências
              e aceitação variam conforme seguradora, modalidade e proposta.
              Leia as condições contratuais e conte com a corretora para tirar
              dúvidas antes de contratar.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-4 font-extrabold text-white transition hover:bg-blue"
            >
              Solicitar orientação
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloatingButton href={whatsappUrl} />
    </>
  );
}
