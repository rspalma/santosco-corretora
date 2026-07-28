import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

import type { InsuranceProduct } from "@/data/insurance-products";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type ProductCardProps = {
  product: InsuranceProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const Icon = product.icon;
  const quoteUrl = buildWhatsAppUrl(product.whatsappMessage);

  return (
    <article className="group relative flex h-full flex-col rounded-[1.7rem] border border-navy/10 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-gold/40 hover:shadow-[0_24px_70px_rgba(7,27,44,.14)]">
      {product.featured && (
        <span className="absolute right-5 top-5 rounded-full bg-gold/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-gold-dark">
          Mais procurado
        </span>
      )}
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-gold">
        <Icon aria-hidden="true" />
      </div>
      <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-gold-dark">
        {product.eyebrow}
      </p>
      <h3 className="mt-3 font-serif text-2xl text-navy">
        {product.shortTitle}
      </h3>
      <p className="mt-3 flex-1 leading-7 text-slate-600">
        {product.description}
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={quoteUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-event="whatsapp_quote"
          data-product={product.slug}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-extrabold text-white transition hover:bg-blue"
        >
          <MessageCircle size={16} aria-hidden="true" />
          Cotar agora
        </a>
        <Link
          href={`/seguros/${product.slug}`}
          className="inline-flex items-center justify-center gap-2 px-2 py-3 text-sm font-extrabold text-blue transition hover:text-navy"
        >
          Ver detalhes
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
