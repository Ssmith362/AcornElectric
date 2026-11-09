# Fonts

Self-hosted so the build never needs network access to Google Fonts.

- `barlow-semi-condensed-latin-{500,600,700}-normal.woff2`: headings (Barlow Semi Condensed, latin). SIL OFL 1.1, see `OFL-barlow-semi-condensed.txt`. Fontsource.
- `inter-variable.woff2`: body copy, labels and buttons (Inter, latin, wght 100-900). SIL OFL 1.1, see `OFL-inter.txt`. Fontsource.

Both are loaded in `src/app/layout.tsx` and wired to `--font-display` / `--font-sans` in `src/app/globals.css`.

The logo keeps its own lettering (Luckiest Guy style). Eric approved using different
website fonts from the logo in Nov 2026, so the brand-guide faces (Luckiest Guy, Modica)
are no longer loaded. `font-synthesis` is off for headings so Barlow never fakes a weight
it doesn't ship.
