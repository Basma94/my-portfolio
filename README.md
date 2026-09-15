# Basma Mahmoud — Product Portfolio

An interactive portfolio for a Senior AI Product Manager, built from the Claude Design
handoff in [`project/`](project). Three pages:

| Route          | What it is                                                                         |
| -------------- | ---------------------------------------------------------------------------------- |
| `/`            | The portfolio: hero, Evidence, Judgement, Challenge me, Decision log, Roadmap, Talk |
| `/value-agent` | The AI Business Value Agent — interview, dashboard and generated business case      |
| `/toolkit`     | The Product Toolkit — seven categories of working documents                         |

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build; all three routes prerender as static
npm run typecheck
```

Node 20+. No environment variables, no server, no database — every page is statically
prerenderable and all interactivity is client-side.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · React 19.

## Deploying

The site is a **static export** — no server, no API routes, no database — so it can be
hosted anywhere that serves files. `.github/workflows/deploy.yml` builds it and publishes
to GitHub Pages on every push to `main`.

One-time setup on a fresh repo: **Settings → Pages → Build and deployment → Source:
GitHub Actions**. After that, pushing to `main` deploys.

### The base path

A Pages *project* page serves from `https://<user>.github.io/<repo>/`, so Next has to be
built with `basePath: '/<repo>'` or the site loads with no CSS. The workflow works this
out for you:

| Situation                                | Base path      |
| ---------------------------------------- | -------------- |
| `public/CNAME` exists (custom domain)     | empty          |
| Repo is named `<user>.github.io`          | empty          |
| Anything else (project page)              | `/<repo>`      |

`src/lib/asset.ts` exists because `next/link` applies the base path itself but a raw
`<img src>` does not — anything pointing into `public/` goes through `asset()`.

### Putting it on your own domain

Add a `public/CNAME` file containing the bare domain, point DNS at GitHub, and set
`NEXT_PUBLIC_SITE_URL` in the workflow's build step so canonical and Open Graph URLs
match. The workflow drops the base path automatically once the CNAME file is there.

```
# public/CNAME
basmamahmoud.com
```

DNS at your registrar — four `A` records on the apex plus one `CNAME` for `www`:

```
@    A      185.199.108.153
@    A      185.199.109.153
@    A      185.199.110.153
@    A      185.199.111.153
www  CNAME  basma94.github.io
```

Then Settings → Pages → Custom domain, and tick **Enforce HTTPS** once the certificate
is issued (usually a few minutes, occasionally up to 24 hours).

## Design system

The visuals are bound to the **Mingloo Consulting** design system that shipped with the
handoff bundle:

- `src/styles/tokens.css` is copied verbatim from the bundle's `tokens/*.css`. It is the
  source of truth for colour, type, spacing, elevation and motion — don't hand-edit the
  values, and reach for `var(--*)` rather than a literal hex wherever CSS can express it.
- `src/app/globals.css` maps those tokens into Tailwind's `@theme` (so `bg-mist-100`,
  `text-ink-500` and friends resolve to design-system values) and defines the handful of
  recurring parts: `.eyebrow`, `.cta`, `.card`, `.lift`, `.label-chip`, `.nav-link`.
- `src/lib/icon-paths.ts` vendors the bundle's 38 Lucide glyphs, plus `eye` (see
  *Deviations* below). `src/components/Icon.tsx` renders them at 24×24 with a 2px stroke
  and round caps, exactly as the bundle's `Icon` does — including its fallback to
  `sparkles` for an unknown name.
- `src/lib/palette.ts` holds the literal hexes for the places where a colour has to be
  *computed* in TypeScript (a band, a score threshold, a selected state) and handed back
  as a style value.

House rules worth keeping: gradients run left-to-right only; pink is an accent, never a
button or body text; hover lifts 2px and steps the shadow; focus rings are never removed;
no emoji, and every glyph comes from `Icon`.

## The value engine

`src/lib/value-engine/` is deliberately separate from the UI so assumptions can change
without touching a component:

| File            | Responsibility                                                              |
| --------------- | --------------------------------------------------------------------------- |
| `types.ts`      | `Assumptions` — every input the model reads, in one object                   |
| `index.ts`      | `engine()`, plus feasibility, adoption, alignment, confidence, value score   |
| `questions.ts`  | The adaptive interview, and where the agent pushes back on a shaky input     |
| `document.ts`   | The generated 18-section business case, risk register and plain-text export  |

`recommend()` never rests on ROI alone — value, feasibility, data readiness, adoption,
confidence, alignment and payback all get a say, and the reasoning is always stated.

## Analytics

Off by default. With `NEXT_PUBLIC_ANALYTICS` unset — which is how it ships — no tracker
script loads, no cookie is written and no request leaves the visitor's browser, so the
site needs no consent banner until you opt in.

To switch one on, set the variables in the workflow's build step:

| Provider     | Variables                                            | Cookies | Custom events |
| ------------ | ---------------------------------------------------- | ------- | ------------- |
| `ga4`        | `NEXT_PUBLIC_GA_ID`                                   | yes     | yes           |
| `plausible`  | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`                        | no      | yes           |
| `umami`      | `NEXT_PUBLIC_UMAMI_ID`, optional `NEXT_PUBLIC_UMAMI_SRC` | no   | yes           |
| `cloudflare` | `NEXT_PUBLIC_CF_BEACON`                               | no      | no            |

`ga4` sets cookies, so UK/EU visitors need a consent banner — this repo does not ship
one. The other three are cookieless and generally do not. Cloudflare counts page views
only and will not receive the click events below.

`src/lib/analytics.ts` is provider-agnostic: `track()` hands the event to whichever
script is on the page and no-ops when none is, so changing provider is one env var, not
an edit to every component.

### What gets measured

| Event                | Tells you                                                     |
| -------------------- | ------------------------------------------------------------- |
| `cta_click`          | Which call to action, in which section                        |
| `demo_open`          | Which of the four products people actually open                |
| `think_stage`        | How far through the seven-stage journey they go                |
| `challenge_answer`   | Each call, its phase, and whether they matched                 |
| `challenge_complete` | Reached the end — the strongest engagement signal on the page  |
| `decision_open`      | Which decisions get expanded                                   |
| `wsjf_open`          | Whether anyone digs into the scoring                           |
| `agent_start`        | Started the interview, or loaded the example                   |
| `agent_dashboard`    | Finished the interview, and what it recommended                |
| `agent_gate_submit`  | Gave an email for the report                                   |
| `agent_report`       | Reached the generated business case                            |
| `toolkit_view` / `toolkit_download` / `toolkit_request` | Which documents draw interest |
| `contact_click`      | Calendar, LinkedIn or email — the actual conversions            |

Names are stable: they become column headings in whichever dashboard is attached, so
renaming one loses its history.

## Content and honesty rules

Employer work is confidential. Every product, backlog item and figure on the site is
synthetic demo content, and the page says so in a band under the hero. Numbers carry a
**Demo**, **Target**, **Hypothesis** or **Validation metric** label. When changing copy,
keep that discipline: no invented professional metric, revenue figure, customer count or
business outcome is presented as a reported result.

Content lives in `src/data/` — `portfolio.ts`, `value-agent.ts`, `toolkit.ts` — so the
words can be edited without reading a component.

## Deviations from the prototype

Two places where the implementation does not copy the prototype exactly, both fixing a
defect rather than changing the design:

1. **The mobile header.** In the prototype the nav pushes the "Let's talk" CTA off the
   right edge below roughly 760px. Here the header row wraps: brand and CTA on the first
   line, nav on its own scrollable line. Desktop is unchanged.
2. **The toolkit's "View" icon.** The prototype asks for `eye`, which the design system
   bundle does not ship, so it silently rendered `sparkles`. The `eye` glyph is vendored
   from the same Lucide release in `src/lib/icon-paths.ts`.

Known-unfinished content carried over as-is: the **Presales Agent** card's Problem and
Role fields read "write-up pending" / "to be confirmed" in the prototype and still do.

## The handoff bundle

[`project/`](project) holds the original `.dc.html` prototypes, the bound design system
under `project/_ds/`, and the uploaded assets. [`chats/`](chats) holds the transcript of
the design session. Neither is built or deployed — they are the reference for what the
design is meant to look like and why it ended up that way. The hero portrait and logo mark
were extracted out of the bundle into `public/assets/`.
