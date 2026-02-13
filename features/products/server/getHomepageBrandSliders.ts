import { fetchApi } from "@/lib/apiClient.server";
import { API_ROUTES } from "@/lib/apiRoutes";
import type { BrandApi } from "@/features/categories/server/getBrands";
import type { Product } from "../types";
import { CACHE_TAGS } from "@/lib/cacheTags";

export type HomepageBrandSlider = {
  brand: BrandApi;
  products: Product[];
};

export async function getHomepageBrandSliders(locale: "ka" | "en") {
  const REVALIDATE_SECONDS = 60 * 60 * 24 * 3; // 3 days

  return await fetchApi<HomepageBrandSlider[]>(
    `${API_ROUTES.PRODUCTS}/homepage/brand-sliders`,
    {
      revalidate: REVALIDATE_SECONDS,
      tags: [...CACHE_TAGS.products.all],
      headers: {
        "x-custom-lang": locale,
      },
    }
  );
}
