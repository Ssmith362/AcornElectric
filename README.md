# Acorn Electric: website

Marketing and lead-generation site for Acorn Electric, a residential electrical
contractor in Spokane, Washington. Built by Flourish Now Digital.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Node deploy.

```bash
npm install
cp .env.example .env.local   # then fill in what you have
npm run dev                  # http://localhost:3000
npm run check                # case check + typecheck + lint + production build
npm run start                # serve the production build
npm run check:site -- http://localhost:3000   # crawl + SEO/a11y checks
```

- **Start here:** `docs/handoff.md` (architecture, launch blockers, checklist)
- Facts to confirm with Acorn: `docs/client-facts-checklist.md`
- SEO research and 12-month roadmap: `docs/seo-strategy.md`
- Swap in real photos: `src/content/images.ts`
- Open/close a job: `src/content/careers.ts`
- Add reviews: `src/content/reviews.ts`
