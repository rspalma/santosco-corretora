"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

function isBusinessHours() {
  const parts = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const weekday = parts.find((part) => part.type === "weekday")?.value.toLowerCase();
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const businessDay = weekday ? !weekday.startsWith("sáb") && !weekday.startsWith("dom") : false;

  return businessDay && hour >= 8 && hour < 18;
}

export function WhatsAppFloatingButton({ href }: { href: string }) {
 const [online, setOnline] = useState(false);

useEffect(() => {
  const updateOnlineStatus = () => {
    setOnline(isBusinessHours());
  };

  const initialTimer = window.setTimeout(updateOnlineStatus, 0);
  const intervalTimer = window.setInterval(updateOnlineStatus, 60_000);

  return () => {
    window.clearTimeout(initialTimer);
    window.clearInterval(intervalTimer);
  };
}, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir conversa com a Santos Co. no WhatsApp"
      className="group fixed bottom-5 right-4 z-40 flex items-center gap-3 rounded-full bg-white p-2 pr-3 shadow-[0_18px_45px_rgba(0,0,0,.28)] transition duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 sm:bottom-6 sm:right-6"
    >
      <span className="grid h-13 w-13 place-items-center rounded-full bg-[#25D366] text-white sm:h-14 sm:w-14">
        <MessageCircle size={27} fill="currentColor" aria-hidden="true" />
      </span>
      <span className="hidden min-w-24 pr-1 text-left sm:block">
        <strong className="block text-sm text-navy">WhatsApp</strong>
        <span className="mt-0.5 flex items-center gap-1.5 text-xs font-bold text-slate-500">
          <span className={`h-2 w-2 rounded-full ${online ? "bg-emerald-500" : "bg-amber-500"}`} />
          {online ? "Online agora" : "Resposta rápida"}
        </span>
      </span>
    </a>
  );
}
