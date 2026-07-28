import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do site da Santos Co. Corretora de Seguros.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <main id="conteudo" className="min-h-screen bg-cream px-5 py-20 text-navy">
      <article className="mx-auto max-w-4xl rounded-[2rem] bg-white p-8 shadow-premium sm:p-12">
        <Link
          href="/"
          className="text-sm font-extrabold text-gold-dark transition hover:text-navy"
        >
          ← Voltar ao início
        </Link>
        <p className="mt-10 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-dark">
          Condições de navegação
        </p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Termos de Uso</h1>

        <div className="mt-10 space-y-9 text-slate-700">
          <section>
            <h2 className="font-serif text-2xl text-navy">1. Finalidade</h2>
            <p className="mt-3 leading-7">
              Este site apresenta informações institucionais e canais de
              contato da {siteConfig.name}. O conteúdo não substitui proposta,
              apólice, condições gerais, regulamento ou orientação específica
              da seguradora.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-navy">
              2. Informações sobre seguros
            </h2>
            <p className="mt-3 leading-7">
              Coberturas, limites, franquias, carências, exclusões, assistências,
              preços e aceitação variam conforme produto, seguradora e análise
              do risco. A contratação somente ocorre após as etapas aplicáveis
              e a emissão dos documentos correspondentes.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-navy">
              3. Links e serviços externos
            </h2>
            <p className="mt-3 leading-7">
              O site utiliza ou contém links para serviços de formulário,
              WhatsApp, Instagram e plataformas de parceiros. Esses serviços
              possuem termos, políticas e medidas de segurança próprios. Antes de inserir dados ou efetuar pagamento,
              confirme o endereço acessado e as informações exibidas.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-navy">
              4. Uso responsável
            </h2>
            <p className="mt-3 leading-7">
              É proibido utilizar o site para atividades ilícitas, tentar
              contornar controles de segurança, interferir na disponibilidade
              do serviço ou copiar conteúdo de forma contrária à legislação.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-navy">
              5. Disponibilidade e alterações
            </h2>
            <p className="mt-3 leading-7">
              O conteúdo pode ser corrigido, atualizado ou removido. Apesar das
              medidas de qualidade e segurança, não é possível garantir
              disponibilidade ininterrupta ou ausência absoluta de falhas.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-navy">6. Contato</h2>
            <p className="mt-3 leading-7">
              Dúvidas sobre estes termos podem ser enviadas para{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-bold text-blue underline"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
        </div>
        <p className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">
          Última atualização: 20 de julho de 2026.
        </p>
      </article>
    </main>
  );
}
