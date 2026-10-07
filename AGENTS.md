# AGENTS.md

French-language static site for "Cours Privé Sainte-Thérèse" (Astro 7 + Tailwind CSS v4). npm project (`package-lock.json`), Node >= 22.12.

## Commands

- Dev server: **launched by the user in their own console** (`npm run dev`). Agents must NOT start it (background or otherwise) — verify with `npm run build` instead, or ask the user to start it if a live check is needed. Exception: if an orphan background server exists (`.astro/dev.json` present), reclaim or stop it with `npx astro dev stop` (also `astro dev status` / `astro dev logs`).
- `npm run build` — build to `dist/`. No lint, test, or formatter exists; this is the local verification to run before considering a change done.
- CI: `.github/workflows/deploy.yml` runs `npm ci && npm run build` on every push, and deploys `dist/` to GitHub Pages on `main` only (GitHub Pages source must be set to "GitHub Actions" in the repo settings). Update that file if build commands change.
- Do **not** run `astro check`: `@astrojs/check` is not installed and the command prompts interactively to install it, so it hangs in non-interactive sessions.

## Architecture (things filenames don't tell you)

- Every `.astro` page wraps its content in `src/layouts/Layout.astro`, which renders the global `Header`/`Footer` and sets `lang="fr"` plus the `<title>` pattern `{title} | Cours Privé Sainte-Thérèse`. Pages pass `title`/`description` props; they don't write their own `<head>` (Markdown pages go through `PageLayout.astro` instead, see below).
- Site menus have a single source of truth: `src/config/navigation.ts`, consumed by both `DesktopNavigation.astro` and `MobileNavigation.astro`. It mirrors the sitemap: section items link to their `index` page, `children` entries to sub-pages.
- Content pages are plain Markdown files in `src/pages/**` with frontmatter `layout: ../../layouts/PageLayout.astro` (path relative to the file), plus `title` and `description`. The layout renders the `h1` from `title`, so Markdown bodies start at `##`. `PageLayout.astro` wraps `Layout.astro` and renders body content inside `.md-content` (styles in `@layer components` in `src/styles/global.css`).
- Styling: Tailwind v4 with no config file — design tokens live in the `@theme` block of `src/styles/global.css` (use utilities like `bg-brand-primary`, `text-brand-accent`), and reusable classes (`.container-site`, `.heading-section`, `.button-primary`, `.button-secondary`) are defined via `@apply` in `@layer components` there. Reuse them instead of duplicating styles. Fonts are self-hosted Fontsource imports in the same file.
- Interactive behavior (mobile menu toggling `#mobile-navigation`, `aria-hidden`) is plain inline `<script>` in the `.astro` components — no framework components are in use.
- Styling is 100% Tailwind: don't add UI component libraries or CSS preprocessors (WebCore UI/Sass were tried and removed).

## Documentation

Full docs: https://docs.astro.build — consult the guides on [routing](https://docs.astro.build/en/guides/routing/), [Astro components](https://docs.astro.build/en/basics/astro-components/), [styling](https://docs.astro.build/en/guides/styling/), and [i18n](https://docs.astro.build/en/guides/internationalization/) before related changes.
