import type { MetadataRoute } from "next";

import { insuranceProducts } from "@/data/insurance-products";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const generatedAt = new Date();
  const productEntries: MetadataRoute.Sitemap = insuranceProducts.map(
    (product) => ({
      url: `${siteConfig.url}/seguros/${product.slug}`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.75,
    }),
  );

  return [
    {
      url: siteConfig.url,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 1,
      videos: [
        {
          title: "Santos Co. Corretora — proteção sob medida",
          thumbnail_loc: `${siteConfig.url}/videos/institucional-poster.webp`,
          description:
            "Vídeo institucional da Santos Co. Corretora de Seguros.",
          content_loc: `${siteConfig.url}/videos/institucional-santos-co.mp4`,
          duration: 30,
          family_friendly: "yes",
        },
      ],
    },
    {
      url: `${siteConfig.url}/seguros`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/viagens`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...productEntries,
    {
      url: `${siteConfig.url}/privacidade`,
      lastModified: generatedAt,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/termos`,
      lastModified: generatedAt,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
