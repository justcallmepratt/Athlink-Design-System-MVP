# Athlink — Recruiter UI kit

The recruiter side of the platform. College coaches and recruiters use this surface to discover, evaluate, and contact international high-school athletes.

**Source of truth:** `src/components/RecruiterApp.tsx` in the [Athllinkmvp-DEMO](https://github.com/justcallmepratt/Athllinkmvp-DEMO) repo (the full file is ~3 700 lines and covers 12 tabs).

## What's in this kit

| File | Provides |
| --- | --- |
| `index.html` | Click-thru prototype. Sidebar + Dashboard + Discover swipe + Saved + Messages + athlete detail sheet. |
| `components.jsx` | `Sidebar`, `TopBar`, `StatTile`, `Badge`, `AthleteCard`, `DistRow`, `SwipeCard`, `I` icon set. |
| `views.jsx` | `DashboardView`, `DiscoverView`, `SavedView`, `MessagesView`, `ProfileSheet`. |
| `styles.css` | All `.rk-*` classes — built on tokens from `colors_and_type.css`. |

## Coverage
- ✅ Dashboard with KPI tiles, country & sport distribution bars, recent-athletes grid.
- ✅ Discover (Tinder-style swipe with Pass / AI / Match actions).
- ✅ Saved athletes list with un-save.
- ✅ Messages thread list (unread state, bilingual previews).
- ✅ Athlete detail sheet (photo, stats, AI insight, Schedule Zoom CTA).
- ⚠️ Sponsors / Federations / NIL / Camps / Contracts / Compare / AI Reports tabs are stubbed in `App` — they follow the same card + table patterns and are documented in the README.

## Visual notes
- Sidebar uses solid `#2196F3` for active, white text + glyph.
- Athlete card photo always carries three overlay badges (top-left match %, top-right GPA, bottom-left country) and a save heart bottom-right.
- AI accents (purple `#8B5CF6`) appear only on AI Score badges and the Brain icon — never on regular UI chrome.
- The Discover swipe action button uses the brand gradient on Match — the only place gradients show up on a clickable surface.
