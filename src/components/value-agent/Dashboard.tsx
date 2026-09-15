"use client";

import Link from "next/link";
import { CtaIcon, Icon } from "../Icon";
import { T } from "@/lib/palette";
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
  valueScore,
  type Assumptions,
} from "@/lib/value-engine";

export type DashboardProps = {
  assumptions: Assumptions;
  realisation: number;
  scenario: string;
  isExample: boolean;
  assumptionsOpen: boolean;
  onScenario: (label: string, realisation: number) => void;
  onRealisation: (value: number) => void;
  onToggleAssumptions: () => void;
  onOpenAssumptions: () => void;
  onGenerateCase: () => void;
  onRestart: () => void;
  onEditAnswers: () => void;
};

const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid var(--border-subtle)",
  borderRadius: 24,
  padding: 28,
  boxShadow: "0 6px 24px rgba(18,18,58,.06)",
};

export function Dashboard(props: DashboardProps) {
  const { assumptions: a, realisation, scenario, isExample } = props;

  const e = engine(a, realisation);
  const f = feasibility(a);
  const ad = adoption(a);
  const cf = confidence(a, e);
  const al = alignment(a);
  const rec = recommend(a, e);
  const vs = valueScore(e);

  const caseName = a.problem
    ? a.problem.length > 90
      ? `${a.problem.slice(0, 90).trim()}…`
      : a.problem
    : `${a.solutionType} for ${a.outcome.toLowerCase()}`;

  const caseSub = `${a.solutionType} · ${a.aiRole.toLowerCase()} in workflow · ${a.affected.join(
    ", ",
  )}${isExample ? " · demo use case, synthetic inputs" : ""}`;

  const execSummary = `The proposed AI use case could generate approximately ${money(
    e.gross,
  )} in annual gross value at full run-rate, of which ${money(
    e.savings,
  )} is direct cost saving against a ${money(e.baseline)} baseline. After ${money(
    e.run,
  )} of annual run cost and ${money(
    e.change,
  )} of change cost, steady-state net annual value is ${money(
    e.steady,
  )}, on an initial investment of ${money(
    e.build,
  )}. The opportunity has ${f.band.toLowerCase()} feasibility (${f.score}/100), ${a.dataAvailable.toLowerCase()} data and ${ad.band.toLowerCase()} adoption complexity, at ${cf.label.toLowerCase()} value confidence. ${rec.why}`;

  const kpis = [
    {
      k: "Net annual value",
      v: money(e.steady),
      fg: e.steady > 0 ? T.mint : T.soft,
      note: "steady state",
    },
    { k: "Year 1 ROI", v: `${Math.round(e.roi1)}%`, fg: "#fff", note: "ramped benefit" },
    {
      k: "Payback",
      v: paybackLabel(e.payback),
      fg: "#fff",
      note: e.payback > 36 ? "not within 36 months" : "on initial investment",
    },
    { k: "Gross annual value", v: money(e.gross), fg: "#fff", note: "at full run-rate" },
  ];

  return (
    <div style={{ animation: "ava-fade 320ms cubic-bezier(.16,1,.3,1)" }}>
      {/* Executive header */}
      <div
        style={{
          background: "var(--gradient-deep)",
          borderRadius: 28,
          padding: "clamp(24px,3.4vw,40px)",
          color: "#fff",
          boxShadow: "0 24px 60px rgba(18,18,58,.30)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 20,
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              className="eyebrow-sm"
              style={{ letterSpacing: "0.24em", color: "rgba(255,255,255,.55)" }}
            >
              AI business value assessment
            </div>
            <h3
              style={{
                margin: "12px 0 0",
                fontSize: "clamp(22px,3.2vw,34px)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "#fff",
                maxWidth: "30ch",
              }}
            >
              {caseName}
            </h3>
            <p style={{ margin: "10px 0 0", fontSize: 14, color: "rgba(255,255,255,.6)" }}>
              {caseSub}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="eyebrow-xs" style={{ color: "rgba(255,255,255,.5)" }}>
              Recommendation
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: "clamp(26px,4vw,40px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: rec.color,
              }}
            >
              {rec.label}
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.7)",
              }}
            >
              Confidence {cf.label}
            </div>
          </div>
        </div>

        <p
          style={{
            margin: "24px 0 0",
            fontSize: "clamp(15px,1.9vw,17px)",
            lineHeight: 1.75,
            color: "rgba(255,255,255,.85)",
            maxWidth: "76ch",
            paddingTop: 22,
            borderTop: "1px solid rgba(255,255,255,.16)",
          }}
        >
          {execSummary}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
            gap: 1,
            marginTop: 26,
            background: "rgba(255,255,255,.14)",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {kpis.map((k) => (
            <div key={k.k} style={{ background: "rgba(255,255,255,.06)", padding: "20px 18px" }}>
              <div
                className="eyebrow-xs"
                style={{ letterSpacing: "0.14em", color: "rgba(255,255,255,.55)" }}
              >
                {k.k}
              </div>
              <div
                style={{
                  marginTop: 9,
                  fontSize: "clamp(22px,3vw,28px)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: k.fg,
                }}
              >
                {k.v}
              </div>
              <div style={{ marginTop: 5, fontSize: 11, color: "rgba(255,255,255,.45)" }}>
                {k.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))",
          gap: 20,
          marginTop: 20,
          alignItems: "start",
        }}
      >
        <ValueBuildUp assumptions={a} realisation={realisation} />
        <ReadinessScorecard assumptions={a} realisation={realisation} />
        <OpportunityMatrix
          feasibilityScore={f.score}
          valueScoreValue={vs}
          weakest={f.weakest}
          steady={e.steady}
          roi3={e.roi3}
        />
        <CostProfile assumptions={a} realisation={realisation} />
        <RealisationChart assumptions={a} realisation={realisation} />
      </div>

      <AssumptionRegister
        assumptions={a}
        realisation={realisation}
        open={props.assumptionsOpen}
        onToggle={props.onToggleAssumptions}
      />

      <Sensitivity
        assumptions={a}
        realisation={realisation}
        scenario={scenario}
        onScenario={props.onScenario}
        onRealisation={props.onRealisation}
      />

      <NextActions
        onGenerateCase={props.onGenerateCase}
        onOpenAssumptions={props.onOpenAssumptions}
        onRestart={props.onRestart}
        onEditAnswers={props.onEditAnswers}
      />

      <p
        style={{
          margin: "20px 0 0",
          fontSize: 12,
          lineHeight: 1.7,
          color: "var(--ink-400)",
        }}
      >
        {al.band} strategic alignment ({al.score}/100). Every figure on this page is calculated
        from the inputs you supplied — none of it is a reported result.
      </p>
    </div>
  );
}

/* ------------------------------------------------------- value build-up */

function ValueBuildUp({
  assumptions: a,
  realisation,
}: {
  assumptions: Assumptions;
  realisation: number;
}) {
  const e = engine(a, realisation);
  const softLabel = (x: number) => (x > 0 ? "Modelled" : "—");

  const rows = [
    {
      k: "Annual cost savings",
      v: money(e.savings),
      tag:
        e.savings > 0
          ? `User input · ${a.reduction}% of ${a.addressable}% addressable`
          : "Not selected",
      fg: T.ink7,
      tagFg: T.ink4,
      weight: 400,
      size: 14,
      padTop: 0,
      rule: "none",
    },
    {
      k: "Annual revenue opportunity",
      v: money(e.revenue),
      tag: e.revenue > 0 ? `Estimated · ${a.revenueRealisation}% realised` : "Not selected",
      fg: T.ink7,
      tagFg: T.ink4,
      weight: 400,
      size: 14,
      padTop: 0,
      rule: "none",
    },
    {
      k: "Productivity value",
      v: money(e.productivity),
      tag: `${softLabel(e.productivity)} · not cash`,
      fg: T.ink7,
      tagFg: T.amber,
      weight: 400,
      size: 14,
      padTop: 0,
      rule: "none",
    },
    {
      k: "Customer experience value",
      v: money(e.cx),
      tag: e.cx > 0 ? `Estimated · ${a.cxMetric.toLowerCase()}` : "Not selected",
      fg: T.ink7,
      tagFg: T.ink4,
      weight: 400,
      size: 14,
      padTop: 0,
      rule: "none",
    },
    {
      k: "Risk reduction",
      v: money(e.risk),
      tag: `${softLabel(e.risk)} · not guaranteed`,
      fg: T.ink7,
      tagFg: T.amber,
      weight: 400,
      size: 14,
      padTop: 0,
      rule: "none",
    },
    {
      k: "Annual gross value",
      v: money(e.gross),
      tag: "Sum of selected drivers",
      fg: T.ink,
      tagFg: T.ink4,
      weight: 600,
      size: 17,
      padTop: 12,
      rule: `1px solid ${T.border}`,
    },
    {
      k: "Less annual run and change cost",
      v: `−${money(e.run + e.change)}`,
      tag: "Itemised in the cost model",
      fg: T.pinkD,
      tagFg: T.ink4,
      weight: 400,
      size: 14,
      padTop: 0,
      rule: "none",
    },
    {
      k: "Net annual value",
      v: money(e.steady),
      tag: "Steady state, excludes build",
      fg: e.steady > 0 ? T.tealD : T.pinkD,
      tagFg: T.ink4,
      weight: 700,
      size: 22,
      padTop: 12,
      rule: `1px solid ${T.border}`,
    },
    {
      k: "Initial investment",
      v: money(e.build),
      tag: "One-off, year one",
      fg: T.ink7,
      tagFg: T.ink4,
      weight: 400,
      size: 14,
      padTop: 12,
      rule: `1px solid ${T.border}`,
    },
    {
      k: "Three-year net value",
      v: money(e.net3),
      tag: `${Math.round(e.roi3)}% three-year ROI`,
      fg: e.net3 > 0 ? T.tealD : T.pinkD,
      tagFg: T.ink4,
      weight: 600,
      size: 17,
      padTop: 0,
      rule: "none",
    },
  ];

  return (
    <div style={card}>
      <div className="eyebrow-sm" style={{ color: "var(--ink-400)" }}>
        Value build-up
      </div>
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 11 }}>
        {rows.map((b) => (
          <div
            key={b.k}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              justifyContent: "space-between",
              paddingTop: b.padTop,
              borderTop: b.rule,
            }}
          >
            <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: 14, fontWeight: b.weight, color: b.fg }}>{b.k}</span>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: b.tagFg,
                }}
              >
                {b.tag}
              </span>
            </span>
            <span
              style={{
                fontSize: b.size,
                fontWeight: b.weight,
                color: b.fg,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {b.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------- readiness scorecard */

function ReadinessScorecard({
  assumptions: a,
  realisation,
}: {
  assumptions: Assumptions;
  realisation: number;
}) {
  const e = engine(a, realisation);
  const f = feasibility(a);
  const ad = adoption(a);
  const cf = confidence(a, e);
  const al = alignment(a);

  const good = (b: string) => b === "High" || b === "Ready" || b === "Low";
  const mid = (b: string) => b === "Medium" || b === "Partially ready";
  const fg = (b: string) => (good(b) ? T.tealD : mid(b) ? T.amber : T.pinkD);
  const bg = (b: string) => (good(b) ? T.tealBg : mid(b) ? T.amberBg : T.pinkBg);
  const bd = (b: string) => (good(b) ? T.tealBd : mid(b) ? T.amberBd : T.pinkBd);

  const cells = [
    { k: "AI feasibility", v: f.band, note: `${f.score} / 100`, band: f.band },
    {
      k: "Data readiness",
      v: a.dataAvailable,
      note: `${a.dataQuality.toLowerCase()} quality`,
      band:
        a.dataAvailable === "Ready"
          ? "High"
          : a.dataAvailable === "Partially ready"
            ? "Medium"
            : "Low",
    },
    {
      k: "Adoption complexity",
      v: ad.band,
      note: a.interaction.toLowerCase(),
      band: ad.band === "Low" ? "High" : ad.band === "Medium" ? "Medium" : "Low",
    },
    { k: "Value confidence", v: cf.label, note: `${cf.score} / 100`, band: cf.label },
    { k: "Strategic alignment", v: al.band, note: `${al.score} / 100`, band: al.band },
    {
      k: "Time to value",
      v: a.firstValue,
      note: "first value",
      band:
        a.firstValue === "<3 months" || a.firstValue === "3–6 months"
          ? "High"
          : a.firstValue === "6–12 months"
            ? "Medium"
            : "Low",
    },
  ];

  return (
    <div style={card}>
      <div className="eyebrow-sm" style={{ color: "var(--ink-400)" }}>
        Readiness scorecard
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}
      >
        {cells.map((s) => (
          <div
            key={s.k}
            style={{
              background: bg(s.band),
              border: `1px solid ${bd(s.band)}`,
              borderRadius: 16,
              padding: 16,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-400)",
              }}
            >
              {s.k}
            </div>
            <div style={{ marginTop: 8, fontSize: 17, fontWeight: 700, color: fg(s.band) }}>
              {s.v}
            </div>
            <div style={{ marginTop: 4, fontSize: 11, color: "var(--ink-400)" }}>{s.note}</div>
          </div>
        ))}
      </div>
      <p style={{ margin: "18px 0 0", fontSize: 13, lineHeight: 1.7, color: "var(--ink-600)" }}>
        Feasibility {f.score}/100 — {f.score >= 70 ? "strong technical feasibility" : "constrained"},
        main constraint {f.weakest.toLowerCase()}. Adoption complexity is {ad.band.toLowerCase()}{" "}
        given {a.interaction.toLowerCase()} use and {a.workflowChange.toLowerCase()} workflow
        change. Confidence is {cf.label.toLowerCase()} because {cf.softShare}% of value is modelled
        rather than measured, on an evidence base of {a.evidence.toLowerCase()}.
      </p>
    </div>
  );
}

/* -------------------------------------------------- AI opportunity matrix */

const QUADRANTS = [
  {
    name: "Strategic bet",
    sub: "High value, low feasibility",
    justify: "flex-start",
    bg: "rgba(127,86,217,.05)",
    fg: "#6941C6",
  },
  {
    name: "Likely win",
    sub: "High value, high feasibility",
    justify: "flex-start",
    bg: "rgba(0,177,190,.07)",
    fg: T.tealD,
  },
  {
    name: "Deprioritise",
    sub: "Low value, low feasibility",
    justify: "flex-end",
    bg: "rgba(255,126,158,.05)",
    fg: T.pinkD,
  },
  {
    name: "Quick efficiency",
    sub: "Low value, high feasibility",
    justify: "flex-end",
    bg: "rgba(99,102,241,.05)",
    fg: T.indigoD,
  },
];

function OpportunityMatrix({
  feasibilityScore,
  valueScoreValue,
  weakest,
  steady,
  roi3,
}: {
  feasibilityScore: number;
  valueScoreValue: number;
  weakest: string;
  steady: number;
  roi3: number;
}) {
  const quadrant =
    valueScoreValue >= 50
      ? feasibilityScore >= 50
        ? "likely win"
        : "strategic bet"
      : feasibilityScore >= 50
        ? "quick efficiency"
        : "deprioritise";

  return (
    <div style={card}>
      <div className="eyebrow-sm" style={{ color: "var(--ink-400)" }}>
        AI opportunity matrix
      </div>
      <div
        style={{
          position: "relative",
          marginTop: 22,
          aspectRatio: "1",
          width: "100%",
          border: "1px solid var(--border-subtle)",
          borderRadius: 18,
          overflow: "hidden",
          background: "linear-gradient(135deg,#FBFCFE,#F4F6FC)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
          }}
        >
          {QUADRANTS.map((q) => (
            <div
              key={q.name}
              style={{
                border: "0.5px solid rgba(18,18,58,.07)",
                padding: 14,
                display: "flex",
                flexDirection: "column",
                justifyContent: q.justify,
                background: q.bg,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "-0.01em", color: q.fg }}>
                {q.name}
              </div>
              <div
                style={{ marginTop: 4, fontSize: 10, lineHeight: 1.5, color: "var(--ink-400)" }}
              >
                {q.sub}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: `${Math.max(6, Math.min(94, feasibilityScore))}%`,
            bottom: `${Math.max(6, Math.min(94, valueScoreValue))}%`,
            transform: "translate(-50%,50%)",
            transition: "all 480ms cubic-bezier(.16,1,.3,1)",
          }}
        >
          <span
            style={{
              display: "block",
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "var(--gradient-cta)",
              boxShadow: "0 0 0 6px rgba(0,177,190,.18),0 6px 18px rgba(18,18,58,.2)",
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-400)",
        }}
      >
        <span>
          Feasibility <CtaIcon />
        </span>
        <span>Business value ↑</span>
      </div>
      <p style={{ margin: "16px 0 0", fontSize: 13, lineHeight: 1.7, color: "var(--ink-600)" }}>
        Value scores {valueScoreValue}/100 (from {money(steady)} steady-state net value and{" "}
        {Math.round(roi3)}% three-year ROI) against feasibility of {feasibilityScore}/100. That
        places this use case in the {quadrant} quadrant. Moving {weakest.toLowerCase()} is the
        fastest way to move it right; validating the benefit assumption is the fastest way to move
        it up.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------- cost profile */

function CostProfile({
  assumptions: a,
  realisation,
}: {
  assumptions: Assumptions;
  realisation: number;
}) {
  const e = engine(a, realisation);
  const max = Math.max(e.build, e.run, e.change, e.c3, 1);

  const rows = [
    {
      k: "Build cost (one-off)",
      v: money(e.build),
      w: (e.build / max) * 100,
      bar: "linear-gradient(90deg,#6366F1,#7F56D9)",
    },
    {
      k: "Annual run cost",
      v: money(e.run),
      w: (e.run / max) * 100,
      bar: "linear-gradient(90deg,#00B1BE,#3B82F6)",
    },
    {
      k: "Annual change cost",
      v: money(e.change),
      w: (e.change / max) * 100,
      bar: "linear-gradient(90deg,#FF7E9E,#FFB3C6)",
    },
    { k: "Three-year total cost", v: money(e.c3), w: (e.c3 / max) * 100, bar: T.ink },
  ];

  return (
    <div style={card}>
      <div className="eyebrow-sm" style={{ color: "var(--ink-400)" }}>
        Cost profile
      </div>
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
        {rows.map((c) => (
          <div key={c.k}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--ink-700)",
              }}
            >
              <span>{c.k}</span>
              <span
                style={{
                  fontVariantNumeric: "tabular-nums",
                  color: "var(--ink-900)",
                  fontWeight: 600,
                }}
              >
                {c.v}
              </span>
            </div>
            <div
              style={{
                height: 8,
                borderRadius: 999,
                background: "var(--mist-100)",
                marginTop: 7,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 999,
                  width: `${c.w}%`,
                  background: c.bar,
                  transition: "width 480ms cubic-bezier(.16,1,.3,1)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: "1px solid var(--border-subtle)",
          fontSize: 13,
          lineHeight: 1.7,
          color: "var(--ink-600)",
        }}
      >
        Run cost is {Math.round(e.build > 0 ? (e.run / e.build) * 100 : 0)}% of build cost
        {a.scaleCost === "Yes"
          ? ", including a 15% allowance for cost that scales with usage"
          : ""}
        . Human oversight accounts for {money(a.run.oversight)} of it — a real product cost, not an
        implementation detail.
      </div>
    </div>
  );
}

/* ------------------------------------------------ three-year realisation */

function RealisationChart({
  assumptions: a,
  realisation,
}: {
  assumptions: Assumptions;
  realisation: number;
}) {
  const e = engine(a, realisation);
  const maxBar = Math.max(e.gross, e.y1Cost, Math.abs(e.net3), 1);

  const raw = [
    { label: "Year 1", gross: e.y1Gross, cost: e.y1Cost, net: e.y1Net },
    {
      label: "Year 2",
      gross: e.gross * 0.85,
      cost: e.run + e.change * 0.4,
      net: e.gross * 0.85 - (e.run + e.change * 0.4),
    },
    {
      label: "Year 3",
      gross: e.gross,
      cost: e.run + e.change * 0.4,
      net: e.gross - (e.run + e.change * 0.4),
    },
  ];

  let cumulative = 0;
  const years = raw.map((r) => {
    cumulative += r.net;
    return {
      label: r.label,
      net: money(r.net),
      cum: money(cumulative),
      grossH: `${Math.max(3, (r.gross / maxBar) * 100)}%`,
      costH: `${Math.max(3, (r.cost / maxBar) * 100)}%`,
      cumH: `${Math.max(3, (Math.abs(cumulative) / maxBar) * 100)}%`,
      cumBg: cumulative >= 0 ? T.ink : T.pinkD,
    };
  });

  return (
    <div style={{ ...card, gridColumn: "1 / -1" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div className="eyebrow-sm" style={{ color: "var(--ink-400)" }}>
          Value realisation · three years
        </div>
        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            fontSize: 11,
            color: "var(--ink-500)",
          }}
        >
          <Legend swatch="linear-gradient(90deg,#00B1BE,#3B82F6)" label="Gross value" />
          <Legend swatch="#FFB3C6" label="Cost" />
          <Legend swatch="#12123A" label="Cumulative net" />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 16,
          marginTop: 24,
          alignItems: "end",
          minHeight: 200,
        }}
      >
        {years.map((y) => (
          <div key={y.label} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 150 }}>
              <div
                style={{
                  flex: 1,
                  borderRadius: "8px 8px 0 0",
                  height: y.grossH,
                  background: "linear-gradient(180deg,#3B82F6,#00B1BE)",
                  transition: "height 480ms cubic-bezier(.16,1,.3,1)",
                }}
              />
              <div
                style={{
                  flex: 1,
                  borderRadius: "8px 8px 0 0",
                  height: y.costH,
                  background: "#FFB3C6",
                  transition: "height 480ms cubic-bezier(.16,1,.3,1)",
                }}
              />
              <div
                style={{
                  flex: 1,
                  borderRadius: "8px 8px 0 0",
                  height: y.cumH,
                  background: y.cumBg,
                  transition: "height 480ms cubic-bezier(.16,1,.3,1)",
                }}
              />
            </div>
            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 10 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ink-500)",
                }}
              >
                {y.label}
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--ink-900)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {y.net}
              </div>
              <div style={{ fontSize: 11, color: "var(--ink-400)" }}>
                net · cumulative {y.cum}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 10, height: 10, borderRadius: 3, background: swatch }} />
      {label}
    </span>
  );
}

/* ---------------------------------------------------- assumption register */

function AssumptionRegister({
  assumptions: a,
  realisation,
  open,
  onToggle,
}: {
  assumptions: Assumptions;
  realisation: number;
  open: boolean;
  onToggle: () => void;
}) {
  const e = engine(a, realisation);
  const grid = "2fr 1fr 1.2fr 1fr 1fr";

  const rows = [
    { k: "Annual volume", v: count(a.volume), src: "User input", conf: "High", impact: "Scales all value" },
    {
      k: "Cost per unit",
      v: `€${a.costPerUnit.toFixed(2)}`,
      src: "User input",
      conf: a.evidence.startsWith("Measured") ? "High" : "Medium",
      impact: "Sets the baseline",
    },
    {
      k: "Expected cost reduction",
      v: `${a.reduction}%`,
      src: "User assumption",
      conf: a.reduction > 40 ? "Low" : "Medium",
      impact: "Direct on savings",
    },
    {
      k: "AI-addressable share",
      v: `${a.addressable}%`,
      src: "User assumption",
      conf: a.addressable > 80 ? "Low" : "Medium",
      impact: "Caps savings",
    },
    { k: "Hours redirected", v: count(a.hoursSaved), src: "User estimate", conf: "Medium", impact: "Productivity only" },
    { k: "Loaded cost per FTE", v: money(a.loadedCost), src: "User input", conf: "High", impact: "Productivity rate" },
    {
      k: "Revenue realisation",
      v: `${a.revenueRealisation}%`,
      src: "User assumption",
      conf: a.revenueRealisation > 80 ? "Low" : "Medium",
      impact: "Revenue driver",
    },
    { k: "Risk reduction", v: `${a.riskReduction}%`, src: "Modelled assumption", conf: "Low", impact: "Risk driver" },
    {
      k: "Benefit ramp, year 1",
      v: `${Math.round(e.ramp * 100)}%`,
      src: "Derived from time to value",
      conf: "Medium",
      impact: "Year 1 ROI",
    },
    { k: "Build cost", v: money(e.build), src: "User input, itemised", conf: "Medium", impact: "Payback period" },
    {
      k: "Annual run cost",
      v: money(e.run),
      src: a.scaleCost === "Yes" ? "User input +15% scale" : "User input",
      conf: "Medium",
      impact: "Steady-state net",
    },
    {
      k: "Benefit realisation applied",
      v: `${realisation}%`,
      src: "Sensitivity setting",
      conf: "Scenario",
      impact: "All drivers",
    },
  ];

  const confColour = (c: string) =>
    c === "High" ? T.tealD : c === "Medium" ? T.amber : c === "Scenario" ? T.indigoD : T.pinkD;

  return (
    <div
      style={{
        marginTop: 20,
        background: "#fff",
        border: "1px solid var(--border-subtle)",
        borderRadius: 24,
        boxShadow: "0 6px 24px rgba(18,18,58,.06)",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: "100%",
          cursor: "pointer",
          background: "none",
          border: "none",
          textAlign: "left",
          padding: "24px 28px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          justifyContent: "space-between",
        }}
      >
        <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--ink-900)",
            }}
          >
            Show my assumptions
          </span>
          <span style={{ fontSize: 13, color: "var(--ink-500)" }}>
            {rows.length} inputs, each with its source, confidence and influence on the answer.
          </span>
        </span>
        <span
          style={{
            flex: "none",
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "var(--mist-100)",
            display: "grid",
            placeItems: "center",
            color: "var(--ink-600)",
            transition: "transform 200ms",
            transform: open ? "rotate(180deg)" : "none",
          }}
        >
          <Icon name="chevron-down" size={16} />
        </span>
      </button>

      {open && (
        <div
          style={{ padding: "0 28px 28px", animation: "ava-rise 200ms cubic-bezier(.16,1,.3,1)" }}
        >
          <div
            style={{
              border: "1px solid var(--border-subtle)",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: grid,
                gap: 12,
                padding: "12px 16px",
                background: "var(--mist-100)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-400)",
              }}
            >
              <span>Input</span>
              <span>Value</span>
              <span>Source</span>
              <span>Confidence</span>
              <span>Impact</span>
            </div>
            {rows.map((r) => (
              <div
                key={r.k}
                style={{
                  display: "grid",
                  gridTemplateColumns: grid,
                  gap: 12,
                  padding: "14px 16px",
                  borderTop: "1px solid var(--border-subtle)",
                  fontSize: 13,
                  alignItems: "center",
                }}
              >
                <span style={{ color: "var(--ink-800)", fontWeight: 500 }}>{r.k}</span>
                <span style={{ color: "var(--ink-900)", fontVariantNumeric: "tabular-nums" }}>
                  {r.v}
                </span>
                <span style={{ color: "var(--ink-500)" }}>{r.src}</span>
                <span style={{ fontWeight: 600, color: confColour(r.conf) }}>{r.conf}</span>
                <span style={{ color: "var(--ink-500)" }}>{r.impact}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------ sensitivity */

function Sensitivity({
  assumptions: a,
  realisation,
  scenario,
  onScenario,
  onRealisation,
}: {
  assumptions: Assumptions;
  realisation: number;
  scenario: string;
  onScenario: (label: string, realisation: number) => void;
  onRealisation: (value: number) => void;
}) {
  const defs = [
    { label: "Conservative", reduction: Math.max(1, Math.round(a.reduction * 0.5)), realisation: 60 },
    { label: "Base", reduction: a.reduction, realisation: 100 },
    { label: "Upside", reduction: Math.min(70, Math.round(a.reduction * 1.5)), realisation: 120 },
  ];

  return (
    <div
      style={{
        marginTop: 20,
        background: "var(--mist-50)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 24,
        padding: 28,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 20,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div className="eyebrow-sm" style={{ color: "var(--ink-400)" }}>
            Sensitivity
          </div>
          <h4
            style={{
              margin: "10px 0 0",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--ink-900)",
            }}
          >
            How robust is the business case?
          </h4>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {defs.map((d) => {
            const active = scenario === d.label;
            return (
              <button
                key={d.label}
                type="button"
                onClick={() => onScenario(d.label, d.realisation)}
                aria-pressed={active}
                style={{
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: 999,
                  padding: "9px 16px",
                  background: active ? T.ink : "#fff",
                  border: `1px solid ${active ? T.ink : T.border}`,
                  color: active ? "#fff" : T.ink4,
                  transition: "all 120ms",
                }}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 12,
          marginTop: 22,
        }}
      >
        {defs.map((d) => {
          const ee = engine(a, d.realisation, d.reduction);
          const rr = recommend(a, ee);
          const active = scenario === d.label;
          return (
            <div
              key={d.label}
              style={{
                background: "#fff",
                border: `1px solid ${active ? T.indigo : T.border}`,
                borderRadius: 18,
                padding: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: active ? T.indigoD : T.ink4,
                  }}
                >
                  {d.label}
                </span>
                <span style={{ fontSize: 11, color: "var(--ink-400)" }}>
                  {d.reduction}% reduction · {d.realisation}% realised
                </span>
              </div>
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                <ScenarioRow label="Net annual value" value={money(ee.steady)} strong />
                <ScenarioRow label="Year 1 ROI" value={`${Math.round(ee.roi1)}%`} />
                <ScenarioRow label="Payback" value={paybackLabel(ee.payback)} />
                <ScenarioRow
                  label="Recommendation"
                  value={rr.label}
                  colour={
                    rr.label === "BUILD"
                      ? T.tealD
                      : rr.label === "DON'T BUILD"
                        ? T.pinkD
                        : T.amber
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 24,
          background: "#fff",
          border: "1px solid var(--border-subtle)",
          borderRadius: 18,
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink-700)" }}>
            Benefit realisation
          </span>
          <span style={{ fontSize: 20, fontWeight: 700, color: "var(--indigo-600)" }}>
            {realisation}%
          </span>
        </div>
        <input
          type="range"
          aria-label="Benefit realisation"
          min={40}
          max={125}
          step={5}
          value={realisation}
          onChange={(ev) => onRealisation(Number(ev.target.value))}
          style={{ marginTop: 14 }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: "var(--ink-400)",
            marginTop: 4,
          }}
        >
          <span>40%</span>
          <span>125%</span>
        </div>
        <p style={{ margin: "14px 0 0", fontSize: 13, lineHeight: 1.7, color: "var(--ink-600)" }}>
          ROI here is sensitive to four things: adoption rate, benefit realisation, AI run cost and
          implementation cost. This slider moves the second one — everything above updates with it.
        </p>
      </div>
    </div>
  );
}

function ScenarioRow({
  label,
  value,
  strong,
  colour,
}: {
  label: string;
  value: string;
  strong?: boolean;
  colour?: string;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
      <span style={{ color: "var(--ink-500)" }}>{label}</span>
      <span
        style={{
          fontWeight: strong ? 700 : 600,
          color: colour ?? (strong ? "var(--ink-900)" : "var(--ink-800)"),
          fontVariantNumeric: strong ? "tabular-nums" : undefined,
        }}
      >
        {value}
      </span>
    </div>
  );
}

/* ----------------------------------------------------------- next actions */

function NextActions({
  onGenerateCase,
  onOpenAssumptions,
  onRestart,
  onEditAnswers,
}: {
  onGenerateCase: () => void;
  onOpenAssumptions: () => void;
  onRestart: () => void;
  onEditAnswers: () => void;
}) {
  const actions = [
    {
      label: "Generate executive business case",
      note: "Eighteen sections, assumption register, pilot plan and risk register.",
      go: onGenerateCase,
      bg: T.indigoBg,
      border: T.indigoBd,
      fg: T.indigoD,
    },
    {
      label: "Stress-test my assumptions",
      note: "Open the register and change what you disagree with.",
      go: onOpenAssumptions,
      bg: "#fff",
      border: T.border,
      fg: T.ink,
    },
    {
      label: "Build a pilot plan",
      note: "Scope, duration, baseline and go / no-go criteria.",
      go: onGenerateCase,
      bg: "#fff",
      border: T.border,
      fg: T.ink,
    },
    {
      label: "Compare another use case",
      note: "Start again with a clean set of inputs.",
      go: onRestart,
      bg: "#fff",
      border: T.border,
      fg: T.ink,
    },
    {
      label: "Edit my answers",
      note: "Back into the interview at the first question.",
      go: onEditAnswers,
      bg: "#fff",
      border: T.border,
      fg: T.ink,
    },
  ];

  return (
    <div style={{ ...card, marginTop: 20 }}>
      <div className="eyebrow-sm" style={{ color: "var(--ink-400)" }}>
        You&rsquo;ve just built the first version of your AI business case
      </div>
      <h4
        style={{
          margin: "12px 0 0",
          fontSize: "clamp(20px,2.6vw,26px)",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "var(--ink-900)",
        }}
      >
        What would you like to do next?
      </h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 12,
          marginTop: 22,
        }}
      >
        {actions.map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={a.go}
            className="lift"
            style={{
              cursor: "pointer",
              textAlign: "left",
              background: a.bg,
              border: `1px solid ${a.border}`,
              borderRadius: 18,
              padding: 20,
            }}
          >
            <span style={{ display: "block", fontSize: 15, fontWeight: 600, color: a.fg }}>
              {a.label} <CtaIcon />
            </span>
            <span
              style={{
                display: "block",
                marginTop: 6,
                fontSize: 13,
                lineHeight: 1.6,
                color: "var(--ink-500)",
              }}
            >
              {a.note}
            </span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 26, paddingTop: 24, borderTop: "1px solid var(--border-subtle)" }}>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(18px,2.4vw,22px)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: "var(--ink-900)",
          }}
        >
          Have an AI opportunity you&rsquo;re trying to justify?
        </p>
        <p style={{ margin: "8px 0 0", fontSize: 16, color: "var(--ink-500)" }}>
          Let&rsquo;s turn it into a business case.
        </p>
        <Link
          href="/#talk"
          className="cta"
          style={{ marginTop: 18, padding: "14px 26px", fontSize: 15 }}
        >
          Let&rsquo;s talk <CtaIcon />
        </Link>
      </div>
    </div>
  );
}
