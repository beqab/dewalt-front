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
  },
} as const;

export default QUERY_KEYS;


