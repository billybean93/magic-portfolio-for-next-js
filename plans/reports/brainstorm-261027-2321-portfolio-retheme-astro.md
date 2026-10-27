# Brainstorm: Portfolio Re-theme + Astro Rebuild

Date: 2026-10-27 · Client: Nguyen Phan Hong Ngoc · Repo: magic-portfolio-for-next-js

## Problem

The site is clean but has no hierarchy. A recruiter sees nothing that stands out.

- Project thumbnails are placeholder SVGs (`public/images/projects/ngoc/*.svg`): a navy rectangle inside a navy rectangle with a title. They are slide 1 of every carousel, and the real work is hidden on slide 2 and later.
- The strongest proof (US$24M Series A, US$60M pre-money, 10 deals sourced, 8 portfolio cos tracked, 2× national finalist) sits in small gray bullet text.
- The hero headline is generic, with no name, photo or numbers. The CV link is a faint tertiary link that points to an old `.docx`.
- "Recruiter Snapshot" is 3 identical gray cards: the weakest spot on the page holds the most important content.
- About page noise: a placeholder image used as experience imagery, the raw `Asia/Ho_Chi_Minh` string, a clock.
- Root cause: a designer-portfolio template (image-led) filled with finance content that has no imagery.

## Decisions (agreed)

| Topic | Decision |
|---|---|
| Direction | C: full re-theme |
| Stack | Astro rebuild (drop Next + Once UI) |
| Look | Chart-native (The Economist / Our World in Data): clean ground, one saturated signal color, charts and big numbers as heroes |
| Thumbnails | Data-viz covers built from her real numbers |
| Theme | Light + dark toggle |
| Positioning | Finance generalist (investment + corporate finance) with a commercial/stakeholder edge. VC proof supports, not defines. **Client to confirm.** |

## Evaluated approaches

| | A. Surface evidence (Once UI) | B. A + deal tombstones | C. Full re-theme ✅ |
|---|---|---|---|
| Effort | ~1d | ~2d | ~4–5d |
| Pop | med-high | high | high, if content-driven |
| Risk | low | tombstones may imply she led deals | big redesign |

Stack options for C:
- **Astro ✅**: UI gets rewritten anyway, so the extra cost of migrating is small. Static output, ~0 JS by default, best live performance. mdx and TS data port directly.
- Next without Once UI: no migration, but keeps a heavier runtime for 4 static routes.
- Re-skin Once UI: cheapest, but the template look persists. Rejected.

## Why Astro now (reversal of the earlier advice)

Earlier advice was "don't migrate just for speed": the slowness was assets (5.2MB SVG avatar, PNG previews), now fixed. Direction C rewrites every component, so the migration cost is mostly paid already. Only 4 live routes (`/`, `/about`, `/work`, `/work/[slug]`). Blog and gallery are off and get dropped.

## Data-viz covers: feasibility (verified)

Workbooks hold real chart data (checked sheet names with openpyxl):

| Project | Chart | Source |
|---|---|---|
| Financial Modeling | FPT valuation football field (FCFE vs peer multiples vs market price) | `fpt-corp-valuation-2025.xlsx` → `FCFE model`, `Peer Val` |
| Industry Research | Edtech TAM + growth bars | `edtech-research-calculation.xlsx` → `TAM`, `Growth` |
| Competition | Dot grid: 250 teams / 235 teams, her team highlighted as finalist | CV facts |
| Academic Reports | Shrimp vs silver price line 1994–2020 (or FRT DuPont) | PDF / `frt-valuation-model-2023.xlsx` → `ROE Dupont`. **Extraction TBD** |

Rules:
- Every number traced to a source file. Nothing invented.
- Static inline SVG, no runtime chart library.
- Colors via CSS custom properties / `currentColor`, so **one SVG serves both themes**. This removes the "2× assets" cost of dark mode.

## Recommended architecture

- Astro 5 + `@astrojs/mdx`, static output.
- Content collection `work` (port the 4 mdx files + frontmatter schema with zod).
- `documents.ts` + profile content → `src/data/*.ts` (plain data, no JSX).
- Hand-written CSS with OKLCH tokens on `:root` + `[data-theme="dark"]`. No UI framework.
- Theme toggle: tiny inline script (prefers-color-scheme + localStorage) to avoid a flash on load.
- Images through `astro:assets`. Remove the carousel: a cover chart + a grid of document thumbnails replaces it.
- OG: static image per page (drop `/api/og/*`, RSS, sitemap via `@astrojs/sitemap`).
- Keep URL parity: `/about`, `/work`, `/work/{slug}`, `/files/**` (links already shared on LinkedIn).

## Page structure (draft)

- **Home hero**: name + a concrete positioning line + photo + a proof strip (3–4 big real numbers) + CV PDF as the primary button.
- **Work**: 4 projects, each led by its data-viz cover, then a short "what I did" and deliverables.
- **About**: experience with numbers emphasized (YDA Concept added), education, competitions section, skills (client copy), languages incl. IELTS 7.0.
- Drop: Recruiter Snapshot cards, clock, timezone string, placeholder covers, newsletter.

## Content dependencies (from client)

- New About + Communication copy (received).
- New CV PDF → `/files/resume/` and replace the `.docx` link.
- Add YDA Concept role and the extra CV bullets (TNB, IQI), plus a Competition section.
- Confirm positioning line.
- Fix `linkedIn: ".../TODO-update-linkedin"` in all 4 work mdx files.
- Keep phone + reference contact OFF the site unless the client asks.

## Risks

- Data accuracy on covers: misreading a workbook damages credibility with finance recruiters. Mitigation: a source-cell note per chart and a client sign-off.
- Font/color choice drifting into finance clichés (navy + gold, Bloomberg-terminal dark). Pick via impeccable brand procedure.
- Huge PDFs (56MB RRC certificate, 35MB RBAC finale): not page weight, but bad UX when opened. Compress separately.
- Deploy target changes from a Next build to static Astro output. Check the host config (Vercel handles both).

## Success criteria

- 7-second test at 1280×800 and 390×844: name, target role, ≥3 proof numbers and the CV button visible above the fold.
- Lighthouse mobile performance ≥95, LCP <1.5s, total JS <10KB (theme toggle only).
- WCAG AA contrast in both themes, including chart labels.
- No placeholder imagery anywhere.

## Next steps

1. Client confirms positioning line.
2. Extract chart data from workbooks; client signs off on the numbers.
3. Design pass (impeccable): fonts, palette, hero comp, cover template.
4. Astro scaffold + port content + build pages.
5. QA (both themes, breakpoints, Lighthouse) → deploy.

## Unresolved questions

- Hosting platform/deploy config for the Astro build?
- Exact positioning line, pending client confirmation.
- Academic Reports cover: which dataset (shrimp/silver PDF vs FRT DuPont)?
- Keep the 16MB `proj-studio-model.xlsx` download as is, or compress or host externally?
