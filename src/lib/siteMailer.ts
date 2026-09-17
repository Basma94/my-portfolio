/**
 * Client for the site's mail sending. The site is a static export with no
 * server of its own, so both sends below call small serverless functions
 * (see toolkit-mailer/) that talk to Resend — the API keys never reach this
 * bundle. See toolkit-mailer/README.md for the one-time setup.
 */

export type MailerResult = { ok: boolean; message: string };

async function postToMailer(
  url: string | undefined,
  key: string | undefined,
  body: Record<string, string>
): Promise<MailerResult> {
  if (!url) {
    return { ok: false, message: "Sending isn't configured yet." };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(key ? { "X-Toolkit-Key": key } : {}),
      },
      body: JSON.stringify(body),
    });
    if (res.ok) return { ok: true, message: "sent" };
    const detail = await res.text().catch(() => "");
    return { ok: false, message: detail || "The mailer rejected the request." };
  } catch {
    return { ok: false, message: "Couldn't reach the mailer." };
  }
}

/**
 * Sends the "Get in touch" widget's message: a notification to the owner
 * (reply-to set to the visitor, so replying reaches them directly) and a
 * best-effort confirmation to the visitor. Both happen server-side in one
 * request — see toolkit-mailer/api/send-contact-message.js.
 */
export async function sendContactMessage(params: {
  email: string;
  message: string;
}): Promise<MailerResult> {
  return postToMailer(
    process.env.NEXT_PUBLIC_CONTACT_MAILER_URL,
    process.env.NEXT_PUBLIC_TOOLKIT_MAILER_KEY,
    { email: params.email, message: params.message }
  );
}

/**
 * Emails the visitor an actual copy of a toolkit document, as a real
 * attachment. Best-effort — the visitor already has the file from the
 * direct browser download, so a failure here shouldn't surface as an error.
 */
export async function sendToolkitAttachment(params: {
  email: string;
  docSlug: string;
  docName: string;
  contents: string;
}): Promise<MailerResult> {
  return postToMailer(
    process.env.NEXT_PUBLIC_TOOLKIT_MAILER_URL,
    process.env.NEXT_PUBLIC_TOOLKIT_MAILER_KEY,
    {
      email: params.email,
      docSlug: params.docSlug,
      docName: params.docName,
      contents: params.contents,
    }
  );
}
