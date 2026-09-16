/**
 * Sends a toolkit doc by email via a Google Apps Script Web App running under
 * the site owner's own Gmail account (GmailApp.sendEmail) — see
 * tools/apps-script/Code.gs for the deployed script and README.md for setup.
 *
 * The request body is sent as text/plain (not application/json) so the
 * browser treats it as a "simple request" and skips a CORS preflight, which
 * Apps Script Web Apps don't handle.
 */

export type ToolkitSendResult = { ok: boolean; message: string };

export async function sendToolkitDoc(params: {
  email: string;
  docName: string;
  fileUrl: string;
}): Promise<ToolkitSendResult> {
  const endpoint = process.env.NEXT_PUBLIC_TOOLKIT_ENDPOINT;
  const secret = process.env.NEXT_PUBLIC_TOOLKIT_SECRET;

  if (!endpoint) {
    return { ok: false, message: "Sending isn't configured yet." };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...params, secret }),
    });
    const data = (await res.json()) as ToolkitSendResult;
    return data;
  } catch {
    return { ok: false, message: "Couldn't reach the send service. Please try again shortly." };
  }
}
