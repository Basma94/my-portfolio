export type ValueDriver =
  | "Cost reduction"
  | "Productivity"
  | "Revenue growth"
  | "Customer experience"
  | "Risk reduction";

export type BuildCosts = {
  dev: number;
  data: number;
  integration: number;
  infra: number;
  security: number;
  change: number;
  training: number;
  vendor: number;
};

export type RunCosts = {
  inference: number;
  cloud: number;
  licensing: number;
  maintenance: number;
  monitoring: number;
  oversight: number;
  support: number;
};

/**
 * Every input the engine reads. Nothing is derived here — the engine takes this
 * whole object and returns numbers, so assumptions can be swapped centrally
 * without touching the interface.
 */
export type Assumptions = {
  problem: string;
  today: string;
  affected: string[];
  outcome: string;

  unit: string;
  volume: number;
  costPerUnit: number;
  hoursPerUnit: number;
  fte: number;

  drivers: ValueDriver[];
  reduction: number;
  addressable: number;
  hoursSaved: number;
  loadedCost: number;
  revenueOpp: number;
  revenueRealisation: number;
  cxMetric: string;
  cxImpact: number;
  riskLoss: number;
  riskReduction: number;

  solutionType: string;
  whatAI: string;
  aiRole: string;

  dataAvailable: string;
  dataQuality: string;
  capability: string;
  integration: string;
  deployment: string;

  interaction: string;
  workflowChange: string;
  training: string;
  trust: string;

  build: BuildCosts;
  run: RunCosts;
  scaleCost: string;
  changeAnnual: number;

  firstValue: string;
  fullAdoption: string;

  objective: string;
  importance: string;

  evidence: string;
  benchmark: string;
};

export type EngineResult = {
  baseline: number;
  savings: number;
  productivity: number;
  revenue: number;
  cx: number;
  risk: number;
  gross: number;
  build: number;
  run: number;
  change: number;
  y1Cost: number;
  y1Gross: number;
  y1Net: number;
  steady: number;
  roi1: number;
  g3: number;
  c3: number;
  net3: number;
  roi3: number;
  payback: number;
  ramp: number;
};

export type Band = "High" | "Medium" | "Low";

export type Recommendation = {
  label: "BUILD" | "PILOT" | "VALIDATE FIRST" | "DEFER" | "WATCH" | "DON'T BUILD";
  color: string;
  chipBg: string;
  why: string;
};
