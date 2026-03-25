import { fetchApi } from "@/lib/apiClient.server";
import { API_ROUTES } from "@/lib/apiRoutes";
import type { Product } from "../types";
import { CACHE_TAGS } from "@/lib/cacheTags";

export type SliderGroups = {
  1: Product[];
  2: Product[];
  3: Product[];
  4: Product[];
  5: Product[];
};

export async function getSliderGroups(locale: "ka" | "en") {
  const REVALIDATE_SECONDS = 60 * 60 * 24 * 3;

  return await fetchApi<SliderGroups>(
    `${API_ROUTES.PRODUCTS}/slider-groups`,
    {
      revalidate: REVALIDATE_SECONDS,
      tags: [...CACHE_TAGS.products.all],
      headers: {
        "x-custom-lang": locale,
      },
    }
  );
}
