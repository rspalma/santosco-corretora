import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Plane,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";

const paths = [
  {
    icon: UserRound,
    eyebrow: "Pessoa e família",
    title: "Vida, casa e mobilidade",
    description:
      "Soluções para proteger renda, patrimônio e os planos de quem depende de você.",
    items: ["Seguro de Vida", "Automóvel", "Residencial"],
    href: "/seguros",
  },
  {
    icon: BriefcaseBusiness,
    eyebrow: "Profissionais",
    title: "Carreira e patrimônio",
    description:
      "Proteção para quem presta serviços, toma decisões e responde tecnicamente pelo próprio trabalho.",
    items: ["RC Profissional", "Seguro de Renda", "Equipamentos"],
    href: "/seguros/responsabilidade-civil",
  },
  {
    icon: Building2,
    eyebrow: "Empresas",
    title: "Operação e continuidade",
    description:
      "Coberturas para patrimônio, contratos, responsabilidades e riscos que podem interromper o negócio.",
    items: ["Empresarial", "Garantia", "Vida empresarial"],
    href: "/seguros/seguro-empresarial",
  },
  {
    icon: Plane,
    eyebrow: "Viagens",
    title: "Estrada e exterior",
    description:
      "Orientação para viajar com Seguro Viagem, Carta Verde e Kit de Segurança para o Mercosul.",
    items: ["Seguro Viagem", "Carta Verde", "Kit Mercosul"],
    href: "/viagens",
  },
] as const;

export function AudiencePathsSection() {
  return (
    <section id="necessidades" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Comece pela sua necessidade"
          title="O seguro certo muda conforme o que está em jogo."
          description="Em vez de apresentar uma lista sem contexto, organizamos as soluções por objetivo para você chegar mais rápido ao que realmente precisa."
          align="center"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {paths.map((path) => {
            const Icon = path.icon;

            return (
              <article
                key={path.eyebrow}
                className="group flex h-full flex-col rounded-[1.8rem] border border-navy/10 bg-cream p-6 transition duration-300 hover:-translate-y-2 hover:border-gold/45 hover:bg-white hover:shadow-[0_24px_70px_rgba(7,27,44,.12)]"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-gold">
                  <Icon aria-hidden="true" />
                </div>
                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-gold-dark">
                  {path.eyebrow}
                </p>
                <h3 className="mt-3 font-serif text-2xl leading-tight text-navy">
                  {path.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {path.description}
                </p>
                <ul className="mt-6 space-y-2 text-sm font-semibold text-slate-700">
                  {path.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-dark" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={path.href}
                  className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-extrabold text-blue transition hover:text-navy"
                >
                  Explorar soluções
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
