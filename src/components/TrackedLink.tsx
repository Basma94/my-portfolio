"use client";

import type { CSSProperties, ReactNode } from "react";
import { track, type EventProps } from "@/lib/analytics";

/**
 * An external link that records the click before following it.
 *
 * Exists so a server component can carry a tracked link without becoming a
 * client component itself.
 */
export function TrackedLink({
  href,
  event,
  props,
  children,
  style,
  title,
  ariaLabel,
  newTab = true,
}: {
  href: string;
  event: string;
  props?: EventProps;
  children: ReactNode;
  style?: CSSProperties;
  title?: string;
  ariaLabel?: string;
  newTab?: boolean;
}) {
  return (
    <a
      href={href}
      title={title}
      aria-label={ariaLabel}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      style={style}
      onClick={() => track(event, props)}
    >
      {children}
    </a>
  );
}
