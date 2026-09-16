/**
 * Content for the portfolio page, carried over from the Claude Design
 * prototype unchanged.
 *
 * Everything here is demo content: employer work is confidential, so products,
 * backlog items and figures are synthetic and labelled Demo, Target or
 * Hypothesis. No professional metric, revenue figure or customer outcome is
 * presented as a reported result.
 */

export const CALENDAR_URL = "https://calendar.app.google/wxbbg7f7iKKbVWrX7";
export const LINKEDIN_URL = "https://www.linkedin.com/in/basma-gamal";
export const EMAIL = "Basma.gm.hassan@gmail.com";

/* ------------------------------------------------------- 01 — Evidence */

export type Demo = {
  name: string;
  kicker: string;
  status: string;
  tone: string;
  tint: string;
  tintBorder: string;
  value: string;
  facts: { k: string; v: string }[];
  /** The real product's URL — documentation only, not linked to from the card. */
  primaryHref: string;
  /**
   * Static screenshot shown in the card, under public/assets/demo-snapshots/
   * — not a live embed. The real products aren't exposed for anyone to open,
   * inspect or copy; a request goes through CALENDAR_URL instead (see the
   * "Request demo" button and the card's own overlay link).
   */
  snapshot: string;
  host: string;
  note: string;
  /**
   * Where `snapshot` was captured from, and the frame size / crop rect used
   * — documentation of how the image was produced, e.g. Planzen's prototype
   * centers a phone mockup on an otherwise mostly-empty desktop page, so the
   * crop zooms into just the phone. Not used at render time.
   */
  captureUrl?: string;
  captureFrame?: { width: number; height: number };
  captureCrop?: { x: number; y: number; width: number; height: number };
  /**
   * CSS `aspect-ratio` for this card's frame. Defaults to "16 / 10" (a
   * desktop screenshot shape) — override for content that's naturally
   * portrait (e.g. a phone mockup).
   */
  cardAspectRatio?: string;
};

export const DEMOS: Demo[] = [
  {
    name: "Planzen",
    kicker: "Live product",
    status: "Live",
    tone: "#00808B",
    tint: "#E6FAF7",
    tintBorder: "#B8EDE6",
    value:
      "A money planner that answers one question: what is genuinely safe to spend this month.",
    facts: [
      {
        k: "Problem",
        v: "Trackers record spending after it happens. People need to know what is left, not what is gone.",
      },
      {
        k: "Built",
        v: "Bills and income as recurring rules, so every future month is already accounted for. No bank login, by design.",
      },
      { k: "Role", v: "Product owner and designer, end to end." },
    ],
    primaryHref: "https://planzen-app.com",
    snapshot: "/assets/demo-snapshots/planzen.png",
    host: "planzen-app.com",
    note: "Snapshot of the live product. Request a walkthrough to see it in action.",
    // The prototype centers a phone mockup on a ~1280×865 desktop page
    // rather than filling it, so the capture used a taller frame and a crop
    // tight around the phone — otherwise the login screen shows tiny in a
    // mostly-empty image.
    captureUrl: "https://temporary-flying-mandolin-88behgg.vercel.app/prototype.html",
    captureFrame: { width: 1280, height: 880 },
    captureCrop: { x: 406, y: 134, width: 468, height: 715 },
    cardAspectRatio: "468 / 715",
  },
  {
    name: "AI Sales Coach",
    kicker: "Live demo",
    status: "Live",
    tone: "#4F46E5",
    tint: "#EEF0FF",
    tintBorder: "#D6DAFF",
    value:
      "Coaching, practice and competitive evidence in one place, so an agent walks into the call prepared.",
    facts: [
      {
        k: "Problem",
        v: "Objection handling is learned on live customers, and coaching arrives weeks too late.",
      },
      {
        k: "Built",
        v: "Five connected tools: live coach, scored customer simulation, battle cards and a manager view that names who needs coaching.",
      },
      { k: "Role", v: "Product lead — scope, evidence model, scoring and interface." },
    ],
    primaryHref: "https://basma94.github.io/ai-sales-coach/",
    snapshot: "/assets/demo-snapshots/ai-sales-coach.png",
    host: "basma94.github.io/ai-sales-coach",
    note: "Snapshot of the live product. Request a walkthrough to see it in action.",
    captureUrl: "https://basma94.github.io/ai-sales-coach/",
  },
  {
    name: "Presales Agent",
    kicker: "Live demo",
    status: "Live",
    tone: "#6941C6",
    tint: "#F3EEFF",
    tintBorder: "#E2D8FF",
    value: "A presales agent demo built for Vodafone. It runs in place.",
    facts: [
      { k: "Problem", v: "Write-up pending — send me the framing and I will add it." },
      { k: "Built", v: "A browser-based agent demo, published and running." },
      { k: "Role", v: "To be confirmed." },
    ],
    primaryHref: "https://basma94.github.io/presales-agent-demo/",
    snapshot: "/assets/demo-snapshots/presales-agent.png",
    host: "basma94.github.io/presales-agent-demo",
    note: "Snapshot of the live product. Request a walkthrough to see it in action.",
    captureUrl: "https://basma94.github.io/presales-agent-demo/",
  },
  {
    name: "Rehearsal",
    kicker: "Live product",
    status: "Invite only",
    tone: "#00808B",
    tint: "#E6FAF7",
    tintBorder: "#B8EDE6",
    value:
      "Practise a high-stakes conversation against the person who will actually push back.",
    facts: [
      {
        k: "Problem",
        v: "Most people make their case to a sceptical VP for the first time in the room, with the decision on the line.",
      },
      {
        k: "Built",
        v: "A voice rehearsal room: build the persona, set how hard they push, present, then read the debrief.",
      },
      { k: "Role", v: "Product owner and designer, end to end." },
    ],
    primaryHref: "https://basma94.github.io/rehearsal/",
    snapshot: "/assets/demo-snapshots/rehearsal.png",
    host: "basma94.github.io/rehearsal",
    note: "Snapshot of the live product. Request access to run a full rehearsal.",
    captureUrl: "https://basma94.github.io/rehearsal/",
  },
];

/* ------------------------------------------------------ 02 — Judgement */

export type Stage = {
  label: string;
  step: string;
  title: string;
  summary: string;
  facets: [string, string][];
};

export const STAGES: Stage[] = [
  {
    label: "Problem",
    step: "Stage 01",
    title: "Frame the problem in the language of cost, not technology.",
    summary:
      "A telecom operator wants to reduce network operating cost using AI. The ask arrives as a solution, so the first job is to convert it back into a problem statement someone owns.",
    facets: [
      [
        "Known",
        "Operating cost is rising faster than traffic growth. Several teams have partial views of why.",
      ],
      ["Uncertain", "How much of the cost is controllable within a year, and by whom."],
      [
        "Options",
        "Accept the AI framing and start modelling · reframe as a cost-attribution problem · decline until a business owner is named.",
      ],
      [
        "Decision",
        "Reframe as attribution, and require a named owner in operations before any build.",
      ],
      [
        "Why",
        "An AI model with no owner for the resulting action produces a dashboard, not a saving.",
      ],
      [
        "Trade-off",
        "Lost two weeks of apparent momentum and some sponsor enthusiasm for moving slowly.",
      ],
      [
        "Next",
        "A quantified problem statement with a baseline everybody had seen before, not just agreed to.",
      ],
    ],
  },
  {
    label: "Insight",
    step: "Stage 02",
    title: "Talk to the people who would have to act on the output.",
    summary:
      "Eight conversations with planners and operations engineers, watching them work rather than asking what they want.",
    facets: [
      ["Known", "Engineers already had more dashboards than time."],
      [
        "Uncertain",
        "Whether a better prediction would change any decision they actually make.",
      ],
      [
        "Options",
        "Survey at scale · deep observation with a few users · rely on existing tickets.",
      ],
      [
        "Decision",
        "Observation with six engineers, plus a read of six months of change requests.",
      ],
      [
        "Why",
        "Surveys would have returned feature requests. Watching returned the real blocker: no trustworthy attribution.",
      ],
      ["Trade-off", "Small sample, so the insight needed later quantitative confirmation."],
      ["Next", "The product shifted from forecasting to explanation and ranking."],
    ],
  },
  {
    label: "Opportunity",
    step: "Stage 03",
    title: "Size it honestly, then cut it down.",
    summary:
      "Two cost domains accounted for most of the controllable spend. The rest was politically interesting and commercially marginal.",
    facets: [
      ["Known", "Controllable cost concentrated in a minority of domains."],
      ["Uncertain", "Whether savings identified would actually be realised by operations."],
      ["Options", "Estate-wide coverage · two domains at depth · a single flagship site."],
      [
        "Decision",
        "Two domains, with an explicit statement that identified saving is not realised saving.",
      ],
      [
        "Why",
        "Breadth would have produced a thin, ignorable product. One site would not have proved anything repeatable.",
      ],
      ["Trade-off", "Turned down the more impressive-sounding estate-wide scope."],
      ["Next", "A value hypothesis narrow enough to be tested inside one quarter."],
    ],
  },
  {
    label: "Strategy",
    step: "Stage 04",
    title: "Compete on trust, not on model sophistication.",
    summary:
      "In an environment full of analytics, the scarce asset is a number an engineer will defend in front of their director.",
    facets: [
      ["Known", "Previous tools were abandoned because outputs could not be explained."],
      ["Uncertain", "How much explanation is enough to earn action."],
      [
        "Options",
        "Best accuracy possible · best explainability possible · fastest time to first value.",
      ],
      ["Decision", "Explainability first, with accuracy as a constraint rather than the goal."],
      [
        "Why",
        "An 80%-accurate recommendation that gets acted on beats a 92% one that gets argued with.",
      ],
      [
        "Trade-off",
        "Gave up the headline model-performance story that impresses in steering committees.",
      ],
      ["Next", "Every recommendation ships with its assumptions and a confidence band."],
    ],
  },
  {
    label: "Decision",
    step: "Stage 05",
    title: "Rules before machine learning.",
    summary:
      "The most contested call of the programme: ship deterministic rules the engineers wrote with us, and hold ML until the data contract stabilised.",
    facets: [
      ["Known", "Data schemas were changing monthly across upstream systems."],
      ["Uncertain", "Whether rules would plateau before the pilot concluded."],
      ["Options", "Train a model now · rules now, model later · buy a vendor model."],
      ["Decision", "Rules now. Model deferred to a defined gate: three months of stable schemas."],
      [
        "Why",
        "A model trained on shifting data would have spent its credibility on debugging rather than decisions.",
      ],
      ["Trade-off", "Accepted looking unambitious, and accepted rework later."],
      [
        "Next",
        "Engineers could audit every recommendation, which is what made adoption possible.",
      ],
    ],
  },
  {
    label: "Build",
    step: "Stage 06",
    title: "One slice, used weekly, before anything else.",
    summary:
      "One pipeline, one scoring engine, one screen. Roadmap items were held until the slice showed weekly use.",
    facets: [
      ["Known", "Partial adoption of internal tools is the norm, not the exception."],
      ["Uncertain", "Whether weekly use would survive the novelty period."],
      ["Options", "Broad MVP across domains · thin vertical slice · prototype only."],
      [
        "Decision",
        "Thin vertical slice, with a hard rule that no new scope entered until usage held for four weeks.",
      ],
      [
        "Why",
        "Usage is the only honest signal at this stage. Features added before it just hide the answer.",
      ],
      ["Trade-off", "Several sponsors' favourite features waited a quarter."],
      ["Next", "Backlog sequenced by what the first users kept asking for twice."],
    ],
  },
  {
    label: "Impact",
    step: "Stage 07",
    title: "Report what was measured, label what was hoped.",
    summary:
      "Client outcomes are confidential, so what belongs on a portfolio page is the measurement design, not a claimed number.",
    facets: [
      ["Known", "Cycle time and acceptance rate were instrumented from day one."],
      [
        "Uncertain",
        "Attribution of realised saving between the product and parallel cost programmes.",
      ],
      [
        "Options",
        "Claim the full saving · claim nothing · publish the measurement design and label every figure.",
      ],
      ["Decision", "Publish the design. Mark each figure Target, Hypothesis or Demo."],
      [
        "Why",
        "An unverifiable number costs more credibility with a senior audience than an honest gap.",
      ],
      ["Trade-off", "A less impressive-sounding portfolio."],
      ["Next", "Every number on this page carries its own label. That is the point."],
    ],
  },
];

/* --------------------------------------------------- 03 — Challenge me */

export type ChallengeCall = {
  phase: string;
  q: string;
  options: [string, string][];
  correct: number;
  reasoning: string;
};

export const CHALLENGE: ChallengeCall[] = [
  {
    phase: "Problem",
    q: "What would you do first?",
    options: [
      [
        "Build an AI model",
        "Premature. Without a quantified problem you cannot tell whether a model is the cheapest fix.",
      ],
      [
        "Interview customers",
        "Necessary, but second. Interviews without a cost baseline generate opinions you cannot prioritise.",
      ],
      [
        "Quantify the business problem",
        "Yes. Where is the cost, how much is controllable, and who owns the action.",
      ],
      ["Benchmark competitors", "Useful context, weak input. Their cost structure is not yours."],
    ],
    correct: 2,
    reasoning:
      "Quantify first. 'Reduce network cost with AI' is a solution wearing a problem's clothes. Until you know which cost lines are controllable within a year and who owns the action, every downstream choice is guesswork — and you cannot tell whether AI is even the cheapest available fix.",
  },
  {
    phase: "Customer",
    q: "Who is the actual customer of this product?",
    options: [
      ["The CFO who funds it", "Sponsor, not customer. Funding and using are different jobs."],
      ["The operations engineer who acts on it", "Yes. If they do not act, no saving exists."],
      [
        "The network planning director",
        "Important stakeholder, but not the one whose behaviour must change.",
      ],
      [
        "The end subscriber",
        "Affected eventually, but too far from the decision to design for here.",
      ],
    ],
    correct: 1,
    reasoning:
      "The customer is whoever must change their behaviour for value to appear. Here that is the operations engineer. The CFO's saving is downstream of an engineer accepting a recommendation — so the engineer's trust, not the CFO's enthusiasm, is the design constraint.",
  },
  {
    phase: "Opportunity",
    q: "How would you size the opportunity?",
    options: [
      ["Total network operating cost", "Too big to be useful. Most of it is not addressable."],
      [
        "Industry benchmark savings percentage",
        "Borrowed numbers. Finance will discount them, and rightly.",
      ],
      [
        "Controllable cost in the top domains, addressable within a year",
        "Yes. Narrow, defensible, and testable in a quarter.",
      ],
      ["Vendor's claimed saving range", "A sales artefact, not an estimate."],
    ],
    correct: 2,
    reasoning:
      "Size what you can actually move. Addressable controllable cost in a small number of domains gives a number you can defend line by line — and it is small enough that the pilot can genuinely test it rather than gesture at it.",
  },
  {
    phase: "AI suitability",
    q: "Is this even an AI problem?",
    options: [
      [
        "Yes — pattern detection at scale is a model's job",
        "Partly. But test whether rules or better attribution close most of the gap first.",
      ],
      [
        "Test whether rules close most of the gap first",
        "Yes. Prove the cheapest mechanism fails before paying for the expensive one.",
      ],
      [
        "No — it is purely a process problem",
        "Too strong. Some of it genuinely needs learned patterns.",
      ],
      [
        "Ask the data science team to decide",
        "Delegating the product question to the implementers.",
      ],
    ],
    correct: 1,
    reasoning:
      "AI suitability is a product judgement, not a technical one. If deterministic rules and honest attribution recover most of the value, that is the answer — cheaper to build, easier to audit, and far easier for an engineer to defend. Hold ML for the part where learned patterns are genuinely required.",
  },
  {
    phase: "Business value",
    q: "Which value do you commit to in the business case?",
    options: [
      [
        "Identified saving",
        "Weakest form. Identifying a saving costs nothing and proves nothing.",
      ],
      [
        "Realised saving, attributed to accepted actions",
        "Yes — harder to claim, and the only number finance respects.",
      ],
      ["Engineer hours saved", "Real but secondary, and easily double-counted."],
      ["Model accuracy improvement", "Not a business value at all."],
    ],
    correct: 1,
    reasoning:
      "Commit to realised, attributable saving and accept that the number will be smaller. Identified saving is the vanity metric of every cost programme: it lets everyone declare success while the cost line does not move. Attribution is uncomfortable, which is exactly why it is credible.",
  },
  {
    phase: "Feasibility",
    q: "The upstream data schemas change monthly. What now?",
    options: [
      [
        "Build anyway and handle breakage",
        "You will spend the pilot debugging instead of learning.",
      ],
      [
        "Wait for the platform team to stabilise them",
        "Indefinite delay with no leverage.",
      ],
      [
        "Ship on a narrow, stable subset and set a gate for the rest",
        "Yes. Progress now, with a defined condition for expansion.",
      ],
      [
        "Copy the data into your own store",
        "Buys a quarter, creates a permanent divergence problem.",
      ],
    ],
    correct: 2,
    reasoning:
      "Narrow to what is stable and publish the gate that unlocks the rest: three months of unchanged schemas. This keeps momentum, makes the dependency visible to the people who can fix it, and stops you building on foundations that move.",
  },
  {
    phase: "MVP",
    q: "What is in the first release?",
    options: [
      [
        "Ranked actions for two domains, with assumptions shown",
        "Yes. Thin, auditable, and usable weekly.",
      ],
      ["Dashboard across all domains", "Another dashboard. Adds no decision."],
      ["Forecasting engine", "Answers a question nobody was blocked on."],
      [
        "Conversational interface over the data",
        "Confident answers over untrusted attribution. Dangerous.",
      ],
    ],
    correct: 0,
    reasoning:
      "One pipeline, one scoring engine, one screen — and nothing else until it is used weekly. The MVP's job is to test whether an engineer will act on a recommendation, and every additional feature makes that signal harder to read.",
  },
  {
    phase: "Prioritisation",
    q: "Usage holds for four weeks. Third domain, or depth in two?",
    options: [
      [
        "Add the third domain — breadth shows momentum",
        "Momentum theatre. The tail of the existing list is still ignored.",
      ],
      [
        "Deepen the two — fix acceptance in the tail",
        "Yes. Depth is the binding constraint on value.",
      ],
      ["Both, with a bigger team", "Scaling before the model of value is proven."],
      ["Pause and re-run discovery", "You already have the signal you need."],
    ],
    correct: 1,
    reasoning:
      "Engineers were accepting the top few actions and ignoring the rest, so value was capped by depth, not coverage. Expansion would have felt like progress while leaving the real constraint untouched — and the political cost of delaying a second sponsor was the price of that honesty.",
  },
  {
    phase: "Success metric",
    q: "One north-star metric. Which?",
    options: [
      ["Weekly active engineers", "Necessary but not sufficient. Presence is not action."],
      [
        "Recommendations accepted and actioned per week",
        "Yes. Closest honest proxy for realised value.",
      ],
      ["Identified saving in the pipeline", "Inflates without bound and moves no cost line."],
      ["Model precision", "A health metric for the team, not a north star."],
    ],
    correct: 1,
    reasoning:
      "Accepted and actioned recommendations per week is the metric that cannot be faked without value appearing. Usage can be mandated, identified saving can be inflated, precision can improve while nobody acts — acceptance requires an engineer to stake their name on the number.",
  },
];

/* -------------------------------------------------- 04 — Decision log */

export type Decision = {
  q: string;
  product: string;
  options: string[];
  choice: number;
  why: string;
  tradeoff: string;
  outcome: string;
  outcomeLabel: string;
  lesson: string;
};

export const DECISIONS: Decision[] = [
  {
    q: "Should we build the AI model first?",
    product: "Network Cost Intelligence",
    options: [
      "Train a model on current data and iterate",
      "Ship deterministic rules, gate ML on schema stability",
      "Buy a vendor model and integrate",
    ],
    choice: 1,
    why: "Upstream schemas were changing monthly. A model would have burnt its first six months on data debugging while engineers lost interest.",
    tradeoff:
      "Looked unambitious to an AI-hungry sponsor, and guaranteed rework once the contract stabilised.",
    outcome:
      "Recommendations became auditable line by line, which is what unlocked engineer adoption.",
    outcomeLabel: "Hypothesis under test",
    lesson: "Decide what earns trust first. Sophistication is a later problem.",
  },
  {
    q: "One shared scoring model, or one per team?",
    product: "AI Use-Case Portfolio",
    options: [
      "Each team scores in its own model",
      "One shared, slightly crude model",
      "No scoring, decide case by case",
    ],
    choice: 1,
    why: "Comparability was the actual goal. A shared score that everyone distrusts equally still ends the argument faster than four private ones each team defends.",
    tradeoff:
      "Local accuracy for specialist domains, and some genuine irritation from the teams with the most nuanced cases.",
    outcome: "Portfolio reviews moved from advocacy to trade-off discussion.",
    outcomeLabel: "Target",
    lesson: "When the problem is prioritisation, consistency beats precision.",
  },
  {
    q: "Should the copilot ever publish without a human?",
    product: "Assurance Copilot",
    options: [
      "Auto-publish above a confidence threshold",
      "Mandatory human sign-off, always",
      "Auto-publish for low-severity incidents only",
    ],
    choice: 1,
    why: "One wrong published summary would have ended the product. The minutes saved by auto-publish were worth far less than the credibility at risk.",
    tradeoff:
      "Ceded the headline automation metric that made the business case look impressive.",
    outcome:
      "Engineers treated the draft as help rather than as a threat to their judgement.",
    outcomeLabel: "Validation metric",
    lesson: "In high-trust environments, the ceiling on automation is social, not technical.",
  },
  {
    q: "Give executives the single number they asked for?",
    product: "Value Case Studio",
    options: [
      "One headline ROI figure",
      "Three scenarios with named drivers",
      "Full sensitivity model",
    ],
    choice: 1,
    why: "A single number invites a fight about the number. Three scenarios move the conversation to the assumptions, which is where the decision actually lives.",
    tradeoff: "A harder first conversation and a less quotable slide.",
    outcome: "Cases started being challenged on baselines instead of on arithmetic.",
    outcomeLabel: "Hypothesis",
    lesson: "Give decision-makers the structure of the decision, not just its output.",
  },
  {
    q: "Expand to a third cost domain or deepen two?",
    product: "Network Cost Intelligence",
    options: ["Add the third domain now", "Deepen the existing two", "Pause and re-run discovery"],
    choice: 1,
    why: "Weekly use was real but shallow: engineers accepted the top few actions and ignored the tail. Depth was the constraint on value, not coverage.",
    tradeoff:
      "Delayed a second sponsor's domain by a quarter, with the political cost that implies.",
    outcome: "Acceptance rate in the tail became the primary product metric.",
    outcomeLabel: "Target",
    lesson:
      "Expansion feels like progress. Usually it is avoidance of the harder depth problem.",
  },
];

/* ------------------------------------------------------ 05 — Roadmap */

export type Feature = {
  name: string;
  /** Business value — one of the three cost-of-delay components. */
  bv: number;
  /** Time criticality. */
  tc: number;
  /** Risk reduction and opportunity enablement. */
  rr: number;
  /** Job size — the only term that divides. */
  size: number;
  /** 1-indexed start month on the twelve-month timeline. */
  start: number;
  /** Duration in months. */
  span: number;
  value: string;
  reading: string;
};

export type Capability = {
  name: string;
  horizon: "Now" | "Next" | "Later";
  tone: string;
  icon: string;
  features: Feature[];
};

export const CAPABILITIES: Capability[] = [
  {
    name: "Cost intelligence",
    horizon: "Now",
    tone: "#00808B",
    icon: "database",
    features: [
      {
        name: "Cost driver attribution",
        bv: 21,
        tc: 13,
        rr: 21,
        size: 3,
        start: 1,
        span: 3,
        value: "Cut the cost review cycle from 3 weeks to 5 days.",
        reading:
          "The highest score on the board, and not because it is easy. Nothing above it works without trustworthy attribution, so risk reduction scores as high as business value — and the job is small because the data already exists.",
      },
      {
        name: "Anomaly feed for controllable spend",
        bv: 21,
        tc: 13,
        rr: 13,
        size: 3,
        start: 2,
        span: 3,
        value: "Surface 90% of avoidable overspend within 48 hours.",
        reading:
          "Time criticality carries this one: overspend spotted at quarter end cannot be recovered, so the value decays with every week of delay.",
      },
      {
        name: "Ranked weekly action list",
        bv: 21,
        tc: 20,
        rr: 8,
        size: 3,
        start: 3,
        span: 3,
        value: "Give each engineer 20 ranked actions every week.",
        reading:
          "High value and high time criticality — it is the moment analysis becomes a decision, and the weekly rhythm means a delay of a month costs four cycles of action.",
      },
    ],
  },
  {
    name: "Trust & adoption",
    horizon: "Next",
    tone: "#4F46E5",
    icon: "shield-check",
    features: [
      {
        name: "Assumption panel per action",
        bv: 20,
        tc: 13,
        rr: 13,
        size: 3,
        start: 4,
        span: 2,
        value: "Raise action acceptance to 70% by showing the assumptions.",
        reading:
          "Cheap to build and it removes the reason adoption stalls. Showing the assumptions moved acceptance further than improving the model would have.",
      },
      {
        name: "Correction loop",
        bv: 13,
        tc: 13,
        rr: 13,
        size: 3,
        start: 5,
        span: 3,
        value: "Turn a disagreement into training signal within 1 day.",
        reading:
          "Balanced across all three cost-of-delay components. Its real argument is that it feeds everything downstream — without it, later personalisation has nothing honest to learn from.",
      },
      {
        name: "Guided action review",
        bv: 20,
        tc: 8,
        rr: 6,
        size: 3,
        start: 6,
        span: 3,
        value: "Lift acceptance in the tail from 20% to 45%.",
        reading:
          "Strong business value, low time criticality — the gap it closes is not getting worse, so it can wait behind the trust work without losing value.",
      },
    ],
  },
  {
    name: "Value realisation",
    horizon: "Later",
    tone: "#6941C6",
    icon: "trending-up",
    features: [
      {
        name: "Realised-saving attribution",
        bv: 21,
        tc: 8,
        rr: 10,
        size: 4,
        start: 7,
        span: 3,
        value: "Trace 100% of saved cost to accepted actions.",
        reading:
          "Top business value on the board, held back by job size: attribution means agreeing a method with finance, which is slow work that cannot be parallelised.",
      },
      {
        name: "Personalised action feed",
        bv: 13,
        tc: 5,
        rr: 8,
        size: 3,
        start: 8,
        span: 3,
        value: "Reduce time to first action to under 2 minutes.",
        reading:
          "Sequenced after the correction loop deliberately. Built earlier it would personalise against weak signal, which is worse than not personalising at all.",
      },
    ],
  },
];

export const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
