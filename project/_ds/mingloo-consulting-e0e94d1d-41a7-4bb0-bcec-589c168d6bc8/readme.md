# Mingloo Consulting — Design System

A design system for **Mingloo Consulting**, a premium B2B consultancy working at the
intersection of business strategy, AI, technology and digital transformation. Its six
service pillars are Strategy & Advisory, Operational Excellence, Digital Transformation,
Sustainability & ESG, Innovation & Growth, and Change Management. Its promise line is
*Insight-Driven · Practical Solutions · Lasting Impact*; its headline positioning is
"From Insight to Impact" and "Turn Complexity into Opportunity."

## Sources

| Source | Notes |
|---|---|
| `uploads/13C95A63-65AF-4479-A042-ABED9143803F.png` | The single input: a one-page brand sheet containing the logo lockup, the five-colour palette with hex values, the Poppins type specimen with its five weights, the icon-style row for the six service pillars, the promise row, a composed web hero ("From Insight to Impact") and a composed CTA band ("Turn Complexity into Opportunity."). |

No codebase, Figma file, repository, live site or slide deck was supplied. **Everything in
this system is derived from that one sheet.** Where a decision had no answer on the sheet
(shadow scale, radii, motion, form-field styling, semantic colours) it was authored to be
consistent with what the sheet shows, and is flagged below under *Judgement calls*.

## Index

**Root**
- `styles.css` — the single entry point consumers link. `@import` lines only.
- `thumbnail.html` — homepage tile.
- `SKILL.md` — Agent Skills front-matter so this folder works as a Claude Code skill.
- `readme.md` — this file.

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `motion.css`

**`assets/`**
- `logo-lockup.png`, `logo-mark.png`, `wordmark.png` — extracted from the brand sheet.
- `icons/` — 38 vendored Lucide SVGs (24×24, 2px stroke).
- `imagery/hero-strategist.png`, `imagery/insights-dashboard.png`, `imagery/script-accent.png` — extracted from the sheet.

**`components/`**

| Group | Components |
|---|---|
| `components/core/` | `Button`, `IconButton`, `Badge`, `Tag`, `Card`, `Tabs`, `Dialog`, `Tooltip` |
| `components/forms/` | `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch` |
| `components/brand/` | `Logo`, `LogoType`, `Icon`, `Eyebrow`, `GradientHeading`, `ServiceCard`, `StatTile` |

Each directory holds `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md` and one `@dsCard` HTML.

**`ui_kits/website/`** — click-through marketing site: `index.html`, `SiteChrome.jsx`,
`HomeScreen.jsx`, `ServicesScreen.jsx`, `InsightsScreen.jsx`, `ContactScreen.jsx`. See its README.

**`templates/consulting-page/`** — `ConsultingPage.dc.html`, a ready-to-edit marketing page (glass header, gradient hero with stat tiles, six service pillars, deep-navy CTA band) that consuming projects can copy as a starting point.

**`guidelines/`** — 26 specimen cards (Brand, Colors, Type, Spacing, Elevation, Motion, Iconography).

### Intentional additions

- **`Icon`** — a wrapper over the vendored Lucide set. The sheet shows an icon *style* but ships no icon files; a single wrapper keeps stroke weight, size and colour consistent.
- **`Eyebrow`, `GradientHeading`, `ServiceCard`, `StatTile`** — the sheet's four recurring composed devices, promoted to components so they are reproduced rather than re-drawn.
- **`Textarea`, `Tabs`, `Tooltip`, `Switch`, `Radio`, `Select`** — standard primitives, authored because no source defined a component inventory.

## Visual foundations

**Colour.** Five brand colours, all from the sheet: teal `#00D1B2` (primary), violet
`#7F56D9`, indigo `#6366F1`, panel grey `#F4F6FC`, blush pink `#FF7E9E`. Blue `#3B82F6`
is added as the bridge tone that the sheet's gradients obviously pass through. Ink is
navy-tinted, never neutral grey and never black: `#12123A` for headings, `#333A6B` for
body, `#6B7599` for muted. Pink is an accent only — one tile in a row, one underline —
never a button, never body text. Success reuses the brand teal; warning and danger are
borrowed utility colours and carry no brand meaning.

**Gradients are the brand's main colour device**, always left-to-right, always warm-teal
to cool-violet, never vertical and never radial:
- `--gradient-mark` teal → blue → violet → orchid (the logo; do not rebuild it in CSS, use the artwork)
- `--gradient-cta` teal → blue (every primary button)
- `--gradient-headline` blue → violet (text fill, one phrase per headline)
- `--gradient-brand` teal → indigo (2px rules, tab indicators, checked states)
- `--gradient-wash` near-white → pale blue → pale violet (hero and page grounds)
- `--gradient-deep` navy → indigo → violet (footer and inverse CTA panels)

**Type.** Poppins throughout, Light 300 / Regular 400 / Medium 500 / SemiBold 600 /
Bold 700. Display is Bold at 52–64px, `-0.02em`, 1.04 line-height. Headings are SemiBold,
`-0.01em`. Body is Regular 16px at 1.65 — generous, and never gradient-filled. The eyebrow
is the signature detail: 13px Medium uppercase at `0.26em` tracking, above nearly every
section. The wordmark's "CONSULTING" runs at `0.42em`. One secondary face, **Caveat**,
stands in for the sheet's handwritten "Better Businesses / Brighter Futures" accent —
used once per layout at most, with a short violet underline beneath it.

**Spacing & layout.** 4px base scale. Card padding 24, section rhythm 96, content column
capped at 1200px with 24px gutters, prose at 720px. Layouts are two-column asymmetric
splits (roughly 1 : 1.1) far more often than symmetric halves. The only fixed element is
the header, which is sticky and translucent. Whitespace is the premium signal — when a
section feels thin, the fix is fewer elements, not more.

**Radii.** Cards 20px, panels and dialogs 28px, hero images and inverse CTA blocks 36px,
icon chips 14px, form fields 10px, buttons fully pill. Nothing is square-cornered.

**Cards.** White, 1px `#ECEFF7` hairline, 20px radius, soft shadow. Colour arrives through
a pale tint background, a tinted icon chip, or a gradient headline — never a coloured left
border, never a saturated card fill. `glass` (72% white + 18px blur) exists only for chips
floating over imagery or gradients.

**Shadows.** Navy-tinted (`rgba(18,18,58,…)`), never black, five steps by distance from the
page. Gradient buttons additionally carry a coloured glow (`--shadow-cta`). Inner shadows are
used only as a 1px white top highlight on glass surfaces. There are no protection gradients
over photography — text sits beside imagery, not on top of it.

**Logo on dark grounds.** Because the supplied artwork is opaque raster, dark panels carry either the mark in a white chip or the wordmark set as live Poppins — never an inverted image.

**Imagery.** Real professionals in modern, cool-lit workspaces, mid-thought rather than
posed, often with translucent data panels floating in frame. Palette skews cool — blues,
violets, soft white — with no grain, no duotone, no black and white. Business-intelligence
dashboards and AI/data visualisations are the second imagery family. Full-bleed photography
is avoided; images sit in rounded containers with a large shadow. Never handshakes, never
mountains, never generic stock-corporate.

**Motion.** Restrained. Fades and 2px lifts only. 120ms for hover and press, 200ms for
state change, 320ms for overlays, 600ms for scroll reveals. `cubic-bezier(.4,0,.2,1)`
standard, `cubic-bezier(.16,1,.3,1)` for entrances. No bounce, no spin, no parallax, no
looping background animation.

**Hover & press.** Hover lifts an element 2px and steps the shadow up one level; gradient
buttons brighten via the glow rather than changing colour; text links move from indigo
`#4F46E5` to violet `#6941C6`. Press is `scale(.985)` with no colour change. Focus is a
3px `rgba(99,102,241,.30)` ring — always visible, never removed.

**Transparency & blur.** Only two places: the sticky header (86% white, 18px blur) and glass
chips over imagery. Blur is never used on a plain white ground.

## Content fundamentals

**Voice.** Confident, plain, faintly impatient with theatre. The brand sells decisions, not
frameworks, and the copy sounds like a senior practitioner speaking, not a marketing team.

**Person.** "We" for Mingloo, "you" and "your teams" for the client. Never "I", never
"Mingloo believes…". Calls to action are first-person-plural invitations: **"Let's Talk"**,
**"Let's Build What's Next"** — the shared-work framing is the brand's most distinctive
copy habit.

**Casing.** Sentence case for body copy, buttons and form labels. Title case for service
names ("Digital Transformation", "Operational Excellence") and headline phrases
("From Insight to Impact"). Eyebrows are uppercase and unpunctuated.

**Rhythm.** Headlines are 3–6 words with one gradient-filled phrase at the end. Full stops
inside headlines are used deliberately for weight — "Turn Complexity into Opportunity.",
"Data. AI. Strategy. Real Business Impact." Body paragraphs are two or three sentences.

**Specificity over adjectives.** "Nine months from pilot to platform", "average payback
11 months", "we'll reply within two working days" — numbers and timescales instead of
"world-class" or "best-in-class". Avoid "leverage", "synergy", "solutions provider",
"journey", "unlock".

**Emoji: never.** Not in UI, not in marketing, not in email. Unicode characters are not
used as icons either; every glyph comes from `Icon`. The middot (·) is used as the house
separator ("Data. AI. Strategy.", "London · Dubai", "Insight-Driven · Practical Solutions").

**Examples, verbatim from the brand sheet.** "From Insight to Impact" · "Turn Complexity
into Opportunity." · "Data. AI. Strategy. Real Business Impact." · "Let's Build What's Next"
· "Let's Talk" · "Insight-Driven" · "Practical Solutions" · "Lasting Impact" ·
"Better Businesses Brighter Futures" (handwritten accent) · "Modern . Professional . Friendly".

## Iconography

The sheet specifies a **minimal single-weight line style** — thin uniform strokes, rounded
caps, no fills, no colour inside the glyph — set in 60×60px rounded squares (14px radius)
filled with a pale brand tint, one icon per service pillar.

No icon files were supplied, so **Lucide** (ISC licence) is used: it matches the sheet's
stroke weight, rounded terminals and level of abstraction closely. 38 glyphs are vendored
into this project — as files in `assets/icons/` and inline in `components/brand/Icon.jsx`,
so nothing depends on a CDN and everything inherits `currentColor`.

Rules: 2px stroke always, never thinned or thickened. Sizes 16 / 20 / 24 / 26 only.
Inline icons take `--text-muted` or `currentColor`; chip icons take the saturated partner
of their tint. No icon font, no sprite sheet, no emoji, no Unicode symbols, no filled
glyph variants, and no hand-drawn SVG.

Pillar mapping: `chart-column` Strategy & Advisory · `settings` Operational Excellence ·
`network` Digital Transformation · `leaf` Sustainability & ESG · `target` Innovation & Growth ·
`users` Change Management. Promise row: `compass` · `chart-column` · `sparkles`.
House CTA glyph: `arrow-right`, trailing.

## Judgement calls & substitutions

1. **Poppins is loaded from Google Fonts.** No font binaries were supplied. Swap the `src`
   urls in `tokens/fonts.css` for self-hosted files when you have them.
2. **Caveat stands in for the handwritten accent.** The sheet's script line is a raster; its
   actual typeface is unknown. Caveat is the nearest widely available match.
3. **Lucide stands in for the icon set** (see above).
4. **Logo artwork is raster, cropped from the sheet, and cannot be knocked out.**
   `assets/logo-*.png` have an opaque white background baked in, so there is **no white
   silhouette variant** — inverting them yields a solid white rectangle. On dark or gradient
   grounds use `Logo chip` (artwork in a white rounded chip) or `LogoType` (the wordmark as
   live Poppins); the footer, the project thumbnail and the header all use the latter.
   The lockup also needs 72px+ before its tracked "CONSULTING" line reads, so compact
   headers pair `variant="mark"` with `LogoType`. Transparent SVG masters would remove all
   of these constraints; the logo was deliberately *not* redrawn.
5. **Imagery is cropped from the sheet** and is illustrative only — not licensed stock. The
   crops isolate the photographic subject and the dashboard panel; the sheet's composed web
   layouts (their eyebrows, headlines and CTA buttons) are deliberately cropped out, so no
   image contains baked-in page furniture.
6. **Shadows, radii, motion, semantic colours and all form-field styling were authored**,
   since the sheet shows none of them. They follow the sheet's soft, spacious, cool-toned
   character but are open to correction.
7. **The robot** mentioned in the brief as an optional secondary element does not appear on
   the sheet, so no robot asset exists here.
