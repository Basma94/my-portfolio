"use client";

import { useState } from "react";
import { Icon } from "../Icon";
import { DECISIONS } from "@/data/portfolio";
import { T } from "@/lib/palette";

/** A product leadership decision log: the option rejected and the cost accepted. */
export function DecisionLog() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="decisions" style={{ padding: "clamp(60px,8vw,112px) 24px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div className="eyebrow">04 — Decision log</div>
        <h2 className="section-title" style={{ maxWidth: "24ch" }}>
          Good products are built on good decisions.
        </h2>
        <p className="section-lead" style={{ maxWidth: "56ch" }}>
          Five calls, with the option I rejected and the cost I accepted.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 40 }}>
          {DECISIONS.map((d, i) => {
            const isOpen = open === i;
            const panelId = `decision-panel-${i}`;
            return (
              <div
                key={d.q}
                style={{
                  background: "#fff",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 20,
                  boxShadow: "0 4px 16px rgba(18,18,58,.05)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    padding: "22px clamp(18px,3vw,28px)",
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        color: "var(--ink-300)",
                      }}
                    >
                      {`0${i + 1}`}
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(16px,2.1vw,20px)",
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                        color: "var(--ink-900)",
                      }}
                    >
                      {d.q}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--indigo-600)",
                        background: "var(--indigo-50)",
                        borderRadius: 999,
                        padding: "4px 10px",
                      }}
                    >
                      {d.product}
                    </span>
                  </span>
                  <span
                    style={{
                      flex: "none",
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: "var(--mist-100)",
                      display: "grid",
                      placeItems: "center",
                      color: "var(--ink-600)",
                      transition: "transform 200ms",
                      transform: isOpen ? "rotate(180deg)" : "none",
                    }}
                  >
                    <Icon name="chevron-down" size={16} />
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    style={{
                      padding: "0 clamp(18px,3vw,28px) 28px",
                      animation: "rise 200ms cubic-bezier(.16,1,.3,1)",
                    }}
                  >
                    <div
                      style={{
                        height: 1,
                        background: "var(--border-subtle)",
                        marginBottom: 24,
                      }}
                    />
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                        gap: 28,
                      }}
                    >
                      <div>
                        <div
                          className="eyebrow-xs"
                          style={{ color: "var(--ink-400)", marginBottom: 10 }}
                        >
                          Options
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {d.options.map((o, j) => {
                            const chosen = j === d.choice;
                            return (
                              <div
                                key={o}
                                style={{
                                  fontSize: 14,
                                  lineHeight: 1.55,
                                  borderRadius: 12,
                                  padding: "11px 14px",
                                  background: chosen ? T.tealBg : "#fff",
                                  border: `1px solid ${chosen ? "#8FE3D8" : T.border}`,
                                  color: chosen ? "#00707A" : T.ink4,
                                  fontWeight: chosen ? 600 : 400,
                                }}
                              >
                                {chosen ? "My choice — " : ""}
                                {o}
                              </div>
                            );
                          })}
                        </div>
                        <div
                          className="eyebrow-xs"
                          style={{ marginTop: 18, color: "var(--pink-500)" }}
                        >
                          Trade-off accepted
                        </div>
                        <p
                          style={{
                            margin: "8px 0 0",
                            fontSize: 14,
                            lineHeight: 1.65,
                            color: "var(--ink-700)",
                          }}
                        >
                          {d.tradeoff}
                        </p>
                      </div>

                      <div>
                        <div className="eyebrow-xs" style={{ color: "var(--teal-600)" }}>
                          Why
                        </div>
                        <p
                          style={{
                            margin: "8px 0 0",
                            fontSize: 14,
                            lineHeight: 1.65,
                            color: "var(--ink-700)",
                          }}
                        >
                          {d.why}
                        </p>
                        <div
                          className="eyebrow-xs"
                          style={{ marginTop: 18, color: "var(--indigo-600)" }}
                        >
                          Outcome <span style={{ color: "var(--ink-300)" }}>· {d.outcomeLabel}</span>
                        </div>
                        <p
                          style={{
                            margin: "8px 0 0",
                            fontSize: 14,
                            lineHeight: 1.65,
                            color: "var(--ink-700)",
                          }}
                        >
                          {d.outcome}
                        </p>
                        <div
                          className="eyebrow-xs"
                          style={{ marginTop: 18, color: "var(--ink-400)" }}
                        >
                          Lesson
                        </div>
                        <p
                          style={{
                            margin: "8px 0 0",
                            fontSize: 14,
                            lineHeight: 1.65,
                            color: "var(--ink-800)",
                            fontWeight: 500,
                          }}
                        >
                          {d.lesson}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
