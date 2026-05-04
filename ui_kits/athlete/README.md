# Athlink — Athlete UI kit

The athlete-facing mobile app. Athletes build a profile, upload videos, view their AI scouting report, see matched recruiters, and message back.

**Source of truth:** `src/components/AthleteApp.tsx` in [Athllinkmvp-DEMO](https://github.com/justcallmepratt/Athllinkmvp-DEMO).

## What's in this kit
| File | Provides |
| --- | --- |
| `index.html` | Two-screen prototype — **Home / profile** + **AI Report** rendered side-by-side in iPhone frames. |
| `components.jsx` | `Phone`, `Header`, `BottomNav`, `ProfileHero`, `StatRow`, `VideoTile`, `AIScoreCard`. |
| `styles.css` | All `.ak-*` classes built on tokens in `colors_and_type.css`. |

## Coverage
- ✅ Profile hero (full-bleed athlete photo + gradient + verified check + chips for country/GPA/class).
- ✅ AI Score card (gradient ring, AI Verified pill).
- ✅ Match alert (gradient-tinted callout).
- ✅ Highlights video grid (16:10 thumbnails with play + duration).
- ✅ Combine metrics card (mono numerals).
- ✅ AI Report screen — performance bars, insight, projection.
- ⚠️ Onboarding, Payment, Messages, NIL marketplace tabs documented in code but not staged here. They reuse the same `ak-card`, `ak-chip`, `ak-bottom` patterns.
