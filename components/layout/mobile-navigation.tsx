"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { mainNavigation } from "@/data/navigation";

type MobileNavigationProps = {
  ctaHref: string;
  ctaLabel: string;
};

export function MobileNavigation({
  ctaHref,
  ctaLabel,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const isExternalCta = ctaHref.startsWith("http");
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={close}
            className="fixed inset-0 top-20 z-40 cursor-default bg-[#020b12]/60 backdrop-blur-sm"
          />
          <nav
            id={panelId}
            aria-label="Navegação móvel"
            className="absolute inset-x-0 top-20 z-50 border-t border-white/10 bg-navy px-5 py-6 shadow-2xl"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              <Link
                href="/"
                onClick={close}
                aria-current={pathname === "/" ? "page" : undefined}
                className="rounded-xl px-4 py-3 font-semibold text-white/85 transition hover:bg-white/5 hover:text-white"
              >
                Início
              </Link>
              {mainNavigation.map((item) => {
                const basePath = item.href.split("#")[0] || "/";
                const active =
                  basePath !== "/" && pathname.startsWith(basePath);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-xl px-4 py-3 font-semibold transition hover:bg-white/5 hover:text-white ${active ? "text-gold" : "text-white/85"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href={ctaHref}
                target={isExternalCta ? "_blank" : undefined}
                rel={isExternalCta ? "noopener noreferrer" : undefined}
                onClick={close}
                className="mt-3 rounded-full bg-gold px-5 py-3.5 text-center font-extrabold text-navy transition hover:bg-gold-light"
              >
                {ctaLabel}
              </a>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
