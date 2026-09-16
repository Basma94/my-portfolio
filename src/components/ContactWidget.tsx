"use client";

import { useEffect, useRef, useState } from "react";
import { CtaIcon, Icon } from "./Icon";
import { events } from "@/lib/analytics";
import { isValidEmail } from "@/lib/email";
import { sendContactMessage } from "@/lib/siteMailer";

type Status = "idle" | "sending" | "sent" | "error";

const AUTO_OPEN_DELAY_MS = 2000;

/**
 * Fixed, site-wide "get in touch" widget — rendered once in the root layout
 * so it floats above every route. Emails the owner via EmailJS (see
 * src/lib/siteMailer.ts), with the visitor's address set as reply-to.
 *
 * Opens itself 2 seconds after a page loads, unless the visitor has already
 * interacted with it by then. This fires on every full page load/reload —
 * it won't refire from a client-side route change within the same load,
 * since the root layout (and this component) stays mounted across those.
 */
export function ContactWidget() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const userInteracted = useRef(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        userInteracted.current = true;
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!userInteracted.current) {
        setOpen(true);
        events.contactWidgetOpen();
      }
    }, AUTO_OPEN_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    userInteracted.current = true;
    const next = !open;
    setOpen(next);
    if (next) {
      events.contactWidgetOpen();
      setStatus("idle");
      setError("");
    }
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      setError("Say a little about what you need.");
      return;
    }

    setError("");
    setStatus("sending");
    events.contactWidgetSubmit();

    const result = await sendContactMessage({ email: email.trim(), message: message.trim() });

    if (result.ok) {
      setStatus("sent");
    } else {
      setStatus("idle");
      setError(result.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ position: "fixed", right: "clamp(16px,4vw,28px)", bottom: "clamp(16px,4vw,28px)", zIndex: 70 }}>
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Get in touch"
          style={{
            position: "absolute",
            bottom: "calc(100% + 18px)",
            right: 0,
            width: "min(440px, calc(100vw - 32px))",
            background: "#fff",
            borderRadius: 26,
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 28px 70px rgba(18,18,58,.26)",
            overflow: "hidden",
            animation: "rise 260ms cubic-bezier(.16,1,.3,1) both",
          }}
        >
          <div
            style={{
              padding: "24px 28px",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              style={{
                flex: "none",
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "var(--violet-50)",
                color: "var(--violet-500)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon name="bot-smile" size={26} />
            </span>
            <div style={{ flex: "1 1 auto" }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: 19,
                  fontWeight: 600,
                  color: "var(--ink-900)",
                }}
              >
                Get in touch
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                flex: "none",
                cursor: "pointer",
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: "1px solid var(--border-subtle)",
                background: "#fff",
                color: "var(--ink-500)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon name="x" size={18} />
            </button>
          </div>

          {status === "sent" ? (
            <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
              <span
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  background: "var(--teal-50)",
                  color: "var(--teal-600)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Icon name="circle-check" size={26} />
              </span>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--ink-800)" }}>
                Thanks — that's on its way. I reply from this same address.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cta-quiet"
                style={{ padding: "12px 20px", fontSize: 14, color: "var(--ink-600)" }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ padding: 26, display: "flex", flexDirection: "column", gap: 18 }}>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--ink-600)" }}>
                Leave your email and a line about what you need — I reply directly.
              </p>
              <label style={{ display: "block" }}>
                <span
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--ink-700)",
                    marginBottom: 7,
                  }}
                >
                  Your email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(ev) => {
                    setEmail(ev.target.value);
                    setError("");
                  }}
                  placeholder="you@company.com"
                  className="field"
                  style={{ fontSize: 16, padding: "15px 17px" }}
                  disabled={status === "sending"}
                  aria-invalid={!!error}
                />
              </label>
              <label style={{ display: "block" }}>
                <span
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--ink-700)",
                    marginBottom: 7,
                  }}
                >
                  How can I help?
                </span>
                <textarea
                  value={message}
                  onChange={(ev) => {
                    setMessage(ev.target.value);
                    setError("");
                  }}
                  placeholder="A short description is enough."
                  rows={4}
                  className="field"
                  style={{ resize: "vertical", fontFamily: "inherit", fontSize: 16, padding: "15px 17px" }}
                  disabled={status === "sending"}
                  aria-invalid={!!error}
                />
              </label>
              {error && <p style={{ margin: 0, fontSize: 13, color: "#B42318" }}>{error}</p>}
              <button
                type="submit"
                className="cta"
                disabled={status === "sending"}
                style={{ padding: "16px 24px", fontSize: 16, justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}
              >
                {status === "sending" ? "Sending…" : (
                  <>
                    Send <CtaIcon />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close contact form" : "Get in touch"}
        aria-expanded={open}
        style={{
          cursor: "pointer",
          width: 96,
          height: 96,
          borderRadius: "50%",
          border: "none",
          background: "var(--gradient-headline)",
          color: "#fff",
          display: "grid",
          placeItems: "center",
          boxShadow: "0 14px 34px rgba(18,18,58,.32)",
          transition: "transform 160ms cubic-bezier(.4,0,.2,1)",
        }}
      >
        <Icon name={open ? "x" : "bot-smile"} size={48} />
      </button>
    </div>
  );
}
