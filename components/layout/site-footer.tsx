import { AtSign, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { whatsappLinks } from "@/lib/whatsapp";

import { BrandLogo } from "../ui/brand-logo";

export function SiteFooter() {
  return (
    <footer className="bg-[#04111c] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <BrandLogo variant="footer" />
          <p className="mt-5 max-w-md leading-7 text-white/70">
            Seguros para pessoas, profissionais, empresas e viagens, com
            atendimento consultivo, próximo e transparente.
          </p>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
            As coberturas, assistências e condições dependem do produto, da
            seguradora e da proposta aprovada. Consulte a equipe antes da
            contratação.
          </p>
        </div>

        <div>
          <h2 className="font-bold">Links rápidos</h2>
          <nav
            aria-label="Links do rodapé"
            className="mt-4 flex flex-col gap-3 text-sm text-white/70"
          >
            <Link className="transition hover:text-white" href="/#cotacao">
              Iniciar cotação
            </Link>
            <Link className="transition hover:text-white" href="/#sobre">
              Quem somos
            </Link>
            <Link className="transition hover:text-white" href="/seguros">
              Nossos seguros
            </Link>
            <Link className="transition hover:text-white" href="/viagens">
              Viagens
            </Link>
            <Link className="transition hover:text-white" href="/#faq">
              Dúvidas frequentes
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="font-bold">Contato</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            <a
              href={whatsappLinks.general}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <MessageCircle size={17} aria-hidden="true" />
              {siteConfig.whatsapp.display}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <Mail size={17} aria-hidden="true" />
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <AtSign size={17} aria-hidden="true" />
              @santoscocorretora
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 text-xs leading-5 text-white/60 sm:flex-row lg:px-8">
          <span>
            © {new Date().getFullYear()} {siteConfig.name} • CNPJ {siteConfig.cnpj}
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link className="transition hover:text-white" href="/privacidade">
              Política de Privacidade
            </Link>
            <Link className="transition hover:text-white" href="/termos">
              Termos de Uso
            </Link>
            <a
              className="transition hover:text-white"
              href="/.well-known/security.txt"
            >
              Segurança
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
