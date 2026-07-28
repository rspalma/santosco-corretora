import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de privacidade e proteção de dados da Santos Co. Corretora de Seguros.",
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: true },
};

export default function PrivacidadePage() {
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
          Privacidade e LGPD
        </p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">
          Política de Privacidade
        </h1>
        <p className="mt-6 leading-8 text-slate-600">
          A {siteConfig.name}, inscrita no CNPJ {siteConfig.cnpj}, respeita a
          privacidade de clientes e visitantes. Esta política explica, de forma
          resumida, como os dados podem ser tratados nos canais digitais da
          corretora.
        </p>

        <div className="mt-10 space-y-9 text-slate-700">
          <section>
            <h2 className="font-serif text-2xl text-navy">1. Dados tratados</h2>
            <p className="mt-3 leading-7">
              Este site institucional não possui cadastro nem área logada. No
              funil de cotação da página inicial, o visitante pode optar por
              enviar nome, telefone e tipo de seguro para solicitar retorno da
              equipe ou abrir uma conversa no WhatsApp. Quando a opção de
              retorno é utilizada, os dados são encaminhados por um serviço de
              processamento de formulários configurado pela corretora. Ao
              acessar WhatsApp, e-mail, Instagram, o portal de Carta Verde ou
              outros canais externos, o visitante passa a utilizar serviços
              que possuem políticas próprias. Conforme a continuidade do
              atendimento, também podem ser solicitados e tratados dados do
              risco, do veículo e outras informações necessárias à cotação ou
              contratação.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-navy">2. Finalidades</h2>
            <p className="mt-3 leading-7">
              Os dados podem ser utilizados para responder solicitações,
              identificar necessidades, preparar cotações, viabilizar propostas
              e contratações, prestar suporte, atender obrigações legais e
              regulatórias e proteger direitos da corretora e dos titulares.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-navy">
              3. Bases legais e compartilhamento
            </h2>
            <p className="mt-3 leading-7">
              O tratamento pode se apoiar em procedimentos preliminares a
              contrato, execução contratual, cumprimento de obrigação legal ou
              regulatória, exercício regular de direitos, legítimo interesse ou
              consentimento, conforme o caso. Informações podem ser
              compartilhadas com seguradoras, plataformas de cotação,
              provedores de formulário e comunicação, prestadores técnicos,
              autoridades e outros destinatários necessários à finalidade
              informada.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-navy">
              4. Cookies e tecnologias semelhantes
            </h2>
            <p className="mt-3 leading-7">
              O site utiliza apenas recursos técnicos essenciais por padrão.
              Ferramentas opcionais de medição e marketing, como Google Tag
              Manager, Google Analytics, Meta Pixel ou Microsoft Clarity,
              somente são carregadas quando estiverem configuradas e após a
              escolha do visitante no aviso de privacidade. A preferência fica
              registrada no navegador. O provedor de hospedagem também pode
              processar registros técnicos essenciais para segurança,
              disponibilidade e diagnóstico.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-navy">
              5. Segurança e retenção
            </h2>
            <p className="mt-3 leading-7">
              São adotadas medidas técnicas e administrativas compatíveis com o
              contexto do site. Os dados são mantidos pelo tempo necessário às
              finalidades, aos prazos legais, regulatórios e contratuais e ao
              exercício regular de direitos.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-navy">
              6. Direitos do titular
            </h2>
            <p className="mt-3 leading-7">
              O titular pode solicitar confirmação de tratamento, acesso,
              correção, informações sobre compartilhamento, anonimização,
              bloqueio ou eliminação quando aplicável, portabilidade nos termos
              da regulamentação, revogação de consentimento e demais direitos
              previstos na legislação.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-navy">7. Contato</h2>
            <p className="mt-3 leading-7">
              Solicitações relacionadas à privacidade podem ser encaminhadas
              para{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-bold text-blue underline"
              >
                {siteConfig.email}
              </a>
              . A identidade do solicitante poderá ser confirmada para proteger
              os dados contra acesso indevido.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-navy">8. Atualizações</h2>
            <p className="mt-3 leading-7">
              Esta política pode ser atualizada para refletir alterações no
              site, nos serviços ou na legislação. A versão vigente será sempre
              publicada nesta página.
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
