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
 * Emails the visitor an actual copy of a toolkit document, as a real
 * attachment — something EmailJS's free plan can't do. This calls a small
 * standalone serverless function (see toolkit-mailer/) that fetches the
 * already-public PDF from this site and re-sends it via Resend; the API key
 * for that lives only on the function, never in this bundle. Best-effort —
 * the visitor already has the file from the direct browser download, so a
 * failure here shouldn't surface as an error.
 */
export async function sendToolkitAttachment(params: {
  email: string;
  docSlug: string;
  docName: string;
  contents: string;
}): Promise<MailerResult> {
  const mailerUrl = process.env.NEXT_PUBLIC_TOOLKIT_MAILER_URL;
  const mailerKey = process.env.NEXT_PUBLIC_TOOLKIT_MAILER_KEY;

  if (!mailerUrl) {
    return { ok: false, message: "Emailed copies aren't configured yet." };
  }

  try {
    const res = await fetch(mailerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(mailerKey ? { "X-Toolkit-Key": mailerKey } : {}),
      },
      body: JSON.stringify({
        email: params.email,
        docSlug: params.docSlug,
        docName: params.docName,
        contents: params.contents,
      }),
    });
    if (res.ok) return { ok: true, message: "sent" };
    const detail = await res.text().catch(() => "");
    return { ok: false, message: detail || "The mailer rejected the request." };
  } catch {
    return { ok: false, message: "Couldn't reach the mailer." };
  }
}
