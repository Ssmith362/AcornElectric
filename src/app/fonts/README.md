# Fonts

Self-hosted so the build never needs network access to Google Fonts.
Brand fonts come from Eric Beisley's guide (Oct 2026).

- `luckiest-guy-400.woff2`: PRIMARY / display headings (Luckiest Guy Regular, latin). Apache 2.0, see `LICENSE-luckiest-guy-apache-2.0.txt`. Fontsource.
- `montserrat-variable.woff2`: SECONDARY / body (Montserrat, latin, wght 100-900). SIL OFL 1.1, see `OFL.txt`. Fontsource.
  **Stand-in for Modica SemiBold**, the secondary face in Eric's guide. Modica is a licensed
  face; ask Eric for the web licence/file, then swap this file and the `montserrat`
  `localFont` call in `src/app/layout.tsx`.
- `geist-mono-variable.woff2`: small technical labels only (Geist Mono). OFL.

Luckiest Guy has a single weight (400). `font-synthesis` is off so it never fakes bold.
`bricolage-grotesque-variable.woff2` and `geist-variable.woff2` are no longer used and can be deleted.
