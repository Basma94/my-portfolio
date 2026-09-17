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
        kind: "Document",
        icon: "trending-up",
        tint: "#EEF0FF",
        ink: "#4F46E5",
        what: "The investment argument with its assumptions visible and its ranges stated.",
        contents: "Executive summary, background, scope, proposed solution, other options considered, timeframe, benefits, cost of work, recurring costs, time and cost savings, risks, next steps, appendix.",
        decision: "Fund, pilot, validate, defer or decline.",
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
