export const slugifyTag = (tag: string): string =>
  tag
    .trim()
    .toLowerCase()
    .replace(/\+/g, 'plus')
    .replace(/#/g, 'sharp')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export function uniqueTags(tagLists: readonly string[][]): string[] {
  const bySlug = new Map<string, string>();

  for (const tag of tagLists.flat()) {
    const slug = slugifyTag(tag);

    if (!slug) {
      throw new Error(`Tag "${tag}" slugifies to an empty string. Rename it.`);
    }

    const existing = bySlug.get(slug);
    if (existing !== undefined && existing !== tag) {
      throw new Error(
        `Tag collision: "${existing}" and "${tag}" both slugify to "${slug}". Rename one.`,
      );
    }

    bySlug.set(slug, tag);
  }

  return [...bySlug.values()].sort((a, b) => a.localeCompare(b));
}
