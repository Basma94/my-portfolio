# Basma Mahmoud — Product Portfolio

An interactive portfolio for a Senior AI Product Manager, built from the Claude Design
handoff in [`project/`](project). Three pages:

| Route          | What it is                                                                         |
| -------------- | ---------------------------------------------------------------------------------- |
| `/`            | The portfolio: hero, Evidence, Judgement, Challenge me, Decision log, Roadmap, Talk |
| `/value-agent` | The AI Business Value Agent — interview, dashboard and generated business case      |
| `/toolkit`     | The Product Toolkit — real, downloadable discovery and strategy documents           |

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

To switch one on, set **repository variables** — Settings → Secrets and variables →
Actions → Variables. The workflow reads them, so no code change is needed:

Set `ANALYTICS` to one of these, plus its companion variable:

| `ANALYTICS`  | Also set                                | Cookies | Custom events |
| ------------ | --------------------------------------- | ------- | ------------- |
| `umami`      | `UMAMI_ID` (and `UMAMI_SRC` if self-hosted) | no  | yes           |
| `plausible`  | `PLAUSIBLE_DOMAIN`                      | no      | yes           |
| `ga4`        | `GA_ID`                                 | yes     | yes           |
| `cloudflare` | `CF_BEACON`                             | no      | no            |

`ga4` sets cookies, so UK/EU visitors need a consent banner — this repo does not ship
one. The other three are cookieless and generally do not. Cloudflare counts page views
only and will not receive the click events below.

Vercel's Web Analytics is deliberately not in that list: on its free Hobby plan custom
events are unavailable, so it would report page views but none of the click events below.
Umami's free tier includes custom events and is cookieless, which is why it is the
default suggestion.

`src/lib/analytics.ts` is provider-agnostic: `track()` hands the event to whichever
script is on the page and no-ops when none is, so changing provider is one env var, not
an edit to every component.

### What gets measured

| Event                | Tells you                                                     |
| -------------------- | ------------------------------------------------------------- |
| `cta_click`          | Which call to action, in which section                        |
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
| `contact_widget_open` / `contact_widget_submit` | Use of the floating contact widget |

Names are stable: they become column headings in whichever dashboard is attached, so
renaming one loses its history.

## Email sending (Resend, via toolkit-mailer)

The site itself is a static export with no server, so every real email it sends goes
through one small serverless mailer (`toolkit-mailer/`, deployed on its own to Vercel;
see `toolkit-mailer/README.md` for the one-time setup — a free Resend account plus a
Vercel deploy) rather than a backend of the site's own. Two endpoints, both called from
`src/lib/siteMailer.ts`:

1. **The floating "Get in touch" widget** (`src/components/ContactWidget.tsx`, on every
   page) posts to `toolkit-mailer/api/send-contact-message.js`, which sends two emails:
   - **A notification to you**, subject "Yayy , New Inquiry", with the visitor's address
     set as reply-to so replying reaches them directly. This is the one that matters
     functionally — its result is what the widget's UI reports success or failure on.
   - **A confirmation to the visitor**, best-effort (a failure here doesn't fail the
     submission), letting them know the message arrived and a reply is coming.
2. **The `/toolkit` page's "Download this template" form** does two things at once: the
   file downloads directly in the visitor's browser (`Toolkit.tsx` triggers it with a
   synthetic `<a download>` click, same-tab and synchronous so browsers don't treat it as
   a blocked pop-up), and a **real attachment** is separately emailed to the visitor by
   `toolkit-mailer/api/send-toolkit-doc.js` — including the actual branded email template
   it sends, adapted per document. Both are independent and best-effort against each
   other — a visitor always gets the file at least via the instant download even if the
   email side is misconfigured or down. Every doc shows "coming soon" in the UI until it
   has a real file registered in `src/data/toolkitFiles.ts` (and mirrored in
   `toolkit-mailer/api/send-toolkit-doc.js`).

Both endpoints share one Resend account, one "from" address, and one shared secret —
see `toolkit-mailer/README.md` for that setup. This repo only needs to know where the
mailer lives: Settings → Secrets and variables → Actions → Variables, set:

| Variable              | Value                                                        |
| ---------------------- | ------------------------------------------------------------ |
| `CONTACT_MAILER_URL`   | `https://<your-toolkit-mailer-deploy>.vercel.app/api/send-contact-message` |
| `TOOLKIT_MAILER_URL`   | `https://<your-toolkit-mailer-deploy>.vercel.app/api/send-toolkit-doc`     |
| `TOOLKIT_MAILER_KEY`   | the shared secret from `toolkit-mailer`'s `TOOLKIT_MAILER_KEY` env var    |

None of these are secret in the sense of needing to stay hidden — the URLs and shared
key end up in the site's public JS bundle either way, the same as any client-side mailer
integration. The actual Resend API key lives only on the `toolkit-mailer` deployment,
never here. Re-run the deploy workflow (or push to `main`) after setting the variables.

## Content and honesty rules

Employer work is confidential, so every product, backlog item and figure on the site is
synthetic demo content — there's no visible "this is a demo" banner, but the discipline
still holds when changing copy: no invented professional metric, revenue figure, customer
count or business outcome is presented as a reported result.

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
