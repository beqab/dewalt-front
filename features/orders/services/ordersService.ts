import { API_ROUTES } from "@/lib/apiRoutes";
import { createApiClient } from "@/lib/apiClient";
import type {
  CreateOrderPayload,
  CreatePaymentResponse,
  OrderResponse,
  OrderStatusResponse,
} from "../types";

const ordersClient = createApiClient<OrderResponse>(API_ROUTES.ORDERS);

export const ordersService = {
  create: (payload: CreateOrderPayload) =>
    ordersClient.post<CreateOrderPayload, OrderResponse>(payload),
  createPayment: (orderId: string) =>
    ordersClient.post<{ orderId: string }, CreatePaymentResponse>(
      { orderId },
      undefined,
      { url: `${API_ROUTES.ORDERS}/payment` }
    ),
  checkStatus: (orderId: string) =>
    ordersClient.get<OrderStatusResponse>({ orderId }, "status"),
};
