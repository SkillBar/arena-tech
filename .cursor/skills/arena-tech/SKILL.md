---
name: arena-tech
description: >-
  Arena Tech portfolio conventions: brand voice, WebP assets, case study
  layouts, and GitHub repo SkillBar/arena-tech. Use when editing this portfolio,
  adding case studies, or preparing Arena Tech deliverables.
---

# Arena Tech Portfolio

## Brand

- Team name: **Arena Tech** (not a personal portfolio)
- Hero voice: collective (`we are`, team-focused CTA)
- Case study covers (index): inner safe area **560×405 px** @1x, **1120×810 px** @2x, ratio **560:405**

## Images

- Store raster assets as **WebP** under `public/assets/`
- Do not commit PNG/JPEG unless converting immediately
- Run `pnpm images:webp` after adding new raster assets (requires `sharp`)
- Reference `.webp` paths in `data/`, components, and CSS `url()`

## Case studies

- Metadata: `data/case-studies.ts`
- Variants: `musicgen-presentation`, `aitrade-presentation`, default detail
- External links: `externalUrl` on case + `getCaseStudyHref()`

## Key files

| Area | File |
|------|------|
| Home | `components/HomePage.tsx`, `Hero.tsx`, `CTA.tsx` |
| Motion | `components/PageMotion.tsx`, `heroEntranceMotion.ts` |
| AI Trade | `components/AiTradeCaseStudy.tsx` |
| MusicGen | `components/MusicGenCaseStudy.tsx` |
| Styles | `app/globals.css` |

## Repository

- GitHub: `SkillBar/arena-tech`
- Package name: `arena-tech`
