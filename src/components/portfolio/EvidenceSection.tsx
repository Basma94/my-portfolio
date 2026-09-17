"use client";

import Link from "next/link";
import { CtaIcon, Icon } from "../Icon";
import { asset } from "@/lib/asset";
import { CALENDAR_URL, DEMOS, type Demo } from "@/data/portfolio";
import { events } from "@/lib/analytics";

export function EvidenceSection() {
  return (
    <section id="build" style={{ padding: "clamp(60px,8vw,112px) 24px" }}>
      <div className="shell">
        <div className="eyebrow">01 — Evidence</div>
        <h2 className="section-title">What have I built?</h2>
        <p className="section-lead">Products are where strategy becomes tangible.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 44 }}>
          {DEMOS.map((d, i) => (
            <DemoCard key={d.name} demo={d} imageFirst={i % 2 === 0} />
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            paddingTop: 30,
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            gap: 18,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <p style={{ margin: 0, fontSize: 16, color: "var(--ink-600)" }}>
            The products are the output. The judgement behind them is the point.
          </p>
          <Link
            href="#think"
            style={{ fontSize: 15, fontWeight: 600 }}
            onClick={() => events.ctaClick("evidence", "See how I think")}
          >
            See how I think <CtaIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * All four cards share one structure — text column, snapshot column — but
 * the snapshot is the lead visual, not a supporting thumbnail: it takes the
 * wider share of the row (see .demo-card in globals.css) and alternates
 * sides per card (imageFirst) so the eye lands on a different product shot
 * first each time, rather than always the same slot. A shared fixed height
 * (also in globals.css) keeps all four lined up regardless of copy length.
 */
function DemoCard({ demo: d, imageFirst }: { demo: Demo; imageFirst: boolean }) {
  const textColumn = (
      <div
        key="text"
        style={{
          padding: "clamp(24px,3vw,36px)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="eyebrow-sm" style={{ color: d.tone }}>
              {d.kicker}
            </div>
            <h3
              style={{
                margin: "10px 0 0",
                fontSize: "clamp(22px,2.6vw,28px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--ink-900)",
              }}
            >
              {d.name}
            </h3>
          </div>
          <span
            style={{
              flex: "none",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: d.tone,
              background: d.tint,
              border: `1px solid ${d.tintBorder}`,
              borderRadius: 999,
              padding: "5px 11px",
            }}
          >
            {d.status}
          </span>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.55,
            color: "var(--ink-700)",
            maxWidth: "40ch",
          }}
        >
          {d.value}
        </p>

        <dl
          style={{
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            flex: "1 1 auto",
          }}
        >
          {d.facts.map((f) => (
            <div key={f.k}>
              <dt className="eyebrow-xs" style={{ color: "var(--ink-400)" }}>
                {f.k}
              </dt>
              <dd
                style={{
                  margin: "4px 0 0",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--ink-700)",
                }}
              >
                {f.v}
              </dd>
            </div>
          ))}
        </dl>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 10,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
          }}
        >
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta"
            style={{ padding: "12px 22px", fontSize: 14 }}
            onClick={() => events.contactClick("calendar", d.name)}
          >
            Request demo <Icon name="calendar" size={16} />
          </a>
        </div>
      </div>
  );
  const imageColumn = (
      <div
        key="image"
        style={{
          background: "var(--mist-100)",
          padding: "clamp(20px,2.8vw,32px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF7E9E" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFE9A8" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#5CE1D2" }} />
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 10",
            borderRadius: 16,
            overflow: "hidden",
            background: d.tint,
            border: "1px solid var(--border-subtle)",
            boxShadow: `0 30px 60px -20px ${d.tone}4D, 0 16px 36px rgba(18,18,58,.14)`,
          }}
        >
          {/* Static snapshot, not a live embed — see the Demo type's comment
              in src/data/portfolio.ts for why. Every card shares this same
              16:10 frame so the cards line up; contain (not cover) means a
              portrait screenshot like Planzen's letterboxes on d.tint
              instead of being cropped, while the desktop screenshots (whose
              1280x800 capture is already ~16:10) fill it edge to edge either
              way. */}
          <img
            src={asset(d.snapshot)}
            alt={`${d.name} interface`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Request a demo of ${d.name}`}
            onClick={() => events.contactClick("calendar", d.name)}
            style={{ position: "absolute", inset: 0, display: "block" }}
          />
        </div>

        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.55, color: "var(--ink-500)" }}>
          {d.note}
        </p>
      </div>
  );

  return (
    <article
      className={`demo-card ${imageFirst ? "demo-card--image-first" : "demo-card--image-last"}`}
      style={{
        background: "#fff",
        border: "1px solid var(--border-subtle)",
        borderRadius: 28,
        boxShadow: "0 10px 34px rgba(18,18,58,.07)",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(330px,1fr))",
        alignItems: "stretch",
        minHeight: 520,
      }}
    >
      {imageFirst ? [imageColumn, textColumn] : [textColumn, imageColumn]}
    </article>
  );
}
