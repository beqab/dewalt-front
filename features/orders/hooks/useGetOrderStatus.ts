import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/lib/queryKeys";
import { ordersService } from "../services/ordersService";

export default function useGetOrderStatus(orderId: string) {
  const retryCountRef = useRef(0);

  useEffect(() => {
    retryCountRef.current = 0;
  }, [orderId]);

  const query = useQuery({
    queryKey: QUERY_KEYS.ORDERS.STATUS(orderId),
    queryFn: () => ordersService.checkStatus(orderId),
    enabled: Boolean(orderId),
    staleTime: 30 * 1000,
    refetchInterval: (data) => {
      console.log("datallllll", data);
      if (data?.state?.data?.status === "pending" && retryCountRef.current < 3) {
        return 2000;
      }
      return false;
    },
  });

  useEffect(() => {
    if (query.data?.status === "pending" && retryCountRef.current < 3) {
      retryCountRef.current += 1;
    }
  }, [query.data?.status]);

  return query;
}

