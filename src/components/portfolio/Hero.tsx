"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CtaIcon } from "../Icon";
import { asset } from "@/lib/asset";
import { events } from "@/lib/analytics";

/** The portrait holds for 2 seconds, the AI panel on the reverse for 4. */
const FRONT_MS = 2000;
const BACK_MS = 4000;

const CARDS = [
  {
    href: "#build",
    eyebrow: "Evidence",
    eyebrowColor: "var(--teal-600)",
    title: "See what I built",
    note: "Four products, problem to impact.",
  },
  {
    href: "#think",
    eyebrow: "Judgement",
    eyebrowColor: "var(--indigo-600)",
    title: "See how I think",
    note: "Seven stages, stated trade-offs.",
  },
  {
    href: "#challenge",
    eyebrow: "Interactive",
    eyebrowColor: "var(--violet-600)",
    title: "Challenge me",
    note: "Make the calls before I do.",
  },
];

export function Hero() {
  const [flipped, setFlipped] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Uneven cycle, rescheduled from the face that is currently showing.
  useEffect(() => {
    timer.current = setTimeout(() => setFlipped((f) => !f), flipped ? BACK_MS : FRONT_MS);
    return () => clearTimeout(timer.current);
  }, [flipped]);

  return (
    <section
      id="top"
      style={{
        background: "var(--gradient-wash)",
        padding: "clamp(64px,9vw,132px) 24px clamp(56px,7vw,104px)",
      }}
    >
      <div className="shell">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(28px,5vw,64px)",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1
            style={{
              margin: 0,
              flex: "1 1 420px",
              minWidth: 280,
              fontSize: "clamp(36px,5.2vw,60px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "17ch",
              color: "var(--ink-900)",
              textWrap: "pretty",
            }}
          >
            I turn complex problems into{" "}
            <span className="gradient-phrase">products, strategies &amp; measurable value.</span>
          </h1>

          <div style={{ flex: "0 1 390px", minWidth: 240, maxWidth: 390, perspective: 1600 }}>
            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              aria-label="Flip the card"
              style={{
                position: "relative",
                display: "block",
                width: "100%",
                aspectRatio: "3 / 4",
                padding: 0,
                border: "none",
                background: "none",
                cursor: "pointer",
                transformStyle: "preserve-3d",
                transition: "transform 900ms cubic-bezier(.16,1,.3,1)",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front — a cut-out portrait sitting straight on the page ground:
                  no card chrome, no white frame, just a soft drop shadow. */}
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  background: "transparent",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("/assets/hero-portrait.webp")}
                  alt="Basma Mahmoud"
                  className="hero-portrait-img"
                />
              </span>

              <AiPanel />
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(235px,1fr))",
            gap: 16,
            marginTop: 44,
            maxWidth: 940,
          }}
        >
          {CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="lift"
              onClick={() => events.ctaClick("hero", c.title)}
              style={{
                display: "block",
                background: "rgba(255,255,255,.74)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,.9)",
                borderRadius: 20,
                padding: 22,
                boxShadow: "0 8px 26px rgba(18,18,58,.07)",
                color: "var(--ink-900)",
              }}
            >
              <span
                className="eyebrow-sm"
                style={{ display: "block", color: c.eyebrowColor }}
              >
                {c.eyebrow}
              </span>
              <span
                style={{
                  display: "block",
                  marginTop: 14,
                  fontSize: 19,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                {c.title} <CtaIcon />
              </span>
              <span
                style={{
                  display: "block",
                  marginTop: 6,
                  fontSize: 14,
                  color: "var(--ink-500)",
                }}
              >
                {c.note}
              </span>
            </Link>
          ))}
        </div>

        <p
          style={{
            margin: "30px 0 0",
            fontSize: 15,
            fontWeight: 700,
            color: "var(--ink-700)",
            maxWidth: "60ch",
          }}
        >
          Don&rsquo;t just see what I&rsquo;ve built. Explore how we can turn complex problems into
          better products.
        </p>
      </div>
    </section>
  );
}

const BAR_COLOURS = [
  ["#5CE1D2", "rgba(92,225,210,.25)"],
  ["#5CE1D2", "rgba(92,225,210,.25)"],
  ["#8FB4FF", "rgba(143,180,255,.25)"],
  ["#8FB4FF", "rgba(143,180,255,.25)"],
  ["#C4B5FD", "rgba(196,181,253,.25)"],
  ["#C4B5FD", "rgba(196,181,253,.25)"],
];

const DOTS = [
  { colour: "#5CE1D2", glow: "rgba(92,225,210,.9)", delay: "0s" },
  { colour: "#8FB4FF", glow: "rgba(143,180,255,.9)", delay: "1.1s" },
  { colour: "#C4B5FD", glow: "rgba(196,181,253,.9)", delay: "2.2s" },
];

/**
 * The reverse face: a live AI-product-management panel rather than a second
 * photo — a drifting grid, a pulsing bar set, signal dots travelling
 * Data → Model → Decision → Value, and a sweeping confidence ring.
 */
function AiPanel() {
  return (
    <span
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: "0 18px 44px rgba(18,18,58,.16)",
        background: "var(--gradient-deep)",
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)",
          backgroundSize: "26px 26px",
          animation: "grid-drift 9s linear infinite",
        }}
      />

      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 22,
          textAlign: "left",
        }}
      >
        <span style={{ display: "block" }}>
          <span
            style={{
              display: "block",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.5)",
            }}
          >
            AI product management
          </span>
          <span
            style={{
              display: "block",
              marginTop: 8,
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "#fff",
              lineHeight: 1.3,
            }}
          >
            Data to decision,
            <br />
            with the value attached.
          </span>
        </span>

        <span style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 56 }}>
            {BAR_COLOURS.map(([from, to], i) => (
              <span
                key={i}
                style={{
                  flex: 1,
                  background: `linear-gradient(180deg,${from},${to})`,
                  borderRadius: "4px 4px 0 0",
                  height: "100%",
                  transformOrigin: "bottom",
                  animation: `bar-pulse 2.8s cubic-bezier(.4,0,.2,1) ${(i * 0.22).toFixed(2)}s infinite`,
                }}
              />
            ))}
          </span>

          <span style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {DOTS.map((d) => (
              <span
                key={d.colour}
                style={{
                  position: "relative",
                  height: 2,
                  borderRadius: 999,
                  background: "rgba(255,255,255,.14)",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: -3,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: d.colour,
                    boxShadow: `0 0 12px ${d.glow}`,
                    animation: `flow-dot 3.4s linear ${d.delay} infinite`,
                  }}
                />
              </span>
            ))}
          </span>

          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 8,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.45)",
            }}
          >
            <span>Data</span>
            <span>Model</span>
            <span>Decision</span>
            <span>Value</span>
          </span>
        </span>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            paddingTop: 16,
            borderTop: "1px solid rgba(255,255,255,.14)",
          }}
        >
          <span
            style={{
              position: "relative",
              flex: "none",
              width: 34,
              height: 34,
              borderRadius: "50%",
              background:
                "conic-gradient(#5CE1D2 0deg,#8FB4FF 140deg,rgba(255,255,255,.1) 200deg)",
              display: "grid",
              placeItems: "center",
              animation: "sweep 6s linear infinite",
            }}
          >
            <span
              style={{ width: 24, height: 24, borderRadius: "50%", background: "#151544" }}
            />
          </span>
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.5)",
              }}
            >
              Recommendation
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.02em",
                color: "#5CE1D2",
                animation: "soft-blink 3.2s ease-in-out infinite",
              }}
            >
              PILOT · MEDIUM CONFIDENCE
            </span>
          </span>
        </span>
      </span>
    </span>
  );
}
