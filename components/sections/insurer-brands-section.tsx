import { ShieldCheck } from "lucide-react";

const insurers = [
  "Porto",
  "Tokio Marine",
  "Allianz",
  "HDI Seguros",
  "Bradesco Seguros",
  "SulAmérica",
] as const;

export function InsurerBrandsSection() {
  return (
    <section
      aria-labelledby="seguradoras-title"
      className="border-b border-slate-100 bg-white py-12"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold/20 text-gold-dark">
            <ShieldCheck size={23} aria-hidden="true" />
          </span>
          <h2 id="seguradoras-title" className="font-serif text-2xl text-navy sm:text-3xl">
            Opções entre seguradoras reconhecidas do mercado
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-slate-500">
            A companhia indicada depende do produto, do perfil, da região e da análise de risco. A Santos Co. orienta a comparação de coberturas e condições.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {insurers.map((insurer) => (
            <div
              key={insurer}
              className="flex min-h-20 items-center justify-center rounded-2xl border border-navy/10 bg-slate-50 px-4 text-center font-extrabold tracking-tight text-navy transition hover:-translate-y-1 hover:border-gold/50 hover:bg-white hover:shadow-lg"
            >
              {insurer}
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          A disponibilidade de cada companhia e produto está sujeita ao perfil e à análise do risco.
        </p>
      </div>
    </section>
  );
}
