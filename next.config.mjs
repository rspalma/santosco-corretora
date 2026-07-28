const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";
const isStaticExport = process.env.STATIC_EXPORT === "true";

const hasGtm = Boolean(process.env.NEXT_PUBLIC_GTM_ID);
const hasGoogleTracking = Boolean(
  hasGtm || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
);
const hasMetaTracking = Boolean(
  hasGtm || process.env.NEXT_PUBLIC_META_PIXEL_ID,
);
const hasClarityTracking = Boolean(
  hasGtm || process.env.NEXT_PUBLIC_CLARITY_ID,
);

const scriptSources = [
  "'self'",
  "'unsafe-inline'",
  ...(isDevelopment ? ["'unsafe-eval'"] : []),
  ...(hasGoogleTracking ? ["https://www.googletagmanager.com"] : []),
  ...(hasMetaTracking ? ["https://connect.facebook.net"] : []),
  ...(hasClarityTracking
    ? ["https://www.clarity.ms", "https://scripts.clarity.ms"]
    : []),
].join(" ");

const connectSources = [
  "'self'",
  "https://formsubmit.co",
  ...(hasGoogleTracking
    ? [
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://*.google-analytics.com",
        "https://analytics.google.com",
      ]
    : []),
  ...(hasMetaTracking
    ? ["https://connect.facebook.net", "https://www.facebook.com"]
    : []),
  ...(hasClarityTracking
    ? ["https://*.clarity.ms", "https://c.bing.com"]
    : []),
].join(" ");

const imageSources = [
  "'self'",
  "data:",
  "blob:",
  ...(hasGoogleTracking ? ["https://www.google-analytics.com"] : []),
  ...(hasMetaTracking ? ["https://www.facebook.com"] : []),
  ...(hasClarityTracking
    ? ["https://*.clarity.ms", "https://c.bing.com"]
    : []),
].join(" ");

const frameSources = hasGoogleTracking
  ? "https://www.googletagmanager.com"
  : "'none'";

const contentSecurityPolicy = `
  default-src 'self';
  script-src ${scriptSources};
  style-src 'self' 'unsafe-inline';
  img-src ${imageSources};
  font-src 'self' data:;
  connect-src ${connectSources};
  media-src 'self' blob:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-src ${frameSources};
  frame-ancestors 'none';
  manifest-src 'self';
  worker-src 'self' blob:;
  ${isProduction ? "upgrade-insecure-requests;" : ""}
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "0" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Origin-Agent-Cluster", value: "?1" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  ...(isProduction
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
      ]
    : []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStaticExport ? { output: "export", trailingSlash: true } : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isStaticExport ? { unoptimized: true } : {}),
  },
  ...(!isStaticExport
    ? {
        async redirects() {
          return [
            {
              source: "/viagem",
              destination: "/viagens",
              permanent: true,
            },
          ];
        },
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: securityHeaders,
            },
            {
              source: "/videos/:path*",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=604800, stale-while-revalidate=86400",
                },
              ],
            },
            {
              source: "/images/:path*",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=604800, stale-while-revalidate=86400",
                },
              ],
            },
            {
              source: "/brand/:path*",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, max-age=604800, stale-while-revalidate=86400",
                },
              ],
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
