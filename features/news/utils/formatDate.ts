/**
 * Formats a date string to a localized date format
 */
export function formatNewsDate(
  dateString: string,
  locale: "ka" | "en" = "ka"
): string {
  try {
    const date = new Date(dateString);

    // Validate date
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }

    return date.toLocaleDateString(locale === "ka" ? "ka-GE" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    // Fallback to original string if formatting fails
    return dateString;
  }
}
