import { API_ROUTES } from "@/lib/apiRoutes";
import { createApiClient } from "@/lib/apiClient";
import type { Product } from "../types";
import type { PaginatedProductsResponse } from "../types/api";

const productsClient = createApiClient<Product>(API_ROUTES.PRODUCTS);

export const productsService = {
  getProductById: {
    get: (id: string, language: "ka" | "en") =>
      productsClient.get<Product>({ language }, id),
  },
  searchProducts: {
    get: async (search: string, language: "ka" | "en", limit: number = 8) => {
      const response = await productsClient.getAll<Product[]>(1, limit, {
        search,
        language,
      });
      // Backend retu rns PaginatedProductsResponse directly, but getAll wraps it in ApiResponse
      // So we need to extract the data property
      return (response as unknown as PaginatedProductsResponse).data || [];
    },
  },
};
