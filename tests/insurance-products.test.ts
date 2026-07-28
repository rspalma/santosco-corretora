import { describe, expect, it } from "vitest";

import { insuranceProducts } from "@/data/insurance-products";

describe("insuranceProducts", () => {
  it("mantém slugs únicos e válidos", () => {
    const slugs = insuranceProducts.map((product) => product.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => /^[a-z0-9-]+$/.test(slug))).toBe(true);
  });

  it("mantém conteúdo mínimo para páginas de produto", () => {
    for (const product of insuranceProducts) {
      expect(product.title.length).toBeGreaterThan(5);
      expect(product.description.length).toBeGreaterThan(40);
      expect(product.highlights.length).toBeGreaterThanOrEqual(3);
      expect(product.benefits.length).toBeGreaterThanOrEqual(3);
      expect(product.idealFor.length).toBeGreaterThanOrEqual(3);
    }
  });
});
