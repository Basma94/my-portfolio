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
        contents: "Problem statement, target user, evidence and baseline, business impact, root cause, why now, scope and non-scope, owner and decision.",
        decision: "Whether this is worth any further investment of attention.",
      },
      {
        name: "Opportunity Solution Tree",
        kind: "Canvas",
        icon: "compass",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "Connects desired outcomes to customer opportunities, solution options and the experiments needed to test them.",
        contents: "Desired outcome, customer opportunities, evidence, solution ideas, experiments, assumptions, learning and decision.",
        decision: "Which opportunities deserve validation before committing to a solution.",
      },
      {
        name: "Journey map with pain quantification",
        kind: "Canvas",
        icon: "network",
        tint: "#F3EEFF",
        ink: "#6941C6",
        what: "The end-to-end journey with a cost, time, frequency or severity figure attached to each meaningful breakpoint.",
        contents: "Journey stages, user goal, actions, touchpoints, pain points, time and cost, frequency and severity, business impact, intervention opportunities.",
        decision: "Where in the journey to intervene first.",
      },
      {
        name: "Market & competitive read",
        kind: "Brief",
        icon: "chart-column",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "A short read on what exists, what it costs, how alternatives work and where the genuine gap is.",
        contents: "Market context, segments, alternatives, competitive analysis framework, strategic implications.",
        decision: "Build, buy, partner or leave alone.",
      },
      {
        name: "AI Use Case Canvas",
        kind: "Canvas",
        icon: "brain",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "Maps the business problem to the AI intervention, data, output, human action and measurable business outcome.",
        contents: "Business problem, user, current workflow, AI intervention, data inputs, AI capability, output, human handover, business outcome, KPIs, risks.",
        decision: "Whether AI is the right intervention and what role it should play.",
      },
    ],
  },
  {
    name: "Strategise",
    blurb: "Choose where to win and write it down. A strategy that excludes nothing is a wish list.",
    when: "Before any roadmap exists, and re-read every planning cycle.",
    docs: [
      {
        name: "Product Charter",
        kind: "Document",
        icon: "file-text",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "Defines the product's purpose, scope, users, outcomes, non-goals and decision rights.",
        contents: "Purpose, scope, users, outcomes, non-goals, team, stakeholders, decision rights, success metrics.",
        decision: "What this product is accountable for, and what sits outside its mandate.",
      },
      {
        name: "Product Vision",
        kind: "Document",
        icon: "compass",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "Defines the future state the product is trying to create for a specific customer and business.",
        contents: "Target users, unmet need, future state, product promise, strategic rationale, vision statement, success definition.",
        decision: "What future the team is deliberately building toward.",
      },
      {
        name: "Product Strategy",
        kind: "Document",
        icon: "layers",
        tint: "#F3EEFF",
        ink: "#6941C6",
        what: "Turns the vision into explicit strategic choices, bets, capabilities and trade-offs.",
        contents: "Vision, strategic choices, where to play, how to win, strategic bets, capabilities, trade-offs, outcomes.",
        decision: "Where to play, how to win, and what to deliberately not do.",
      },
      {
        name: "Value proposition canvas",
        kind: "Canvas",
        icon: "sparkles",
        tint: "#F3EEFF",
        ink: "#6941C6",
        what: "Connects customer jobs, pains and gains with the product's pain relievers and gain creators.",
        contents: "Jobs, pains, gains, pain relievers, gain creators, proof points.",
        decision: "Whether there is a meaningful value proposition fit.",
      },
      {
        name: "Strategic Alignment Canvas",
        kind: "Canvas",
        icon: "network",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "Shows how the initiative contributes to company, business, customer, technology and AI strategy.",
        contents: "Company strategy, business objectives, customer strategy, technology and AI strategy, contribution, dependencies, conflicts and trade-offs.",
        decision: "Whether this initiative materially supports strategic priorities.",
      },
      {
        name: "Product OKR Framework",
        kind: "Template",
        icon: "target",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "Connects strategic intent to measurable outcomes and the initiatives that influence them.",
        contents: "Objective, key results, initiatives, cadence, dependencies.",
        decision: "What outcomes must change, and how the team will know.",
      },
      {
        name: "Business case",
        kind: "Deck",
        icon: "trending-up",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "The investment argument with its assumptions visible and its ranges stated.",
        contents: "Executive summary, background, scope, proposed solution, other options considered, timeframe, benefits, cost of work, recurring costs, time and cost savings, risks, next steps, appendix.",
        decision: "Fund, pilot, validate, defer or decline.",
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
        name: "AI Use Case Prioritisation Matrix",
        kind: "Model",
        icon: "layers",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "Rank shortlisted AI use cases using a transparent scoring framework.",
        contents: "Use-case scorecard, scoring guide, decision.",
        decision: "Which use cases should be prioritised.",
      },
      {
        name: "AI Feasibility Assessment",
        kind: "Assessment",
        icon: "circle-check",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "Test whether an AI initiative is technically, operationally and organisationally viable.",
        contents: "Technical feasibility, data feasibility, AI/ML feasibility, operating feasibility, risk and regulatory feasibility, critical feasibility gates, decision.",
        decision: "Whether the team can realistically deliver this AI solution.",
      },
      {
        name: "AI Risk & Responsible AI Assessment",
        kind: "Assessment",
        icon: "shield-check",
        tint: "#F3EEFF",
        ink: "#6941C6",
        what: "Identify AI-specific risks, controls and residual exposure before investment or launch.",
        contents: "Risk register, responsible AI domains, decision.",
        decision: "What risks must be addressed before proceeding.",
      },
      {
        name: "AI Product Business Case",
        kind: "Document",
        icon: "trending-up",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "Build an investment case linking customer problem to measurable economic and strategic value.",
        contents: "Executive case, options analysis, financial model, benefits realisation, investment gate, decision.",
        decision: "Whether the organisation should invest in this initiative.",
      },
    ],
  },
  {
    name: "Measure",
    blurb: "Instrument the decision, not the feature. If a metric cannot change a decision, it is decoration.",
    when: "Written before launch. A metric added afterwards is usually a justification.",
    docs: [
      {
        name: "AI Model Performance Dashboard",
        kind: "Dashboard",
        icon: "chart-column",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "Monitor model quality, reliability, drift and operational behavior against approved thresholds.",
        contents: "Metric thresholds, model health, incidents and threshold breaches.",
        decision: "Whether the AI is performing as expected.",
      },
      {
        name: "AI Product Adoption & Usage Review",
        kind: "Review",
        icon: "users",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "Understand whether target users adopt, engage with and retain the product.",
        contents: "Segment activation, funnel, voice of customer.",
        decision: "Whether customers and users are adopting the product.",
      },
      {
        name: "AI Business Value & Benefits Tracking",
        kind: "Tracker",
        icon: "trending-up",
        tint: "#F3EEFF",
        ink: "#6941C6",
        what: "Track realised benefits against the approved business case and baseline.",
        contents: "Benefit tracking, financial bridge, benefits assurance.",
        decision: "Whether the product is generating the expected business value.",
      },
      {
        name: "AI Experiment Results & Learning Report",
        kind: "Report",
        icon: "lightbulb",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "Capture evidence from experiments and convert learning into product decisions.",
        contents: "Experiment results, what changed, roadmap implications.",
        decision: "What was learned, and what should change.",
      },
    ],
  },
  {
    name: "Portfolio",
    blurb:
      "Manage the AI portfolio as an investment system — balancing value, strategy, feasibility, risk and capacity across initiatives.",
    when: "Once initiatives have been assessed and the organisation needs to decide where to invest, scale, pause or stop.",
    docs: [
      {
        name: "AI Portfolio Canvas",
        kind: "Canvas",
        icon: "layers",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "Give executives a one-page view of AI portfolio ambition, strategic themes, value and capacity.",
        contents: "Portfolio ambition, strategic themes, initiative landscape, capacity, portfolio constraints.",
        decision: "How the overall AI portfolio aligns with strategy.",
      },
      {
        name: "AI Portfolio Prioritisation Matrix",
        kind: "Canvas",
        icon: "target",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "Compare initiatives at portfolio level and expose trade-offs across investment and capacity.",
        contents: "Initiative scoring, portfolio trade-offs.",
        decision: "Where investment and capacity should be allocated.",
      },
      {
        name: "AI Investment & Funding Review",
        kind: "Document",
        icon: "trending-up",
        tint: "#F3EEFF",
        ink: "#6941C6",
        what: "Review funding requests and portfolio investment gates using value, evidence, risk and spend.",
        contents: "Funding recommendation, investment gate, funding conditions.",
        decision: "Which initiatives should receive funding.",
      },
      {
        name: "AI Benefits & Value Realisation Report",
        kind: "Dashboard",
        icon: "chart-column",
        tint: "#E6FAF7",
        ink: "#00808B",
        what: "Assess whether the portfolio is converting approved investment into realised business value.",
        contents: "Initiative benefits, portfolio value bridge, benefits at risk.",
        decision: "Whether the portfolio is delivering the promised value.",
      },
      {
        name: "AI Portfolio Health & Risk Review",
        kind: "Dashboard",
        icon: "shield-check",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "Provide an executive health view of strategic, delivery, technical, data, financial and dependency risks.",
        contents: "Initiative health, top portfolio risks, capacity and dependency hotspots.",
        decision: "What portfolio-level risks need intervention.",
      },
      {
        name: "AI Portfolio Governance & Decision Log",
        kind: "Document",
        icon: "file-text",
        tint: "#F3EEFF",
        ink: "#6941C6",
        what: "Maintain an auditable record of portfolio-level decisions, evidence, rationale and actions.",
        contents: "Decision log, decision principles, escalations.",
        decision: "What strategic decisions have been made, and why.",
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
