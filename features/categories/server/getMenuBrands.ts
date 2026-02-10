/**
 * Server-side function to fetch menu brands (header/footer navigation)
 * Endpoint: GET /categories/menu?lang=ka|en
 *
 * Notes:
 * - Adds `x-custom-lang` header so backend can localize consistently
 * - Uses Next.js fetch caching/revalidation via `fetchApi`
 */

import { fetchApi } from "@/lib/apiClient.server";
import { API_ROUTES } from "@/lib/apiRoutes";
import type { MenuBrand } from "@/features/categories/types";

export async function getMenuBrands(lang: "ka" | "en"): Promise<MenuBrand[]> {
  try {
    return await fetchApi<MenuBrand[]>(`${API_ROUTES.CATEGORIES}/menu`, {
      params: { lang },
      headers: {
        "x-custom-lang": lang,
      },
      revalidate: 60 * 5, // 5 minutes
      tags: [`brands`],
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      // Keep dev-only logging (matches other server fetchers style)
      console.error("Failed to fetch menu brands on server:", error);
    }
    return [];
  }
}
