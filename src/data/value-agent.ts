import type { Assumptions } from "@/lib/value-engine";

/** Starting assumptions. Every one of them is visible and changeable. */
export const DEFAULTS: Assumptions = {
  problem: "",
  today: "",
  affected: ["Operations"],
  outcome: "Reduce cost",

  unit: "transactions / year",
  volume: 1_200_000,
  costPerUnit: 6.5,
  hoursPerUnit: 0.25,
  fte: 45,

  drivers: ["Cost reduction", "Productivity"],
  reduction: 20,
  addressable: 55,
  hoursSaved: 18_000,
  loadedCost: 78_000,
  revenueOpp: 1_200_000,
  revenueRealisation: 60,
  cxMetric: "Resolution time",
  cxImpact: 300_000,
  riskLoss: 2_000_000,
  riskReduction: 5,

  solutionType: "Predictive ML",
  whatAI: "",
  aiRole: "Recommend",

  dataAvailable: "Partially ready",
  dataQuality: "Medium",
  capability: "Medium",
  integration: "Yes",
  deployment: "Medium",

  interaction: "Human-in-the-loop",
  workflowChange: "Medium",
  training: "Medium",
  trust: "High",

  build: {
    dev: 450_000,
    data: 180_000,
    integration: 140_000,
    infra: 60_000,
    security: 40_000,
    change: 90_000,
    training: 50_000,
    vendor: 0,
  },
  run: {
    inference: 90_000,
    cloud: 60_000,
    licensing: 40_000,
    maintenance: 70_000,
    monitoring: 30_000,
    oversight: 110_000,
    support: 30_000,
  },
  scaleCost: "Yes",
  changeAnnual: 120_000,

  firstValue: "6–12 months",
  fullAdoption: "12–18 months",

  objective: "Cost transformation",
  importance: "High",

  evidence: "Internal estimates only",
  benchmark: "No comparable benchmark",
};

/** A prefilled demo case, on synthetic inputs, that jumps straight to the dashboard. */
export const EXAMPLE: Assumptions = {
  ...DEFAULTS,
  problem:
    "Field engineering spends three working days a week triaging network alarms manually, and the backlog means avoidable faults escalate into customer-visible outages.",
  today:
    "Alarms land in a queue and are triaged by hand against runbooks. Prioritisation depends on who is on shift, and roughly a third of tickets are re-opened because the first diagnosis was wrong.",
  affected: ["Operations", "Customers"],
  outcome: "Reduce cost",
  volume: 940_000,
  costPerUnit: 8.2,
  hoursPerUnit: 0.3,
  fte: 62,
  drivers: ["Cost reduction", "Productivity", "Risk reduction"],
  reduction: 22,
  addressable: 60,
  hoursSaved: 24_000,
  loadedCost: 82_000,
  riskLoss: 3_400_000,
  riskReduction: 8,
  solutionType: "Anomaly detection",
  whatAI:
    "Cluster related alarms, rank by predicted customer impact and propose the most likely root cause with its supporting evidence.",
  aiRole: "Recommend",
  objective: "Operational excellence",
  importance: "High",
  evidence: "Baseline measured internally",
  benchmark: "No comparable benchmark",
};

export const PHASES = [
  "Business problem",
  "Baseline",
  "Value drivers",
  "AI solution",
  "Feasibility",
  "Adoption & change",
  "Cost model",
  "Time to value",
  "Strategic alignment",
  "Value confidence",
];

export const PROMISES = [
  {
    n: "01",
    t: "A quantified baseline",
    d: "Volume, cost per unit and the annual cost you are actually trying to move.",
  },
  {
    n: "02",
    t: "Value split by driver",
    d: "Cost, productivity, revenue, customer and risk kept separate, never blended.",
  },
  {
    n: "03",
    t: "A real cost model",
    d: "Build, run and change costs itemised — not one arbitrary investment number.",
  },
  {
    n: "04",
    t: "Feasibility and readiness scores",
    d: "Scored on data, capability, integration, deployment and adoption.",
  },
  {
    n: "05",
    t: "A transparent recommendation",
    d: "Build, pilot, validate, defer or don't build — with the reasoning shown.",
  },
  {
    n: "06",
    t: "An executive business case",
    d: "Eighteen sections, an assumption register, a pilot plan and a risk register.",
  },
];

export const GATE_CONTENTS = [
  { n: "01", t: "Executive summary written from your inputs, not a template." },
  { n: "02", t: "Financial model: year one, steady state and three-year net value." },
  { n: "03", t: "Itemised cost model — build, run and change, separately." },
  { n: "04", t: "Feasibility, data readiness and adoption, each scored and explained." },
  { n: "05", t: "Assumption register with source and confidence per input." },
  { n: "06", t: "Pilot plan, success-metric hierarchy and a risk register." },
];
