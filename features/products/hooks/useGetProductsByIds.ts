import { useQuery, useQueries } from "@tanstack/react-query";
import { productsService } from "../services/productsService";
import QUERY_KEYS from "@/lib/queryKeys";
import { useGetLocale } from "@/lib/utils/useGetLocale";
import type { Product } from "../types";
import type { CompareProductWithSpecs } from "../compare/types";

export const useGetProductById = (id: string) => {
  const locale = useGetLocale() as "ka" | "en";

  return useQuery<Product>({
    queryKey: [...QUERY_KEYS.PRODUCTS.DETAIL(id), locale],
    queryFn: () => productsService.getProductById.get(id, locale),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetProductsByIds = (ids: string[] | null) => {
  const locale = useGetLocale() as "ka" | "en";

  // If ids is null, don't create any queries (still initializing)
  const validIds = ids ?? [];

  const queries = useQueries({
    queries: validIds.map((id) => ({
      queryKey: [...QUERY_KEYS.PRODUCTS.DETAIL(id), locale],
      queryFn: () => productsService.getProductById.get(id, locale),
      enabled: !!id && validIds.length > 0,
      staleTime: 5 * 60 * 1000, // 5 minutes
    })),
  });

  // Check if any query is still loading or fetching (for initial load)
  const isLoading = queries.some(
    (query) => query.isLoading || query.isFetching
  );
  const isError = queries.some((query) => query.isError);
  const error = queries.find((query) => query.error)?.error;

  // Filter out any null/undefined results and type assert as CompareProductWithSpecs
  // (Product already has specs, so this is safe)
  const products = queries
    .map((query) => query.data)
    .filter(
      (product): product is CompareProductWithSpecs => product != null
    ) as CompareProductWithSpecs[];

  // If we have IDs but no products yet and queries are still initializing, consider it loading
  const isInitializing =
    validIds.length > 0 &&
    products.length === 0 &&
    queries.some((query) => !query.isSuccess && !query.isError);

  return {
    products,
    isLoading: isLoading || isInitializing,
    isError,
    error,
  };
};
