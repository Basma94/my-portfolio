import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/portfolio/Hero";
import { EvidenceSection } from "@/components/portfolio/EvidenceSection";
import { ThinkSection } from "@/components/portfolio/ThinkSection";
import { ChallengeSection } from "@/components/portfolio/ChallengeSection";
import { DecisionLog } from "@/components/portfolio/DecisionLog";
import { RoadmapSection } from "@/components/portfolio/RoadmapSection";
import { TalkSection } from "@/components/portfolio/TalkSection";

export default function PortfolioPage() {
  return (
    // overflow-x:clip rather than hidden — hidden would make this a scroll
    // container and silently disable the sticky header.
    <div style={{ minHeight: "100vh", background: "#fff", overflowX: "clip" }}>
      <SiteHeader />
      <Hero />
      <DemoDataBand />
      <EvidenceSection />
      <ThinkSection />
      <ChallengeSection />
      <DecisionLog />
      <RoadmapSection />
      <TalkSection />
      <SiteFooter />
    </div>
  );
}

/** Stated once, at the top, before any number on the page is read. */
function DemoDataBand() {
  return (
    <div
      style={{
        background: "var(--mist-50)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "14px 24px",
      }}
    >
      <div
        className="shell"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          fontSize: 13,
          lineHeight: 1.6,
          color: "var(--ink-500)",
        }}
      >
        <span className="label-chip" style={{ flex: "none" }}>
          Demo data
        </span>
        <span>
          Employer work is confidential, so the products, backlog and figures on this page run on
          synthetic data and illustrative scenarios. Nothing here is a reported business result —
          every number is labelled <Strong>Demo</Strong>, <Strong>Target</Strong> or{" "}
          <Strong>Hypothesis</Strong>.
        </span>
      </div>
    </div>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong style={{ fontWeight: 600, color: "var(--ink-700)" }}>{children}</strong>;
}
