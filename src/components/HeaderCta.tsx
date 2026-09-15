"use client";

import Link from "next/link";
import { CtaIcon } from "./Icon";
import { events } from "@/lib/analytics";

/**
 * The persistent "Let's talk" CTA. Split out of the header so the header
 * itself stays a server component — only the click handler needs the client.
 */
export function HeaderCta() {
  return (
    <Link
      href="/#talk"
      className="cta site-header-cta"
      style={{ padding: "10px 20px", fontSize: 14, whiteSpace: "nowrap" }}
      onClick={() => events.ctaClick("header", "Let's talk")}
    >
      Let&rsquo;s talk <CtaIcon />
    </Link>
  );
}
