import type { Metadata } from "next";
import { ArrowRight, Check, Plane } from "lucide-react";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductCard } from "@/components/ui/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppFloatingButton } from "@/components/ui/whatsapp-floating-button";
import {
  additionalInsuranceGroups,
  insuranceProducts,
} from "@/data/insurance-products";
import { whatsappLinks } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Seguros para pessoas, profissionais e empresas",
  description:
    "Conheça as soluções da Santos Co. para responsabilidade civil, vida, empresas, residência, automóvel, garantia e viagens.",
  alternates: { canonical: "/seguros" },
  openGraph: {
    title: "Seguros | Santos Co. Corretora",
    description:
      "Proteção personalizada para diferentes fases, profissões e negócios.",
    url: "/seguros",
  },
};

export default function SegurosPage() {
  return (
    <>
      <SiteHeader
        activePath="/seguros"
        ctaHref={whatsappLinks.general}
        ctaLabel="Solicitar cotação"
      />

      <main id="conteudo">
        <section className="relative overflow-hidden bg-navy pb-24 pt-36 text-white">
          <div className="noise absolute inset-0 opacity-30" />
          <div className="absolute -right-32 top-16 h-96 w-96 rounded-full bg-[#1d628f]/35 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold">
              Nossos seguros
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Proteção pensada para a sua realidade.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/75">
              Conheça as principais soluções e converse com a equipe para
              entender coberturas, condições e opções disponíveis para o seu
              perfil.
            </p>
          </div>
        </section>

        <section className="bg-cream py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Soluções em destaque"
              title="Um portfólio para pessoas, profissionais e empresas."
              description="Cada contratação depende de análise e aceitação da seguradora. A Santos Co. ajuda você a comparar as alternativas com linguagem clara."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {insuranceProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-5 lg:grid-cols-3">
              {additionalInsuranceGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <article
                    key={group.title}
                    className="rounded-[1.8rem] border border-navy/10 bg-white p-7 shadow-sm"
                  >
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-gold">
                      <Icon aria-hidden="true" />
                    </div>
                    <h2 className="mt-6 font-serif text-2xl text-navy">
                      {group.title}
                    </h2>
                    <ul className="mt-6 space-y-3">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-slate-700"
                        >
                          <Check
                            size={17}
                            className="mt-0.5 shrink-0 text-gold-dark"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
            <p className="mt-8 text-sm leading-6 text-slate-500">
              A disponibilidade de produtos, modalidades, coberturas e
              seguradoras depende do perfil do risco e das regras de aceitação.
            </p>
          </div>
        </section>

        <section className="bg-navy py-24 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[1fr_auto] lg:px-8">
            <div>
              <div className="flex items-center gap-3 text-gold">
                <Plane aria-hidden="true" />
                <p className="text-xs font-extrabold uppercase tracking-[0.22em]">
                  Vai viajar?
                </p>
              </div>
              <h2 className="mt-5 max-w-3xl font-serif text-4xl sm:text-5xl">
                Carta Verde, Seguro Viagem e Kit de Segurança.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
                Encontre as três soluções em uma página preparada para quem vai
                viajar pelo Mercosul ou para outros destinos internacionais.
              </p>
            </div>
            <Link
              href="/viagens"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-extrabold text-navy transition hover:-translate-y-1 hover:bg-gold-light"
            >
              Acessar Viagens
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloatingButton href={whatsappLinks.general} />
    </>
  );
}
