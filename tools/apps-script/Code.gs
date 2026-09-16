/**
 * The site's one mail-sending backend, sent from the owner's own Gmail
 * account. Handles two request types:
 *   - "toolkit": emails a Product Toolkit document to a visitor.
 *   - "contact": emails the owner a visitor's message from the floating
 *     contact widget, with the visitor's address set as reply-to.
 *
 * Deploy: script.google.com → New project → paste this in → Deploy →
 * New deployment → type "Web app" → Execute as "Me" → Who has access
 * "Anyone" → Deploy → authorize → copy the Web app URL.
 *
 * Set SHARED_SECRET below to a random string, and set the SAME string as
 * the NEXT_PUBLIC_SEND_SECRET repo variable in GitHub. The secret is a
 * basic abuse deterrent, not real security — it ships inside the site's
 * public JS bundle either way, since this is a static site with no server
 * of its own. The real backstops against abuse are ALLOWED_FILE_PREFIXES
 * (only ever fetches files from this site) and the per-hour send cap below.
 */

const SHARED_SECRET = "REPLACE_WITH_A_RANDOM_STRING";
const OWNER_EMAIL = "basma.gm.hassan@gmail.com";

const ALLOWED_FILE_PREFIXES = [
  "https://basma94.github.io/my-portfolio/",
  "https://basmamahmoud.com/",
];

const MAX_SENDS_PER_HOUR = 30;

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.secret !== SHARED_SECRET) return respond(false, "unauthorized");
    if (isRateLimited()) {
      return respond(false, "Too many requests right now — please try again in a few minutes.");
    }

    if (data.type === "contact") return handleContact(data);
    if (data.type === "toolkit") return handleToolkit(data);
    return respond(false, "Unknown request type.");
  } catch (err) {
    return respond(false, String(err));
  }
}

function handleToolkit(data) {
  const email = String(data.email || "").trim();
  const docName = String(data.docName || "").trim();
  const fileUrl = String(data.fileUrl || "").trim();

  if (!isValidEmail(email)) return respond(false, "Enter a valid email address.");
  if (!docName) return respond(false, "Missing document name.");
  if (!ALLOWED_FILE_PREFIXES.some((p) => fileUrl.indexOf(p) === 0)) {
    return respond(false, "That file isn't recognized.");
  }

  const file = UrlFetchApp.fetch(fileUrl).getBlob();

  GmailApp.sendEmail(
    email,
    "Your download: " + docName,
    "Hi,\n\n" +
      "Here's the document you requested from the Product Toolkit: " + docName + ".\n\n" +
      "If it would help to walk through it, just reply to this email.\n\n" +
      "Basma",
    { attachments: [file], name: "Basma Mahmoud" }
  );

  return respond(true, "sent");
}

function handleContact(data) {
  const email = String(data.email || "").trim();
  const message = String(data.message || "").trim();

  if (!isValidEmail(email)) return respond(false, "Enter a valid email address.");
  if (!message) return respond(false, "Say a little about what you need.");
  if (message.length > 4000) return respond(false, "That message is a bit long — please trim it.");

  GmailApp.sendEmail(
    OWNER_EMAIL,
    "New site inquiry from " + email,
    "New message from the site's contact widget.\n\n" +
      "From: " + email + "\n\n" +
      message,
    { replyTo: email, name: "Site contact widget" }
  );

  return respond(true, "sent");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isRateLimited() {
  const cache = CacheService.getScriptCache();
  const key = "sendCount_" + new Date().getHours();
  const count = Number(cache.get(key) || 0);
  if (count >= MAX_SENDS_PER_HOUR) return true;
  cache.put(key, String(count + 1), 3600);
  return false;
}

function respond(ok, message) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok, message: message })).setMimeType(
    ContentService.MimeType.JSON
  );
}
