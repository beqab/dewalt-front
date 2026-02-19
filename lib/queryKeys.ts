const QUERY_KEYS = {
  AUTH: {
    CURRENT_USER: ["auth", "currentUser"] as const,
  },
  BANNER_SLIDER: {
    ALL: ["bannerSlider"] as const,
  },
  NEWS: {
    ALL: ["news"] as const,
    DETAIL: (id: string) => ["news", id] as const,
  },
  PRODUCTS: {
    ALL: ["products"] as const,
    DETAIL: (id: string) => ["products", id] as const,
    BY_IDS: (ids: string[]) => ["products", "ids", ...ids] as const,
    SEARCH: (query: string, language: string) =>
      ["products", "search", query, language] as const,
    RATING_ALL: ["products", "rating"] as const,
    RATING_STATS: (productId: string) =>
      ["products", "rating", "ratingStats", productId] as const,
    MY_RATING: (productId: string, anonymousUserId: string) =>
      ["products", "rating", "myRating", productId, anonymousUserId] as const,
  },
  CATEGORIES: {
    MENU: (lang: string) => ["categories", "menu", lang] as const,
  },
  ORDERS: {
    STATUS: (orderId: string) => ["orders", "status", orderId] as const,
    MY: (page: number, limit: number, status?: string) =>
      ["orders", "my", page, limit, status ?? "all"] as const,
  },
} as const;

export default QUERY_KEYS;
