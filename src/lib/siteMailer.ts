/**
 * Client for the site's mail sending. The site is a static export with no
 * server of its own, so this calls EmailJS's REST API directly from the
 * browser — no backend to host or deploy. See README.md ("Contact widget
 * email") for how to connect a Gmail account and template in EmailJS's
 * dashboard, and which values map to which env var here.
 */

export type MailerResult = { ok: boolean; message: string };

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

export async function sendContactMessage(params: {
  email: string;
  message: string;
}): Promise<MailerResult> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return { ok: false, message: "Sending isn't configured yet." };
  }

  try {
    const res = await fetch(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        // Keys here must match the {{variables}} used in the EmailJS
        // template — see the README for the exact template.
        template_params: { from_email: params.email, message: params.message },
      }),
    });

    if (res.ok) return { ok: true, message: "sent" };
    const detail = await res.text().catch(() => "");
    return { ok: false, message: detail || "Something went wrong. Please try again." };
  } catch {
    return { ok: false, message: "Couldn't reach the send service. Please try again shortly." };
  }
}

/**
 * Emailing a toolkit document to a visitor needs an attachment, which is a
 * paid-plan feature on EmailJS — not wired up yet. Every doc currently shows
 * "coming soon" in the UI regardless (see src/data/toolkitFiles.ts), so this
 * path isn't reachable in production; revisit once real files exist and a
 * backend for them is chosen.
 */
export async function sendToolkitDoc(_params: {
  email: string;
  docName: string;
  fileUrl: string;
}): Promise<MailerResult> {
  return { ok: false, message: "Sending isn't configured yet." };
}
