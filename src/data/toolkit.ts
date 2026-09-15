/**
 * The product toolkit: the documents a product decision leaves behind.
 * Structures are real; any figures inside them are illustrative.
 */

export type ToolkitDoc = {
  name: string;
  kind: string;
  icon: string;
  tint: string;
  ink: string;
  what: string;
  contents: string;
  decision: string;
};

export type ToolkitCategory = {
  name: string;
  blurb: string;
  when: string;
  docs: ToolkitDoc[];
};

export const CATEGORIES: ToolkitCategory[] = [
  {
    name: "Discover",
    blurb:
      "Understand the problem before naming a solution. Most of a product's value is decided here, in the framing.",
    when: "At the very start, and again whenever a team starts arguing about features instead of the problem.",
    docs: [
      {
        name: "Problem statement one-pager",
        kind: "One-pager",
        icon: "file-text",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "A single page that states the problem in the language of cost or customer outcome, with a named owner.",
        contents: "Problem, who feels it, evidence, baseline, owner, what happens if we do nothing.",
        decision: "Whether this is worth any further investment of attention.",
      },
      {
        name: "Research plan & interview guide",
        kind: "Template",
        icon: "search",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "Who we speak to, what we are trying to learn, and the questions that would change our mind.",
        contents: "Learning goals, participant criteria, non-leading question set, synthesis grid.",
        decision: "Whether the problem we assumed is the problem people actually have.",
      },
      {
        name: "Jobs-to-be-done map",
        kind: "Canvas",
        icon: "target",
        tint: "#F3EEFF",
        ink: "#6941C6",
        what: "The job the customer is trying to get done, separated from the tool they currently use to do it.",
        contents: "Functional job, emotional job, current workaround, forces of progress.",
        decision: "What the product must be good at, and what it can safely ignore.",
      },
      {
        name: "Journey map with pain quantification",
        kind: "Canvas",
        icon: "network",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "The end-to-end journey with a cost or time figure attached to each break point.",
        contents: "Stages, actions, systems, pain points, quantified cost per break.",
        decision: "Where in the journey to intervene first.",
      },
      {
        name: "Market & competitive read",
        kind: "Brief",
        icon: "chart-column",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "A short read on what exists, what it costs and where the genuine gap is.",
        contents: "Alternatives, pricing, capability gaps, our honest differentiator.",
        decision: "Build, buy, partner or leave alone.",
      },
    ],
  },
  {
    name: "Strategise",
    blurb: "Choose where to win and write it down. A strategy that excludes nothing is a wish list.",
    when: "Before any roadmap exists, and re-read every planning cycle.",
    docs: [
      {
        name: "Product vision & strategy doc",
        kind: "Document",
        icon: "compass",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "Where the product is going, who it is for, and what we are deliberately not doing.",
        contents: "Vision, target segment, value proposition, strategic pillars, explicit non-goals.",
        decision: "What gets funded, and what gets declined without another meeting.",
      },
      {
        name: "Value proposition canvas",
        kind: "Canvas",
        icon: "sparkles",
        tint: "#F3EEFF",
        ink: "#6941C6",
        what: "The mapping between customer jobs and what the product actually relieves.",
        contents: "Jobs, pains, gains, pain relievers, gain creators, proof points.",
        decision: "Whether the value we claim is the value the customer recognises.",
      },
      {
        name: "Business case",
        kind: "Document",
        icon: "trending-up",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "The investment argument with its assumptions visible and its ranges stated.",
        contents: "Problem, options, value drivers, cost model, sensitivity, recommendation.",
        decision: "Fund, pilot, validate, defer or decline.",
      },
      {
        name: "Competitive intelligence brief",
        kind: "Brief",
        icon: "shield-check",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "A standing read on moves that would change our sequencing, not a feature comparison.",
        contents: "Moves observed, likely intent, our exposure, trigger to respond.",
        decision: "Whether to change the roadmap or hold.",
      },
      {
        name: "OKR set with counter-metrics",
        kind: "Template",
        icon: "target",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "Objectives with measures, plus the counter-metric that stops us gaming them.",
        contents: "Objective, key results, baseline, counter-metric, owner.",
        decision: "What the team says no to this quarter.",
      },
    ],
  },
  {
    name: "Prioritise",
    blurb:
      "Make the trade-off visible so it can be argued honestly. The output of prioritisation is the list of things you are not doing.",
    when: "Every planning cycle, and whenever a new request arrives claiming urgency.",
    docs: [
      {
        name: "RICE scoring sheet",
        kind: "Model",
        icon: "layers",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "Reach, impact, confidence and effort, applied consistently across a comparable set.",
        contents: "Per-item scores, assumptions per score, resulting rank, dissent noted.",
        decision: "Sequence within a set of similar work.",
      },
      {
        name: "WSJF model",
        kind: "Model",
        icon: "zap",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "Cost of delay over job size — the model I default to when time sensitivity varies widely.",
        contents: "Business value, time criticality, risk reduction, job size, resulting WSJF.",
        decision: "What goes first when everything is valuable.",
      },
      {
        name: "Value vs effort map",
        kind: "Canvas",
        icon: "chart-column",
        tint: "#F3EEFF",
        ink: "#6941C6",
        what: "A fast visual read for a room that needs to agree in an hour.",
        contents: "Two axes, plotted items, quadrant actions, items deliberately parked.",
        decision: "What to cut from the next increment.",
      },
      {
        name: "AI opportunity scorecard",
        kind: "Model",
        icon: "brain",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "Value and readiness scored separately, so a high-value low-readiness idea is not mistaken for a build decision.",
        contents: "Value drivers, data readiness, feasibility, adoption, recommendation, kill criterion.",
        decision: "Build, pilot, validate the data foundation, or park.",
      },
      {
        name: "Portfolio view & funding gates",
        kind: "Document",
        icon: "layers",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "All live and proposed work on one page, with the gate each item must pass next.",
        contents: "Item, stage, value, readiness, next gate, date, owner.",
        decision: "Where the next increment of funding goes.",
      },
    ],
  },
  {
    name: "Design",
    blurb:
      "Design the workflow, not just the screen. In AI products the handover between model and human is the product.",
    when: "Once the problem is agreed and before any engineering estimate is trusted.",
    docs: [
      {
        name: "Service blueprint",
        kind: "Canvas",
        icon: "network",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "Front-stage actions, back-stage processes and the systems underneath, in one picture.",
        contents: "User actions, touchpoints, back-stage steps, systems, failure points.",
        decision: "Where the process breaks, and which layer must change.",
      },
      {
        name: "AI workflow & handover spec",
        kind: "Document",
        icon: "brain",
        tint: "#F3EEFF",
        ink: "#6941C6",
        what: "Exactly where the model assists, recommends, decides or executes — and where a human takes over.",
        contents: "Steps, model role per step, confidence thresholds, escalation, refusal behaviour.",
        decision: "How much autonomy the product gets in its first release.",
      },
      {
        name: "Human-in-the-loop design note",
        kind: "Note",
        icon: "users",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "How review, correction and accountability actually work in the day-to-day.",
        contents: "Review points, correction path, audit trail, who is accountable for the outcome.",
        decision: "Whether the workflow can carry the risk of being wrong.",
      },
      {
        name: "Explanation & trust spec",
        kind: "Document",
        icon: "lightbulb",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "What the product shows to justify its output, and what it refuses to claim.",
        contents: "Assumptions shown, sources cited, confidence language, refusal states.",
        decision: "Whether a user will act on the output and defend it upward.",
      },
    ],
  },
  {
    name: "Build",
    blurb:
      "Ship a slice thin enough to learn from and complete enough to use. Scope discipline is the job.",
    when: "From MVP definition through every increment after it.",
    docs: [
      {
        name: "MVP definition & scope cut",
        kind: "Document",
        icon: "play",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "The thinnest vertical slice that tests the value hypothesis, and the list of what waits.",
        contents: "Hypothesis, in scope, explicitly out of scope, learning goal, exit criteria.",
        decision: "What ships first, and what stops being debated.",
      },
      {
        name: "Epic, feature & story set",
        kind: "Template",
        icon: "layers",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "The backlog hierarchy written so an engineer can start and a stakeholder can follow.",
        contents: "Epic, benefit hypothesis, features, INVEST stories, dependencies.",
        decision: "What the team commits to in the next increment.",
      },
      {
        name: "Acceptance criteria & definition of done",
        kind: "Template",
        icon: "circle-check",
        tint: "#F3EEFF",
        ink: "#6941C6",
        what: "The shared standard that stops 'done' being negotiated after the fact.",
        contents: "Given/when/then criteria, non-functional bar, evaluation requirement, sign-off.",
        decision: "Whether a thing is finished.",
      },
      {
        name: "Release & rollout note",
        kind: "Note",
        icon: "calendar",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "Who gets it when, what we watch, and the condition that would make us stop.",
        contents: "Cohorts, sequence, metrics watched, rollback trigger, comms.",
        decision: "Whether to widen, hold or roll back.",
      },
    ],
  },
  {
    name: "Measure",
    blurb: "Instrument the decision, not the feature. If a metric cannot change a decision, it is decoration.",
    when: "Written before launch. A metric added afterwards is usually a justification.",
    docs: [
      {
        name: "North star & metric tree",
        kind: "Model",
        icon: "target",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "One metric that cannot be faked without value appearing, decomposed into inputs teams control.",
        contents: "North star, input metrics, owner per input, counter-metrics.",
        decision: "What the team optimises, and what it ignores.",
      },
      {
        name: "Experiment design & readout",
        kind: "Template",
        icon: "chart-column",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "Hypothesis, design and decision rule agreed before the data arrives.",
        contents: "Hypothesis, population, baseline, success threshold, decision rule, readout.",
        decision: "Ship, iterate or abandon.",
      },
      {
        name: "Value realisation tracker",
        kind: "Model",
        icon: "trending-up",
        tint: "#F3EEFF",
        ink: "#6941C6",
        what: "The bridge between what was promised in the business case and what was measured.",
        contents: "Committed value, measured value, attribution, variance, explanation.",
        decision: "Continue, scale or stop.",
      },
      {
        name: "AI evaluation plan",
        kind: "Document",
        icon: "shield-check",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "A fixed, versioned evaluation set and the cadence at which it is re-run.",
        contents: "Eval set, metrics, thresholds, drift checks, re-evaluation schedule.",
        decision: "Whether the model is still fit to be in the workflow.",
      },
    ],
  },
  {
    name: "AI product",
    blurb:
      "The extra discipline AI demands: suitability, economics, guardrails and governance, decided before build.",
    when: "The moment someone says 'we should use AI for this'.",
    docs: [
      {
        name: "AI use-case assessment",
        kind: "Document",
        icon: "brain",
        tint: "#F3EEFF",
        ink: "#6941C6",
        what: "Whether this is an AI problem at all, and what would have to be true for it to work.",
        contents: "Decision being improved, data availability, rules baseline, feasibility, adoption.",
        decision: "Proceed, reframe or decline.",
      },
      {
        name: "AI value calculation model",
        kind: "Model",
        icon: "trending-up",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "A modular engine that keeps cost, revenue, productivity and risk separate and labels confidence.",
        contents: "Baseline, driver-by-driver value, cost model, ROI, payback, sensitivity.",
        decision: "Build, pilot, validate first, defer or don't build.",
      },
      {
        name: "Guardrails & refusal spec",
        kind: "Document",
        icon: "shield-check",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "What the system must not do, and how it behaves when it is unsure.",
        contents: "Prohibited actions, confidence floors, refusal copy, escalation path.",
        decision: "Where autonomy stops.",
      },
      {
        name: "AI governance & risk register",
        kind: "Register",
        icon: "file-text",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "The risks, owners and mitigations, kept live rather than written once for approval.",
        contents: "Risk, probability, impact, mitigation, owner, review date.",
        decision: "Whether the product can operate at its current level of autonomy.",
      },
      {
        name: "Cost-per-decision model",
        kind: "Model",
        icon: "zap",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "The unit economics of inference, oversight and monitoring at realistic volume.",
        contents: "Cost per decision, run cost at scale, ceiling, breach action.",
        decision: "Whether the product stays economic as it grows.",
      },
    ],
  },
];

/** Split a contents line into the numbered section list shown in the preview. */
export function contentsToSections(contents: string): { n: number; t: string }[] {
  return contents.split(/,\s*/).map((t, i) => ({
    n: i + 1,
    t: t.charAt(0).toUpperCase() + t.slice(1).replace(/\.$/, ""),
  }));
}
