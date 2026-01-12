import { API_ROUTES } from "@/lib/apiRoutes";
import { createApiClient } from "@/lib/apiClient";
import type { Product } from "../types";

const productsClient = createApiClient<Product>(API_ROUTES.PRODUCTS);

export const productsService = {
  getProductById: {
    get: (id: string, language: "ka" | "en") =>
      productsClient.get<Product>({ language }, id),
  },
};
