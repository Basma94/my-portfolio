"use client";

import { useEffect, useState } from "react";
import { Icon } from "../Icon";
import { CAPABILITIES, MONTHS, QUARTERS, type Capability, type Feature } from "@/data/portfolio";
import { T } from "@/lib/palette";
import { boldNumbers, costOfDelay, wsjfBand, wsjfScore } from "@/lib/wsjf";

const GRID =
  "minmax(210px,1.5fr) minmax(170px,1fr) minmax(320px,2.6fr) 116px";

type OpenWsjf = { feature: Feature; capability: string; score: number };

export function RoadmapSection() {
  const [wsjf, setWsjf] = useState<OpenWsjf | null>(null);

  // Stagger the timeline bars so the rows animate in sequence.
  let rowIndex = 0;

  return (
    <section id="roadmap" style={{ padding: "clamp(60px,8vw,104px) 24px" }}>
      <div className="shell">
        <div className="eyebrow">05 — Roadmap</div>
        <h2
          className="section-title"
          style={{ fontSize: "clamp(28px,4vw,44px)", lineHeight: 1.1 }}
        >
          Outcomes, not quarters.
        </h2>
        <p className="section-lead" style={{ maxWidth: "54ch" }}>
          Understand, then act, then predict. Each horizon earns the next by proving something.
        </p>

        <div
          style={{
            marginTop: 36,
            background: "#fff",
            border: "1px solid var(--border-subtle)",
            borderRadius: 24,
            boxShadow: "0 6px 24px rgba(18,18,58,.06)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "24px clamp(18px,2.6vw,28px)",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "flex-end",
              gap: 16,
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div className="eyebrow-sm" style={{ color: "var(--teal-600)" }}>
                Delivery view
              </div>
              <h3
                style={{
                  margin: "10px 0 0",
                  fontSize: 20,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--ink-900)",
                }}
              >
                Capabilities, scored and sequenced
              </h3>
            </div>
            <span className="label-chip">Demo backlog · WSJF illustrative</span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: 900 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: GRID,
                  gap: 14,
                  padding: "12px clamp(18px,2.6vw,28px)",
                  background: "var(--mist-100)",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <span
                  className="eyebrow-xs"
                  style={{ letterSpacing: "0.14em", color: "var(--ink-400)", alignSelf: "end" }}
                >
                  Capability → Feature
                </span>
                <span
                  className="eyebrow-xs"
                  style={{ letterSpacing: "0.14em", color: "var(--ink-400)", alignSelf: "end" }}
                >
                  Business value
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <span style={{ display: "flex" }}>
                    {QUARTERS.map((q) => (
                      <span
                        key={q}
                        style={{
                          flex: 1,
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--ink-500)",
                          borderLeft: "1px solid rgba(18,18,58,.12)",
                          paddingLeft: 6,
                        }}
                      >
                        {q}
                      </span>
                    ))}
                  </span>
                  <span style={{ display: "flex" }}>
                    {MONTHS.map((mo, i) => (
                      <span
                        key={mo}
                        style={{
                          flex: 1,
                          fontSize: 9,
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: i % 3 === 0 ? T.ink7 : T.ink4,
                          textAlign: "center",
                        }}
                      >
                        {mo}
                      </span>
                    ))}
                  </span>
                </span>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    alignSelf: "end",
                    width: 114,
                  }}
                >
                  <span
                    className="eyebrow-xs"
                    style={{ letterSpacing: "0.14em", color: "var(--ink-400)" }}
                  >
                    WSJF
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--indigo-600)",
                    }}
                  >
                    <Icon name="lightbulb" size={12} /> Click to explain
                  </span>
                </span>
              </div>

              {CAPABILITIES.map((c) => (
                <div key={c.name}>
                  <CapabilityHeader capability={c} />
                  {c.features.map((f) => {
                    const delay = `${(rowIndex++ * 0.26).toFixed(2)}s`;
                    return (
                      <FeatureRow
                        key={f.name}
                        capability={c}
                        feature={f}
                        delay={delay}
                        onOpen={() =>
                          setWsjf({
                            feature: f,
                            capability: c.name,
                            score: wsjfScore(f),
                          })
                        }
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: "20px clamp(18px,2.6vw,28px)",
              borderTop: "1px solid var(--border-subtle)",
              fontSize: 13,
              lineHeight: 1.7,
              color: "var(--ink-600)",
            }}
          >
            Click any WSJF score to see the four inputs and the arithmetic behind it. WSJF = cost
            of delay ÷ job size — it sequences work of similar merit; it does not tell you whether
            the strategy is right. Bars show intended sequence, not committed dates.
          </div>
        </div>
      </div>

      {wsjf && <WsjfModal open={wsjf} onClose={() => setWsjf(null)} />}
    </section>
  );
}

function capabilityChipBg(tone: string) {
  return tone === "#00808B" ? T.tealBg : tone === "#4F46E5" ? T.indigoBg : T.violetBg;
}

function CapabilityHeader({ capability: c }: { capability: Capability }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px clamp(18px,2.6vw,28px)",
        background: c.horizon === "Now" ? T.mist50 : "#fff",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <span
        style={{
          flex: "none",
          width: 26,
          height: 26,
          borderRadius: 9,
          background: capabilityChipBg(c.tone),
          color: c.tone,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Icon name={c.icon} size={14} />
      </span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: c.tone,
        }}
      >
        {c.name}
      </span>
      <span style={{ fontSize: 12, color: "var(--ink-400)" }}>
        {c.features.length} features
      </span>
      <span
        style={{
          marginLeft: "auto",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: c.tone,
          background: capabilityChipBg(c.tone),
          borderRadius: 999,
          padding: "4px 10px",
        }}
      >
        {c.horizon}
      </span>
    </div>
  );
}

function FeatureRow({
  capability: c,
  feature: f,
  delay,
  onOpen,
}: {
  capability: Capability;
  feature: Feature;
  delay: string;
  onOpen: () => void;
}) {
  const score = wsjfScore(f);
  const band = wsjfBand(score);
  const bar =
    band === "high"
      ? "linear-gradient(90deg,#00B1BE,#3B82F6)"
      : band === "mid"
        ? "linear-gradient(90deg,#3B82F6,#6366F1)"
        : "linear-gradient(90deg,#7F56D9,#C4B5FD)";
  const fg = band === "high" ? T.tealD : band === "mid" ? T.indigoD : T.ink4;
  const bg = band === "high" ? T.tealBg : band === "mid" ? T.indigoBg : T.mist;
  const border = band === "high" ? T.tealBd : band === "mid" ? T.indigoBd : T.border;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: GRID,
        gap: 14,
        padding: "15px clamp(18px,2.6vw,28px)",
        borderTop: "1px solid var(--border-subtle)",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <span style={{ display: "flex", alignItems: "flex-start", gap: 10, minWidth: 0 }}>
        <span
          style={{
            flex: "none",
            width: 2,
            alignSelf: "stretch",
            borderRadius: 999,
            background: c.tone,
            opacity: 0.35,
          }}
        />
        <span
          style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, color: "var(--ink-900)" }}
        >
          {f.name}
        </span>
      </span>

      <span
        className="clamp-2"
        style={{ fontSize: 13, lineHeight: 1.55, color: "var(--ink-700)" }}
      >
        {boldNumbers(f.value).map((part, i) => (
          <span
            key={i}
            style={{ fontWeight: part.bold ? 700 : 400, color: part.bold ? T.ink : T.ink7 }}
          >
            {part.t}
          </span>
        ))}
      </span>

      <span
        style={{
          position: "relative",
          display: "block",
          height: 24,
          borderRadius: 8,
          background: "var(--mist-100)",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(90deg,rgba(18,18,58,.07) 1px,transparent 1px)",
            backgroundSize: "8.333% 100%",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 4,
            bottom: 4,
            left: `${((f.start - 1) / 12) * 100}%`,
            width: `${(f.span / 12) * 100 - 1.5}%`,
            borderRadius: 999,
            background: bar,
            boxShadow: "0 4px 12px rgba(18,18,58,.14)",
            animation: `bar-slide 4.8s cubic-bezier(.4,0,.2,1) ${delay} infinite`,
          }}
        />
      </span>

      <button
        type="button"
        onClick={onOpen}
        title="See how this WSJF was calculated"
        className="lift"
        style={{
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          background: bg,
          border: `1px solid ${border}`,
          borderRadius: 999,
          padding: "7px 12px",
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: fg,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {score.toFixed(1)} <Icon name="chevron-right" size={14} />
      </button>
    </div>
  );
}

/** The four inputs, the arithmetic, and why this feature scored where it did. */
function WsjfModal({ open, onClose }: { open: OpenWsjf; onClose: () => void }) {
  const { feature: f, capability, score } = open;
  const cod = costOfDelay(f);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const rows: { k: string; v: number; note: string; isSize?: boolean }[] = [
    {
      k: "Business value",
      v: f.bv,
      note: "Relative value to the business and the customer if delivered.",
    },
    {
      k: "Time criticality",
      v: f.tc,
      note: "How fast the value decays if we delay — deadlines, decay, competitive windows.",
    },
    {
      k: "Risk reduction & opportunity enablement",
      v: f.rr,
      note: "What it de-risks or unlocks for the work that comes after it.",
    },
    {
      k: "Job size",
      v: f.size,
      note: "Relative effort, not days. Estimated by the team, not the sponsor.",
      isSize: true,
    },
  ];

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`WSJF for ${f.name}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 95,
        background: "rgba(18,18,58,.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        overflowY: "auto",
        padding: "clamp(12px,4vw,48px) 16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 560,
          height: "max-content",
          background: "#fff",
          borderRadius: 28,
          boxShadow: "0 40px 90px rgba(18,18,58,.35)",
          animation: "rise 320ms cubic-bezier(.16,1,.3,1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "24px clamp(20px,3vw,32px)",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="eyebrow-sm" style={{ color: "var(--teal-600)" }}>
              WSJF · how this number was reached
            </div>
            <h3
              style={{
                margin: "10px 0 0",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--ink-900)",
              }}
            >
              {f.name}
            </h3>
            <div style={{ marginTop: 4, fontSize: 13, color: "var(--ink-400)" }}>{capability}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              flex: "none",
              cursor: "pointer",
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid var(--border-subtle)",
              background: "#fff",
              color: "var(--ink-600)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        <div style={{ padding: "clamp(20px,3vw,32px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {rows.map((r) => (
              <div
                key={r.k}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  justifyContent: "space-between",
                  padding: "13px 16px",
                  background: r.isSize ? T.pinkBg : T.mist50,
                  border: `1px solid ${r.isSize ? T.pinkBd : T.border}`,
                  borderRadius: 14,
                }}
              >
                <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-900)" }}>
                    {r.k}
                  </span>
                  <span style={{ fontSize: 12, lineHeight: 1.55, color: "var(--ink-500)" }}>
                    {r.note}
                  </span>
                </span>
                <span
                  style={{
                    flex: "none",
                    fontSize: 20,
                    fontWeight: 700,
                    color: r.isSize ? T.pinkD : T.tealD,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {r.v}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 22,
              background: "var(--gradient-deep)",
              borderRadius: 20,
              padding: 22,
              color: "#fff",
            }}
          >
            <div
              className="eyebrow-xs"
              style={{ letterSpacing: "0.2em", color: "rgba(255,255,255,.55)" }}
            >
              The equation
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 14,
                lineHeight: 1.7,
                color: "rgba(255,255,255,.82)",
              }}
            >
              WSJF = cost of delay ÷ job size
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: 14,
                lineHeight: 1.7,
                color: "rgba(255,255,255,.82)",
              }}
            >
              Cost of delay = business value + time criticality + risk reduction
            </div>
            <div
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTop: "1px solid rgba(255,255,255,.18)",
                fontSize: 15,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              ({f.bv} + {f.tc} + {f.rr}) ÷ {f.size} = {cod} ÷ {f.size} = {score.toFixed(1)}
            </div>
          </div>

          <p
            style={{
              margin: "20px 0 0",
              fontSize: 13,
              lineHeight: 1.75,
              color: "var(--ink-600)",
            }}
          >
            {f.reading}
          </p>
          <p
            style={{
              margin: "12px 0 0",
              fontSize: 12,
              lineHeight: 1.7,
              color: "var(--ink-400)",
            }}
          >
            Scores are relative, not absolute — a 14 only means something next to a 4. WSJF
            sequences work of similar merit; it does not tell you whether the strategy is right.
            Values here are illustrative demo data.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="cta"
            style={{ marginTop: 22, padding: "13px 24px", fontSize: 15 }}
          >
            Back to the roadmap
          </button>
        </div>
      </div>
    </div>
  );
}
