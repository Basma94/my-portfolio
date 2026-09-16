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

