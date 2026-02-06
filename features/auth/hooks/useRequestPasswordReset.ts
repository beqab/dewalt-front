"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../services/authService";
import { RequestPasswordResetDto } from "../types";
import { useTranslations } from "next-intl";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useState } from "react";

export const useRequestPasswordReset = () => {
  const t = useTranslations();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: RequestPasswordResetDto) =>
      authService.requestPasswordReset.post(data),
    onSuccess: () => {
      setError(null);
      toast.success(t("auth.resetPassword.requestSuccess"));
    },
    onError: (error: unknown) => {
      const msg = getErrorMessage(error, t("auth.resetPassword.requestError"));
      setError(msg);
      toast.error(msg);
    },
  });

  return {
    request: (data: RequestPasswordResetDto) => {
      setError(null);
      mutation.mutate(data);
    },
    requestAsync: (data: RequestPasswordResetDto) => {
      setError(null);
      return mutation.mutateAsync(data);
    },
    error,
    isLoading: mutation.isPending,
    clearError: () => setError(null),
  };
};
