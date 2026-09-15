import type { CSSProperties } from "react";
import { ICON_PATHS } from "@/lib/icon-paths";

export type IconProps = {
  name: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  style?: CSSProperties;
  className?: string;
};

/**
 * Minimal line icon from the design system's vendored Lucide set.
 *
 * Mirrors `DesignSystem_e0e94d.Icon` exactly, including its fallback: an
 * unknown name renders `sparkles` rather than nothing, so pages that ask for a
 * glyph the set doesn't carry look the way the design does.
 */
export function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  color,
  style,
  className,
}: IconProps) {
  const inner = ICON_PATHS[name] ?? ICON_PATHS.sparkles;
  return (
    <svg
      role="img"
      aria-label={name}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ display: "block", flex: "0 0 auto", ...style }}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}

/**
 * Trailing CTA arrow. The bare `<svg>` is `display:block`, which would break a
 * text line; wrapping it in an inline-flex span keeps it on the baseline beside
 * the label no matter what the containing element's display is.
 */
export function CtaIcon({ name = "arrow-right", size = 16 }: { name?: string; size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", verticalAlign: -3 }}>
      <Icon name={name} size={size} />
    </span>
  );
}
