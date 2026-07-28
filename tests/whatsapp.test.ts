import { describe, expect, it } from "vitest";

import { siteConfig } from "@/lib/site-config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

describe("buildWhatsAppUrl", () => {
  it("gera uma URL segura com a mensagem codificada", () => {
    const url = buildWhatsAppUrl("Olá, preciso de uma cotação.");

    expect(url).toBe(
      `https://wa.me/${siteConfig.whatsapp.number}?text=Ol%C3%A1%2C%20preciso%20de%20uma%20cota%C3%A7%C3%A3o.`,
    );
  });

  it("remove espaços externos da mensagem", () => {
    const url = buildWhatsAppUrl("  Seguro Viagem  ");

    expect(url).toContain("text=Seguro%20Viagem");
  });

  it("retorna o canal sem query quando a mensagem está vazia", () => {
    expect(buildWhatsAppUrl("   ")).toBe(
      `https://wa.me/${siteConfig.whatsapp.number}`,
    );
  });
});
