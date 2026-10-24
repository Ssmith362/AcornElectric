/**
 * PLAIN JAVASCRIPT ON PURPOSE. Do not convert to next.config.ts.
 * (Same reason as the Everclean/EREP builds: some shared hosts ship a glibc too
 * old for Next's SWC binary, which a TypeScript config needs to compile.)
 *
 * DEPLOY TARGET: a Node.js app (Vercel, or Hostinger Business/Cloud Node).
 *   npm run build  ->  npm run start
 * There is no static-export route for this site: the contact and careers
 * forms need the /api routes, which only run on a Node server.
 */

/**
 * 301s from the current site (callacornelectric.com, a Wix site at the time of
 * writing). ONLY URLs confirmed to exist are listed. Before launch, export the
 * full list of indexed URLs (Search Console → Pages, or a crawl) and map every
 * one here. See docs/handoff.md → "Redirects".
 *
 * @type {{ from: string, to: string }[]}
 */
export const legacyRedirects = [
  { from: "/about", to: "/" },
  { from: "/book-online", to: "/contact" },
  { from: "/services/electrical-service-upgrade", to: "/services/electrical-panel-upgrades#service-upgrades" },
  { from: "/services/whole-home-surge-protection", to: "/services/electrical-inspections#surge-protection" },
  { from: "/services/grounding-and-bonding-upgrades", to: "/services/electrical-inspections#grounding-and-bonding" },
  { from: "/services/real-estate-electrical-repairs", to: "/services/electrical-repair#home-sale-repairs" },
  { from: "/services/recessed-lighting", to: "/services/lighting-installation#recessed-lighting" },
  { from: "/services/exterior-lighting", to: "/services/lighting-installation#exterior-lighting" },
  { from: "/services/attic-fan-installation", to: "/services/bathroom-fan-replacement#attic-ventilation" },
];

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,

  async redirects() {
    return legacyRedirects.flatMap(({ from, to }) => [
      { source: from, destination: to, statusCode: 301 },
      { source: `${from}/`, destination: to, statusCode: 301 },
    ]);
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff2)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
