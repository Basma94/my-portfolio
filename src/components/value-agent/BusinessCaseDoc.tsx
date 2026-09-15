"use client";

import { useState } from "react";
import Link from "next/link";
import { CtaIcon } from "../Icon";
import { T } from "@/lib/palette";
import { asset } from "@/lib/asset";
import { confidence, engine, money, recommend, type Assumptions } from "@/lib/value-engine";
import { docSections, docToText, risks } from "@/lib/value-engine/document";
import type { GateDetails } from "./Gate";

/**
 * The generated report, styled as a Mingloo document: the lockup at the head,
 * a gradient brand rule under it and above the closing CTA, and a teal-tinted
 * numbered chip on every section heading.
 */
export function BusinessCaseDoc({
  assumptions: a,
  realisation,
  details,
  onBack,
  onEditAssumptions,
}: {
  assumptions: Assumptions;
  realisation: number;
  details: GateDetails;
  onBack: () => void;
  onEditAssumptions: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const e = engine(a, realisation);
  const rec = recommend(a, e);
  const cf = confidence(a, e);
  const sections = docSections(a, realisation);
  const register = risks(a, e);

  const caseName = a.problem
    ? a.problem.length > 90
      ? `${a.problem.slice(0, 90).trim()}…`
      : a.problem
    : `${a.solutionType} for ${a.outcome.toLowerCase()}`;

  const preparedFor =
    details.name || details.email
      ? `Prepared for ${details.name || details.email}${details.org ? ` · ${details.org}` : ""}${
          details.name && details.email ? ` · ${details.email}` : ""
        }`
      : "Prepared from your assessment inputs";

  const execSummary = `The proposed AI use case could generate approximately ${money(
    e.gross,
  )} in annual gross value at full run-rate, of which ${money(
    e.savings,
  )} is direct cost saving against a ${money(
    e.baseline,
  )} baseline. After ${money(e.run)} of annual run cost and ${money(
    e.change,
  )} of change cost, steady-state net annual value is ${money(
    e.steady,
  )}, on an initial investment of ${money(e.build)}. ${rec.why}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(docToText(a, realisation));
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard can be blocked; the page stays readable and printable either way.
    }
  };

  const riskGrid = "1.4fr .7fr .7fr 1.8fr .8fr";
  const bandColour = (v: string) => (v === "High" ? T.pinkD : v === "Medium" ? T.amber : T.tealD);

  return (
    <div style={{ animation: "ava-fade 320ms cubic-bezier(.16,1,.3,1)" }}>
      <div
        className="no-print"
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="cta-quiet"
          style={{ padding: "12px 20px", fontSize: 14, color: "var(--ink-600)" }}
        >
          ← Back to dashboard
        </button>
        <button
          type="button"
          onClick={onEditAssumptions}
          className="cta-quiet"
          style={{ padding: "12px 20px", fontSize: 14, color: "var(--ink-600)" }}
        >
          Edit assumptions
        </button>
        <button
          type="button"
          onClick={copy}
          className="cta-quiet"
          style={{ padding: "12px 20px", fontSize: 14, color: "var(--ink-600)" }}
        >
          {copied ? "Copied to clipboard" : "Copy business case"}
        </button>
        <span style={{ fontSize: 12, color: "var(--ink-400)" }}>
          Print this page to export the case as PDF.
        </span>
      </div>

      <article
        style={{
          background: "#fff",
          border: "1px solid var(--border-subtle)",
          borderRadius: 28,
          padding: "clamp(26px,4vw,56px)",
          boxShadow: "0 10px 34px rgba(18,18,58,.07)",
          maxWidth: 860,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "space-between",
            paddingBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/assets/logo-mark.png")}
              alt=""
              style={{ width: 34, height: 34, borderRadius: 10, objectFit: "contain" }}
            />
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--ink-900)",
                }}
              >
                Basma Mahmoud
              </span>
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 500,
                  letterSpacing: "0.42em",
                  textTransform: "uppercase",
                  color: "var(--ink-400)",
                }}
              >
                AI Product
              </span>
            </span>
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ink-500)",
            }}
          >
            Gartner-inspired assessment
          </span>
        </div>

        <div style={{ height: 2, background: "var(--gradient-brand)", borderRadius: 999 }} />

        <h3
          style={{
            margin: "30px 0 0",
            fontSize: "clamp(26px,4vw,42px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--ink-900)",
          }}
        >
          AI business case
        </h3>
        <p
          style={{
            margin: "12px 0 0",
            fontSize: "clamp(17px,2.2vw,22px)",
            fontWeight: 300,
            color: "var(--ink-600)",
          }}
        >
          {caseName}
        </p>
        <p style={{ margin: "14px 0 0", fontSize: 13, color: "var(--ink-400)" }}>{preparedFor}</p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
          <Chip background={rec.chipBg} colour="#fff">
            {rec.label}
          </Chip>
          <Chip background="var(--mist-100)" colour="var(--ink-600)">
            Confidence {cf.label}
          </Chip>
          <Chip background="var(--mist-100)" colour="var(--ink-600)">
            Net {money(e.steady)}
          </Chip>
        </div>

        <div
          style={{
            marginTop: 32,
            background: "var(--mist-50)",
            borderRadius: 20,
            padding: 26,
          }}
        >
          <div className="eyebrow-sm" style={{ color: "var(--teal-600)" }}>
            Executive summary
          </div>
          <p
            style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.8, color: "var(--ink-800)" }}
          >
            {execSummary}
          </p>
        </div>

        {sections.map((s) => (
          <section key={s.n} style={{ marginTop: 34 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  flex: "none",
                  width: 28,
                  height: 28,
                  borderRadius: 9,
                  background: "var(--teal-50)",
                  border: `1px solid ${T.tealBd}`,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: T.tealD,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {s.n}
              </span>
              <h4
                style={{
                  margin: 0,
                  fontSize: 19,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--ink-900)",
                }}
              >
                {s.title}
              </h4>
            </div>

            {s.body && (
              <p
                style={{
                  margin: "12px 0 0",
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: "var(--ink-700)",
                }}
              >
                {s.body}
              </p>
            )}

            {s.rows.length > 0 && (
              <div
                style={{
                  marginTop: 16,
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                {s.rows.map((r, j) => (
                  <div
                    key={r.k}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(130px,1fr) 1.6fr",
                      gap: 14,
                      padding: "13px 16px",
                      borderBottom: "1px solid var(--border-subtle)",
                      background: j % 2 ? T.mist50 : "#fff",
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-700)" }}>
                      {r.k}
                    </span>
                    <span style={{ fontSize: 13, lineHeight: 1.65, color: "var(--ink-700)" }}>
                      {r.v}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {s.bullets.length > 0 && (
              <ul
                style={{
                  margin: "14px 0 0",
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                }}
              >
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      display: "flex",
                      gap: 12,
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "var(--ink-700)",
                    }}
                  >
                    <span style={{ color: "var(--teal-600)", fontWeight: 700 }}>·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {s.label && (
              <div className="label-chip" style={{ marginTop: 12, display: "inline-block" }}>
                {s.label}
              </div>
            )}
          </section>
        ))}

        <section
          style={{ marginTop: 38, paddingTop: 28, borderTop: "1px solid var(--border-subtle)" }}
        >
          <h4
            style={{
              margin: 0,
              fontSize: 19,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--ink-900)",
            }}
          >
            Risk register
          </h4>
          <div
            style={{
              marginTop: 16,
              border: "1px solid var(--border-subtle)",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: riskGrid,
                gap: 10,
                padding: "12px 14px",
                background: "var(--mist-100)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-400)",
              }}
            >
              <span>Risk</span>
              <span>Prob.</span>
              <span>Impact</span>
              <span>Mitigation</span>
              <span>Owner</span>
            </div>
            {register.map((r) => (
              <div
                key={r.risk}
                style={{
                  display: "grid",
                  gridTemplateColumns: riskGrid,
                  gap: 10,
                  padding: "13px 14px",
                  borderTop: "1px solid var(--border-subtle)",
                  fontSize: 13,
                  alignItems: "start",
                }}
              >
                <span style={{ color: "var(--ink-800)", fontWeight: 500 }}>{r.risk}</span>
                <span style={{ fontWeight: 600, color: bandColour(r.p) }}>{r.p}</span>
                <span style={{ fontWeight: 600, color: bandColour(r.i) }}>{r.i}</span>
                <span style={{ lineHeight: 1.6, color: "var(--ink-600)" }}>{r.m}</span>
                <span style={{ color: "var(--ink-500)" }}>{r.o}</span>
              </div>
            ))}
          </div>
        </section>

        <div
          style={{
            marginTop: 38,
            height: 2,
            background: "var(--gradient-brand)",
            borderRadius: 999,
          }}
        />
        <div
          style={{
            marginTop: 26,
            display: "flex",
            gap: 18,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 500,
              color: "var(--ink-800)",
              maxWidth: "44ch",
            }}
          >
            Want this pressure-tested against a real portfolio and a real budget cycle?
          </p>
          <Link href="/#talk" className="cta" style={{ padding: "13px 24px", fontSize: 15 }}>
            Let&rsquo;s talk <CtaIcon />
          </Link>
        </div>
      </article>
    </div>
  );
}

function Chip({
  background,
  colour,
  children,
}: {
  background: string;
  colour: string;
  children: React.ReactNode;
}) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: colour,
        background,
        borderRadius: 999,
        padding: "6px 14px",
      }}
    >
      {children}
    </span>
  );
}
