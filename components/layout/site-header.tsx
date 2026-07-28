import Link from "next/link";

import { mainNavigation } from "@/data/navigation";

import { MobileNavigation } from "./mobile-navigation";
import { BrandLogo } from "../ui/brand-logo";

type SiteHeaderProps = {
  activePath?: string;
  ctaHref: string;
  ctaLabel?: string;
};

export function SiteHeader({
  activePath,
  ctaHref,
  ctaLabel = "Solicitar cotação",
}: SiteHeaderProps) {
  const isExternalCta = ctaHref.startsWith("http");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy text-white shadow-[0_10px_40px_rgba(0,0,0,.12)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <BrandLogo priority />

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 text-sm font-semibold text-white/75 lg:flex"
        >
          {mainNavigation.map((item) => {
            const basePath = item.href.split("#")[0] || "/";
            const active =
              activePath !== undefined &&
              basePath !== "/" &&
              activePath.startsWith(basePath);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md py-2 transition hover:text-white ${active ? "text-gold" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <a
          href={ctaHref}
          target={isExternalCta ? "_blank" : undefined}
          rel={isExternalCta ? "noopener noreferrer" : undefined}
          className="hidden rounded-full bg-gold px-5 py-3 text-sm font-extrabold text-navy transition duration-300 hover:-translate-y-0.5 hover:bg-gold-light lg:inline-flex"
        >
          {ctaLabel}
        </a>

        <MobileNavigation ctaHref={ctaHref} ctaLabel={ctaLabel} />
      </div>
    </header>
  );
}
