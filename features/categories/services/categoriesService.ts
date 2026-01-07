import { API_ROUTES } from "@/lib/apiRoutes";
import { createApiClient } from "@/lib/apiClient";
import type { MenuBrand } from "../types";

const menuClient = createApiClient<MenuBrand[]>(
  `${API_ROUTES.CATEGORIES}/menu`
);

export const categoriesService = {
  async getMenu(lang: string) {
    return menuClient.get<MenuBrand[]>({ lang });
  },
};
