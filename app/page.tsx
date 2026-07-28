import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  MessageCircle,
  Plane,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { QuoteFunnel } from "@/components/forms/quote-funnel";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AudiencePathsSection } from "@/components/sections/audience-paths-section";
import { InsurerBrandsSection } from "@/components/sections/insurer-brands-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { TrustProcessSection } from "@/components/sections/trust-process-section";
import { FaqAccordion, type FaqItem } from "@/components/ui/faq-accordion";
import { InstitutionalVideo } from "@/components/ui/institutional-video";
import { JsonLd } from "@/components/ui/json-ld";
import { ProductCard } from "@/components/ui/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppFloatingButton } from "@/components/ui/whatsapp-floating-button";
import { insuranceProducts, travelProduct } from "@/data/insurance-products";
import { siteConfig } from "@/lib/site-config";
import { buildWhatsAppUrl, whatsappLinks } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: "SantosCo Corretora" },
  description:
    "Solicite uma cotação de seguros personalizada para vida, automóvel, profissão, empresa e viagens, com atendimento humano e opção de retorno pelo WhatsApp.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SantosCo Corretora",
    description:
      "Cotação personalizada, atendimento consultivo e opções de proteção para pessoas, profissionais, empresas e viagens.",
    url: "/",
  },
};

const faqItems: readonly FaqItem[] = [
  {
    question: "Como funciona a cotação?",
    answer:
      "Você informa sua necessidade, conversa com um especialista e recebe orientação para comparar alternativas. A contratação depende da análise, aceitação e condições da seguradora escolhida.",
  },
  {
    question: "A Santos Co. trabalha com diferentes seguradoras?",
    answer:
      "A corretora busca alternativas adequadas ao perfil e à necessidade do cliente. A disponibilidade de seguradoras e produtos varia conforme o risco, a região e os critérios de aceitação.",
  },
  {
    question: "O atendimento pode ser feito online?",
    answer:
      "Sim. A cotação pode começar pelo WhatsApp e seguir de forma digital, mantendo orientação humana durante a análise, contratação e pós-venda.",
  },
  {
    question: "A corretora orienta em caso de sinistro?",
    answer:
      "A equipe orienta o cliente sobre documentos, canais e etapas do processo. A regulação e a decisão sobre cobertura são realizadas pela seguradora conforme a apólice contratada.",
  },
] as const;

const selectedProducts = insuranceProducts.slice(0, 3);
const professionalQuote = buildWhatsAppUrl(
  "Olá, gostaria de avaliar uma estratégia de proteção para minha atividade profissional.",
);
const businessQuote = buildWhatsAppUrl(
  "Olá, gostaria de avaliar os riscos e seguros mais adequados para minha empresa.",
);

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo-santos-co-header.png`,
    description: siteConfig.description,
    taxID: siteConfig.cnpj,
    email: siteConfig.email,
    telephone: `+${siteConfig.whatsapp.number}`,
    sameAs: [siteConfig.social.instagram],
    areaServed: "BR",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: `+${siteConfig.whatsapp.number}`,
      email: siteConfig.email,
      availableLanguage: "Portuguese",
    },
    makesOffer: insuranceProducts.map((product) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: product.title,
        url: `${siteConfig.url}/seguros/${product.slug}`,
      },
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "pt-BR",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema, faqSchema]} />
      <SiteHeader ctaHref="/#cotacao" ctaLabel="Simular cotação grátis" />

      <main id="conteudo" className="overflow-hidden">
        <section
          id="inicio"
          aria-labelledby="hero-title"
          className="relative bg-navy pt-20 text-white"
        >
          <div className="noise absolute inset-0 opacity-30" />
          <div className="grid-luxury absolute inset-0 opacity-35" />
          <div className="absolute -right-44 top-20 h-[600px] w-[600px] rounded-full bg-[#1d628f]/35 blur-3xl" />
          <div className="absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-gold/12 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-24">
            <div className="reveal">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-gold-light">
                <Sparkles size={15} aria-hidden="true" />
                Cotação personalizada, gratuita e sem compromisso
              </p>
              <h1
                id="hero-title"
                className="max-w-3xl font-serif text-5xl leading-[1.03] sm:text-6xl lg:text-7xl"
              >
                Cotação de seguro personalizada
                <span className="text-gold"> sem pagar por coberturas desnecessárias.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">
                Compare alternativas com orientação especializada e encontre uma proteção adequada para seu carro, vida, empresa, carreira ou viagem.
              </p>
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                <Link
                  href="#cotacao"
                  className="inline-flex min-h-[72px] w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-center text-base font-extrabold leading-snug text-navy transition duration-300 hover:-translate-y-1 hover:bg-gold-light lg:text-lg"
                >
                  <span>Simular minha cotação grátis</span>
                  <ArrowRight className="shrink-0" size={18} aria-hidden="true" />
                </Link>
                <a
                  href={whatsappLinks.general}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[72px] w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/55 bg-[#25D366]/10 px-6 py-4 text-center text-base font-extrabold leading-snug text-white transition hover:bg-[#25D366]/20 lg:text-lg"
                >
                  <MessageCircle className="shrink-0" size={18} aria-hidden="true" />
                  <span>Atendimento imediato no WhatsApp</span>
                </a>
              </div>
              <div className="mt-9 grid gap-3 text-sm text-white/75 sm:grid-cols-3">
                {["Atendimento gratuito", "Resposta rápida", "Sem compromisso"].map(
                  (item) => (
                    <span key={item} className="flex items-center gap-2">
                      <Check size={16} className="text-gold" aria-hidden="true" />
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <QuoteFunnel />
          </div>
        </section>

        <section
          aria-label="Compromissos de atendimento"
          className="border-b border-slate-100 bg-white"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-8 text-center md:grid-cols-4 lg:px-8">
            {[
              ["Consultivo", "Entender antes de indicar"],
              ["Personalizado", "Coberturas conforme o perfil"],
              ["Digital", "Cotação e contato online"],
              ["Próximo", "Orientação durante a vigência"],
            ].map(([title, description]) => (
              <div key={title}>
                <strong className="font-serif text-2xl text-navy sm:text-3xl">
                  {title}
                </strong>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-slate-500 sm:text-xs">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <InsurerBrandsSection />

        <AudiencePathsSection />

        <section id="seguros" className="bg-cream py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Soluções em destaque"
                title="Proteções que começam com uma boa análise."
                description="Conheça alguns dos seguros mais procurados e solicite uma cotação diretamente pelo produto que faz sentido para você."
              />
              <Link
                href="/seguros"
                className="inline-flex shrink-0 items-center gap-2 font-extrabold text-blue transition hover:text-navy"
              >
                Ver todos os seguros
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {selectedProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}

              <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-gold/40 bg-navy p-7 text-white transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(7,27,44,.24)]">
                <div className="noise absolute inset-0 opacity-25" />
                <div className="relative flex h-full flex-col">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-gold">
                    <Plane aria-hidden="true" />
                  </div>
                  <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-gold">
                    Mercosul e exterior
                  </p>
                  <h3 className="mt-3 font-serif text-2xl">
                    {travelProduct.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-7 text-white/75">
                    {travelProduct.description}
                  </p>
                  <Link
                    href={travelProduct.href}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-gold-light"
                  >
                    Preparar minha viagem
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="diferenciais" className="relative bg-navy py-24 text-white">
          <div className="noise absolute inset-0 opacity-25" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold">
                Proteção estratégica
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Riscos profissionais e empresariais exigem mais do que uma
                apólice genérica.
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/75">
                A Santos Co. ajuda a mapear responsabilidades, patrimônio,
                contratos e continuidade para que a escolha do seguro tenha
                relação com a realidade da atividade.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Leitura do cenário antes da indicação",
                  "Comparação de coberturas e condições",
                  "Orientação clara sobre limites e exclusões",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-navy">
                      <Check size={14} strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="font-semibold text-white/85">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <article className="glass flex flex-col rounded-[2rem] p-7">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gold text-navy">
                  <BriefcaseBusiness aria-hidden="true" />
                </div>
                <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-gold">
                  Para profissionais
                </p>
                <h3 className="mt-3 font-serif text-3xl">
                  Proteja sua carreira, reputação e renda.
                </h3>
                <p className="mt-4 flex-1 leading-7 text-white/70">
                  Responsabilidade Civil Profissional e outras soluções para
                  quem presta serviços especializados.
                </p>
                <a
                  href={professionalQuote}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 font-extrabold text-gold-light"
                >
                  Proteger minha carreira agora
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
              </article>

              <article className="flex flex-col rounded-[2rem] bg-white p-7 text-navy">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-gold">
                  <Building2 aria-hidden="true" />
                </div>
                <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-gold-dark">
                  Para empresas
                </p>
                <h3 className="mt-3 font-serif text-3xl">
                  Proteja patrimônio, operação e contratos.
                </h3>
                <p className="mt-4 flex-1 leading-7 text-slate-600">
                  Seguro Empresarial, Garantia, Vida empresarial e outras
                  modalidades conforme os riscos do negócio.
                </p>
                <a
                  href={businessQuote}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 font-extrabold text-blue"
                >
                  Proteger minha empresa agora
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
              </article>
            </div>
          </div>
        </section>

        <section id="sobre" className="py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:px-8">
            <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-blue p-8 text-white shadow-premium">
              <div className="noise absolute inset-0 opacity-30" />
              <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-gold/25 blur-3xl" />
              <div className="relative flex h-full min-h-[456px] flex-col justify-between">
                <ShieldCheck
                  size={70}
                  className="text-gold"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-serif text-5xl">Santos Co.</p>
                  <p className="mt-4 max-w-md text-lg leading-8 text-white/75">
                    Gestão de riscos com ética, transparência e excelência no
                    atendimento.
                  </p>
                </div>
                <div className="mt-14 grid grid-cols-2 gap-4">
                  <div className="glass rounded-2xl p-4">
                    <h3 className="font-bold">Escuta ativa</h3>
                    <p className="mt-1 text-sm text-white/70">
                      Entender antes de indicar.
                    </p>
                  </div>
                  <div className="glass rounded-2xl p-4">
                    <h3 className="font-bold">Decisão clara</h3>
                    <p className="mt-1 text-sm text-white/70">
                      Comparar sem complicação.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Por que escolher a Santos Co.?"
                title="A corretora traduz o risco para você decidir melhor."
                description="Cada cliente tem uma história, um patrimônio e um nível de exposição diferente. Por isso, o atendimento começa pela conversa e não pela venda de uma cobertura pronta."
              />
              <div className="mt-8 space-y-5">
                {[
                  "Análise personalizada de necessidades e riscos",
                  "Comparação de alternativas com linguagem simples",
                  "Acompanhamento durante a vigência",
                  "Orientação em renovações, alterações e sinistros",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/25 text-gold-dark">
                      <Check size={14} aria-hidden="true" />
                    </span>
                    <span className="font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href={whatsappLinks.general}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-4 font-extrabold text-white transition hover:bg-blue"
              >
                Falar com um especialista
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <TrustProcessSection />

        <SocialProofSection />

        <section className="bg-slate-50 py-24" aria-labelledby="video-title">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold-dark">
                Por que escolher a Santos Co.?
              </p>
              <h2
                id="video-title"
                className="mt-4 font-serif text-4xl leading-tight text-navy sm:text-5xl"
              >
                Segurança para viver e construir com mais tranquilidade.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Veja como a corretora orienta, compara alternativas e acompanha
                diferentes necessidades de proteção.
              </p>
              <div className="mt-7 flex items-center gap-3 rounded-2xl border border-navy/10 bg-white p-4 text-sm font-semibold text-slate-700">
                <BadgeCheck
                  className="shrink-0 text-gold-dark"
                  aria-hidden="true"
                />
                O vídeo é carregado somente quando você decide reproduzi-lo.
              </div>
            </div>
            <InstitutionalVideo />
          </div>
        </section>

        <section id="faq" className="py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
            <div>
              <SectionHeading
                eyebrow="Perguntas frequentes"
                title="Informação clara antes da contratação."
                description="Ainda ficou com alguma dúvida? Fale diretamente com um especialista."
              />
              <a
                href={whatsappLinks.general}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 font-extrabold text-blue transition hover:text-navy"
              >
                <MessageCircle size={19} aria-hidden="true" />
                Falar com especialista no WhatsApp
              </a>
            </div>
            <FaqAccordion items={faqItems} />
          </div>
        </section>

        <section className="px-5 pb-24 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-blue px-6 py-16 text-center text-white sm:px-12">
            <div className="noise absolute inset-0 opacity-30" />
            <div className="relative">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold">
                Próximo passo
              </p>
              <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl sm:text-5xl">
                Conte o que você precisa proteger. A equipe ajuda no restante.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
                Inicie uma conversa orientada e conheça alternativas adequadas
                à sua necessidade.
              </p>
              <Link
                href="#cotacao"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-extrabold text-navy transition duration-300 hover:-translate-y-1 hover:bg-gold-light"
              >
                Simular minha cotação grátis
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloatingButton href={whatsappLinks.general} />
    </>
  );
}
