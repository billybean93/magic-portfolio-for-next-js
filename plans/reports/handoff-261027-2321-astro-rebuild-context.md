# Handoff: Context for Astro Rebuild

Companion to `brainstorm-261027-2321-portfolio-retheme-astro.md` (decisions). This file = everything else the next session needs: sources, assets, client asks, critique.

**Old repo (read-only source):** `~/Documents/web clients/magic-portfolio-for-next-js`. Copy from it, never edit it. It stays live until the Astro site ships.

Screenshots of the current site: `handoff-screens/` (home hero + snapshot, work project card, about page).

## 1. Content sources (old repo)

| What | File | Notes |
|---|---|---|
| Person, home hero, about (intro, experience, education, skills) | `src/resources/content.tsx` | JSX fragments. Convert to plain strings/markdown |
| Downloadable docs list (21 items, category, type, size) | `src/resources/documents.ts` | Port as is → `src/data/documents.ts` |
| 4 work case studies | `src/app/work/projects/{industry-research,financial-modeling,academic-reports,competition-portfolio}.mdx` | Frontmatter: title, summary, highlights[], atAGlance[], images[], category, link, deliverables[]. ~38 body lines each |
| Home "Recruiter Snapshot" copy | `src/app/page.tsx:118-160` | Hardcoded. Being dropped, but the copy can be reused |
| Work page (doc grid by category) | `src/app/work/page.tsx` | Preview path derived: `/images/previews/{folder}/{pdf-basename}.jpg` |
| Nav/routes | `src/resources/once-ui.config.ts` | Live: `/`, `/about`, `/work`, `/work/[slug]`. Blog, gallery off → drop |

Person facts: Nguyen Phan Hong Ngoc · nphongngocc@gmail.com · LinkedIn `https://www.linkedin.com/in/ngoc-dino-nguyen/` · Ho Chi Minh City · English (IELTS 7.0), Vietnamese, Chinese (elementary).

## 2. Client change requests (verbatim)

About:
> Aspiring early-career finance professional with practical exposure to investment and corporate finance in different sectors. I bring a balance of data-driven analysis and practical business judgment, combining quantitative insights with an understanding of the human motivations, incentives, and real-world dynamics that drive business decisions.

Skills → Communication:
> Clear, audience-aware communication for commercial discussions and stakeholder-ready presentations, translating complex information into practical, business-relevant insights.

## 3. New CV: source of truth for experience

File: `CV - Nguyen Phan Hong Ngoc.pdf` (old repo root, untracked). Use it as the download (replaces `public/files/resume/nguyen-phan-hong-ngoc-resume.docx`). Rename to `/files/resume/nguyen-phan-hong-ngoc-cv.pdf`.

Differences between the CV and the current site (the site must follow the CV):
- **New role, first entry:** Executive Assistant & Partnership Support, YDA Concept, Full-time, Mar 2026 – Present.
  - Provide executive and personal assistance, managing daily operations, project coordination, and communication
  - Contribute to business development and sales by identifying prospects, conducting outreach, preparing commercial proposals, and managing follow-ups throughout the sales pipeline
- **TNB Aura** (Investment Analyst Intern, Jun 2024 – Jan 2025): add tracking of 8 portfolio cos (fintech, logistics, health tech, agritech, F&B) with quarterly fund updates, and exit analysis for POS + P2P lending portfolio cos (Exit Comparable framework). Keep: 10 deals sourced and pitched to Senior; US$24M Series A, agritech, US$60M pre-money.
- **IQI PA to Partner & Director of M&A** (Apr 2022 – Jun 2024): 4 bullets in the CV vs 2 on the site (16 property proposals; admin with banks and legal advisors; deal prep with sales; project progress tracking).
- **IQI Consultant** (Mar 2022 – Mar 2023): add lead generation (cold outreach, sales gallery) and end-to-end consulting. Keep: 3 deals, 7.7B VND.
- **Competition Achievements** (new About section):
  - Finalist, RMIT Research Challenge 2022: **250 teams** of 4 nationwide. DCF + peer valuation investment recommendation.
  - Finalist, RMIT Business Analytics Champion 2023: **235 teams** of 4 nationwide. BI analysis of Pizza Hut, product and sales-marketing recommendations.
  - ⚠ `competition-portfolio.mdx` says "200+ teams". Update it to the CV numbers.
- **Do NOT publish:** phone number, reference contact (Mr. Duc Truong). Both are on the CV only.

## 4. Proof numbers (hero / proof strip candidates)

All from the CV. Use wording that is true: she *supported* the raise and did not lead it.

| Number | Fact |
|---|---|
| US$24M | Series A equity raise supported (agritech), valuation models + diligence reports |
| US$60M | pre-money valuation of that raise |
| 10 | potential deals sourced + pitched |
| 8 | portfolio companies tracked, 5 sectors |
| 16 | property investment proposals prepared |
| 7.7B VND | transaction value closed, 3 deals |
| Finalist ×2 | of 250 and 235 teams nationally |

## 5. Asset inventory (old repo `public/`)

Keep / port:
- `images/branding/avatar-ngoc.jpeg`: **2560×1706 landscape** photo (speaker on stage, mic). The only real photo of her. Hero candidate; crop it, don't circle-mask it.
- `images/previews/**/*.jpg`: 17 first-page previews of PDFs (converted from PNG this session, ~1.25MB total). Use them as document thumbnails.
- `files/**`: 21 downloads, ~170MB total. Keep the URL paths identical (`/files/{category}/{name}`); they may already be shared.

Heavy downloads (open-only, not page weight, but compress before shipping):
- `competition/rrc-2022-certificate.pdf` 55.9MB (a 1-page certificate!), `r-boolean-aces-r3-rbac2023-finale.pdf` 34.9MB, `r-boolean-aces-r2-rbac2023.pdf` 12.5MB, `academic-reports/vietnam-property-report-2023.pdf` 10.5MB, `financial-modeling/proj-studio-model.xlsx` 15.9MB.

Do NOT port:
- `images/projects/ngoc/*.{svg,png}`: placeholder covers (navy box + title). Being replaced by data-viz covers.
- `images/gallery/*`, `images/projects/project-01/*`, `images/avatar.{jpg,jpeg}`, `images/og/home.jpg`: Magic Portfolio template leftovers, not her content.
- `images/og/ngoc-portfolio-cover.{png,svg}`: generic OG. Regenerate in the new style.
- `trademarks/*`: template wordmark.

## 6. Data-viz cover sources

See the brainstorm report, table "Data-viz covers". Workbooks (openpyxl reads them; run Python with `-I`):
- `files/financial-modeling/fpt-corp-valuation-2025.xlsx`: sheets `FCFE model`, `Peer Val`, `Revenue breakdown`, `Key metrics`
- `files/financial-modeling/frt-valuation-model-2023.xlsx`: `ROE Dupont`, `Peer Valuation`, `Model `, `CAPM`
- `files/industry-research/edtech-research-calculation.xlsx`: `TAM`, `Growth`, `Investment opportunity`
- Competition cover: dot grid from the CV team counts (250 / 235).

## 7. Current style (what NOT to carry over)

- Stack: Next 16 + Once UI (`@once-ui-system/core`) + Sass. Font: Geist everywhere (heading/body/label) + Geist Mono.
- Theme: brand `cyan`, accent `red`, neutral `gray`, border `playful` (very rounded), surface `translucent`, cyan radial-gradient page background.
- Layout: centered single column, `RevealFx` fade-ins on every block, carousel per project.

Critique (why it fails a recruiter), see the screenshots:
1. Hero is a generic tagline with no name, numbers or photo. CV link is a faint tertiary link.
2. Proof numbers buried in gray bullets. Same visual weight everywhere, so no hierarchy.
3. "Recruiter Snapshot" = 3 identical small gray cards: the weakest spot on the page holds the most important content.
4. Carousel slide 1 = placeholder cover. Real work hidden behind arrows.
5. Work card: "atAGlance" chips ("Focus: Valuation Rigor") are filler. Highlights are generic ("Strengthened recommendation writing...").
6. About: placeholder image used as experience imagery, raw `Asia/Ho_Chi_Minh` string shown as location, live clock in the header, language pills.

## 8. Lessons from this session

- Live-site slowness was assets, not the framework: a 5.2MB auto-traced SVG avatar + 400–850KB PNG previews preloaded raw by the carousel. Keep all images optimized via `astro:assets`. No SVG-traced photos.
- `npm i` + sharp: don't Ctrl+C during the sharp install script, or npm rolls back the whole install.

## 9. Uncommitted work in old repo (at handoff time)

- Perf fixes: avatar swap, PNG→JPG previews, deleted template video + unused jpeg.
- This report, the brainstorm report, `handoff-screens/`.
