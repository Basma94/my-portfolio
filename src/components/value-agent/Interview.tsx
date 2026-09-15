"use client";

import { CtaIcon, Icon } from "../Icon";
import { PHASES } from "@/data/value-agent";
import { T } from "@/lib/palette";
import { asset } from "@/lib/asset";
import {
  adoption,
  alignment,
  confidence,
  count,
  engine,
  feasibility,
  money,
  paybackLabel,
  recommend,
  sumCosts,
  type Assumptions,
  type BuildCosts,
  type RunCosts,
} from "@/lib/value-engine";
import { agentRead } from "@/lib/value-engine/document";
import { buildQuestions, challengeFor, type Question } from "@/lib/value-engine/questions";

export type InterviewProps = {
  assumptions: Assumptions;
  step: number;
  realisation: number;
  onSet: <K extends keyof Assumptions>(key: K, value: Assumptions[K]) => void;
  onSetNested: (group: "build" | "run", key: string, value: number) => void;
  onToggle: (key: "drivers" | "affected", value: string) => void;
  onStep: (step: number) => void;
  onFinish: () => void;
};

export function Interview({
  assumptions: a,
  step,
  realisation,
  onSet,
  onSetNested,
  onToggle,
  onStep,
  onFinish,
}: InterviewProps) {
  const questions = buildQuestions(a);
  const index = Math.min(step, questions.length - 1);
  const q = questions[index];

  const e = engine(a, realisation);
  const cf = confidence(a, e);
  const challenge = challengeFor(q, a, {
    softShare: cf.softShare,
    confidenceLabel: cf.label,
    baseline: e.baseline,
  });

  const isLast = index === questions.length - 1;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
        gap: 20,
        alignItems: "start",
        animation: "ava-fade 320ms cubic-bezier(.16,1,.3,1)",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--border-subtle)",
          borderRadius: 28,
          boxShadow: "0 10px 34px rgba(18,18,58,.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px clamp(20px,3vw,30px)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/assets/logo-mark.png")}
                alt=""
                style={{ width: 26, height: 26, borderRadius: 8, objectFit: "contain" }}
              />
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-800)" }}>
                AI business value agent
              </span>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--ink-400)",
              }}
            >
              Step {index + 1} of {questions.length}
            </span>
          </div>

          <div style={{ display: "flex", gap: 4, marginTop: 16 }}>
            {PHASES.map((p, i) => (
              <span
                key={p}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 999,
                  background:
                    i < q.phase
                      ? "linear-gradient(90deg,#00B1BE,#6366F1)"
                      : i === q.phase
                        ? T.indigo
                        : T.border,
                  transition: "background 200ms",
                }}
              />
            ))}
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--teal-600)",
            }}
          >
            Phase {q.phase + 1} · {PHASES[q.phase]}
          </div>
        </div>

        <div style={{ padding: "clamp(22px,3vw,32px)" }}>
          <h3
            style={{
              margin: 0,
              fontSize: "clamp(19px,2.5vw,25px)",
              fontWeight: 600,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: "var(--ink-900)",
              maxWidth: "32ch",
            }}
          >
            {q.prompt}
          </h3>
          <p
            style={{
              margin: "12px 0 0",
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--ink-500)",
              maxWidth: "46ch",
            }}
          >
            {q.help}
          </p>

          <QuestionControl
            question={q}
            assumptions={a}
            onSet={onSet}
            onSetNested={onSetNested}
            onToggle={onToggle}
          />

          {challenge && (
            <div
              style={{
                marginTop: 22,
                display: "flex",
                gap: 14,
                background: T.amberBg,
                border: `1px solid ${T.amberBd}`,
                borderRadius: 16,
                padding: 18,
                animation: "ava-rise 200ms cubic-bezier(.16,1,.3,1)",
              }}
            >
              <span
                style={{
                  flex: "none",
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: T.amberBd,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#7A4E00",
                }}
              >
                !
              </span>
              <div>
                <div
                  className="eyebrow-xs"
                  style={{ letterSpacing: "0.18em", color: T.amber }}
                >
                  I&rsquo;d challenge that
                </div>
                <p
                  style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.7, color: "#5C3D00" }}
                >
                  {challenge}
                </p>
              </div>
            </div>
          )}

          {q.type === "slider" && q.showsBaseline && (
            <div
              style={{
                marginTop: 20,
                background: "var(--teal-50)",
                border: `1px solid ${T.tealBd}`,
                borderRadius: 16,
                padding: 18,
              }}
            >
              <div
                className="eyebrow-xs"
                style={{ letterSpacing: "0.18em", color: "var(--teal-600)" }}
              >
                Annual baseline cost
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: T.tealD,
                }}
              >
                {money(e.baseline)}
              </div>
              <p
                style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.6, color: "var(--ink-600)" }}
              >
                {count(a.volume)} {a.unit} at €{a.costPerUnit.toFixed(2)} each. This is the number
                every benefit below is measured against.
              </p>
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: 28,
            }}
          >
            {index > 0 && (
              <button
                type="button"
                onClick={() => onStep(index - 1)}
                className="cta-quiet"
                style={{ padding: "12px 20px", fontSize: 14, color: "var(--ink-600)" }}
              >
                ← Back
              </button>
            )}
            <button
              type="button"
              onClick={() => (isLast ? onFinish() : onStep(index + 1))}
              className="cta"
              style={{ padding: "14px 26px", fontSize: 15 }}
            >
              {isLast ? "Build the business case" : "Next"} <CtaIcon />
            </button>
            <button
              type="button"
              onClick={onFinish}
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--ink-400)",
              }}
            >
              Jump to the dashboard
            </button>
          </div>
        </div>
      </div>

      <LiveCase assumptions={a} realisation={realisation} showAgentNote={index > 3} />
    </div>
  );
}

/* --------------------------------------------------------- the controls */

function QuestionControl({
  question: q,
  assumptions: a,
  onSet,
  onSetNested,
  onToggle,
}: {
  question: Question;
  assumptions: Assumptions;
  onSet: <K extends keyof Assumptions>(key: K, value: Assumptions[K]) => void;
  onSetNested: (group: "build" | "run", key: string, value: number) => void;
  onToggle: (key: "drivers" | "affected", value: string) => void;
}) {
  if (q.type === "text") {
    return (
      <textarea
        rows={4}
        value={(a[q.id] as string) || ""}
        onChange={(ev) => onSet(q.id, ev.target.value as never)}
        placeholder={q.placeholder}
        className="field"
        style={{ marginTop: 22, lineHeight: 1.6, resize: "vertical" }}
      />
    );
  }

  if (q.type === "choice") {
    const selected = (value: string) =>
      q.multi
        ? (a[q.id] as string[]).includes(value)
        : (a[q.id] as string) === value;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 22 }}>
        {q.options.map(([label, note]) => {
          const picked = selected(label);
          return (
            <button
              key={label}
              type="button"
              aria-pressed={picked}
              onClick={() =>
                q.multi
                  ? onToggle(q.id as "drivers" | "affected", label)
                  : onSet(q.id, label as never)
              }
              className="lift"
              style={{
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: 13,
                background: picked ? T.indigoBg : "#fff",
                border: `1px solid ${picked ? T.indigo : T.border}`,
                borderRadius: 14,
                padding: "14px 16px",
              }}
            >
              <span
                style={{
                  flex: "none",
                  width: 18,
                  height: 18,
                  borderRadius: q.multi ? 5 : "50%",
                  border: `1px solid ${picked ? T.indigo : "#D3D8E8"}`,
                  background: picked ? T.indigo : "#fff",
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                }}
              >
                {picked && <Icon name="check" size={12} />}
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span
                  style={{ fontSize: 15, fontWeight: 500, color: picked ? T.indigoD : T.ink }}
                >
                  {label}
                </span>
                {note && (
                  <span style={{ fontSize: 13, lineHeight: 1.55, color: "var(--ink-400)" }}>
                    {note}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  if (q.type === "slider") {
    return (
      <div style={{ marginTop: 24 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: "clamp(28px,4vw,40px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--ink-900)",
            }}
          >
            {q.display}
          </span>
          <span style={{ fontSize: 14, color: "var(--ink-400)" }}>{q.unit}</span>
        </div>
        <input
          type="range"
          aria-label={q.prompt}
          min={q.min}
          max={q.max}
          step={q.step}
          value={a[q.id] as number}
          onChange={(ev) => onSet(q.id, Number(ev.target.value) as never)}
          style={{ marginTop: 16 }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: "var(--ink-400)",
            marginTop: 4,
          }}
        >
          <span>{q.minLabel}</span>
          <span>{q.maxLabel}</span>
        </div>
        {q.units && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 18 }}>
            {q.units.map((u) => {
              const picked = a.unit === u;
              return (
                <button
                  key={u}
                  type="button"
                  onClick={() => onSet("unit", u)}
                  style={{
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 500,
                    borderRadius: 999,
                    padding: "7px 14px",
                    background: picked ? T.ink : "#fff",
                    border: `1px solid ${picked ? T.ink : T.border}`,
                    color: picked ? "#fff" : T.ink4,
                    transition: "all 120ms",
                  }}
                >
                  {u.split(" ")[0]}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Grouped cost sliders — itemised, with a running total.
  const group = a[q.id] as BuildCosts | RunCosts;
  return (
    <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
      {q.rows.map((r) => (
        <div
          key={r.key}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
            background: T.mist50,
            border: "1px solid var(--border-subtle)",
            borderRadius: 12,
            padding: "12px 14px",
          }}
        >
          <span
            style={{
              flex: 1,
              minWidth: 130,
              fontSize: 14,
              fontWeight: 500,
              color: "var(--ink-800)",
            }}
          >
            {r.label}
          </span>
          <input
            type="range"
            aria-label={r.label}
            min={r.min}
            max={r.max}
            step={r.step}
            value={(group as Record<string, number>)[r.key]}
            onChange={(ev) => onSetNested(q.id, r.key, Number(ev.target.value))}
            style={{ flex: 2, minWidth: 120 }}
          />
          <span
            style={{
              flex: "none",
              minWidth: 64,
              textAlign: "right",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--indigo-600)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {money((group as Record<string, number>)[r.key])}
          </span>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 16px",
          background: "var(--mist-100)",
          borderRadius: 12,
          fontSize: 15,
          fontWeight: 600,
          color: "var(--ink-900)",
        }}
      >
        <span>{q.totalLabel}</span>
        <span style={{ fontVariantNumeric: "tabular-nums" }}>{money(sumCosts(group))}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------ the live case, at right */

function LiveCase({
  assumptions: a,
  realisation,
  showAgentNote,
}: {
  assumptions: Assumptions;
  realisation: number;
  showAgentNote: boolean;
}) {
  const e = engine(a, realisation);
  const rec = recommend(a, e);
  const cf = confidence(a, e);
  const f = feasibility(a);
  const ad = adoption(a);
  const al = alignment(a);

  const kpis = [
    { k: "Net annual value", v: money(e.steady), fg: e.steady > 0 ? T.mint : T.soft },
    { k: "Year 1 ROI", v: `${Math.round(e.roi1)}%`, fg: "#fff" },
    { k: "Payback", v: paybackLabel(e.payback), fg: "#fff" },
    { k: "Gross annual value", v: money(e.gross), fg: "#fff" },
  ];

  const bandColour = (band: string) =>
    band === "High" || band === "Ready" || band === "Low"
      ? T.mint
      : band === "Medium" || band === "Partially ready"
        ? T.warm
        : T.soft;

  const mini = [
    { k: "AI feasibility", v: `${f.band} · ${f.score}`, fg: bandColour(f.band) },
    { k: "Data readiness", v: a.dataAvailable, fg: bandColour(a.dataAvailable) },
    { k: "Adoption complexity", v: ad.band, fg: bandColour(ad.band === "Low" ? "High" : ad.band) },
    { k: "Strategic alignment", v: `${al.band} · ${al.score}`, fg: bandColour(al.band) },
  ];

  return (
    <div
      style={{
        background: "var(--gradient-deep)",
        borderRadius: 28,
        padding: "clamp(20px,2.6vw,28px)",
        color: "#fff",
        boxShadow: "0 20px 50px rgba(18,18,58,.28)",
        position: "sticky",
        top: 84,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <span
          className="eyebrow-sm"
          style={{ color: "rgba(255,255,255,.55)" }}
        >
          Live business case
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: T.warm,
            background: "rgba(255,255,255,.12)",
            borderRadius: 999,
            padding: "4px 10px",
          }}
        >
          Updates as you answer
        </span>
      </div>

      <div style={{ marginTop: 20 }}>
        <div className="eyebrow-xs" style={{ color: "rgba(255,255,255,.5)" }}>
          Recommendation
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "clamp(24px,3.4vw,34px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: rec.color,
              transition: "color 320ms",
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
        <p
          style={{
            margin: "12px 0 0",
            fontSize: 14,
            lineHeight: 1.7,
            color: "rgba(255,255,255,.78)",
          }}
        >
          {rec.why}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          marginTop: 22,
          background: "rgba(255,255,255,.14)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {kpis.map((k) => (
          <div key={k.k} style={{ background: "rgba(255,255,255,.06)", padding: "16px 14px" }}>
            <div
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.55)",
              }}
            >
              {k.k}
            </div>
            <div
              style={{
                marginTop: 7,
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: k.fg,
              }}
            >
              {k.v}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 20,
          paddingTop: 18,
          borderTop: "1px solid rgba(255,255,255,.16)",
          display: "flex",
          flexDirection: "column",
          gap: 9,
        }}
      >
        {mini.map((s) => (
          <div
            key={s.k}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              justifyContent: "space-between",
              fontSize: 13,
            }}
          >
            <span style={{ color: "rgba(255,255,255,.6)" }}>{s.k}</span>
            <span style={{ fontWeight: 600, color: s.fg }}>{s.v}</span>
          </div>
        ))}
      </div>

      {showAgentNote && (
        <div
          style={{
            marginTop: 20,
            background: "rgba(255,255,255,.08)",
            borderRadius: 16,
            padding: 16,
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#5CE1D2",
            }}
          >
            Agent read
          </div>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: 13,
              lineHeight: 1.7,
              color: "rgba(255,255,255,.82)",
            }}
          >
            {agentRead(a, realisation)}
          </p>
        </div>
      )}
    </div>
  );
}
