"use client";

import { useState } from "react";
import Link from "next/link";
import { CtaIcon, Icon } from "../Icon";
import { CALENDAR_URL, CHALLENGE } from "@/data/portfolio";
import { T } from "@/lib/palette";

/**
 * Nine product calls on one scenario. The visitor answers first, then sees the
 * reasoning — the point is to demonstrate judgement, not to test knowledge, so
 * every option carries a note explaining why it is or isn't the call.
 */
export function ChallengeSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);

  const done = step >= CHALLENGE.length;
  const call = CHALLENGE[Math.min(step, CHALLENGE.length - 1)];
  const answered = answers[step] !== undefined;
  const score = answers.reduce<number>(
    (n, a, i) => n + (a === CHALLENGE[i]?.correct ? 1 : 0),
    0,
  );

  const pick = (j: number) => {
    if (answered) return;
    setAnswers((prev) => {
      const next = prev.slice();
      next[step] = j;
      return next;
    });
  };

  return (
    <section id="challenge" style={{ padding: "clamp(60px,8vw,112px) 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div className="eyebrow">03 — Challenge me</div>
        <h2 className="section-title">Think you&rsquo;d make the same decision?</h2>
        <p
          style={{
            margin: "16px 0 0",
            fontSize: 18,
            lineHeight: 1.6,
            color: "var(--ink-600)",
            maxWidth: "60ch",
          }}
        >
          The scenario: a telecom operator wants to reduce network operating costs using AI. Nine
          calls. Choose yours, then see mine.
        </p>

        <div
          style={{
            marginTop: 36,
            background: "#fff",
            border: "1px solid var(--border-subtle)",
            borderRadius: 28,
            boxShadow: "0 10px 34px rgba(18,18,58,.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "22px clamp(20px,3vw,34px)",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              gap: 16,
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-400)",
              }}
            >
              {done ? "Complete · 9 of 9" : `Call ${step + 1} of 9 · ${call.phase}`}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {CHALLENGE.map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: 26,
                    height: 4,
                    borderRadius: 999,
                    background:
                      i < step
                        ? "linear-gradient(90deg,#00B1BE,#6366F1)"
                        : i === step
                          ? T.indigo
                          : T.border,
                    transition: "background 200ms",
                  }}
                />
              ))}
            </div>
          </div>

          {!done && (
            <div style={{ padding: "clamp(24px,3.4vw,40px)" }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--teal-600)",
                }}
              >
                {call.phase}
              </div>
              <h3
                style={{
                  margin: "12px 0 0",
                  fontSize: "clamp(20px,2.8vw,28px)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--ink-900)",
                  maxWidth: "34ch",
                }}
              >
                {call.q}
              </h3>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 26 }}
              >
                {call.options.map(([text, note], j) => {
                  const picked = answers[step] === j;
                  const isRight = j === call.correct;
                  return (
                    <button
                      key={text}
                      type="button"
                      onClick={() => pick(j)}
                      disabled={answered}
                      className={answered ? undefined : "lift"}
                      style={{
                        cursor: answered ? "default" : "pointer",
                        textAlign: "left",
                        display: "flex",
                        gap: 14,
                        alignItems: "flex-start",
                        background: !answered
                          ? "#fff"
                          : isRight
                            ? T.tealBg
                            : picked
                              ? T.pinkBg
                              : "#fff",
                        border: `1px solid ${
                          !answered ? T.border : isRight ? "#8FE3D8" : picked ? T.pinkBd : T.border
                        }`,
                        borderRadius: 16,
                        padding: "16px 18px",
                      }}
                    >
                      <span
                        style={{
                          flex: "none",
                          width: 26,
                          height: 26,
                          borderRadius: 8,
                          display: "grid",
                          placeItems: "center",
                          fontSize: 12,
                          fontWeight: 600,
                          background: !answered
                            ? T.mist
                            : isRight
                              ? T.teal
                              : picked
                                ? T.pink
                                : T.mist,
                          color: !answered ? T.ink4 : isRight || picked ? "#fff" : T.ink4,
                        }}
                      >
                        {"ABCD"[j]}
                      </span>
                      <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <span style={{ fontSize: 16, fontWeight: 500, color: "var(--ink-900)" }}>
                          {text}
                        </span>
                        {answered && (
                          <span
                            style={{
                              fontSize: 14,
                              lineHeight: 1.6,
                              color: isRight ? T.tealD : T.ink4,
                            }}
                          >
                            {note}
                          </span>
                        )}
                      </span>
                      {answered && (picked || isRight) && (
                        <span
                          style={{
                            marginLeft: "auto",
                            flex: "none",
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: isRight ? T.tealD : T.ink4,
                            background: isRight ? T.tealBg : T.mist,
                            borderRadius: 999,
                            padding: "4px 10px",
                          }}
                        >
                          {isRight ? "My call" : "You chose"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div
                  style={{
                    marginTop: 26,
                    background: "var(--mist-100)",
                    borderRadius: 20,
                    padding: 24,
                    animation: "rise 200ms cubic-bezier(.16,1,.3,1)",
                  }}
                >
                  <div className="eyebrow-sm" style={{ color: "var(--indigo-600)" }}>
                    My reasoning
                  </div>
                  <p
                    style={{
                      margin: "10px 0 0",
                      fontSize: 16,
                      lineHeight: 1.68,
                      color: "var(--ink-800)",
                    }}
                  >
                    {call.reasoning}
                  </p>
                </div>
              )}

              {/* Both controls sit outside the reasoning panel so they stay put
                  whether or not the visitor has answered yet. */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginTop: 26,
                }}
              >
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta"
                  style={{ padding: "13px 24px", fontSize: 15 }}
                >
                  Let&rsquo;s call <Icon name="phone" size={16} />
                </a>
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  className="cta-quiet"
                  style={{
                    padding: "12px 20px",
                    fontSize: 15,
                    boxShadow: "0 4px 14px rgba(18,18,58,.06)",
                  }}
                >
                  {step === CHALLENGE.length - 1 ? "See my full thinking" : "Next question"}{" "}
                  <Icon name="arrow-right" size={16} />
                </button>
              </div>
            </div>
          )}

          {done && (
            <div
              style={{
                padding: "clamp(24px,3.4vw,40px)",
                animation: "rise 320ms cubic-bezier(.16,1,.3,1)",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "clamp(22px,3vw,30px)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--ink-900)",
                }}
              >
                Here&rsquo;s how I&rsquo;d approach it.
              </h3>
              <p
                style={{
                  margin: "12px 0 0",
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: "var(--ink-600)",
                  maxWidth: "62ch",
                }}
              >
                You matched me on {score} of nine calls. The full path matters more than the score
                — this is the sequence, and the reason for the sequence.
              </p>

              <div style={{ marginTop: 28, display: "flex", flexDirection: "column" }}>
                {CHALLENGE.map((c, i) => {
                  const match = answers[i] === c.correct;
                  const chosen = answers[i];
                  return (
                    <div
                      key={c.phase}
                      style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: 18 }}
                    >
                      <div
                        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                      >
                        <span
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            fontSize: 11,
                            fontWeight: 600,
                            background: match ? T.teal : T.mist,
                            color: match ? "#fff" : T.ink4,
                            flex: "none",
                          }}
                        >
                          {i + 1}
                        </span>
                        <span
                          style={{ flex: 1, width: 2, background: "var(--border-subtle)" }}
                        />
                      </div>
                      <div style={{ paddingBottom: 24 }}>
                        <div className="eyebrow-xs" style={{ color: "var(--ink-400)" }}>
                          {c.phase}
                        </div>
                        <div
                          style={{
                            marginTop: 6,
                            fontSize: 16,
                            fontWeight: 600,
                            color: "var(--ink-900)",
                          }}
                        >
                          {c.options[c.correct][0]}
                        </div>
                        <div
                          style={{ marginTop: 4, fontSize: 14, color: match ? T.tealD : T.ink4 }}
                        >
                          {chosen === undefined
                            ? "You skipped this one."
                            : match
                              ? "You made the same call."
                              : `You chose: ${c.options[chosen][0]}`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 14,
                  flexWrap: "wrap",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <Link href="/value-agent" className="cta" style={{ padding: "13px 24px", fontSize: 15 }}>
                  Calculate the AI value <CtaIcon />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setStep(0);
                    setAnswers([]);
                  }}
                  className="cta-quiet"
                  style={{ padding: "12px 22px", fontSize: 15 }}
                >
                  Run it again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
