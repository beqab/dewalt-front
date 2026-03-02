import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/lib/queryKeys";
import {
  finaService,
  type GetProductsRestArrayResponse,
} from "../services/finaService";

export type FinaRestMap = Record<number, number>;

function extractRestMap(raw: GetProductsRestArrayResponse): FinaRestMap {
  const map: FinaRestMap = {};

  for (const row of raw.rest) {
    const id = Math.trunc(row.id);
    if (!Number.isFinite(id)) continue;

    // Aggregate across stores; available = rest - reserve (never below 0)
    const available = Math.max(0, row.rest - row.reserve);
    map[id] = (map[id] ?? 0) + available;
  }

  return map;
}

export function useFinaProductsRestArray(finaIds: number[]) {
  const stableIds = [...new Set(finaIds)].sort((a, b) => a - b);

  return useQuery({
    queryKey: QUERY_KEYS.FINA.PRODUCTS_REST_ARRAY(stableIds),
    queryFn: async () => {
      const raw = await finaService.getProductsRestArray(stableIds);
      console.log(raw, "raw+++", extractRestMap(raw));
      return extractRestMap(raw);
    },
    enabled: stableIds.length > 0,
    staleTime: 30 * 1000, // keep fairly fresh for checkout
    retry: 1,
  });
}
