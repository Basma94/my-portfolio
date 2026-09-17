"use client";

import { useEffect, useState } from "react";
import { CtaIcon, Icon } from "../Icon";
import { CATEGORIES, contentsToSections, type ToolkitDoc } from "@/data/toolkit";
import { toolkitFileUrl } from "@/data/toolkitFiles";
import { T } from "@/lib/palette";
import { events } from "@/lib/analytics";
import { isValidEmail } from "@/lib/email";
import { notifyToolkitRequest, sendToolkitAttachment } from "@/lib/siteMailer";
import { toolkitDocSlug } from "@/lib/toolkitSlug";

type ModalMode = "view" | "form" | "sent" | "unavailable";
type ModalState = { mode: ModalMode; cat: number; doc: number };

/**
 * Forces a real download regardless of the file's origin — a plain
 * `<a download>` only honors the attribute for same-origin links, and
 * toolkitFileUrl() returns an absolute URL that's cross-origin in local dev
 * (it points at the production site). Fetching as a blob sidesteps that,
 * since GitHub Pages serves these with permissive CORS headers.
 */
function downloadFile(url: string) {
  // A plain same-origin link with `download` — the file always lives on
  // this same site in production, so there's no need for the fetch+blob
  // dance that a cross-origin case would require (that only ever came up
  // in local dev, where this URL points at the production origin instead
  // of localhost). Safari's built-in PDF viewer can still open a PDF in a
  // new tab instead of saving it straight to disk regardless of `download`
  // — that's Safari's own long-standing behavior for PDFs everywhere, not
  // something fixable from the page; the visitor can still save it from
  // Safari's viewer toolbar.
  const link = document.createElement("a");
  link.href = url;
  link.download = url.split("/").pop() || "download";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function Toolkit() {
  const [cat, setCat] = useState(0);
  const [modal, setModal] = useState<ModalState | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const category = CATEGORIES[cat];

  const closeModal = () => {
    setModal(null);
    setEmailError("");
  };

  const send = () => {
    if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address and it will be on its way.");
      return;
    }
    const m = modal;
    if (!m) return;
    const doc = CATEGORIES[m.cat].docs[m.doc];
    const fileUrl = toolkitFileUrl(doc.name);
    if (!fileUrl) {
      setModal({ ...m, mode: "unavailable" });
      return;
    }

    events.toolkitRequest(category.name, doc.name);
    setModal({ ...m, mode: "sent" });

    downloadFile(fileUrl);

    // Both best-effort — the download already happened above, so neither
    // is allowed to block or fail the visitor-facing flow: a lead
    // notification to the owner, and a real emailed copy to the visitor.
    const trimmedEmail = email.trim();
    notifyToolkitRequest({ email: trimmedEmail, docName: doc.name }).catch(() => {});
    sendToolkitAttachment({
      email: trimmedEmail,
      docSlug: toolkitDocSlug(doc.name),
      docName: doc.name,
    }).catch(() => {});
  };

  return (
    <section style={{ padding: "clamp(40px,5vw,64px) 24px clamp(60px,8vw,96px)" }}>
      <div className="shell">
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
          {CATEGORIES.map((c, i) => {
            const active = i === cat;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setCat(i)}
                aria-pressed={active}
                style={{
                  flex: "none",
                  cursor: "pointer",
                  border: `1px solid ${active ? T.ink : T.border}`,
                  background: active ? T.ink : "#fff",
                  color: active ? "#fff" : T.ink4,
                  borderRadius: 999,
                  padding: "10px 18px",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition: "all 200ms",
                }}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              background: "var(--mist-50)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 24,
              padding: 28,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--violet-500)",
              }}
            >
              {category.name}
            </h2>
            <p
              style={{
                margin: "12px 0 0",
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--ink-600)",
                maxWidth: "78ch",
              }}
            >
              {category.blurb}
            </p>
            <div
              style={{
                marginTop: 20,
                paddingTop: 18,
                borderTop: "1px solid var(--border-subtle)",
                display: "flex",
                gap: 10,
                alignItems: "baseline",
                flexWrap: "wrap",
              }}
            >
              <div className="eyebrow-xs" style={{ color: "var(--ink-400)", flex: "none" }}>
                When I write these
              </div>
              <p
                style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "var(--ink-700)" }}
              >
                {category.when}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
              gap: 16,
            }}
          >
            {category.docs.map((d, i) => (
              <DocCard
                key={d.name}
                doc={d}
                onView={() => {
                  events.toolkitView(category.name, d.name);
                  setModal({ mode: "view", cat, doc: i });
                  setEmailError("");
                }}
                onDownload={() => {
                  events.toolkitDownload(category.name, d.name);
                  setModal({ mode: toolkitFileUrl(d.name) ? "form" : "unavailable", cat, doc: i });
                  setEmailError("");
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {modal && (
        <DocModal
          state={modal}
          email={email}
          emailError={emailError}
          onEmail={(v) => {
            setEmail(v);
            setEmailError("");
          }}
          onSend={send}
          onToDownload={() => {
            const doc = CATEGORIES[modal.cat].docs[modal.doc];
            setModal({ ...modal, mode: toolkitFileUrl(doc.name) ? "form" : "unavailable" });
            setEmailError("");
          }}
          onClose={closeModal}
        />
      )}
    </section>
  );
}

function DocCard({
  doc: d,
  onView,
  onDownload,
}: {
  doc: ToolkitDoc;
  onView: () => void;
  onDownload: () => void;
}) {
  return (
    <article
      className="lift"
      style={{
        background: "#fff",
        border: "1px solid var(--border-subtle)",
        borderRadius: 20,
        padding: 24,
        boxShadow: "0 4px 16px rgba(18,18,58,.05)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        animation: "rise 420ms cubic-bezier(.16,1,.3,1) both",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            flex: "none",
            width: 42,
            height: 42,
            borderRadius: 14,
            background: d.tint,
            color: d.ink,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Icon name={d.icon} size={20} />
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-400)",
            background: "var(--mist-100)",
            borderRadius: 999,
            padding: "4px 10px",
          }}
        >
          {d.kind}
        </span>
      </div>

      <h3
        style={{
          margin: 0,
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "var(--ink-900)",
        }}
      >
        {d.name}
      </h3>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: "var(--ink-600)" }}>
        {d.what}
      </p>

      <div
        style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid var(--border-subtle)" }}
      >
        <div
          className="eyebrow-xs"
          style={{ letterSpacing: "0.18em", color: "var(--teal-600)" }}
        >
          Decision it serves
        </div>
        <p
          style={{
            margin: "6px 0 0",
            fontSize: 13,
            lineHeight: 1.6,
            color: "var(--ink-800)",
            fontWeight: 500,
          }}
        >
          {d.decision}
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={onView}
          style={{
            flex: "1 1 auto",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            border: "1px solid var(--border-subtle)",
            background: "#fff",
            color: "var(--ink-800)",
            borderRadius: 999,
            padding: "10px 16px",
            fontSize: 13,
            fontWeight: 500,
            transition: "all 120ms cubic-bezier(.4,0,.2,1)",
          }}
        >
          <Icon name="eye" size={16} />
          View
        </button>
        <button
          type="button"
          onClick={onDownload}
          className="cta"
          style={{
            flex: "1 1 auto",
            justifyContent: "center",
            gap: 7,
            padding: "10px 16px",
            fontSize: 13,
          }}
        >
          <Icon name="download" size={16} />
          Download
        </button>
      </div>
    </article>
  );
}

function DocModal({
  state,
  email,
  emailError,
  onEmail,
  onSend,
  onToDownload,
  onClose,
}: {
  state: ModalState;
  email: string;
  emailError: string;
  onEmail: (value: string) => void;
  onSend: () => void;
  onToDownload: () => void;
  onClose: () => void;
}) {
  const category = CATEGORIES[state.cat];
  const d = category.docs[state.doc];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const maxWidth = state.mode === "view" ? 620 : state.mode === "form" ? 520 : 480;
  const eyebrow =
    state.mode === "view"
      ? `${category.name} · ${d.kind}`
      : state.mode === "form"
        ? "Download this template"
        : state.mode === "unavailable"
          ? "Coming soon"
          : "Downloaded";

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={d.name}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        background: "rgba(18,18,58,.46)",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "clamp(16px,4vw,56px)",
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth,
          background: "#fff",
          borderRadius: 28,
          boxShadow: "0 30px 80px rgba(18,18,58,.32)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "26px clamp(22px,3vw,34px)",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              flex: "none",
              width: 46,
              height: 46,
              borderRadius: 14,
              background: d.tint,
              color: d.ink,
              display: "grid",
              placeItems: "center",
            }}
          >
            <Icon name={d.icon} size={22} />
          </span>
          <div style={{ flex: "1 1 auto" }}>
            <div className="eyebrow-xs" style={{ color: "var(--ink-400)" }}>
              {eyebrow}
            </div>
            <h3
              style={{
                margin: "7px 0 0",
                fontSize: 21,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "var(--ink-900)",
              }}
            >
              {d.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              flex: "none",
              cursor: "pointer",
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid var(--border-subtle)",
              background: "#fff",
              color: "var(--ink-500)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        {state.mode === "view" && (
          <div
            style={{
              padding: "clamp(22px,3vw,34px)",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: "var(--ink-600)" }}>
              {d.what}
            </p>
            <div
              style={{
                background: "var(--mist-50)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 20,
                padding: 22,
              }}
            >
              <div className="eyebrow-xs" style={{ color: "var(--ink-400)" }}>
                What is in it
              </div>
              <div
                style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}
              >
                {contentsToSections(d.contents).map((s) => (
                  <div key={s.n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span
                      style={{
                        flex: "none",
                        width: 22,
                        height: 22,
                        borderRadius: 7,
                        background: "#fff",
                        border: "1px solid var(--border-subtle)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 10,
                        fontWeight: 700,
                        color: "var(--indigo-600)",
                      }}
                    >
                      {s.n}
                    </span>
                    <span style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-800)" }}>
                      {s.t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="eyebrow-xs" style={{ color: "var(--teal-600)" }}>
                Decision it serves
              </div>
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "var(--ink-800)",
                  fontWeight: 500,
                }}
              >
                {d.decision}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                alignItems: "center",
                paddingTop: 6,
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              <button
                type="button"
                onClick={onToDownload}
                className="cta"
                style={{ padding: "12px 22px", fontSize: 14, marginTop: 18 }}
              >
                <Icon name="download" size={16} />
                Download this template
              </button>
              <span style={{ fontSize: 13, color: "var(--ink-400)", marginTop: 18 }}>
                Structure shown here; figures inside are illustrative.
              </span>
            </div>
          </div>
        )}

        {state.mode === "form" && (
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              onSend();
            }}
            style={{
              padding: "clamp(22px,3vw,34px)",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--ink-600)",
                maxWidth: "56ch",
              }}
            >
              Leave your email — the download starts right away, and a copy
              lands in your inbox too.
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
                onChange={(ev) => onEmail(ev.target.value)}
                placeholder="you@company.com"
                className="field"
                style={{ background: "#fff" }}
                aria-invalid={!!emailError}
              />
            </label>
            {emailError && (
              <p style={{ margin: 0, fontSize: 13, color: "#B42318" }}>{emailError}</p>
            )}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <button type="submit" className="cta" style={{ padding: "13px 24px", fontSize: 14 }}>
                Download it <CtaIcon name="download" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="cta-quiet"
                style={{ padding: "13px 20px", fontSize: 14, color: "var(--ink-600)" }}
              >
                Not now
              </button>
            </div>
          </form>
        )}

        {state.mode === "unavailable" && (
          <div
            style={{
              padding: "clamp(26px,4vw,40px)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--ink-600)" }}>
              This template isn&apos;t ready to download yet — check back soon, or get in touch
              and I&apos;ll prioritize it.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="cta-quiet"
              style={{ padding: "12px 22px", fontSize: 14, color: "var(--ink-700)" }}
            >
              Close
            </button>
          </div>
        )}

        {state.mode === "sent" && (
          <div
            style={{
              padding: "clamp(26px,4vw,40px)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "var(--teal-50)",
                color: "var(--teal-600)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon name="circle-check" size={24} />
            </span>
            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--ink-900)",
                fontWeight: 500,
              }}
            >
              Your download should start automatically.
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.7,
                color: "var(--ink-600)",
                maxWidth: "52ch",
              }}
            >
              If it didn&apos;t,{" "}
              <a href={toolkitFileUrl(d.name) ?? "#"} style={{ color: "var(--indigo-600)" }}>
                click here
              </a>{" "}
              to get {d.name} directly. A copy is also on its way to your inbox.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="cta-quiet"
              style={{ padding: "12px 22px", fontSize: 14, color: "var(--ink-700)" }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
