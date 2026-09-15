"use client";

import { CtaIcon } from "../Icon";
import { GATE_CONTENTS } from "@/data/value-agent";
import { T } from "@/lib/palette";
import { confidence, engine, money, recommend, type Assumptions } from "@/lib/value-engine";

export type GateDetails = { name: string; email: string; org: string };

export function Gate({
  assumptions: a,
  realisation,
  details,
  error,
  onChange,
  onSubmit,
  onBack,
}: {
  assumptions: Assumptions;
  realisation: number;
  details: GateDetails;
  error: boolean;
  onChange: (patch: Partial<GateDetails>) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const e = engine(a, realisation);
  const rec = recommend(a, e);
  const cf = confidence(a, e);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
        gap: 20,
        alignItems: "start",
        animation: "ava-fade 320ms cubic-bezier(.16,1,.3,1)",
      }}
    >
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          onSubmit();
        }}
        style={{
          background: "#fff",
          border: "1px solid var(--border-subtle)",
          borderRadius: 28,
          padding: "clamp(24px,3.4vw,40px)",
          boxShadow: "0 10px 34px rgba(18,18,58,.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-mark.png"
            alt=""
            style={{ width: 26, height: 26, borderRadius: 8, objectFit: "contain" }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--ink-500)",
            }}
          >
            Business case ready
          </span>
        </div>

        <h3
          style={{
            margin: "20px 0 0",
            fontSize: "clamp(22px,3vw,32px)",
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            color: "var(--ink-900)",
            maxWidth: "22ch",
          }}
        >
          Where should I send <span className="gradient-phrase">the report?</span>
        </h3>
        <p
          style={{
            margin: "14px 0 0",
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--ink-500)",
            maxWidth: "44ch",
          }}
        >
          Eighteen sections, your assumption register, the pilot plan and the risk register —
          addressed to you, so it reads like a document rather than a screen.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: 14,
            marginTop: 26,
          }}
        >
          <Field label="Name">
            <input
              type="text"
              value={details.name}
              onChange={(ev) => onChange({ name: ev.target.value })}
              placeholder="Your name"
              className="field"
            />
          </Field>
          <Field label="Work email">
            <input
              type="email"
              value={details.email}
              onChange={(ev) => onChange({ email: ev.target.value })}
              placeholder="you@company.com"
              className="field"
              aria-invalid={error}
              style={error ? { borderColor: T.pinkBd } : undefined}
            />
          </Field>
        </div>

        <div style={{ marginTop: 14 }}>
          <Field
            label={
              <>
                Organisation{" "}
                <span
                  style={{
                    fontWeight: 400,
                    letterSpacing: 0,
                    textTransform: "none",
                    color: "var(--ink-300)",
                  }}
                >
                  · optional
                </span>
              </>
            }
          >
            <input
              type="text"
              value={details.org}
              onChange={(ev) => onChange({ org: ev.target.value })}
              placeholder="Company or team"
              className="field"
            />
          </Field>
        </div>

        {error && (
          <p style={{ margin: "14px 0 0", fontSize: 13, fontWeight: 500, color: T.pinkD }}>
            A valid email address, and the report is yours.
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 24,
          }}
        >
          <button type="submit" className="cta" style={{ padding: "14px 26px", fontSize: 15 }}>
            Send me the business case <CtaIcon />
          </button>
          <button
            type="button"
            onClick={onBack}
            className="cta-quiet"
            style={{ padding: "13px 22px", fontSize: 14, color: "var(--ink-600)" }}
          >
            Back to dashboard
          </button>
        </div>

        <p
          style={{
            margin: "20px 0 0",
            fontSize: 12,
            lineHeight: 1.7,
            color: "var(--ink-400)",
            maxWidth: "46ch",
          }}
        >
          This is a portfolio demo — nothing is stored or transmitted, and the report opens on
          screen for you to read, print or copy.
        </p>
      </form>

      <div
        style={{
          background: "var(--gradient-deep)",
          borderRadius: 28,
          padding: "clamp(22px,3vw,32px)",
          color: "#fff",
          boxShadow: "0 20px 50px rgba(18,18,58,.28)",
        }}
      >
        <div className="eyebrow-sm" style={{ color: "rgba(255,255,255,.55)" }}>
          What&rsquo;s in it
        </div>
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          {GATE_CONTENTS.map((g) => (
            <div key={g.n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span
                style={{
                  flex: "none",
                  width: 22,
                  height: 22,
                  borderRadius: 7,
                  background: "rgba(255,255,255,.12)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#5CE1D2",
                }}
              >
                {g.n}
              </span>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,.82)" }}>
                {g.t}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 24,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,.16)",
          }}
        >
          <div className="eyebrow-xs" style={{ color: "rgba(255,255,255,.5)" }}>
            Headline
          </div>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: rec.color,
              }}
            >
              {rec.label}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "rgba(255,255,255,.14)",
                borderRadius: 999,
                padding: "4px 10px",
              }}
            >
              {cf.label} confidence
            </span>
          </div>
          <div style={{ marginTop: 12, fontSize: 14, color: "rgba(255,255,255,.7)" }}>
            Net annual value {money(e.steady)}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--ink-400)",
          marginBottom: 8,
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
