import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Toolkit } from "@/components/toolkit/Toolkit";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Product Toolkit",
  description:
    "A working product toolkit: the documents, templates and scoring models Basma Mahmoud uses across discovery, strategy, prioritisation, design, build, measurement, AI product management and AI portfolio management.",
};

export default function ToolkitPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", overflowX: "clip" }}>
      <SiteHeader current="Toolkit" />

      <section
        style={{
          background: "var(--gradient-wash)",
          padding: "clamp(56px,8vw,104px) 24px clamp(40px,5vw,64px)",
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
          <div className="eyebrow" style={{ color: "var(--teal-600)", marginTop: 24 }}>
            Product toolkit
          </div>
          <h1
            style={{
              margin: "18px 0 0",
              fontSize: "clamp(34px,5.2vw,58px)",
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: "var(--ink-900)",
              maxWidth: "20ch",
            }}
          >
            The documents I actually <span className="gradient-phrase">work from.</span>
          </h1>
          <p
            style={{
              margin: "18px 0 0",
              fontSize: 17,
              lineHeight: 1.7,
              color: "var(--ink-600)",
              maxWidth: "56ch",
            }}
          >
            Not a skills list. These are the artefacts a product decision leaves behind —
            one-pagers, scoring models, blueprints and registers. Each one has a purpose, an owner
            and a moment it is written.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
            <span className="label-chip" style={{ padding: "5px 12px" }}>
              Demo content
            </span>
            <span style={{ fontSize: 13, color: "var(--ink-500)" }}>
              Structures are real; any figures inside them are illustrative.
            </span>
          </div>
        </div>
      </section>

      <Toolkit />

      <section
        style={{
          background: "var(--gradient-deep)",
          padding: "clamp(56px,8vw,96px) 24px",
          color: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(26px,4vw,40px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                maxWidth: "24ch",
              }}
            >
              Want one of these written for your problem?
            </h2>
            <p style={{ margin: "14px 0 0", fontSize: 17, color: "rgba(255,255,255,.7)" }}>
              That is usually the fastest first step.
            </p>
          </div>
          <Link
            href="/#talk"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              color: "var(--ink-900)",
              borderRadius: 999,
              padding: "14px 26px",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Let&rsquo;s talk <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </section>

      <SiteFooter backLabel="Back to the portfolio" backHref="/" />
    </div>
  );
}
