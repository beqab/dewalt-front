/**
 * Cache tags (similar to React Query keys) for Next fetch caching.
 * Keep strings stable and re-use everywhere.
 */
export const CACHE_TAGS = {
  /**
   * Single menu tag used for both brands list + menu brands tree.
   * Revalidate rarely, keep invalidation simple.
   */
  menu: {
    all: ["menu"] as const,
  },
} as const;
