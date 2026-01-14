import { useQuery } from "@tanstack/react-query";
import { productsService } from "../services/productsService";
import QUERY_KEYS from "@/lib/queryKeys";
import { useGetLocale } from "@/lib/utils/useGetLocale";
import type { PaginatedProductsResponse } from "../types/api";

export const useSearchProducts = (searchQuery: string) => {
  const locale = useGetLocale() as "ka" | "en";

  return useQuery<PaginatedProductsResponse["data"]>({
    queryKey: QUERY_KEYS.PRODUCTS.SEARCH(searchQuery, locale),
    queryFn: () => productsService.searchProducts.get(searchQuery, locale, 8),
    enabled: searchQuery.trim().length >= 2, // Only search if query is at least 2 characters
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
