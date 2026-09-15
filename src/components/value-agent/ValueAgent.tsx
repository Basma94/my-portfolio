"use client";

import { useState } from "react";
import { DEFAULTS, EXAMPLE } from "@/data/value-agent";
import type { Assumptions } from "@/lib/value-engine";
import { Intro } from "./Intro";
import { Interview } from "./Interview";
import { Dashboard } from "./Dashboard";
import { Gate, type GateDetails } from "./Gate";
import { BusinessCaseDoc } from "./BusinessCaseDoc";

type View = "intro" | "interview" | "dash" | "gate" | "doc";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clone = (a: Assumptions): Assumptions => structuredClone(a);

/**
 * The agent. It holds one set of assumptions and moves between five views:
 * intro, interview, dashboard, the email gate and the generated report.
 *
 * All the arithmetic lives in `@/lib/value-engine`, so assumptions can be
 * swapped without touching this component.
 */
export function ValueAgent() {
  const [view, setView] = useState<View>("intro");
  const [step, setStep] = useState(0);
  const [assumptions, setAssumptions] = useState<Assumptions>(() => clone(DEFAULTS));
  const [scenario, setScenario] = useState("Base");
  const [realisation, setRealisation] = useState(100);
  const [assumptionsOpen, setAssumptionsOpen] = useState(false);
  const [isExample, setIsExample] = useState(false);
  const [gate, setGate] = useState<GateDetails>({ name: "", email: "", org: "" });
  const [gateError, setGateError] = useState(false);
  const [gatePassed, setGatePassed] = useState(false);

  const set = <K extends keyof Assumptions>(key: K, value: Assumptions[K]) =>
    setAssumptions((a) => ({ ...a, [key]: value }));

  const setNested = (group: "build" | "run", key: string, value: number) =>
    setAssumptions((a) => ({ ...a, [group]: { ...a[group], [key]: value } }));

  // Multi-selects never empty out: the last remaining choice cannot be removed.
  const toggle = (key: "drivers" | "affected", value: string) =>
    setAssumptions((a) => {
      const current = a[key] as string[];
      const next = current.includes(value)
        ? current.filter((x) => x !== value)
        : [...current, value];
      return { ...a, [key]: next.length ? next : current };
    });

  const restart = () => {
    setAssumptions(clone(DEFAULTS));
    setStep(0);
    setIsExample(false);
    setRealisation(100);
    setScenario("Base");
    setView("interview");
  };

  return (
    <>
      {view === "intro" && (
        <Intro
          onStart={() => {
            setStep(0);
            setView("interview");
          }}
          onExample={() => {
            setAssumptions(clone(EXAMPLE));
            setIsExample(true);
            setRealisation(100);
            setScenario("Base");
            setView("dash");
          }}
        />
      )}

      {view === "interview" && (
        <Interview
          assumptions={assumptions}
          step={step}
          realisation={realisation}
          onSet={set}
          onSetNested={setNested}
          onToggle={toggle}
          onStep={setStep}
          onFinish={() => setView("dash")}
        />
      )}

      {view === "dash" && (
        <Dashboard
          assumptions={assumptions}
          realisation={realisation}
          scenario={scenario}
          isExample={isExample}
          assumptionsOpen={assumptionsOpen}
          onScenario={(label, r) => {
            setScenario(label);
            setRealisation(r);
          }}
          onRealisation={setRealisation}
          onToggleAssumptions={() => setAssumptionsOpen((o) => !o)}
          onOpenAssumptions={() => setAssumptionsOpen(true)}
          onGenerateCase={() => setView(gatePassed ? "doc" : "gate")}
          onRestart={restart}
          onEditAnswers={() => {
            setStep(0);
            setView("interview");
          }}
        />
      )}

      {view === "gate" && (
        <Gate
          assumptions={assumptions}
          realisation={realisation}
          details={gate}
          error={gateError}
          onChange={(patch) => {
            setGate((g) => ({ ...g, ...patch }));
            setGateError(false);
          }}
          onSubmit={() => {
            if (EMAIL_PATTERN.test(gate.email.trim())) {
              setGatePassed(true);
              setGateError(false);
              setView("doc");
            } else {
              setGateError(true);
            }
          }}
          onBack={() => setView("dash")}
        />
      )}

      {view === "doc" && (
        <BusinessCaseDoc
          assumptions={assumptions}
          realisation={realisation}
          details={gate}
          onBack={() => setView("dash")}
          onEditAssumptions={() => {
            setStep(0);
            setView("interview");
          }}
        />
      )}
    </>
  );
}
