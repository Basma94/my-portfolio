"use client";

import { useState } from "react";
import Link from "next/link";
import { CtaIcon } from "../Icon";
import { STAGES } from "@/data/portfolio";
import { T } from "@/lib/palette";
import { events } from "@/lib/analytics";

/**
 * One decision system, traced end to end. Every stage carries the same seven
 * facets — what was known, what wasn't, the options, the call, the reasoning,
 * the trade-off accepted and what happened next.
 */
export function ThinkSection() {
  const [index, setIndex] = useState(0);
  const stage = STAGES[index];
  const nextLabel =
    index < STAGES.length - 1 ? `Next: ${STAGES[index + 1].label}` : "Back to the start";

  return (
    <section
      id="think"
      style={{ background: "var(--mist-100)", padding: "clamp(60px,8vw,112px) 24px" }}
    >
      <div className="shell">
        <div className="eyebrow">02 — Judgement</div>
        <h2 className="section-title">See how I think.</h2>
        <p className="section-lead" style={{ maxWidth: "54ch" }}>
          One decision system, traced end to end: what was known, what wasn&rsquo;t, and what I
          accepted losing.
        </p>

        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 38,
            overflowX: "auto",
            paddingBottom: 8,
          }}
        >
          {STAGES.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => {
                  setIndex(i);
                  events.thinkStage(s.label, i);
                }}
                aria-pressed={active}
                style={{
                  flex: "none",
                  cursor: "pointer",
                  border: `1px solid ${active ? T.ink : T.border}`,
                  background: active ? T.ink : "#fff",
                  color: active ? "#fff" : T.ink7,
                  borderRadius: 999,
                  padding: "10px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  transition: "all 200ms cubic-bezier(.4,0,.2,1)",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 20,
            background: "#fff",
            border: "1px solid var(--border-subtle)",
            borderRadius: 28,
            padding: "clamp(24px,3.5vw,42px)",
            boxShadow: "0 10px 34px rgba(18,18,58,.07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--teal-600)",
              }}
            >
              {stage.step}
            </span>
            <h3
              style={{
                margin: 0,
                fontSize: "clamp(22px,3vw,30px)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--ink-900)",
              }}
            >
              {stage.title}
            </h3>
          </div>

          <p
            style={{
              margin: "14px 0 0",
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--ink-700)",
              maxWidth: "68ch",
            }}
          >
            {stage.summary}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: 1,
              marginTop: 30,
              background: "var(--border-subtle)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {stage.facets.map(([k, v], i) => (
              <div key={k} style={{ background: "#fff", padding: "20px 22px" }}>
                <div
                  className="eyebrow-xs"
                  // The call is tealed, the trade-off pinked — the two facets
                  // that carry the judgement.
                  style={{ color: i === 3 ? T.teal : i === 5 ? T.pink : T.ink4 }}
                >
                  {k}
                </div>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "var(--ink-700)",
                  }}
                >
                  {v}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 18,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() =>
                setIndex((i) => {
                  const next = (i + 1) % STAGES.length;
                  events.thinkStage(STAGES[next].label, next);
                  return next;
                })
              }
              className="cta"
              style={{ padding: "13px 24px", fontSize: 15 }}
            >
              {nextLabel} <CtaIcon />
            </button>
            <Link
              href="#decisions"
              style={{ fontSize: 15, fontWeight: 600 }}
              onClick={() => events.ctaClick("think", "Explore the decisions")}
            >
              Explore the decisions <CtaIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
