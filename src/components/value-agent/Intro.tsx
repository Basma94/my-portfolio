import { CtaIcon } from "../Icon";
import { PROMISES } from "@/data/value-agent";

export function Intro({
  onStart,
  onExample,
}: {
  onStart: () => void;
  onExample: () => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
        gap: 24,
        alignItems: "center",
        animation: "ava-fade 320ms cubic-bezier(.16,1,.3,1)",
      }}
    >
      <div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            background: "#fff",
            border: "1px solid var(--border-subtle)",
            borderRadius: 999,
            padding: "6px 14px 6px 8px",
            boxShadow: "0 4px 14px rgba(18,18,58,.06)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-mark.png"
            alt=""
            style={{ width: 22, height: 22, borderRadius: 7, objectFit: "contain" }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--ink-600)",
            }}
          >
            Gartner-inspired AI business value assessment
          </span>
        </div>

        <h2
          style={{
            margin: "22px 0 0",
            fontSize: "clamp(28px,4.4vw,50px)",
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: "-0.02em",
            color: "var(--ink-900)",
            maxWidth: "18ch",
          }}
        >
          What is your AI use case worth?
        </h2>
        <p
          style={{
            margin: "16px 0 0",
            fontSize: "clamp(18px,2.4vw,24px)",
            fontWeight: 300,
            color: "var(--ink-600)",
          }}
        >
          Let&rsquo;s build the business case — together.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30 }}>
          <button
            type="button"
            onClick={onStart}
            className="cta"
            style={{ padding: "15px 28px", fontSize: 16 }}
          >
            Start assessment <CtaIcon />
          </button>
          <button
            type="button"
            onClick={onExample}
            className="cta-quiet"
            style={{
              padding: "14px 26px",
              fontSize: 16,
              boxShadow: "0 4px 14px rgba(18,18,58,.05)",
            }}
          >
            See an example
          </button>
        </div>

        <p
          style={{
            margin: "22px 0 0",
            fontSize: 12,
            lineHeight: 1.7,
            color: "var(--ink-400)",
            maxWidth: "52ch",
          }}
        >
          Structured on the seven dimensions Gartner describes publicly for AI value realisation —
          business value, feasibility, readiness, strategic alignment, cost, risk and time to
          value. Independently built; not a Gartner tool, methodology implementation or certified
          calculation.
        </p>
      </div>

      <div
        style={{
          background: "var(--gradient-deep)",
          borderRadius: 28,
          padding: "clamp(22px,3vw,32px)",
          color: "#fff",
          boxShadow: "0 24px 60px rgba(18,18,58,.30)",
        }}
      >
        <div
          className="eyebrow-sm"
          style={{ letterSpacing: "0.24em", color: "rgba(255,255,255,.55)" }}
        >
          What you get
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 22 }}>
          {PROMISES.map((p) => (
            <div key={p.n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span
                style={{
                  flex: "none",
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: "rgba(255,255,255,.12)",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#5CE1D2",
                }}
              >
                {p.n}
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{p.t}</span>
                <span
                  style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,.66)" }}
                >
                  {p.d}
                </span>
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 26,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,.16)",
            fontSize: 13,
            lineHeight: 1.7,
            color: "rgba(255,255,255,.6)",
          }}
        >
          Every figure carries a source and a confidence level. Nothing is presented as fact that
          is actually an assumption.
        </div>
      </div>
    </div>
  );
}
