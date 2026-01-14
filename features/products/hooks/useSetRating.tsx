import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ratingsService } from "../services/ratingsService";
import QUERY_KEYS from "@/lib/queryKeys";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function useSetRating() {
  const t = useTranslations();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      anonymousUserId,
      rating,
    }: {
      productId: string;
      anonymousUserId: string;
      rating: number;
    }) => {
      if (!productId || !anonymousUserId) {
        throw new Error("Product ID and anonymous user ID are required");
      }
      const response = await ratingsService.rateProduct.post(productId, {
        anonymousUserId,
        rating,
      });

      return response;
    },
    onSuccess: (_, { productId, anonymousUserId }) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.RATING_STATS(productId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.MY_RATING(productId, anonymousUserId),
      });
      // Invalidate product detail query to refresh rating and reviewCount
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCTS.DETAIL(productId),
      });

      toast.success(t("rating.submitSuccess"));
    },
    onError: (error) => {
      console.error("Failed to set rating:", error);
      toast.error(error?.message || t("error.rating.submit"));
    },
  });
}
