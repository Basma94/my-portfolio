import { HOURS_PER_FTE, count, money, sumCosts } from ".";
import type { Assumptions, BuildCosts, RunCosts } from "./types";

export type TextQuestion = {
  type: "text";
  id: keyof Assumptions;
  phase: number;
  prompt: string;
  help: string;
  placeholder: string;
};

export type ChoiceQuestion = {
  type: "choice";
  id: keyof Assumptions;
  phase: number;
  prompt: string;
  help: string;
  multi?: boolean;
  options: [string, string?][];
};

export type SliderQuestion = {
  type: "slider";
  id: keyof Assumptions;
  phase: number;
  prompt: string;
  help: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  display: string;
  minLabel: string;
  maxLabel: string;
  /** Unit switcher shown beneath the slider, used by the volume question. */
  units?: string[];
  /** Whether to show the derived annual baseline under the control. */
  showsBaseline?: boolean;
};

export type GroupQuestion = {
  type: "group";
  id: "build" | "run";
  phase: number;
  prompt: string;
  help: string;
  totalLabel: string;
  rows: { label: string; key: string; min: number; max: number; step: number }[];
};

export type Question = TextQuestion | ChoiceQuestion | SliderQuestion | GroupQuestion;

/**
 * The interview. Value-driver questions appear only when their driver is
 * selected, so the question count adapts to the case rather than marching
 * through irrelevant inputs.
 */
export function buildQuestions(a: Assumptions): Question[] {
  const on = (d: string) => a.drivers.includes(d as never);

  const qs: (Question | null)[] = [
    {
      type: "text",
      id: "problem",
      phase: 0,
      prompt: "What business problem are you trying to solve?",
      help: "Start with the problem, not the technology. If the sentence contains the word AI, you are probably describing a solution.",
      placeholder: "e.g. Alarm triage is manual, so avoidable faults escalate into outages",
    },
    {
      type: "text",
      id: "today",
      phase: 0,
      prompt: "What happens today?",
      help: "Describe the current process as it actually runs, including the workarounds.",
      placeholder: "Who does what, in what order, and where it breaks",
    },
    {
      type: "choice",
      id: "affected",
      phase: 0,
      prompt: "Who is affected?",
      help: "Pick everyone who feels the problem. Select as many as apply.",
      multi: true,
      options: [
        ["Employees"],
        ["Customers"],
        ["Operations"],
        ["Sales"],
        ["Finance"],
        ["IT"],
        ["Leadership"],
        ["Multiple"],
      ],
    },
    {
      type: "choice",
      id: "outcome",
      phase: 0,
      prompt: "What business outcome are you trying to improve?",
      help: "One primary outcome. If everything improves, nothing is prioritised.",
      options: [
        ["Reduce cost"],
        ["Increase revenue"],
        ["Increase productivity"],
        ["Improve customer experience"],
        ["Reduce risk"],
        ["Improve decision quality"],
        ["Increase speed"],
        ["Enable new business model"],
      ],
    },

    {
      type: "slider",
      id: "volume",
      phase: 1,
      prompt: "How many cases does this process touch each year?",
      help: "Count only the volume genuinely in scope. Over-counting here inflates everything downstream.",
      min: 10_000,
      max: 5_000_000,
      step: 10_000,
      unit: a.unit,
      display: count(a.volume),
      minLabel: "10k",
      maxLabel: "5M",
      units: [
        "transactions / year",
        "customers / year",
        "cases / year",
        "decisions / year",
        "hours / year",
      ],
    },
    {
      type: "slider",
      id: "costPerUnit",
      phase: 1,
      prompt: "What does one unit of this process cost today?",
      help: "Fully loaded: people, systems, rework. The cost of getting it wrong belongs in here too.",
      min: 0.5,
      max: 80,
      step: 0.5,
      unit: "per unit",
      display: `€${a.costPerUnit.toFixed(2)}`,
      minLabel: "€0.50",
      maxLabel: "€80",
      showsBaseline: true,
    },
    {
      type: "slider",
      id: "hoursPerUnit",
      phase: 1,
      prompt: "How much time does one unit consume?",
      help: "Hours of human effort per case, end to end, including handoffs and waiting where a person is blocked.",
      min: 0.05,
      max: 8,
      step: 0.05,
      unit: "hours per unit",
      display: `${a.hoursPerUnit.toFixed(2)} h`,
      minLabel: "0.05 h",
      maxLabel: "8 h",
    },
    {
      type: "slider",
      id: "fte",
      phase: 1,
      prompt: "How many people are involved?",
      help: "Full-time equivalents across the whole process, not just the team that owns it.",
      min: 1,
      max: 500,
      step: 1,
      unit: "FTE",
      display: count(a.fte),
      minLabel: "1",
      maxLabel: "500",
    },

    {
      type: "choice",
      id: "drivers",
      phase: 2,
      prompt: "Which value drivers actually apply here?",
      help: "Not all AI value is cost saving. Be honest about which of these you could defend in front of finance.",
      multi: true,
      options: [
        ["Cost reduction", "Lower cost per unit of the same work"],
        ["Productivity", "Time redirected to higher-value work"],
        ["Revenue growth", "Additional revenue you could attribute"],
        ["Customer experience", "A customer metric with a financial consequence"],
        ["Risk reduction", "Reduced expected loss from a named exposure"],
      ],
    },
    on("Cost reduction")
      ? {
          type: "slider",
          id: "reduction",
          phase: 2,
          prompt: "What share of the current cost could realistically be reduced?",
          help: "The default is 20%. Anything above 40% needs evidence, not enthusiasm.",
          min: 1,
          max: 70,
          step: 1,
          unit: "cost reduction",
          display: `${a.reduction}%`,
          minLabel: "1%",
          maxLabel: "70%",
        }
      : null,
    on("Cost reduction")
      ? {
          type: "slider",
          id: "addressable",
          phase: 2,
          prompt: "And what portion of the workflow is actually AI-addressable?",
          help: "This is the question that stops a 70% assumption becoming a 70% forecast. Most workflows have judgement, exceptions and handoffs AI will not touch.",
          min: 5,
          max: 100,
          step: 5,
          unit: "of the workflow",
          display: `${a.addressable}%`,
          minLabel: "5%",
          maxLabel: "100%",
        }
      : null,
    on("Productivity")
      ? {
          type: "slider",
          id: "hoursSaved",
          phase: 2,
          prompt: "How many hours a year could this give back?",
          help: "Hours redirected, not hours eliminated. Modelled productivity value is not cash unless headcount or contractor spend actually changes.",
          min: 500,
          max: 200_000,
          step: 500,
          unit: "hours / year",
          display: count(a.hoursSaved),
          minLabel: "500",
          maxLabel: "200k",
        }
      : null,
    on("Productivity")
      ? {
          type: "slider",
          id: "loadedCost",
          phase: 2,
          prompt: "What is the loaded annual cost per employee?",
          help: `Salary plus employment cost plus tooling. Divided by ${HOURS_PER_FTE} productive hours to get an hourly rate.`,
          min: 30_000,
          max: 200_000,
          step: 1000,
          unit: "per FTE / year",
          display: money(a.loadedCost),
          minLabel: "€30k",
          maxLabel: "€200k",
        }
      : null,
    on("Revenue growth")
      ? {
          type: "slider",
          id: "revenueOpp",
          phase: 2,
          prompt: "What annual revenue opportunity could this create?",
          help: "Only revenue you could attribute to this change in front of finance.",
          min: 0,
          max: 20_000_000,
          step: 100_000,
          unit: "per year",
          display: money(a.revenueOpp),
          minLabel: "€0",
          maxLabel: "€20M",
        }
      : null,
    on("Revenue growth")
      ? {
          type: "slider",
          id: "revenueRealisation",
          phase: 2,
          prompt: "How much of it would you actually realise?",
          help: "Full realisation is the most common error in an AI business case. Conversion, timing and cannibalisation all take a share.",
          min: 5,
          max: 100,
          step: 5,
          unit: "realised",
          display: `${a.revenueRealisation}%`,
          minLabel: "5%",
          maxLabel: "100%",
        }
      : null,
    on("Customer experience")
      ? {
          type: "choice",
          id: "cxMetric",
          phase: 2,
          prompt: "Which customer metric improves?",
          help: "Pick the one with a traceable financial consequence, not the one that is easiest to move.",
          options: [
            ["NPS"],
            ["CSAT"],
            ["Churn"],
            ["Conversion"],
            ["Response time"],
            ["Resolution time"],
          ],
        }
      : null,
    on("Customer experience")
      ? {
          type: "slider",
          id: "cxImpact",
          phase: 2,
          prompt: "What is that worth annually?",
          help: "Your own estimate of the financial consequence. Recorded as an assumption, with its confidence shown.",
          min: 0,
          max: 5_000_000,
          step: 50_000,
          unit: "per year",
          display: money(a.cxImpact),
          minLabel: "€0",
          maxLabel: "€5M",
        }
      : null,
    on("Risk reduction")
      ? {
          type: "slider",
          id: "riskLoss",
          phase: 2,
          prompt: "What is the current annual expected loss from this risk?",
          help: "Fraud, errors, compliance exposure, revenue leakage — whichever applies.",
          min: 0,
          max: 20_000_000,
          step: 100_000,
          unit: "per year",
          display: money(a.riskLoss),
          minLabel: "€0",
          maxLabel: "€20M",
        }
      : null,
    on("Risk reduction")
      ? {
          type: "slider",
          id: "riskReduction",
          phase: 2,
          prompt: "By how much could AI reduce it?",
          help: "Modelled, not guaranteed. Risk reduction is the driver most often over-claimed in AI business cases.",
          min: 1,
          max: 40,
          step: 1,
          unit: "reduction",
          display: `${a.riskReduction}%`,
          minLabel: "1%",
          maxLabel: "40%",
        }
      : null,

    {
      type: "choice",
      id: "solutionType",
      phase: 3,
      prompt: "What kind of AI solution are you considering?",
      help: "This shapes cost, evaluation approach and the failure modes you will have to design around.",
      options: [
        ["Predictive ML"],
        ["Generative AI"],
        ["AI assistant"],
        ["AI agent"],
        ["Recommendation engine"],
        ["Computer vision"],
        ["NLP"],
        ["Anomaly detection"],
        ["Automation"],
      ],
    },
    {
      type: "text",
      id: "whatAI",
      phase: 3,
      prompt: "What exactly will the AI do?",
      help: "One sentence, concrete. If you cannot write it, the use case is not defined yet.",
      placeholder: "e.g. Rank alarms by predicted customer impact and propose the likely root cause",
    },
    {
      type: "choice",
      id: "aiRole",
      phase: 3,
      prompt: "Where does AI sit in the workflow?",
      help: "This is the single biggest driver of governance, adoption and risk. Automating the decision is a different product from informing it.",
      options: [
        ["Assist", "Surfaces information, human decides"],
        ["Recommend", "Proposes an action, human approves"],
        ["Decide", "Decides within set bounds, human audits"],
        ["Execute", "Acts, with human oversight after the fact"],
        ["Fully automate", "No human in the path"],
      ],
    },

    {
      type: "choice",
      id: "dataAvailable",
      phase: 4,
      prompt: "Is the required data available?",
      help: "Available means it exists, you can access it, and someone owns it.",
      options: [["Ready"], ["Partially ready"], ["Not ready"], ["Unknown"]],
    },
    {
      type: "choice",
      id: "dataQuality",
      phase: 4,
      prompt: "How good is that data?",
      help: "Completeness, accuracy, consistency and whether the labels mean what you think they mean.",
      options: [["High"], ["Medium"], ["Low"], ["Unknown"]],
    },
    {
      type: "choice",
      id: "capability",
      phase: 4,
      prompt: "How complex is the AI capability itself?",
      help: "Low means a proven pattern. High means research-grade work with an uncertain end date.",
      options: [["Low"], ["Medium"], ["High"]],
    },
    {
      type: "choice",
      id: "integration",
      phase: 4,
      prompt: "Must it integrate with existing systems or APIs?",
      help: "Integration is where AI timelines usually go wrong — rarely the model.",
      options: [["Yes"], ["No"], ["Unknown"]],
    },
    {
      type: "choice",
      id: "deployment",
      phase: 4,
      prompt: "How difficult is deployment?",
      help: "Environments, security review, release process, and who is allowed to press the button.",
      options: [["Low"], ["Medium"], ["High"]],
    },

    {
      type: "choice",
      id: "interaction",
      phase: 5,
      prompt: "How will people interact with the AI?",
      help: "Interaction mode sets the trust burden, and the trust burden sets the adoption curve.",
      options: [
        ["Assistive"],
        ["Decision support"],
        ["Human-in-the-loop"],
        ["Semi-autonomous"],
        ["Autonomous"],
      ],
    },
    {
      type: "choice",
      id: "workflowChange",
      phase: 5,
      prompt: "How significant is the workflow change?",
      help: "New behaviour is harder than a new screen, and much harder than a new number.",
      options: [["Low"], ["Medium"], ["High"]],
    },
    {
      type: "choice",
      id: "training",
      phase: 5,
      prompt: "How much user training is required?",
      help: "Training cost belongs in the business case, not in a footnote.",
      options: [["Low"], ["Medium"], ["High"]],
    },
    {
      type: "choice",
      id: "trust",
      phase: 5,
      prompt: "How much trust will users need before they act on it?",
      help: "The higher this is, the more explanation and evidence the product must carry from day one.",
      options: [["Low"], ["Medium"], ["High"]],
    },

    {
      type: "group",
      id: "build",
      phase: 6,
      prompt: "What will it cost to build?",
      help: "One-off investment, component by component. A single arbitrary investment number is where most AI business cases lose credibility.",
      totalLabel: "Total initial investment",
      rows: [
        { label: "AI development", key: "dev", min: 0, max: 3_000_000, step: 25_000 },
        { label: "Data preparation", key: "data", min: 0, max: 2_000_000, step: 10_000 },
        { label: "Integration", key: "integration", min: 0, max: 2_000_000, step: 10_000 },
        { label: "Infrastructure", key: "infra", min: 0, max: 1_000_000, step: 10_000 },
        { label: "Security & compliance", key: "security", min: 0, max: 1_000_000, step: 10_000 },
        { label: "Change management", key: "change", min: 0, max: 1_000_000, step: 10_000 },
        { label: "Training", key: "training", min: 0, max: 500_000, step: 5000 },
        { label: "Vendor & licences", key: "vendor", min: 0, max: 2_000_000, step: 25_000 },
      ],
    },
    {
      type: "group",
      id: "run",
      phase: 6,
      prompt: "And what will it cost to run each year?",
      help: "The line that turns a promising pilot into an uneconomic product at scale. Human oversight is a run cost, not a rounding error.",
      totalLabel: "Total annual run cost",
      rows: [
        { label: "AI inference", key: "inference", min: 0, max: 1_500_000, step: 10_000 },
        { label: "Cloud & infrastructure", key: "cloud", min: 0, max: 1_000_000, step: 10_000 },
        { label: "Model & API usage", key: "licensing", min: 0, max: 1_000_000, step: 10_000 },
        { label: "Maintenance", key: "maintenance", min: 0, max: 1_000_000, step: 10_000 },
        { label: "Monitoring & evaluation", key: "monitoring", min: 0, max: 500_000, step: 5000 },
        { label: "Human oversight", key: "oversight", min: 0, max: 1_000_000, step: 10_000 },
        { label: "Support", key: "support", min: 0, max: 500_000, step: 5000 },
      ],
    },
    {
      type: "choice",
      id: "scaleCost",
      phase: 6,
      prompt: "Will cost increase materially as usage scales?",
      help: "Per-inference pricing and human oversight both scale with volume. If yes, I add 15% to the run cost.",
      options: [["Yes"], ["No"], ["Unknown"]],
    },
    {
      type: "slider",
      id: "changeAnnual",
      phase: 6,
      prompt: "What is the annual change and adoption cost?",
      help: "Training refresh, process support, the productivity dip. The line most business cases quietly omit.",
      min: 0,
      max: 1_500_000,
      step: 10_000,
      unit: "per year",
      display: money(a.changeAnnual),
      minLabel: "€0",
      maxLabel: "€1.5M",
    },

    {
      type: "choice",
      id: "firstValue",
      phase: 7,
      prompt: "When could the first value realistically be realised?",
      help: "This sets the year-one benefit ramp, which is usually the difference between a credible case and an optimistic one.",
      options: [["<3 months"], ["3–6 months"], ["6–12 months"], ["12–24 months"], [">24 months"]],
    },
    {
      type: "choice",
      id: "fullAdoption",
      phase: 7,
      prompt: "How long until full-scale adoption?",
      help: "Full adoption, not first release.",
      options: [["<6 months"], ["6–12 months"], ["12–18 months"], ["18–24 months"], [">24 months"]],
    },

    {
      type: "choice",
      id: "objective",
      phase: 8,
      prompt: "Which strategic objective does this support?",
      help: "If it maps to none of these, that is itself the answer.",
      options: [
        ["Revenue growth"],
        ["Cost transformation"],
        ["Customer experience"],
        ["Digital transformation"],
        ["Operational excellence"],
        ["Risk"],
        ["Innovation"],
        ["Employee productivity"],
      ],
    },
    {
      type: "choice",
      id: "importance",
      phase: 8,
      prompt: "How strategically important is it?",
      help: "Be careful here. Everything cannot be critical.",
      options: [["Low"], ["Medium"], ["High"], ["Critical"]],
    },

    {
      type: "choice",
      id: "evidence",
      phase: 9,
      prompt: "What evidence supports the value assumptions?",
      help: "This drives value confidence more than the size of the number does.",
      options: [
        ["Measured with a validated baseline", "Instrumented, agreed with finance"],
        ["Baseline measured internally", "Measured, not yet independently agreed"],
        ["Internal estimates only", "Expert judgement, no measurement"],
        ["Vendor or supplier claims", "Someone else's numbers"],
      ],
    },
    {
      type: "choice",
      id: "benchmark",
      phase: 9,
      prompt: "Do you have a comparable benchmark?",
      help: "A comparable case raises confidence far more than a more detailed spreadsheet does.",
      options: [
        ["Yes, a comparable internal benchmark"],
        ["Yes, an external benchmark"],
        ["No comparable benchmark"],
      ],
    },
  ];

  return qs.filter((q): q is Question => q !== null);
}

export function groupTotal(a: Assumptions, id: "build" | "run"): string {
  return money(sumCosts(a[id] as BuildCosts | RunCosts));
}

/**
 * Where the agent pushes back. These fire on the question that produced the
 * questionable input, so the challenge arrives in context rather than as a
 * verdict at the end.
 */
export function challengeFor(
  q: Question,
  a: Assumptions,
  ctx: { softShare: number; confidenceLabel: string; baseline: number },
): string | null {
  switch (q.id) {
    case "reduction":
      if (a.reduction > 40)
        return `${a.reduction}% is possible in some workflows, but it is a high assumption. Before I use it, let's establish the baseline and identify which activities are actually automatable — the next question does exactly that.`;
      break;
    case "addressable":
      if (a.addressable > 80)
        return "Above 80% addressable means almost no exceptions, no judgement calls and no handoffs. That is rare outside highly standardised back-office work. If you are confident, keep it — but expect finance to test it.";
      break;
    case "revenueRealisation":
      if (a.revenueRealisation > 80)
        return "Assuming you realise more than 80% of a revenue opportunity is the most common way an AI business case overstates value. Conversion, timing and cannibalisation each take a share.";
      break;
    case "riskReduction":
      if (a.riskReduction > 20)
        return "Risk reduction above 20% is difficult to evidence, and it is the driver auditors challenge first. I will carry it as a modelled assumption with low confidence.";
      break;
    case "aiRole":
      if (a.aiRole === "Fully automate" || a.aiRole === "Execute")
        return "Putting AI in the execution path raises governance, adoption and reputational risk sharply. I have reduced feasibility and increased adoption complexity to reflect that. If the decision is reversible and low-stakes, fine — if not, recommend is usually the better first release.";
      break;
    case "drivers":
      if (a.drivers.length >= 4)
        return "Four or more value drivers usually means the case is being padded. The strongest business cases I have seen commit to one primary driver and treat the rest as secondary upside.";
      break;
    case "evidence":
      if (a.evidence === "Vendor or supplier claims")
        return "Vendor numbers describe someone else's environment. I have dropped value confidence accordingly — validating one of these assumptions internally is worth more than any further modelling.";
      break;
    case "changeAnnual":
      if (a.changeAnnual === 0)
        return "Zero annual change cost implies adoption sustains itself. It rarely does. Even a modest figure here makes the case more credible, not less.";
      break;
    case "run":
      if (sumCosts(a.run) < sumCosts(a.build) * 0.12)
        return "Run cost under about 12% of build cost is optimistic for an AI product. Inference, monitoring, evaluation and human oversight all recur — this is the number that decides whether it survives at scale.";
      break;
    case "benchmark":
      if (ctx.confidenceLabel === "Low" && ctx.softShare > 50)
        return `${ctx.softShare}% of the value now comes from modelled or assumed drivers. Your ROI looks attractive, but the case is low-confidence — the recommendation reflects that rather than the headline number.`;
      break;
    case "costPerUnit":
      if (ctx.baseline > 50_000_000)
        return "A baseline above €50M means this is a major cost programme, not a single use case. Consider scoping to one domain so the business case can actually be tested.";
      break;
  }
  return null;
}
