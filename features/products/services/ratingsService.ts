import { API_ROUTES } from "@/lib/apiRoutes";
import { createApiClient } from "@/lib/apiClient";

export interface RateProductRequest {
  anonymousUserId: string;
  rating: number; // 1-5
}

export interface RatingStats {
  averageRating: number;
  reviewCount: number;
  userRating?: number;
}

const ratingsClient = createApiClient<RatingStats>(API_ROUTES.RATINGS);

export const ratingsService = {
  /**
   * Rate a product (create or update rating)
   */
  rateProduct: {
    post: async (productId: string, data: RateProductRequest) => {
      return ratingsClient.post<RateProductRequest, RatingStats>(
        data,
        undefined,
        { url: `${API_ROUTES.RATINGS}/${productId}/rate` }
      );
    },
  },

  /**
   * Get rating statistics for a product
   */
  getRatingStats: {
    get: async (productId: string, anonymousUserId?: string) => {
      const params = anonymousUserId ? { anonymousUserId } : undefined;
      return ratingsClient.get<RatingStats>(
        params,
        `${productId}/rating-stats`
      );
    },
  },

  /**
   * Get user's current rating for a product
   */
  getMyRating: {
    get: async (productId: string, anonymousUserId: string) => {
      const response = await ratingsClient.get<{ rating: number | null }>(
        { anonymousUserId },
        `${productId}/my-rating`
      );
      return response.rating;
    },
  },
};
