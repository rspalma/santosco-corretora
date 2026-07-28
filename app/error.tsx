"use client";

import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="conteudo"
      className="grid min-h-screen place-items-center bg-cream px-5 text-center text-navy"
    >
      <div className="max-w-xl rounded-[2rem] bg-white p-10 shadow-premium">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold-dark">
          Não foi possível carregar
        </p>
        <h1 className="mt-4 font-serif text-4xl">Algo saiu do caminho.</h1>
        <p className="mt-5 leading-7 text-slate-600">
          Tente novamente. Caso o problema continue, utilize o WhatsApp da
          corretora.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-4 font-extrabold text-white"
        >
          <RotateCcw size={18} aria-hidden="true" />
          Tentar novamente
        </button>
      </div>
    </main>
  );
}
