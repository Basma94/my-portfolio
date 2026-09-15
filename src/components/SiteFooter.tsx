import Link from "next/link";

export function SiteFooter({
  backLabel = "Back to the top",
  backHref = "#top",
}: {
  backLabel?: string;
  backHref?: string;
}) {
  return (
    <footer style={{ padding: "30px 24px", borderTop: "1px solid var(--border-subtle)" }}>
      <div
        className="shell"
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 13,
          color: "var(--ink-400)",
        }}
      >
        <span>Basma Mahmoud · Product Strategist</span>
        <Link href={backHref} style={{ color: "var(--ink-500)" }}>
          {backLabel}
        </Link>
      </div>
    </footer>
  );
}
