"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocale } from "next-intl";
import QUERY_KEYS from "@/lib/queryKeys";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { ordersService } from "../services/ordersService";
import type { CreateOrderPayload, PaymentOption } from "../types";

export function useCreateOrderPayment({
  fallbackErrorMessage = "Failed to start payment",
}: {
  fallbackErrorMessage?: string;
} = {}) {
  const queryClient = useQueryClient();
  const siteLocale = useLocale();
  const paymentLocale: "ka" | "en" = siteLocale === "en" ? "en" : "ka";
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async ({
      payload,
      paymentType,
    }: {
      payload: CreateOrderPayload;
      paymentType: PaymentOption;
    }) => {
      const createdOrder = await ordersService.create(payload);
      const payment = await ordersService.createPayment(
        createdOrder._id,
        paymentType,
        paymentLocale
      );
      const paymentUrl = payment.response?.checkout_url;

      if (!paymentUrl) {
        throw new Error("Missing payment URL");
      }

      return { paymentUrl, orderId: createdOrder._id };
    },
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.MY(1, 10) });
    },
    onError: (err: unknown) => {
      setError(getErrorMessage(err, fallbackErrorMessage));
    },
  });

  const tbcInstalmentMutation = useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      const createdOrder = await ordersService.create(payload);
      const instalment = await ordersService.createTbcInstalment(
        createdOrder._id
      );
      const redirectUrl = instalment.redirectUrl;

      if (!redirectUrl) {
        throw new Error("Missing TBC instalment redirect URL");
      }

      return { redirectUrl, orderId: createdOrder._id };
    },
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS.MY(1, 10) });
    },
    onError: (err: unknown) => {
      setError(getErrorMessage(err, fallbackErrorMessage));
    },
  });

  return {
    startPayment: async (
      payload: CreateOrderPayload,
      opts: { redirect?: boolean; paymentType?: PaymentOption } = {}
    ) => {
      setError(null);
      const { paymentUrl } = await mutation.mutateAsync({
        payload,
        paymentType: opts.paymentType ?? "card",
      });

      const redirect = opts.redirect ?? true;
      if (redirect && typeof window !== "undefined") {
        window.location.assign(paymentUrl);
      }

      return paymentUrl;
    },
    startTbcInstalment: async (
      payload: CreateOrderPayload,
      opts: { redirect?: boolean } = {}
    ) => {
      setError(null);
      const { redirectUrl } = await tbcInstalmentMutation.mutateAsync(payload);

      const redirect = opts.redirect ?? true;
      if (redirect && typeof window !== "undefined") {
        window.location.assign(redirectUrl);
      }

      return redirectUrl;
    },
    error,
    isLoading: mutation.isPending || tbcInstalmentMutation.isPending,
    clearError: () => setError(null),
  };
}
