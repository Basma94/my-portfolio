/**
 * Client for the site's mail sending. The site is a static export with no
 * server of its own, so this calls EmailJS's REST API directly from the
 * browser — no backend to host or deploy. See README.md ("Contact widget
 * email") for how to connect a Gmail account and template in EmailJS's
 * dashboard, and which values map to which env var here.
 */

export type MailerResult = { ok: boolean; message: string };

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

async function sendEmailJs(
  templateId: string,
  templateParams: Record<string, string>
): Promise<MailerResult> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !publicKey) {
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
        template_params: templateParams,
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
 * Sends two emails: a notification to the owner (with the visitor's address
 * as reply-to, so replying reaches them directly) and a confirmation to the
 * visitor (so they know the message went through and a reply is coming).
 * The confirmation is best-effort — the owner notification is what actually
 * makes the widget useful, so its result is what the UI reports on.
 */
export async function sendContactMessage(params: {
  email: string;
  message: string;
}): Promise<MailerResult> {
  const ownerTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const confirmTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONFIRM;

  if (!ownerTemplateId) {
    return { ok: false, message: "Sending isn't configured yet." };
  }

  // Keys here must match the {{variables}} each EmailJS template uses —
  // see the README for both templates.
  const ownerSend = sendEmailJs(ownerTemplateId, {
    from_email: params.email,
    message: params.message,
  });

  const confirmSend = confirmTemplateId
    ? sendEmailJs(confirmTemplateId, { to_email: params.email, message: params.message })
    : Promise.resolve();

  const [ownerResult] = await Promise.all([ownerSend, confirmSend.catch(() => undefined)]);
  return ownerResult;
}

/**
 * Emails a visitor a download link for a toolkit document — a link rather
 * than an attachment, since attachments are a paid-plan feature on EmailJS.
 * Every doc currently shows "coming soon" in the UI regardless (see
 * src/data/toolkitFiles.ts), so this only actually reaches EmailJS once a
 * real file exists for the requested doc.
 */
export async function sendToolkitDoc(params: {
  email: string;
  docName: string;
  fileUrl: string;
}): Promise<MailerResult> {
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_TOOLKIT;

  if (!templateId) {
    return { ok: false, message: "Sending isn't configured yet." };
  }

  return sendEmailJs(templateId, {
    to_email: params.email,
    doc_name: params.docName,
    file_url: params.fileUrl,
  });
}
