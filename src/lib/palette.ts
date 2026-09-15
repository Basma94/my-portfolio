/**
 * The literal hex values the prototypes use inline, kept in one place.
 *
 * These sit alongside the design-system tokens rather than replacing them: the
 * tokens are the source of truth for anything expressed in CSS, and this map
 * exists for the places where a colour has to be computed in TypeScript (a
 * band, a score threshold, a selected state) and handed back as a style value.
 */
export const T = {
  teal: "#00B1BE",
  tealD: "#00707A",
  tealBg: "#E6FAF7",
  tealBd: "#B8EDE6",
  ink: "#12123A",
  ink7: "#333A6B",
  ink4: "#6B7599",
  indigo: "#6366F1",
  indigoD: "#4F46E5",
  indigoBg: "#EEF0FF",
  indigoBd: "#D6DAFF",
  violet: "#7F56D9",
  violetD: "#6941C6",
  violetBg: "#F3EEFF",
  violetBd: "#E2D8FF",
  pink: "#FF7E9E",
  pinkD: "#C2185B",
  pinkBg: "#FFF1F4",
  pinkBd: "#FFD6E0",
  amber: "#8A5A00",
  amberBg: "#FFF8E8",
  amberBd: "#F5D9A0",
  border: "#ECEFF7",
  mist: "#F4F6FC",
  mist50: "#FBFCFE",
  mint: "#5CE1D2",
  warm: "#FFE9A8",
  soft: "#FFB3C6",
  white: "#FFFFFF",
} as const;

/** Section padding used by every numbered section on the portfolio page. */
export const SECTION_PAD = "clamp(60px,8vw,112px) 24px";
