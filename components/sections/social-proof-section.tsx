import { BadgeCheck, MessageSquareQuote, ShieldCheck, Star } from "lucide-react";

const rating = process.env.NEXT_PUBLIC_GOOGLE_RATING?.trim();
const reviewCount = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT?.trim();
const reviewsUrl =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL?.trim() ||
  "https://www.google.com/search?q=Santos+Co+Corretora+de+Seguros";

const trustSignals = [
  {
    title: "Atendimento consultivo",
    description: "A necessidade vem antes da indicação da cobertura.",
    icon: MessageSquareQuote,
  },
  {
    title: "Empresa ativa desde 2021",
    description: "Atuação formal no mercado de corretagem e gestão de riscos.",
    icon: BadgeCheck,
  },
  {
    title: "Apoio durante a vigência",
    description: "Orientação em alterações, renovações e etapas de sinistro.",
    icon: ShieldCheck,
  },
] as const;

export function SocialProofSection() {
  return (
    <section id="avaliacoes" className="bg-white py-24" aria-labelledby="social-proof-title">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold-dark">
              Confiança e autoridade
            </p>
            <h2 id="social-proof-title" className="mt-4 font-serif text-4xl leading-tight text-navy sm:text-5xl">
              Segurança para escolher. Proximidade para acompanhar.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Em seguros, a experiência não termina na contratação. O atendimento precisa continuar claro e acessível durante toda a jornada.
            </p>

            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-gold/40 bg-cream px-5 py-4 text-navy transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-gold-dark shadow-sm">
                <Star size={22} fill="currentColor" aria-hidden="true" />
              </span>
              <span>
                <strong className="block text-lg">
                  {rating ? `${rating} de 5 no Google` : "Confira as avaliações no Google"}
                </strong>
                <span className="text-sm text-slate-500">
                  {reviewCount ? `${reviewCount} avaliações verificadas` : "Acesse o perfil e veja experiências reais"}
                </span>
              </span>
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {trustSignals.map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-[1.7rem] border border-navy/10 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-gold">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-serif text-2xl text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
