import Link from "next/link";
import { CtaIcon } from "./Icon";
import { asset } from "@/lib/asset";
import { HeaderCta } from "./HeaderCta";

const NAV = [
  { label: "Think", href: "/#think" },
  { label: "Build", href: "/#build" },
  { label: "Value agent", href: "/value-agent" },
  { label: "Toolkit", href: "/toolkit" },
] as const;

export type NavKey = (typeof NAV)[number]["label"];

/**
 * The same header on every page: logo mark, name with role beneath it, four
 * nav links and the persistent "Let's talk" CTA. Sticky and translucent — the
 * only fixed element in the design system.
 */
export function SiteHeader({ current }: { current?: NavKey }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        background: "rgba(255,255,255,.88)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="shell site-header-row">
        <Link
          href="/#top"
          style={{ display: "flex", alignItems: "center", gap: 11, color: "var(--ink-900)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/assets/logo-mark.png")}
            alt=""
            style={{ width: 34, height: 34, borderRadius: 10, objectFit: "contain", flex: "none" }}
          />
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
            <span
              style={{
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              Basma Mahmoud
            </span>
            <span
              style={{
                fontSize: 9,
                fontWeight: 500,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--ink-400)",
              }}
            >
              Product Strategist
            </span>
          </span>
        </Link>

        <nav className="site-nav">
          {NAV.map((item) =>
            item.label === current ? (
              <span key={item.label} className="nav-link" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link key={item.label} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <HeaderCta />
      </div>
    </header>
  );
}
