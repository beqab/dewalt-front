export async function extractIdFromSlug(slug: string): Promise<string | null> {
  // Extract the last part after the last hyphen (should be 8 characters)
  const parts = slug.split("-");
  if (parts.length < 2) return null;

  const id = parts[parts.length - 1];

  return id;
}
