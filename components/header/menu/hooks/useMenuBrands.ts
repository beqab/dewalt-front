import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "@/features/categories/services/categoriesService";
import { useGetLocale } from "@/lib/utils/useGetLocale";
import type { MenuBrand } from "@/features/categories/types";
import QUERY_KEYS from "@/lib/queryKeys";

export function useMenuBrands() {
  const locale = useGetLocale();

  const staticMenuBrands: MenuBrand[] = [
    {
      id: "1",
      name: "Dewalt",
      slug: "dewalt",
      categories: [],
    },
    {
      id: "2",
      name: "black & decker",
      slug: "black-decker",
      categories: [],
    },
    {
      id: "3",
      name: "stanley",
      slug: "stanley",
      categories: [],
    },
  ];

  const queryResult = useQuery<MenuBrand[]>({
    queryKey: QUERY_KEYS.CATEGORIES.MENU(locale),
    queryFn: () => categoriesService.getMenu(),
    placeholderData: staticMenuBrands,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return queryResult;
}
