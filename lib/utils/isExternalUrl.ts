// Helper function to check if URL is external
export const isExternalUrl = (url: string): boolean => {
  if (typeof window === "undefined") {
    // SSR: Check if it starts with http:// or https://
    return /^https?:\/\//i.test(url) && !url.startsWith("/");
  }
  try {
    // Absolute URL with protocol
    if (/^https?:\/\//i.test(url)) {
      const urlObj = new URL(url);
      return urlObj.origin !== window.location.origin;
    }
    // Relative paths are internal
    if (url.startsWith("/")) {
      return false;
    }
    // Everything else is treated as external
    return true;
  } catch {
    // If URL parsing fails, treat as internal if it starts with /
    return !url.startsWith("/");
  }
};
