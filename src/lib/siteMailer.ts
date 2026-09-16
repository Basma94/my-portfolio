/**
 * Client for the site's one mail-sending backend: a Google Apps Script Web
 * App running under the owner's own Gmail account (GmailApp.sendEmail) —
 * see tools/apps-script/Code.gs and README.md for the deployed script and
 * setup. Two request types share it: "toolkit" (email a doc to a visitor)
 * and "contact" (email the owner a visitor's message).
 *
 * The request body is sent as text/plain (not application/json) so the
 * browser treats it as a "simple request" and skips a CORS preflight, which
 * Apps Script Web Apps don't handle.
 */

export type MailerResult = { ok: boolean; message: string };

async function postToMailer(payload: Record<string, unknown>): Promise<MailerResult> {
  const endpoint = process.env.NEXT_PUBLIC_SEND_ENDPOINT;
  const secret = process.env.NEXT_PUBLIC_SEND_SECRET;

  if (!endpoint) {
    return { ok: false, message: "Sending isn't configured yet." };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, secret }),
    });
    return (await res.json()) as MailerResult;
  } catch {
    return { ok: false, message: "Couldn't reach the send service. Please try again shortly." };
  }
}

export function sendToolkitDoc(params: {
  email: string;
  docName: string;
  fileUrl: string;
}): Promise<MailerResult> {
  return postToMailer({ type: "toolkit", ...params });
}

export function sendContactMessage(params: {
  email: string;
  message: string;
}): Promise<MailerResult> {
  return postToMailer({ type: "contact", ...params });
}
