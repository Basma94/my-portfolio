import {
  adoption,
  alignment,
  confidence,
  count,
  engine,
  feasibility,
  money,
  paybackWords,
  recommend,
} from ".";
import type { Assumptions } from "./types";

export type DocRow = { k: string; v: string };

export type DocSection = {
  n: string;
  title: string;
  body: string;
  rows: DocRow[];
  bullets: string[];
  label: string;
};

export type Risk = {
  risk: string;
  p: string;
  i: string;
  m: string;
  o: string;
};

/**
 * The generated executive business case. Written from the inputs rather than
 * from a template — every sentence names a number the visitor supplied, and
 * anything modelled is labelled as modelled.
 */
export function docSections(a: Assumptions, realisation: number): DocSection[] {
  const e = engine(a, realisation);
  const f = feasibility(a);
  const ad = adoption(a);
  const cf = confidence(a, e);
  const al = alignment(a);
  const rec = recommend(a, e);
  const m = money;

  const drivers = a.drivers.join(", ").toLowerCase();
  const isPilot = rec.label === "PILOT" || rec.label === "VALIDATE FIRST";

  const raw: Omit<DocSection, "n">[] = [
    S(
      "Business problem",
      a.problem ||
        "Not yet described. The assessment used the baseline volume and cost figures supplied, but a business case without a written problem statement will not survive its first review.",
    ),
    S("Current state", a.today || "Not yet described.", {
      rows: [
        { k: "Annual volume", v: `${count(a.volume)} ${a.unit}` },
        { k: "Cost per unit", v: `€${a.costPerUnit.toFixed(2)}` },
        { k: "Annual baseline cost", v: m(e.baseline) },
        { k: "People involved", v: `${count(a.fte)} FTE` },
        { k: "Effort per unit", v: `${a.hoursPerUnit.toFixed(2)} hours` },
      ],
    }),
    S(
      "Opportunity",
      `Against an annual baseline of ${m(e.baseline)}, the assessed value drivers are ${
        drivers || "not yet selected"
      }. At the stated assumptions this produces ${m(
        e.gross,
      )} of annual gross value at full run-rate, of which ${Math.round(
        e.gross > 0 ? (e.savings / e.gross) * 100 : 0,
      )}% is direct cost saving and the remainder is modelled or attributed value.`,
    ),
    S(
      "Proposed AI solution",
      `${a.whatAI || "Not yet specified."} The approach is ${a.solutionType.toLowerCase()}, positioned to ${a.aiRole.toLowerCase()} within the existing workflow${
        a.aiRole === "Fully automate"
          ? " with no human in the decision path, which carries the governance burden noted in the risk register."
          : ", keeping accountability for the outcome with the human operator."
      }`,
    ),
    S(
      "Strategic alignment",
      `The use case supports ${a.objective.toLowerCase()} and is rated ${a.importance.toLowerCase()} in strategic importance, giving an alignment score of ${al.score} / 100 (${al.band.toLowerCase()}). Strategic alignment alone is not a funding argument; it is the tie-breaker between cases of similar financial merit.`,
    ),
    S(
      "Value drivers",
      "Each driver below is carried at its stated confidence rather than as a single blended figure.",
      {
        rows: [
          {
            k: "Cost savings",
            v: `${m(e.savings)} · ${a.reduction}% reduction on ${a.addressable}% addressable workflow`,
          },
          {
            k: "Productivity",
            v: `${m(e.productivity)} · modelled, not cash unless headcount or contractor spend changes`,
          },
          { k: "Revenue", v: `${m(e.revenue)} · at ${a.revenueRealisation}% realisation` },
          {
            k: "Customer experience",
            v: `${m(e.cx)} · estimated financial consequence of improving ${a.cxMetric.toLowerCase()}`,
          },
          {
            k: "Risk reduction",
            v: `${m(e.risk)} · modelled ${a.riskReduction}% reduction in expected loss`,
          },
        ],
      },
    ),
    S(
      "Financial model",
      `Annual gross value of ${m(e.gross)} at run-rate. Year one is benefit-ramped to ${Math.round(
        e.ramp * 100,
      )}% on a first-value expectation of ${a.firstValue}, giving ${m(
        e.y1Gross,
      )}. Year-one net value is ${m(e.y1Net)} after ${m(
        e.y1Cost,
      )} of cost, a first-year ROI of ${Math.round(
        e.roi1,
      )}%. Steady-state net annual value is ${m(e.steady)}. Over three years: ${m(
        e.g3,
      )} gross, ${m(e.c3)} cost, ${m(e.net3)} net, ${Math.round(e.roi3)}% ROI. Payback ${
        e.payback > 36
          ? "is not achieved within 36 months"
          : `in ${e.payback.toFixed(1)} months`
      }.`,
    ),
    S(
      "Cost model",
      `Initial investment of ${m(e.build)}, annual run cost of ${m(e.run)}${
        a.scaleCost === "Yes"
          ? " including a 15% allowance for cost that scales with usage"
          : ""
      }, and annual change and adoption cost of ${m(
        e.change,
      )}. Three-year total cost of ownership: ${m(e.c3)}.`,
    ),
    S(
      "Feasibility",
      `AI feasibility scores ${f.score} / 100 (${f.band.toLowerCase()}). ${
        f.score >= 70 ? "Technical feasibility is strong." : "Feasibility is constrained."
      } The main constraint is ${f.weakest.toLowerCase()}. Capability complexity is ${a.capability.toLowerCase()}, deployment difficulty ${a.deployment.toLowerCase()}, and integration with existing systems is ${
        a.integration === "Yes" ? "required" : a.integration.toLowerCase()
      }.`,
    ),
    S(
      "Data readiness",
      `Data is ${a.dataAvailable.toLowerCase()} with ${a.dataQuality.toLowerCase()} quality. ${
        a.dataAvailable === "Ready" && a.dataQuality === "High"
          ? "This removes the most common cause of AI delivery failure."
          : "Data readiness is the strongest single predictor of whether this case survives delivery, and it is not yet where it needs to be. Treat it as a prerequisite workstream with its own owner."
      }`,
    ),
    S(
      "Adoption and change",
      `Interaction model is ${a.interaction.toLowerCase()}, workflow change is ${a.workflowChange.toLowerCase()}, training need is ${a.training.toLowerCase()} and the trust threshold before users will act is ${a.trust.toLowerCase()}. Overall adoption complexity is ${ad.band.toLowerCase()}. Full-scale adoption is expected in ${a.fullAdoption}.`,
    ),
    S(
      "Value confidence",
      `Value confidence is ${cf.label.toLowerCase()} (${cf.score} / 100). Evidence base: ${a.evidence.toLowerCase()}; benchmark availability: ${a.benchmark.toLowerCase()}. ${cf.softShare}% of the gross value comes from modelled or attributed drivers rather than measured cost. Financial magnitude and confidence are separate judgements — a large opportunity can still be low confidence.`,
      { label: "Confidence is a judgement, not a measurement" },
    ),
    S(
      "Sensitivity analysis",
      `At 50% benefit realisation the case returns ${m(
        engine(a, 50).steady,
      )} steady-state net value; at 100%, ${m(engine(a, 100).steady)}; at 125%, ${m(
        engine(a, 125).steady,
      )}. The case is most sensitive to adoption rate, benefit realisation, AI run cost and implementation cost, in that order.`,
    ),
    S(
      "Risks",
      `See the risk register below. The dominant risk at this point in the case is ${
        cf.label === "Low"
          ? "benefit realisation, because the value rests on unvalidated assumptions."
          : ad.band === "High"
            ? "adoption, because the workflow change is significant and trust must be earned before users act."
            : f.score < 60
              ? `${f.weakest.toLowerCase()}, which sits upstream of everything else in delivery.`
              : "run-cost growth as volume scales."
      }`,
    ),
    S("Recommendation", `${rec.label}. ${rec.why}`),
    isPilot
      ? S(
          "Pilot proposal",
          "A controlled pilot to convert the largest assumption into evidence before full commitment.",
          {
            rows: [
              {
                k: "Objective",
                v: `Validate that ${(a.drivers[0] ?? "the stated").toLowerCase()} value is realisable at the assumed rate, in a live workflow.`,
              },
              {
                k: "Scope",
                v: `One team, one ${a.unit.split(" ")[0]} stream, on the data that is already available.`,
              },
              {
                k: "Excluded",
                v: "Estate-wide rollout, automation of the decision itself, and any integration not already in place.",
              },
              { k: "Duration", v: a.firstValue === "<3 months" ? "8–10 weeks" : "12–16 weeks" },
              {
                k: "Required data",
                v: `The subset rated ${a.dataAvailable.toLowerCase()}, with a named owner per field.`,
              },
              {
                k: "Users",
                v: "5–10 practitioners in the affected team, volunteering rather than assigned.",
              },
              {
                k: "Baseline",
                v: `Current cost per unit of €${a.costPerUnit.toFixed(2)} and ${a.hoursPerUnit.toFixed(2)} hours per unit, measured for four weeks before launch.`,
              },
              {
                k: "Experiment design",
                v: "Parallel run against the current process on the same cases, with acceptance and correction tracked per recommendation.",
              },
              {
                k: "Go / no-go",
                v: "Proceed only if measured benefit reaches at least 60% of the assumed rate and adoption holds without mandate.",
              },
            ],
            bullets: [
              `At least ${Math.max(10, Math.round(a.reduction * 0.6))}% improvement on the measured baseline`,
              "Output accepted without material correction in the majority of cases",
              "Adoption sustained by the pilot team without escalation or mandate",
              "No critical compliance, security or data-protection issue raised",
            ],
            label: "Proposed validation targets — not committed results",
          },
        )
      : S(
          "Delivery approach",
          "With this recommendation the next step is not a pilot but a decision: either commit with a defined kill criterion, or park the case and revisit when the constraint above has changed.",
        ),
    S(
      "Success metrics",
      "Measured as a hierarchy, so the case cannot be declared a success on model performance alone.",
      {
        rows: [
          { k: "Business outcome", v: a.outcome },
          {
            k: "Value metric",
            v: `${m(e.steady)} steady-state net annual value, attributed to accepted actions`,
          },
          {
            k: "Product metric",
            v: "Share of in-scope volume where the AI output is accepted and actioned",
          },
          {
            k: "AI performance metric",
            v:
              a.solutionType === "Generative AI"
                ? "Groundedness and correction rate on a fixed evaluation set"
                : "Precision and recall on a fixed, versioned evaluation set",
          },
        ],
      },
    ),
    S("Next steps", "", {
      bullets: [
        cf.label === "Low"
          ? `Validate the single largest assumption (${
              e.savings >= e.gross / 2
                ? `the ${a.reduction}% cost reduction`
                : "the modelled non-cash value"
            }) against measured data.`
          : "Agree the baseline with finance so the value metric is not contested later.",
        a.dataAvailable === "Ready"
          ? "Confirm data ownership per field and freeze the evaluation set."
          : "Stand up the data readiness workstream with a named owner and a dated gate.",
        isPilot
          ? "Approve the pilot scope, duration and go / no-go criteria above."
          : "Confirm the funding decision and record the kill criterion.",
        "Set the review point at which this case is re-scored rather than re-argued.",
      ],
    }),
  ];

  return raw.map((s, i) => ({ ...s, n: `${i + 1 < 10 ? "0" : ""}${i + 1}` }));
}

export function risks(a: Assumptions, e: ReturnType<typeof engine>): Risk[] {
  const ad = adoption(a);
  const cf = confidence(a, e);
  return [
    {
      risk: "Benefit realisation",
      p: cf.label === "Low" ? "High" : "Medium",
      i: "High",
      m: "Pilot with a measured baseline before committing the full investment; re-score rather than re-argue.",
      o: "Product",
    },
    {
      risk: "Data quality and ownership",
      p: a.dataQuality === "High" ? "Low" : "High",
      i: "High",
      m: "Named owner per field, quality thresholds agreed before build, gate on stability.",
      o: "Data",
    },
    {
      risk: "Integration and delivery",
      p: a.integration === "Yes" ? "Medium" : "Low",
      i: "Medium",
      m: "Narrow to the interfaces that exist today; publish the condition that unlocks the rest.",
      o: "Engineering",
    },
    {
      risk: "Adoption",
      p: ad.band === "High" ? "High" : "Medium",
      i: "High",
      m: "Human-in-the-loop first release, correction loop as a first-class feature, no mandate.",
      o: "Operations",
    },
    {
      risk: "Run-cost growth at scale",
      p: a.scaleCost === "Yes" ? "High" : "Medium",
      i: "Medium",
      m: "Cost per decision ceiling set before build; monitored as a product metric.",
      o: "Product",
    },
    {
      risk: "AI performance drift",
      p: "Medium",
      i: "Medium",
      m: "Fixed versioned evaluation set, scheduled re-evaluation, explicit refusal over low-confidence output.",
      o: "Data science",
    },
    {
      risk: "Compliance and security",
      p: a.aiRole === "Fully automate" ? "High" : "Low",
      i: "High",
      m: "Human accountability retained for irreversible actions; review before any autonomy increase.",
      o: "Risk",
    },
    {
      risk: "Vendor dependency",
      p: a.build.vendor > 0 ? "Medium" : "Low",
      i: "Medium",
      m: "Exit path and data portability agreed at contract, not at renewal.",
      o: "Procurement",
    },
  ];
}

/** The agent's running read of the case, shown beside the interview. */
export function agentRead(a: Assumptions, realisation: number): string {
  const e = engine(a, realisation);
  const f = feasibility(a);
  const ad = adoption(a);
  const cf = confidence(a, e);

  if (cf.label === "Low" && e.roi1 > 40)
    return `Your ROI looks attractive, but the business case is currently low-confidence because ${cf.softShare}% of the value depends on modelled or unvalidated assumptions.`;
  if (f.score < 60 && e.steady > 0)
    return `Strong value and ${f.band.toLowerCase()} feasibility. The binding constraint is ${f.weakest.toLowerCase()}, not the model.`;
  if (ad.band === "High")
    return "The financial case is attractive, but adoption complexity is the primary constraint. A human-in-the-loop pilot is the lower-risk route.";
  if (e.steady <= 0)
    return "The use case is technically feasible but does not create enough measurable value to justify the investment at these cost assumptions.";
  if (cf.label === "High" && e.roi1 > 50)
    return "Value, feasibility and evidence are aligned. The remaining question is sequencing, not whether this is worth doing.";
  return `Value and feasibility are broadly balanced. Payback of ${paybackWords(e.payback)} months is the number to defend.`;
}

/** Plain-text export of the whole case, for the copy button. */
export function docToText(a: Assumptions, realisation: number): string {
  const e = engine(a, realisation);
  const rec = recommend(a, e);
  const cf = confidence(a, e);
  const body = docSections(a, realisation)
    .map((s) => {
      const rows = s.rows.map((r) => `  ${r.k}: ${r.v}`).join("\n");
      const bullets = s.bullets.map((b) => `  · ${b}`).join("\n");
      return (
        `${s.n}. ${s.title.toUpperCase()}\n${s.body}\n` +
        (rows ? `${rows}\n` : "") +
        (bullets ? `${bullets}\n` : "")
      );
    })
    .join("\n");
  return `AI BUSINESS CASE\n${a.problem || a.solutionType}\n\nRECOMMENDATION: ${rec.label} (confidence ${cf.label})\n\n${body}`;
}

function S(
  title: string,
  body: string,
  extra?: Partial<Pick<DocSection, "rows" | "bullets" | "label">>,
): Omit<DocSection, "n"> {
  return { title, body, rows: [], bullets: [], label: "", ...extra };
}
