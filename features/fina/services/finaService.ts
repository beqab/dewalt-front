import { API_ROUTES } from "@/lib/apiRoutes";
import { createApiClient } from "@/lib/apiClient";

type GetProductsRestArrayRequest = {
  prods: number[];
};

// Response is a raw proxy of the upstream FINA API; keep it flexible.
export type GetProductsRestArrayResponse = {
  rest: {
    id: number;
    rest: number;
    reserve: number;
    store: number;
  }[];

  ex: null | unknown;
};

const finaClient = createApiClient(`${API_ROUTES.FINA}/products/rest-array`);

export const finaService = {
  getProductsRestArray: (finaIds: number[]) =>
    finaClient.post<GetProductsRestArrayRequest, GetProductsRestArrayResponse>({
      prods: finaIds,
    }),
};
