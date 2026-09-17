import { absoluteAsset } from "@/lib/asset";
import { toolkitDocSlug } from "@/lib/toolkitSlug";

/**
 * Which toolkit docs have a real file to send, and where it lives.
 * Add an entry (keyed by toolkitDocSlug(doc.name)) once a real file is
 * dropped into public/toolkit-files/ — nothing else needs to change.
 * A doc with no entry here shows as "coming soon" instead of a send form.
 */
export const TOOLKIT_FILES: Record<string, string> = {
  "problem-statement-one-pager": "problem-statement-one-pager.pdf",
  "opportunity-solution-tree": "opportunity-solution-tree.pdf",
  "journey-map-with-pain-quantification": "journey-map-with-pain-quantification.pdf",
  "market-and-competitive-read": "market-and-competitive-read.pdf",
  "ai-use-case-canvas": "ai-use-case-canvas.pdf",
  "product-charter": "product-charter.pdf",
  "product-vision": "product-vision.pdf",
  "product-strategy": "product-strategy.pdf",
  "strategic-alignment-canvas": "strategic-alignment-canvas.pdf",
  "product-okr-framework": "product-okr-framework.pdf",
  "value-proposition-canvas": "value-proposition-canvas.pdf",
  "business-case": "business-case.pptx",
};

export function toolkitFileUrl(docName: string): string | null {
  const filename = TOOLKIT_FILES[toolkitDocSlug(docName)];
  return filename ? absoluteAsset(`/toolkit-files/${filename}`) : null;
}
