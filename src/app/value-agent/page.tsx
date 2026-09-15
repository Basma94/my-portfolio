import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ValueAgent } from "@/components/value-agent/ValueAgent";

export const metadata: Metadata = {
  title: "AI Business Value Agent",
  description:
    "A Gartner-inspired AI business value assessment: interview, value engine, feasibility and readiness scoring, opportunity matrix and a generated executive business case.",
};

export default function ValueAgentPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", overflowX: "clip" }}>
      <SiteHeader current="Value agent" />

      <section
        style={{
          background: "var(--gradient-wash)",
          padding: "clamp(40px,6vw,72px) 24px clamp(48px,7vw,88px)",
        }}
      >
        <div className="shell">
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              fontWeight: 500,
              color: "var(--ink-500)",
            }}
          >
            Back to the portfolio
          </Link>
          <div style={{ marginTop: 28 }}>
            <ValueAgent />
          </div>
        </div>
      </section>

      <SiteFooter backLabel="Back to the portfolio" backHref="/" />
    </div>
  );
}
