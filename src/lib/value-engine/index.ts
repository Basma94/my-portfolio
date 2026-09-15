import { T } from "@/lib/palette";
import type {
  Assumptions,
  Band,
  BuildCosts,
  EngineResult,
  Recommendation,
  RunCosts,
} from "./types";

export * from "./types";

/** Productive hours in an FTE year — the divisor behind the productivity rate. */
export const HOURS_PER_FTE = 1800;

/** Year-one benefit ramp, keyed by when the first value is expected. */
const RAMP: Record<string, number> = {
  "<3 months": 0.8,
  "3–6 months": 0.65,
  "6–12 months": 0.45,
  "12–24 months": 0.25,
  ">24 months": 0.1,
};

/* ------------------------------------------------------------ formatting */

export function money(n: number): string {
  const x = Math.abs(Math.round(n));
  const sign = n < 0 ? "−" : "";
  if (x >= 1_000_000) return `${sign}€${(x / 1_000_000).toFixed(x >= 10_000_000 ? 1 : 2)}M`;
  if (x >= 1000) return `${sign}€${Math.round(x / 1000)}k`;
  return `${sign}€${x}`;
}

export function count(v: number): string {
  return Math.round(v).toLocaleString("en-GB");
}

export function sumCosts(group: BuildCosts | RunCosts): number {
  return Object.values(group).reduce((total, v) => total + v, 0);
}

/* --------------------------------------------------------------- engine */

/**
 * The financial model. Every driver is computed separately and never blended,
 * so the build-up can show where each euro came from.
 *
 * @param realisation Benefit realisation as a percentage — the sensitivity lever.
 * @param reductionOverride Replaces the cost-reduction assumption, for scenarios.
 */
export function engine(
  a: Assumptions,
  realisation = 100,
  reductionOverride?: number,
): EngineResult {
  const r = realisation / 100;
  const reduction = (reductionOverride ?? a.reduction) / 100;
  const on = (d: string) => a.drivers.includes(d as never);

  const baseline = a.volume * a.costPerUnit;
  const savings = on("Cost reduction") ? baseline * (a.addressable / 100) * reduction * r : 0;
  const productivity = on("Productivity")
    ? a.hoursSaved * (a.loadedCost / HOURS_PER_FTE) * r
    : 0;
  const revenue = on("Revenue growth") ? a.revenueOpp * (a.revenueRealisation / 100) * r : 0;
  const cx = on("Customer experience") ? a.cxImpact * r : 0;
  const risk = on("Risk reduction") ? a.riskLoss * (a.riskReduction / 100) * r : 0;
  const gross = savings + productivity + revenue + cx + risk;

  const build = sumCosts(a.build);
  // Per-inference pricing and human oversight both scale with volume.
  const run = sumCosts(a.run) * (a.scaleCost === "Yes" ? 1.15 : 1);
  const change = a.changeAnnual;

  const y1Cost = build + run + change;
  const ramp = RAMP[a.firstValue] ?? 0.45;
  const y1Gross = gross * ramp;
  const y1Net = y1Gross - y1Cost;

  // Steady state excludes the one-off build but keeps a 40% tail of change cost.
  const steady = gross - run - change * 0.4;
  const roi1 = y1Cost > 0 ? (y1Net / y1Cost) * 100 : 0;

  const g3 = y1Gross + gross * 0.85 + gross;
  const c3 = y1Cost + (run + change * 0.4) * 2;
  const net3 = g3 - c3;
  const roi3 = c3 > 0 ? (net3 / c3) * 100 : 0;

  const monthly = steady / 12;
  const payback = monthly > 0 ? build / monthly : Infinity;

  return {
    baseline,
    savings,
    productivity,
    revenue,
    cx,
    risk,
    gross,
    build,
    run,
    change,
    y1Cost,
    y1Gross,
    y1Net,
    steady,
    roi1,
    g3,
    c3,
    net3,
    roi3,
    payback,
    ramp,
  };
}

/* ---------------------------------------------------------- feasibility */

const FEASIBILITY_WEIGHTS = {
  dataAvailable: { Ready: 25, "Partially ready": 15, "Not ready": 5, Unknown: 8 },
  dataQuality: { High: 25, Medium: 15, Low: 5, Unknown: 8 },
  capability: { Low: 20, Medium: 13, High: 6 },
  integration: { No: 15, Yes: 8, Unknown: 6 },
  deployment: { Low: 15, Medium: 9, High: 4 },
} as const;

export type Feasibility = { score: number; band: Band; weakest: string };

export function feasibility(a: Assumptions): Feasibility {
  const w = FEASIBILITY_WEIGHTS;
  const parts = [
    {
      k: "Data availability",
      v: pick(w.dataAvailable, a.dataAvailable, 8),
      max: 25,
    },
    { k: "Data quality", v: pick(w.dataQuality, a.dataQuality, 8), max: 25 },
    { k: "Capability complexity", v: pick(w.capability, a.capability, 13), max: 20 },
    { k: "Integration", v: pick(w.integration, a.integration, 6), max: 15 },
    { k: "Deployment", v: pick(w.deployment, a.deployment, 9), max: 15 },
  ];

  let score = parts.reduce((t, p) => t + p.v, 0);
  // Putting AI in the execution path raises the delivery and governance burden.
  if (a.aiRole === "Fully automate") score -= 8;
  else if (a.aiRole === "Execute") score -= 5;
  score = Math.max(5, Math.min(100, score));

  const weakest = parts.slice().sort((x, y) => x.v / x.max - y.v / y.max)[0];
  return {
    score,
    band: score >= 70 ? "High" : score >= 45 ? "Medium" : "Low",
    weakest: weakest.k,
  };
}

/* ------------------------------------------------------------- adoption */

const ADOPTION_WEIGHTS = {
  interaction: {
    Assistive: 1,
    "Decision support": 2,
    "Human-in-the-loop": 2,
    "Semi-autonomous": 3,
    Autonomous: 4,
  },
  workflowChange: { Low: 1, Medium: 2, High: 3 },
  training: { Low: 1, Medium: 2, High: 3 },
  trust: { Low: 1, Medium: 2, High: 3 },
} as const;

export type Adoption = { raw: number; band: Band };

export function adoption(a: Assumptions): Adoption {
  const w = ADOPTION_WEIGHTS;
  let t =
    pick(w.interaction, a.interaction, 2) +
    pick(w.workflowChange, a.workflowChange, 2) +
    pick(w.training, a.training, 2) +
    pick(w.trust, a.trust, 2);
  if (a.aiRole === "Fully automate") t += 2;
  else if (a.aiRole === "Assist") t -= 1;
  return { raw: t, band: t >= 11 ? "High" : t >= 7 ? "Medium" : "Low" };
}

/* ------------------------------------------------------------ alignment */

export type Alignment = { score: number; band: Band };

export function alignment(a: Assumptions): Alignment {
  const importance: Record<string, number> = { Low: 25, Medium: 50, High: 75, Critical: 95 };
  const imp = importance[a.importance] ?? 50;
  // A direct outcome-to-objective match is worth more than a loose one.
  const fit =
    (a.outcome === "Reduce cost" && a.objective === "Cost transformation") ||
    (a.outcome === "Increase revenue" && a.objective === "Revenue growth") ||
    (a.outcome === "Improve customer experience" && a.objective === "Customer experience")
      ? 15
      : 8;
  const score = Math.min(100, imp + fit);
  return { score, band: score >= 75 ? "High" : score >= 45 ? "Medium" : "Low" };
}

/* ----------------------------------------------------------- confidence */

export type Confidence = { score: number; label: Band; softShare: number };

/**
 * Confidence is about the evidence behind the number, not its size. A large
 * opportunity resting on vendor claims scores lower than a small measured one.
 */
export function confidence(a: Assumptions, e: EngineResult): Confidence {
  let s = 50;
  s += pick(
    { Ready: 14, "Partially ready": 4, "Not ready": -12, Unknown: -10 },
    a.dataAvailable,
    0,
  );
  s += pick({ High: 12, Medium: 3, Low: -10, Unknown: -8 }, a.dataQuality, 0);
  s += pick(
    {
      "Measured with a validated baseline": 16,
      "Baseline measured internally": 8,
      "Internal estimates only": -4,
      "Vendor or supplier claims": -14,
    },
    a.evidence,
    0,
  );
  s += pick(
    {
      "Yes, a comparable internal benchmark": 12,
      "Yes, an external benchmark": 6,
      "No comparable benchmark": -6,
    },
    a.benchmark,
    0,
  );

  // The share of value that is modelled or attributed rather than measured cost.
  const soft = e.gross > 0 ? (e.productivity + e.revenue + e.cx + e.risk) / e.gross : 0;
  if (soft > 0.6) s -= 14;
  else if (soft > 0.35) s -= 6;
  if (a.reduction > 40) s -= 8;
  if (a.addressable > 80) s -= 6;

  s = Math.max(8, Math.min(96, s));
  return {
    score: s,
    label: s >= 70 ? "High" : s >= 45 ? "Medium" : "Low",
    softShare: Math.round(soft * 100),
  };
}

/* ---------------------------------------------------------- value score */

/** 0–100, combining the magnitude of steady-state value with three-year ROI. */
export function valueScore(e: EngineResult): number {
  const magnitude = Math.max(0, Math.min(50, (Math.log10(Math.max(e.steady, 1)) - 4.3) * 28));
  const roiPart = Math.max(0, Math.min(50, e.roi3 / 4));
  return Math.round(Math.max(4, Math.min(98, magnitude + roiPart)));
}

/* ------------------------------------------------------- recommendation */

/**
 * The recommendation never rests on ROI alone: value, feasibility, data
 * readiness, adoption, confidence, alignment and payback all get a say, and
 * the reasoning is always stated.
 */
export function recommend(a: Assumptions, e: EngineResult): Recommendation {
  const f = feasibility(a);
  const ad = adoption(a);
  const cf = confidence(a, e);
  const al = alignment(a);
  const v = valueScore(e);

  if (e.steady <= 0 || e.roi3 < 0) {
    return {
      label: "DON'T BUILD",
      color: T.soft,
      chipBg: T.pinkD,
      why: `The case does not close. At these assumptions the run and change cost absorb the whole benefit, so steady-state net value is ${money(e.steady)}. This is a cost problem, not an AI problem — either the volume is too small or the run cost is too heavy.`,
    };
  }

  if (a.dataAvailable === "Not ready" || a.dataQuality === "Low") {
    return {
      label: "VALIDATE FIRST",
      color: T.warm,
      chipBg: "#8A5A00",
      why: `The value looks real, but ${a.dataAvailable === "Not ready" ? "the required data is not in place" : "data quality is low"}. Spend one short cycle proving the data foundation. Committing now converts a ${Math.round(e.roi1)}% first-year ROI into a data-remediation project with an AI label on it.`,
    };
  }

  if (cf.label === "Low") {
    return {
      label: "VALIDATE FIRST",
      color: T.warm,
      chipBg: "#8A5A00",
      why: `Attractive on paper, low confidence underneath: ${cf.softShare}% of the value comes from modelled or assumed drivers rather than measured baselines. Validate the largest assumption before the number is quoted upward.`,
    };
  }

  if (v >= 55 && f.score >= 70 && cf.label === "High" && ad.band !== "High") {
    return {
      label: "BUILD",
      color: T.mint,
      chipBg: T.tealD,
      why: `Value, feasibility, readiness and confidence all point the same way: ${Math.round(e.roi1)}% first-year ROI, payback in ${paybackWords(e.payback)} months, ${f.band.toLowerCase()} technical feasibility and ${ad.band.toLowerCase()} adoption complexity. Commit — and set the kill criterion before you start.`,
    };
  }

  if (v >= 40 && ad.band === "High") {
    return {
      label: "PILOT",
      color: "#A7F3EB",
      chipBg: T.tealD,
      why: `The financial case is attractive, but adoption complexity is the primary constraint — ${a.interaction.toLowerCase()} use with ${a.workflowChange.toLowerCase()} workflow change. A human-in-the-loop pilot with one willing team buys the adoption evidence a full commitment would otherwise assume.`,
    };
  }

  if (v >= 40 && f.score < 70) {
    return {
      label: "PILOT",
      color: "#A7F3EB",
      chipBg: T.tealD,
      why: `Strong value with ${f.band.toLowerCase()} feasibility; the binding constraint is ${f.weakest.toLowerCase()}. Pilot on the narrow slice that is already feasible, and let the gate for the rest be a stated condition rather than a hope.`,
    };
  }

  if (v >= 40) {
    return {
      label: "PILOT",
      color: "#A7F3EB",
      chipBg: T.tealD,
      why: `The economics work at ${Math.round(e.roi1)}% first-year ROI. A controlled pilot converts the benefit-realisation assumption into measured evidence before the full investment is committed.`,
    };
  }

  if (al.band === "High") {
    return {
      label: "DEFER",
      color: T.indigoBd,
      chipBg: T.indigoD,
      why: `Strategically aligned but financially thin at ${money(e.steady)} steady-state net value. Keep it on the portfolio, revisit when volume grows or run cost falls — do not fund it ahead of use cases that pay for themselves.`,
    };
  }

  return {
    label: "WATCH",
    color: T.indigoBd,
    chipBg: T.indigoD,
    why: `Technically feasible, but it does not create enough measurable value to justify the investment. Net value of ${money(e.steady)} against ${money(e.build)} to build makes the opportunity cost the real argument.`,
  };
}

export function paybackWords(months: number): string {
  return months > 36 ? "over 36" : months.toFixed(1);
}

export function paybackLabel(months: number): string {
  return months > 36 ? "36+ mo" : `${months.toFixed(1)} mo`;
}

function pick<T extends Record<string, number>>(
  map: T,
  key: string,
  fallback: number,
): number {
  return key in map ? map[key as keyof T] : fallback;
}
