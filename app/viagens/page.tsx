import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Car,
  Check,
  FileCheck2,
  Gauge,
  Lightbulb,
  MessageCircle,
  MountainSnow,
  Plane,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppFloatingButton } from "@/components/ui/whatsapp-floating-button";
import { siteConfig } from "@/lib/site-config";
import { whatsappLinks } from "@/lib/whatsapp";

const travelCards = [
  {
    icon: Plane,
    eyebrow: "Tranquilidade",
    title: "Seguro Viagem Internacional",
    description:
      "Proteção para aproveitar cada destino com assistência e segurança, do embarque ao retorno.",
    items: [
      "Despesas médicas e hospitalares, conforme o plano",
      "Assistência em acidentes e outros imprevistos cobertos",
      "Possibilidades de proteção para bagagem",
      "Opções para diferentes destinos e perfis de viagem",
    ],
    button: "Conversar pelo WhatsApp",
    href: whatsappLinks.travelInsurance,
    featured: false,
    note: "Coberturas e obrigatoriedades variam conforme destino, plano e seguradora.",
  },
  {
    icon: FileCheck2,
    eyebrow: "Documentação",
    title: "Seguro Carta Verde",
    description:
      "Contratação digital para quem vai circular de veículo pelo Mercosul e precisa da cobertura prevista para danos a terceiros.",
    items: [
      "Preenchimento de dados pessoais",
      "Informações do veículo",
      "Revisão e pagamento no portal especializado",
      "Emissão online após a conclusão do processo",
    ],
    button: "Cotar e emitir agora",
    href: siteConfig.cartaVerdeUrl,
    featured: true,
    note: "Após a emissão, siga as orientações do portal. A corretora recomenda imprimir o documento em papel verde para facilitar a fiscalização.",
  },
  {
    icon: Car,
    eyebrow: "Segurança na estrada",
    title: "Kit de Segurança",
    description:
      "Orientação sobre itens exigidos ou recomendados para reduzir riscos e evitar problemas durante a viagem.",
    items: [
      "Extintor de incêndio, quando aplicável",
      "Triângulo extra e colete refletivo",
      "Cambão para situações de emergência",
      "Correntes para pneus em regiões com neve",
    ],
    button: "Consultar meu kit",
    href: whatsappLinks.safetyKit,
    featured: false,
    note: "As exigências podem variar por país, região, veículo, trajeto e época do ano.",
  },
] as const;

const travelTips = [
  {
    icon: Lightbulb,
    title: "Faróis e sinalização",
    description:
      "Verifique as regras de circulação do país de destino e mantenha os equipamentos de iluminação e sinalização em boas condições.",
  },
  {
    icon: MountainSnow,
    title: "Regiões com neve",
    description:
      "Consulte a exigência de correntes, reduza a velocidade, amplie a distância e evite movimentos bruscos ao frear ou esterçar.",
  },
  {
    icon: Gauge,
    title: "Revisão preventiva",
    description:
      "Antes de viajar, confira pneus, freios, fluidos, bateria, limpadores e sistemas de aquecimento ou desembaçamento.",
  },
] as const;

export default function ViagensPage() {
  const travelSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Soluções para viagens internacionais e Mercosul",
    description:
      "Seguro Viagem Internacional, Carta Verde e orientação sobre Kit de Segurança.",
    provider: {
      "@type": "InsuranceAgency",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/viagens`,
    areaServed: ["BR", "Mercosul"],
  };

  return (
    <>
      <JsonLd data={travelSchema} />
      <SiteHeader
        activePath="/viagens"
        ctaHref={whatsappLinks.travel}
        ctaLabel="Falar com especialista"
      />

      <main id="conteudo" className="overflow-hidden">
        <section className="relative bg-navy pb-28 pt-36 text-white">
          <div className="noise absolute inset-0 opacity-30" />
          <div className="absolute -right-24 top-20 h-96 w-96 rounded-full bg-[#1d628f]/35 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-5 text-center lg:px-8">
            <Link
              href="/"
              className="mx-auto mb-8 inline-flex items-center gap-2 rounded-md text-sm font-semibold text-white/70 transition hover:text-white"
            >
              <ArrowLeft size={17} aria-hidden="true" />
              Voltar para o início
            </Link>
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-gold-light">
              <Sparkles size={15} aria-hidden="true" />
              Sua viagem começa aqui
            </p>
            <h1 className="mx-auto mt-7 max-w-4xl font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Viaje preparado. Atravesse fronteiras com{" "}
              <span className="text-gold">tranquilidade.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/75">
              Seguro Viagem, Carta Verde e orientação sobre o Kit de Segurança
              em uma experiência simples, confiável e acompanhada pela Santos
              Co.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="#solucoes"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-extrabold text-navy transition hover:-translate-y-1 hover:bg-gold-light"
              >
                Ver opções
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a
                href={whatsappLinks.travel}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Tirar uma dúvida
              </a>
            </div>
          </div>
        </section>

        <section id="solucoes" className="relative -mt-12 pb-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid items-stretch gap-6 lg:grid-cols-3">
              {travelCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    className={`group relative flex min-h-[660px] flex-col overflow-hidden rounded-[2rem] border p-7 transition duration-300 hover:-translate-y-2 sm:p-8 ${card.featured ? "border-gold/50 bg-blue text-white shadow-[0_30px_90px_rgba(7,27,44,.28)] lg:-translate-y-5" : "border-navy/10 bg-cream text-navy shadow-premium"}`}
                  >
                    {card.featured && (
                      <span className="absolute right-5 top-5 rounded-full bg-gold px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-navy">
                        Emissão online
                      </span>
                    )}
                    <div
                      className={`grid h-16 w-16 place-items-center rounded-2xl ${card.featured ? "bg-white/10 text-gold" : "bg-navy text-gold"}`}
                    >
                      <Icon size={30} aria-hidden="true" />
                    </div>
                    <p
                      className={`mt-8 text-xs font-extrabold uppercase tracking-[0.2em] ${card.featured ? "text-gold" : "text-gold-dark"}`}
                    >
                      {card.eyebrow}
                    </p>
                    <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                      {card.title}
                    </h2>
                    <p
                      className={`mt-5 leading-7 ${card.featured ? "text-white/75" : "text-slate-600"}`}
                    >
                      {card.description}
                    </p>
                    <div
                      className={`my-7 h-px ${card.featured ? "bg-white/15" : "bg-navy/15"}`}
                    />
                    <ul className="space-y-4">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${card.featured ? "bg-gold text-navy" : "bg-gold/25 text-gold-dark"}`}
                          >
                            <Check
                              size={14}
                              strokeWidth={3}
                              aria-hidden="true"
                            />
                          </span>
                          <span
                            className={`leading-6 ${card.featured ? "text-white/85" : "text-slate-700"}`}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-8">
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-center font-extrabold transition hover:-translate-y-1 ${card.featured ? "bg-gold text-navy hover:bg-gold-light" : "bg-navy text-white hover:bg-blue"}`}
                      >
                        {card.button}
                        <ArrowRight size={18} aria-hidden="true" />
                      </a>
                      <p
                        className={`mt-4 text-center text-xs leading-5 ${card.featured ? "text-white/65" : "text-slate-500"}`}
                      >
                        {card.note}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-cream py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
            <div>
              <SectionHeading
                eyebrow="Carta Verde digital"
                title="Da cotação à emissão, em poucos passos."
                description="Ao escolher a Carta Verde, você será direcionado ao ambiente especializado para preencher as informações e concluir a contratação."
              />
              <div className="mt-8 rounded-2xl border border-amber-300/60 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className="mt-0.5 shrink-0"
                    size={20}
                    aria-hidden="true"
                  />
                  <p>
                    Confira todos os dados antes do pagamento. Em caso de dúvida
                    ou problema no portal, interrompa o processo e fale com a
                    equipe da Santos Co.
                  </p>
                </div>
              </div>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  "01",
                  "Dados pessoais",
                  "Informe os dados do segurado solicitados pelo sistema.",
                ],
                [
                  "02",
                  "Dados do veículo",
                  "Preencha as informações do veículo que fará a viagem.",
                ],
                [
                  "03",
                  "Revisão e pagamento",
                  "Confira a proposta e selecione a forma de pagamento.",
                ],
                [
                  "04",
                  "Emissão",
                  "Conclua o processo e receba o documento conforme o portal.",
                ],
              ].map(([number, title, text]) => (
                <li
                  key={number}
                  className="rounded-3xl border border-navy/10 bg-white p-6 shadow-sm"
                >
                  <p className="text-sm font-extrabold text-gold-dark">
                    {number}
                  </p>
                  <h3 className="mt-6 font-serif text-2xl text-navy">
                    {title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-24" aria-labelledby="dicas-title">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Antes de pegar a estrada"
              title="Documentação em ordem e direção preventiva."
              description="Regras de trânsito e equipamentos obrigatórios podem mudar conforme o destino. Consulte fontes oficiais e confirme as orientações antes da viagem."
              align="center"
            />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {travelTips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <article
                    key={tip.title}
                    className="rounded-[1.8rem] border border-navy/10 bg-white p-7 shadow-sm"
                  >
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-gold">
                      <Icon aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 font-serif text-2xl text-navy">
                      {tip.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-600">
                      {tip.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-blue px-6 py-16 text-center text-white sm:px-12">
            <div className="noise absolute inset-0 opacity-30" />
            <div className="relative">
              <ShieldCheck
                size={52}
                className="mx-auto text-gold"
                aria-hidden="true"
              />
              <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl sm:text-5xl">
                Não sabe qual opção precisa para sua viagem?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
                Fale com a Santos Co. e receba orientação antes de pegar a
                estrada ou embarcar.
              </p>
              <a
                href={whatsappLinks.travel}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-extrabold text-navy transition hover:-translate-y-1 hover:bg-gold-light"
              >
                Falar com especialista
                <MessageCircle size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloatingButton href={whatsappLinks.travel} />
    </>
  );
}
