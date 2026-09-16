/**
 * A thin, provider-agnostic event layer.
 *
 * Nothing here loads a tracker or sends a request on its own. `track()` hands
 * the event to whichever provider script is present on the page and does
 * nothing at all when none is — so the site works identically with analytics
 * switched off, and switching provider is a change to one env var rather than
 * a change to every component.
 *
 * Configure with `NEXT_PUBLIC_ANALYTICS` — see `src/components/Analytics.tsx`.
 */

export type EventProps = Record<string, string | number | boolean | undefined>;

type GtagWindow = Window & {
  gtag?: (command: "event", name: string, props?: EventProps) => void;
  plausible?: (name: string, options?: { props: EventProps }) => void;
  umami?: { track: (name: string, props?: EventProps) => void };
};

/**
 * Record something a visitor did.
 *
 * Event names are snake_case and stable — they become column headings in
 * whichever dashboard is attached, so renaming one loses its history.
 */
export function track(event: string, props: EventProps = {}): void {
  if (typeof window === "undefined") return;

  const w = window as GtagWindow;
  // Drop undefined values: some providers reject them outright.
  const clean: EventProps = {};
  for (const [k, v] of Object.entries(props)) {
    if (v !== undefined) clean[k] = v;
  }

  try {
    if (typeof w.gtag === "function") {
      w.gtag("event", event, clean);
    } else if (typeof w.plausible === "function") {
      w.plausible(event, { props: clean });
    } else if (w.umami?.track) {
      w.umami.track(event, clean);
    }
  } catch {
    // Analytics must never break the page. A blocked tracker is a normal state,
    // not an error — plenty of visitors run one blocker or another.
  }
}

/* ------------------------------------------------------------------ events */

/** Where a visitor got to in the funnel, and what moved them there. */
export const events = {
  /** Any call to action. `location` is the section, `label` the button text. */
  ctaClick: (location: string, label: string) => track("cta_click", { location, label }),

  /** How far through the seven-stage thinking journey people actually go. */
  thinkStage: (stage: string, index: number) => track("think_stage", { stage, index }),

  /** Each answer in Challenge me, and whether it matched. */
  challengeAnswer: (call: number, phase: string, matched: boolean) =>
    track("challenge_answer", { call, phase, matched }),

  /** Reaching the end is the strongest engagement signal on the page. */
  challengeComplete: (score: number) => track("challenge_complete", { score }),

  decisionOpen: (decision: string) => track("decision_open", { decision }),

  wsjfOpen: (feature: string) => track("wsjf_open", { feature }),

  /** The value agent's own funnel: start → dashboard → gate → report. */
  agentStart: (mode: "interview" | "example") => track("agent_start", { mode }),
  agentDashboard: (recommendation: string) => track("agent_dashboard", { recommendation }),
  agentGateSubmit: () => track("agent_gate_submit"),
  agentReport: (recommendation: string) => track("agent_report", { recommendation }),

  toolkitView: (category: string, doc: string) => track("toolkit_view", { category, doc }),
  toolkitDownload: (category: string, doc: string) =>
    track("toolkit_download", { category, doc }),
  toolkitRequest: (category: string, doc: string) =>
    track("toolkit_request", { category, doc }),

  /** The conversions that matter: booking a call, LinkedIn, email. */
  contactClick: (channel: "calendar" | "linkedin" | "email", location: string) =>
    track("contact_click", { channel, location }),

  /** The floating contact widget, present on every page. */
  contactWidgetOpen: () => track("contact_widget_open"),
  contactWidgetSubmit: () => track("contact_widget_submit"),
} as const;
