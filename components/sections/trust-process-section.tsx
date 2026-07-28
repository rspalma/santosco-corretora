import { BadgeCheck, MessageCircle, SearchCheck, ShieldCheck } from "lucide-react";

const process = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Conte sua necessidade",
    description:
      "A conversa começa pelo canal que for mais confortável para você.",
  },
  {
    icon: SearchCheck,
    number: "02",
    title: "Análise consultiva",
    description:
      "A equipe entende o contexto, os riscos e as prioridades antes de indicar.",
  },
  {
    icon: BadgeCheck,
    number: "03",
    title: "Compare com clareza",
    description:
      "Você recebe orientação para avaliar coberturas, condições e investimento.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Conte com o pós-venda",
    description:
      "Acompanhamento em renovações, alterações e orientações quando necessário.",
  },
] as const;

export function TrustProcessSection() {
  return (
    <section className="bg-cream py-24" aria-labelledby="processo-title">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold-dark">
            Uma experiência mais clara
          </p>
          <h2
            id="processo-title"
            className="mt-4 font-serif text-4xl text-navy sm:text-5xl"
          >
            Proteção bem escolhida começa por um bom processo.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Sem avaliações inventadas ou promessas genéricas: a confiança é
            construída com escuta, orientação e acompanhamento.
          </p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.number}
                className="rounded-3xl border border-navy/10 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-gold">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <span className="font-serif text-2xl text-gold-dark">
                    {item.number}
                  </span>
                </div>
                <h3 className="mt-7 font-serif text-2xl text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
