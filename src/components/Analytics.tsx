import Script from "next/script";

/**
 * Loads whichever analytics provider is configured, and nothing at all when
 * none is.
 *
 * Set `NEXT_PUBLIC_ANALYTICS` to one of `ga4`, `plausible`, `umami` or
 * `cloudflare`, plus the matching id below. With the variable unset — the
 * default — no tracker loads, no cookie is written and no request leaves the
 * visitor's browser, so the site needs no consent banner until you opt in.
 *
 *   ga4         NEXT_PUBLIC_GA_ID            G-XXXXXXXXXX
 *   plausible   NEXT_PUBLIC_PLAUSIBLE_DOMAIN yourdomain.com
 *   umami       NEXT_PUBLIC_UMAMI_ID         a uuid
 *               NEXT_PUBLIC_UMAMI_SRC        script url (defaults to Umami Cloud)
 *   cloudflare  NEXT_PUBLIC_CF_BEACON        beacon token
 *
 * Consent: ga4 sets cookies and needs a banner for UK/EU visitors. plausible,
 * umami and cloudflare are cookieless and generally do not. Cloudflare counts
 * page views only — it will not receive the custom click events.
 */
export function Analytics() {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS;
  if (!provider) return null;

  if (provider === "ga4") {
    const id = process.env.NEXT_PUBLIC_GA_ID;
    if (!id) return null;
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
            gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}
        </Script>
      </>
    );
  }

  if (provider === "plausible") {
    const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    if (!domain) return null;
    return (
      <Script
        defer
        data-domain={domain}
        src="https://plausible.io/js/script.tagged-events.js"
        strategy="afterInteractive"
      />
    );
  }

  if (provider === "umami") {
    const id = process.env.NEXT_PUBLIC_UMAMI_ID;
    if (!id) return null;
    return (
      <Script
        defer
        data-website-id={id}
        src={process.env.NEXT_PUBLIC_UMAMI_SRC ?? "https://cloud.umami.is/script.js"}
        strategy="afterInteractive"
      />
    );
  }

  if (provider === "cloudflare") {
    const token = process.env.NEXT_PUBLIC_CF_BEACON;
    if (!token) return null;
    return (
      <Script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon={`{"token":"${token}"}`}
        strategy="afterInteractive"
      />
    );
  }

  return null;
}
