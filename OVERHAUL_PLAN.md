# Athlink — UI Design Overhaul Plan

> **Status:** proposal · **Audience:** product + design + eng leads
> **Scope:** the recruiter desktop app, the athlete mobile app, and the shared design system documented in this project.
> **Source repo audited:** [`justcallmepratt/Athllinkmvp-DEMO`](https://github.com/justcallmepratt/Athllinkmvp-DEMO) (`main`, ~270 KB across two `App.tsx` files).

This document lays out what I learned auditing Athlink's current MVP and a prioritized plan to take it from "functional Figma-Make export" to a recruit-grade product the design team can defend in an investor demo. It's written so each item can be opened as its own GitHub issue.

---

## TL;DR — the seven biggest wins

| # | Theme | Pain today | What changes | Effort | Impact |
|---|---|---|---|---|---|
| 1 | **Density & rhythm** | Cards feel uniform. Dashboard reads like a settings page. | Introduce a **3-tier card system** (hero / standard / inline) with deliberate density. | M | High |
| 2 | **The "AI Verified" promise** | The AI score is the whole pitch but lives in a small purple pill. | Promote AI score to a **first-class hero unit** — score ring + radar + comp player + projection — visible on every athlete surface. | M | Very high |
| 3 | **Discover swipe** | Tinder clone with no decision support. Coaches need *signal*, not gamification. | Convert swipe into a **"Scout view"** — fullscreen video left, evaluation panel right, keyboard-driven (←/→/space/enter), with reasoning chips. | L | Very high |
| 4 | **Athlete card is a brochure** | All cards look identical regardless of fit. | **Smart variants:** "Top match" hero card with comp + projection, "Watch" standard card, "Reviewed" compact card. Match% drives layout, not just a badge. | M | High |
| 5 | **No data viz language** | Stats are big numbers without context — no benchmarks, no peer comparison. | **Comparative bars + percentile rails.** Every stat answers "vs what?" | M | High |
| 6 | **Brand gradient is wallpaper** | Used as backgrounds, hero panels, the logo, and AI pills — diluted. | **Reserve the gradient** for: logo, AI verification, and the single hero metric per screen. Demote everything else to solid blue. | S | Medium |
| 7 | **Mobile feels like a downsized desktop** | Athlete app uses the same card-list paradigm everywhere. | **Story-mode profile** — full-bleed hero video, swipe-up for stats, swipe-up again for AI, à la Strava activity feed. | L | High |

Total proposed scope: ~6–8 weeks for a 2-designer / 2-engineer team to ship the core overhaul; ~12 weeks if you also want the Story Mode and Scout View greenfield surfaces.

---

## How I'm grading the current product

I read the full `RecruiterApp.tsx` (158 KB) and `AthleteApp.tsx` (95 KB), plus onboarding, AI report, payment, and the shadcn primitives. I scored against five rubrics:

| Rubric | Score | One-line read |
|---|---|---|
| Brand cohesion | **6 / 10** | Logo + gradient are strong, but the rest of the UI is generic shadcn — could be any B2B SaaS. |
| Information hierarchy | **5 / 10** | Cards are too uniform; no clear "look here first." |
| Data fidelity | **4 / 10** | Big numbers, no comparison or benchmark. The product is a recruiting tool — stats need percentiles. |
| Mobile ergonomics | **6 / 10** | Bottom nav is fine, but the screens are dense card-stacks, not native-feeling. |
| Visual delight | **5 / 10** | Nothing is wrong; nothing is memorable. The Discover swipe is the only screen that has POV. |

The MVP gets you to a working demo. The overhaul makes it *worth showing.*

---

## P0 — System-level changes (week 1–2)

These are foundational and unblock everything else.

### P0.1 — Card hierarchy: three tiers, not one

**Today:** every card is `bg-white border border-gray-100 shadow-sm rounded-lg p-6`. Dashboard, athlete card, video tile — all identical chrome.

**Proposal:** introduce three explicit tiers wired into the design tokens.

| Tier | Use | Treatment |
|---|---|---|
| **Hero** | One per screen — the thing the user came for. | `rounded-2xl`, `shadow-lg`, gradient hairline (`bg-gradient-to-br from-blue/20 to-cyan/20 p-[1px]`), generous 32 px padding. |
| **Standard** | Repeating list items, KPI tiles. | Today's default. `rounded-lg`, `shadow-sm`. |
| **Inline** | Inside other cards (a stat row inside a profile card). | No border, no shadow, just `bg-gray-50` or transparent + 16 px padding. |

Add new tokens to `colors_and_type.css`:

```css
--card-hero-radius: 16px;
--card-hero-shadow: 0 12px 32px -8px rgba(15, 23, 42, 0.10), 0 4px 8px -2px rgba(15, 23, 42, 0.04);
--card-hero-border: linear-gradient(135deg, rgba(33,150,243,0.3), rgba(0,188,212,0.3));
```

**Impact:** instantly establishes "look here first." Estimated 1.5 days for a designer + 1 day for one engineer.

---

### P0.2 — Reclaim the brand gradient

**Today:** the gradient appears on the logo, AI pills, primary CTA hover, the Discover swipe match button, the gradient-text in section headers, and at least four hero panels. It's visual wallpaper.

**Proposal:** the gradient earns a place in three slots, full stop.

1. **Logo + wordmark** — always.
2. **AI Verified pill** — the only chrome element that uses it.
3. **The single most important number on the screen** — the "AI Score 95" ring, the "94% Match" headline, etc. *One* per screen.

Everything else — primary buttons, active nav, focus rings — uses solid `#2196F3`. The gradient becomes a reward, not a default.

**Impact:** the AI Verified pill goes from "yet another colored thing" to "the only colored thing — pay attention."

---

### P0.3 — Type scale rebalance

**Today:** Inter at all sizes. Big numbers and headlines feel undifferentiated.

**Proposal:**
- **Display headlines (`H1` page titles, hero numbers)** — Plus Jakarta Sans, weight 800, letter-spacing `-0.025em`. Already in `colors_and_type.css` — but underused. Wire it in to all `<h1>` and stat-number components.
- **Stat numerals** — JetBrains Mono with `font-feature-settings: 'tnum' 'lnum'`. Tabular alignment in stat tiles is currently broken (numbers shift when "234" sits next to "98").
- **Body** — keep Inter.
- **Add a 6th step:** `text-mega` (72px / Jakarta 800) for the AI Score on the report screen. Currently the score is rendered at 36px and gets visually crushed by the card chrome around it.

---

### P0.4 — Iconography pass

**Today:** Lucide is correctly used, but sizes are inconsistent (`w-4 h-4` and `w-5 h-5` interleaved without rule), and stroke weight reads thin on the dashboard at 16px.

**Proposal:**
- **3 sizes only:** 16 / 20 / 24 px. Map them to roles: 16 → inside chips/badges, 20 → inline with body text, 24 → header buttons + nav. Document in `iconography.html`.
- **Stroke 2 at 16/20, stroke 1.75 at 24** — keeps optical weight consistent.
- **Color rules** (already documented but enforce):
  - Inherits `currentColor` by default.
  - **Purple `#8B5CF6`** — AI/scoring icons only (`Brain`, `Sparkles`, `Scan`, `Zap`).
  - **Cyan `#00BCD4`** — verification icons only (`CheckCircle`, `Shield`, `BadgeCheck`).
  - **Brand blue** — never on icons unless the icon *is* the brand mark.

---

## P1 — Surface overhauls (week 2–5)

### P1.1 — Discover → "Scout View"

**Today:** Tinder-style swipe card. Athlete photo, name, stats, Pass / Match. Cute, but coaches don't make $200 K scholarship decisions on a swipe.

**Proposal:** rebuild Discover as a **fullscreen evaluation surface**:

```
┌──────────────────────────────────────────────┬──────────────────────────────┐
│                                              │  AI score · 95               │
│                                              │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░ Top 5%      │
│       FULL-BLEED HIGHLIGHT VIDEO             │                              │
│       (autoplay, mute, loop)                 │  Speed       ▓▓▓▓▓▓▓░  95    │
│       ▶  0:34 / 2:14                         │  Agility     ▓▓▓▓▓▓░░  88    │
│                                              │  Strength    ▓▓▓▓▓░░░  82    │
│       Tsubasa Brennan                        │  Awareness   ▓▓▓▓▓▓▓░  93    │
│       WR · Koshien Bowl HS · Japan           │                              │
│                                              │  COMP PLAYER                 │
│                                              │  Hines Ward (route style)    │
│                                              │                              │
│                                              │  PROJECTION                  │
│                                              │  D1 Power 5 · Top WR 2025   │
│                                              │                              │
│                                              │  ✓ Strong hands             │
│                                              │  ✓ Elite separation         │
│                                              │  △ Needs S&C work           │
└──────────────────────────────────────────────┴──────────────────────────────┘
   ← Pass    space Watchlist    enter Reach out    →
```

- **Keyboard-first.** Coaches scout 50+ athletes per session — swipe is slow, ←/→/space/enter is fast.
- **The right rail is the decision support.** AI score, percentile, comp player, projection, three reasoning chips. This is the differentiator.
- **The left is the proof.** Fullscreen video with scrubber, multiple angles toggle.
- **Bottom bar = action affordance.** Pass / Watchlist (replaces Match) / Reach out / Save.

This is the screen that justifies the AI claim. Right now the swipe undersells it.

**Effort:** L. ~2 weeks for one designer + one engineer including the keyboard handling, video scrubber, and percentile calculation against a peer cohort.

---

### P1.2 — Athlete card variants

**Today:** every card looks identical regardless of whether it's a 94% match or a 62% match.

**Proposal:** match score drives the card variant. Three explicit shapes:

| Variant | Trigger | Layout |
|---|---|---|
| **Top match** | match ≥ 90 | 2-up card width, full hero photo, AI score ring + comp player visible, primary CTA "Reach out" inline. |
| **Watch** | 75 ≤ match < 90 | Standard 1-up card (today's default). |
| **Reviewed** | match < 75 OR `viewed = true` | Compact horizontal row with mini-stats — appears in "Recently viewed" feeds, not the main grid. |

The Dashboard "Recent Athletes" grid mixes all three: 1 hero, 4 standard, 6 compact rows below. This creates rhythm and tells the coach *"this is the one to look at."*

---

### P1.3 — AI Report → narrative document

**Today:** `DetailedAIReport.tsx` is a series of progress bars and accordions. Functional, but it reads like a form.

**Proposal:** rebuild as a narrative scout report.

```
01 ┌─ THE SCORE ─────────────────────────────────┐
   │  95  · Top 5 % of 2025 prospects            │
   │  Verified by AI · AR · NCAA                 │
   └─────────────────────────────────────────────┘

02 ┌─ THE FIT ───────────────────────────────────┐
   │  Tsubasa projects to D1 Power 5.            │
   │  Comp: Hines Ward (route precision).        │
   │  Best fit programs · UCLA · Notre Dame · Cal│
   └─────────────────────────────────────────────┘

03 ┌─ STRENGTHS ─────────────────────────────────┐
   │  ▓▓▓▓▓▓▓▓░░  Speed · 95 (top 3 %)           │
   │  ▓▓▓▓▓▓▓▓░░  Awareness · 93 (top 5 %)       │
   │  ▓▓▓▓▓▓▓░░░  Hands · 91 (top 8 %)           │
   └─────────────────────────────────────────────┘

04 ┌─ AREAS TO DEVELOP ──────────────────────────┐
   │  ▓▓▓▓▓░░░░░  Strength · 82 (top 22 %)       │
   │  S&C focus over the off-season would close  │
   │  the gap to 90+ before Combine.             │
   └─────────────────────────────────────────────┘

05 ┌─ THE TAPE ──────────────────────────────────┐
   │  6 highlight reels · 3 game tapes           │
   │  [▶ Koshien Bowl 2024 · 2:14]               │
   │  [▶ Japan vs USA All-Stars · 3:32]          │
   └─────────────────────────────────────────────┘

06 ┌─ THE NUMBERS ───────────────────────────────┐
   │  Combine    Season    Career                │
   │  4.42 s     62 rec    1,124 yds             │
   │  36" vert   14 TDs    11.4 ypa              │
   └─────────────────────────────────────────────┘
```

Each section is a hero card. The report becomes scrollable and screenshot-able — recruiters share these with their staff.

**Add:** a "Download as PDF" CTA at the top. Coaches still circulate PDFs.

---

### P1.4 — Dashboard composition

**Today:** 4 KPI tiles, 2 distribution cards, recent-athletes grid. Same chrome top to bottom.

**Proposal:**

```
┌─ HERO BAR ─────────────────────────────────────────────┐
│  Good morning, Coach Davis. 7 new high-match           │
│  athletes since yesterday.                             │
│  [View matches →]                                      │
└────────────────────────────────────────────────────────┘

┌─ KPI ──┐  ┌─ KPI ──┐  ┌─ KPI ──┐  ┌─ KPI ──┐
│ 234    │  │ 67     │  │ 156    │  │ 78%    │
│ viewed │  │ matched│  │ msgs   │  │ resp.  │
│ +12%↑  │  │ +23%↑  │  │ +8%↑   │  │ +5%↑   │
└────────┘  └────────┘  └────────┘  └────────┘

┌─ TOP MATCH (hero card) ────────────────────────────────┐
│  Tsubasa Brennan · 94% match · AI 95                   │
│  [hero photo] [comp: Hines Ward] [Reach out →]         │
└────────────────────────────────────────────────────────┘

Recent · 3 high match
[Watch · 5 standard cards]

Recently viewed · compact rows
[Reviewed · 8 horizontal rows]
```

The dashboard becomes a *digest*, not a list. The "good morning" line is dynamic — it surfaces the most important state of the world for the coach.

---

## P2 — Athlete app overhaul (week 4–7)

### P2.1 — "Story Mode" profile

**Today:** profile is a card-stack — hero, stats, videos, AI report — all stacked vertically with the same chrome.

**Proposal:** athletes spend 90% of their time looking at *their own* profile and sharing it. Treat the profile as a Strava activity / Spotify Wrapped style story.

- **Tap or scroll vertically** through full-bleed sections. Each section fills the viewport.
- **Section 1: Hero** — full-bleed muted highlight reel with name + position overlaid.
- **Section 2: The Score** — AI 95 in mega type, gradient ring fills the screen, "Top 5% of 2025."
- **Section 3: The Tape** — video thumbnails with Tinder-style horizontal carousel.
- **Section 4: The Numbers** — combine + season stats with peer rails.
- **Section 5: The Reach** — list of programs that have viewed / reached out. Real-time.
- **Section 6: The Pitch** — athlete-authored 280-char "why me" + handwritten signature.

Each section is a screenshot. The whole profile becomes shareable to coaches via a single deep link.

**Why it matters:** athletes share their profile on Instagram and via WhatsApp. A card-stack screenshots ugly. A story-mode profile screenshots *like a hype reel.*

---

### P2.2 — Native gestures, not card hover

The current mobile app reuses desktop hover affordances. Replace with native:

- **Pull-to-refresh** on the message list.
- **Swipe-to-archive** on threads.
- **Long-press** on a video to scrub a 10-frame preview.
- **Pinch-zoom** on the AI score breakdown.
- **Haptic feedback** on Match (heavy tick), Pass (light tick).

These aren't bells and whistles — they're the difference between "this is a webview" and "this feels native."

---

### P2.3 — Onboarding

**Today:** `AthleteOnboarding.tsx` is a 4-step form (basic info, sport, school, video upload). Workmanlike.

**Proposal:**
- **Cut to 2 steps + a delight moment.**
  - Step 1: phone number → magic link. We collect everything else passively.
  - Step 2: upload one video.
  - **Delight:** show a *generated* AI score in real time as the video processes ("Speed 91 · Agility 87 · …"). The athlete sees themselves scored before they finish onboarding. This is the conversion hook.
- Drop the manual "your school's name" / "your country" fields — infer from phone country code, ask only if ambiguous.
- Sport + position can be a single visual picker (icons for 12 sports) instead of a dropdown.

---

## P3 — Quality polish (week 6–8)

### P3.1 — Empty states with personality

Today: "You haven't saved any athletes yet."

Better:
> **Nothing on the watchlist yet.**
> Once you tap ♥ on an athlete in Discover, they'll show up here. Pro tip — most coaches build a 12-athlete shortlist before reaching out.

Each empty state should: (1) explain the surface, (2) offer one concrete action, (3) drop a recruiting-domain factoid.

### P3.2 — Loading skeletons

Today: spinners. Replace with **content-shaped skeletons** for athlete cards, the AI score ring (animated gradient sweep), and the dashboard tiles. Perceived performance > actual performance.

### P3.3 — Match/notification language

Today: "94% Match." Cold.

Better — match strength gets a verbal layer that scales:
- 95+ → **"Elite fit"** (gradient pill)
- 85–94 → **"Strong fit"** (blue solid)
- 75–84 → **"Worth a look"** (gray pill)
- <75 → no copy, just `%` (don't draw attention)

### P3.4 — Verification trust pattern

Today: three checkmark chips ("AI Verified", "AR Verified", "NCAA"). They look interchangeable.

Proposal: a single **trust strip** with hover detail —

> ✓ Verified · 3 sources
> Tap to see how Tsubasa was verified.

→ opens a sheet showing AI confidence score, AR session date, NCAA Eligibility Center clearance number. This is the "show your work" moment that builds trust with skeptical coaches.

---

## P4 — Greenfield ideas (post-MVP)

These aren't required for the overhaul but I'd push for them in the next planning cycle.

| Idea | Why it matters |
|---|---|
| **Coach DM templates** with NIL/visa/eligibility variables auto-filled. | Coaches send 30+ messages a day; templating doubles response rate. |
| **Side-by-side compare drawer** (desktop) — pin 2–3 athletes, see stats overlaid on a radar chart. | The current `Compare` tab is a placeholder. Make it the killer feature. |
| **Athlete "open house"** — a scheduled live Q&A inside the app, recruiter sees the queue. | Replaces the Zoom-link friction. |
| **Calendar integration** — "schedule call" on athlete card writes to coach's GCal. | Currently hand-waved. |
| **Federation-curated lists** — "Brazilian volleyball federation top 25 of 2025." | Trust + acquisition flywheel. Federations bring athletes; the app gives them a curated showcase. |
| **NIL marketplace card** in athlete profile — sponsor logos, current deals, available deal slots. | Already a tab. Could be a brag rail on every profile. |

---

## What ships in this overhaul (concrete deliverables)

If approved, the design team produces:

- [ ] Updated `colors_and_type.css` (new card tiers, mega type, locked gradient usage)
- [ ] **8 hi-fi screens** in Figma + this project's UI kit:
  - Recruiter Dashboard (overhauled)
  - Recruiter Discover → Scout View
  - Recruiter Athlete Profile (sheet)
  - Recruiter AI Report (full page)
  - Recruiter Compare (greenfield)
  - Athlete Story-Mode Profile
  - Athlete AI Report (full)
  - Athlete Onboarding (2-step + delight)
- [ ] **Component diff doc** mapping shadcn primitives → Athlink-flavored variants (12 components touched)
- [ ] **Motion spec** — every transition documented with duration + easing in `colors_and_type.css`
- [ ] **A/B plan** for the Onboarding "live AI score" delight moment

---

## What I'd cut from the current build

Honest-list of things I'd remove or hide behind a flag:

- **The `🔵` `⚡` `🥤` emoji sponsor placeholders** in the Sponsors tab. Replace with proper logo placeholders (gray monogram chips).
- **The `gradient-text` class on every section heading.** Distracting. Use it once per page max.
- **The `Heart` icon on athlete cards in dashboard view.** Move save action to the detail sheet — too many primary actions on one card today.
- **The "Sport Distribution" pie/bar mix on the dashboard.** It's a vanity widget; coaches don't change behavior based on it. Move to Analytics.
- **The "Back to Selection" button at the bottom of the recruiter sidebar.** Confusing — it's not clear what "selection" means. Either name it "Switch role" or remove.

---

## Open questions for product

1. **Is the AI score real or scaffolding?** If real, what's the model — combine metrics + tape analysis + peer percentile? I designed for a real signal; if it's a stub, that changes the trust strategy.
2. **Who pays?** I see `AthletePayment.tsx` but no recruiter pricing surface. If recruiters pay (likely), the dashboard hero should surface their plan/credits left.
3. **NCAA compliance.** Direct messaging is heavily regulated. Is the in-app message a compliance-safe channel, or does it just route to email? This affects the message-thread UI.
4. **International payments.** NIL deals across countries are tax-complicated. Are you handling this with Stripe Connect, or escrowed by Athlink?
5. **What is "AR Verified?"** I see the chip but no AR flow. If this is real, it's a *huge* differentiator and deserves its own onboarding moment.

---

## How to push this to GitHub

I can't commit from this environment, but everything is ready to PR:

1. **Download this project** as a zip from the chat (Project menu → Download).
2. **Branch:** `git checkout -b design/overhaul-plan`.
3. **Copy** `OVERHAUL_PLAN.md` → repo root.
4. **Optional:** copy the new tokens in `colors_and_type.css` into `src/styles/globals.css` (they're CSS-variable-compatible).
5. **PR title:** *"design: full UI overhaul plan + token scaffolding"*
6. **Tag** product + design leads in the PR description, link the 7 P0/P1 sections as separate issues.

If you want me to generate **per-issue markdown templates** (one file per item, ready to paste into GitHub's "new issue"), say the word and I'll produce them.
