import { useQuery } from "@tanstack/react-query";
import { ratingsService } from "../services/ratingsService";
import QUERY_KEYS from "@/lib/queryKeys";
import { useAnonymousUserId } from "@/hooks/useAnonymousUserId";

export default function useGetCurrentRating(productId: string) {
  const anonymousUserId = useAnonymousUserId();

  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.MY_RATING(productId, anonymousUserId),
    queryFn: () => {
      if (!productId || !anonymousUserId) return null;
      return ratingsService.getMyRating.get(productId, anonymousUserId);
    },
    enabled: !!productId && !!anonymousUserId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
