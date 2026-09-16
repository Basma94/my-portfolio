import { absoluteAsset } from "@/lib/asset";
import { toolkitDocSlug } from "@/lib/toolkitSlug";

/**
 * Which toolkit docs have a real file to send, and where it lives.
 * Add an entry (keyed by toolkitDocSlug(doc.name)) once a real file is
 * dropped into public/toolkit-files/ — nothing else needs to change.
 * A doc with no entry here shows as "coming soon" instead of a send form.
 */
export const TOOLKIT_FILES: Record<string, string> = {
  // "problem-statement-one-pager": "problem-statement-one-pager.pdf",
};

export function toolkitFileUrl(docName: string): string | null {
  const filename = TOOLKIT_FILES[toolkitDocSlug(docName)];
  return filename ? absoluteAsset(`/toolkit-files/${filename}`) : null;
}
