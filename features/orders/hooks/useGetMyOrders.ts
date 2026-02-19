"use client";

import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/lib/queryKeys";
import { ordersService } from "../services/ordersService";

export default function useGetMyOrders(params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 20;
  const status = params?.status;

  return useQuery({
    queryKey: QUERY_KEYS.ORDERS.MY(page, limit, status),
    queryFn: () => ordersService.getMyOrders({ page, limit, status }),
  });
}
