import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="conteudo"
      className="grid min-h-screen place-items-center bg-navy px-5 text-center text-white"
    >
      <div className="max-w-2xl">
        <Search size={48} className="mx-auto text-gold" aria-hidden="true" />
        <p className="mt-6 font-serif text-8xl text-gold">404</p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">
          Esta página seguiu outra rota.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-white/70">
          Volte ao início ou conheça as soluções de seguros disponíveis.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-extrabold text-navy"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Voltar ao início
          </Link>
          <Link
            href="/seguros"
            className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 font-bold text-white"
          >
            Ver seguros
          </Link>
        </div>
      </div>
    </main>
  );
}
