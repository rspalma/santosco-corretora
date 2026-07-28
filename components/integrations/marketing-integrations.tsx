"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

type ConsentStatus = "accepted" | "rejected" | null;

const consentKey = "santosco-marketing-consent";

export function MarketingIntegrations() {
  const [consent, setConsent] = useState<ConsentStatus>(null);

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const hasOptionalTracking = Boolean(gtmId || gaId || metaPixelId || clarityId);

 useEffect(() => {
  if (!hasOptionalTracking) return;

  const timer = window.setTimeout(() => {
    const stored = window.localStorage.getItem(consentKey);

    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
    }
  }, 0);

  return () => {
    window.clearTimeout(timer);
  };
}, [hasOptionalTracking]);
  if (!hasOptionalTracking) return null;

  function saveConsent(status: Exclude<ConsentStatus, null>) {
    window.localStorage.setItem(consentKey, status);
    setConsent(status);
  }

  return (
    <>
      {consent === "accepted" && (
        <>
          {gtmId && (
            <Script id="google-tag-manager" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
            </Script>
          )}

          {gaId && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
              </Script>
            </>
          )}

          {metaPixelId && (
            <Script id="meta-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
            </Script>
          )}

          {clarityId && (
            <Script id="microsoft-clarity" strategy="afterInteractive">
              {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script','${clarityId}');`}
            </Script>
          )}
        </>
      )}

      {consent !== null && (
        <button
          type="button"
          onClick={() => {
            window.localStorage.removeItem(consentKey);
            setConsent(null);
          }}
          className="fixed bottom-4 left-4 z-[65] rounded-full border border-navy/15 bg-white px-4 py-2 text-xs font-bold text-navy shadow-lg transition hover:border-gold/60"
        >
          Preferências de cookies
        </button>
      )}

      {consent === null && (
        <aside
          aria-label="Preferências de cookies"
          className="fixed bottom-4 left-4 right-4 z-[70] mx-auto max-w-3xl rounded-3xl border border-white/15 bg-navy p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,.35)] sm:p-6"
        >
          <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 className="font-serif text-xl">Sua privacidade importa.</h2>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Cookies opcionais ajudam a medir acessos e melhorar campanhas. Você pode aceitar ou continuar apenas com os recursos essenciais. Consulte a{" "}
                <Link href="/privacidade" className="font-bold text-gold underline">
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:min-w-44">
              <button
                type="button"
                onClick={() => saveConsent("accepted")}
                className="rounded-full bg-gold px-5 py-3 text-sm font-extrabold text-navy transition hover:bg-gold-light"
              >
                Aceitar opcionais
              </button>
              <button
                type="button"
                onClick={() => saveConsent("rejected")}
                className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Somente essenciais
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
