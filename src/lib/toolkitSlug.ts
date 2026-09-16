/** Stable id for a toolkit doc, derived from its name. Used to key the file manifest and the emailed filename. */
export function toolkitDocSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
