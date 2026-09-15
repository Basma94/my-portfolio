import type { Feature } from "@/data/portfolio";

/**
 * WSJF = cost of delay ÷ job size, where cost of delay is the sum of business
 * value, time criticality and risk reduction / opportunity enablement.
 *
 * Scores are relative, not absolute — a 14 only means something next to a 4.
 */
export function costOfDelay(f: Feature): number {
  return f.bv + f.tc + f.rr;
}

export function wsjfScore(f: Feature): number {
  return costOfDelay(f) / f.size;
}

/** Band a WSJF score for colouring. Thresholds match the design. */
export function wsjfBand(score: number): "high" | "mid" | "low" {
  if (score >= 14) return "high";
  if (score >= 9) return "mid";
  return "low";
}

/**
 * Split a business-value sentence so its numbers can be bolded, keeping the
 * spelled-out small numbers ("three weeks") in the same treatment as digits.
 */
export function boldNumbers(text: string): { t: string; bold: boolean }[] {
  const parts = String(text)
    .split(/(\d[\d.,]*\s?%?|\bone\b|\btwo\b|\bthree\b|\bfive\b|\btwenty\b)/i)
    .filter((x) => x !== "");
  return parts.map((t) => ({
    t,
    bold: /^(\d|one$|two$|three$|five$|twenty$)/i.test(t.trim()),
  }));
}
