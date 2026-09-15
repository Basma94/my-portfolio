import { Icon } from "../Icon";
import { CALENDAR_URL, EMAIL, LINKEDIN_URL } from "@/data/portfolio";
import { TrackedLink } from "../TrackedLink";

/** The final conversion: one headline, one call booking, two ways to reach out. */
export function TalkSection() {
  return (
    <section
      id="talk"
      style={{
        background: "var(--gradient-deep)",
        padding: "clamp(64px,9vw,120px) 24px",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(32px,5vw,58px)",
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: "-0.02em",
            maxWidth: "20ch",
          }}
        >
          Have a complex product problem?
        </h2>

        <TrackedLink
          href={CALENDAR_URL}
          event="contact_click"
          props={{ channel: "calendar", location: "talk" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginTop: 26,
            background: "#fff",
            color: "var(--ink-900)",
            borderRadius: 999,
            padding: "15px 28px",
            fontSize: 16,
            fontWeight: 600,
            boxShadow: "0 10px 30px rgba(0,0,0,.18)",
          }}
        >
          Let&rsquo;s solve it <Icon name="phone" size={18} />
        </TrackedLink>

        <div
          style={{
            marginTop: 36,
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            alignItems: "center",
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,.16)",
          }}
        >
          <TrackedLink
            href={LINKEDIN_URL}
            event="contact_click"
            props={{ channel: "linkedin", location: "talk" }}
            title="LinkedIn"
            ariaLabel="LinkedIn"
            style={socialStyle}
          >
            <Icon name="linkedin" size={20} />
          </TrackedLink>
          <TrackedLink
            href={`mailto:${EMAIL}`}
            event="contact_click"
            props={{ channel: "email", location: "talk" }}
            title={EMAIL}
            ariaLabel="Email"
            newTab={false}
            style={socialStyle}
          >
            <Icon name="mail" size={20} />
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}

const socialStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 46,
  height: 46,
  borderRadius: "50%",
  background: "rgba(255,255,255,.1)",
  border: "1px solid rgba(255,255,255,.22)",
  color: "#fff",
};
