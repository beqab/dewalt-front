"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { authService } from "../services/authService";
import { ResetPasswordDto } from "../types";
import { useTranslations } from "next-intl";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useState } from "react";

export const useResetPassword = () => {
  const router = useRouter();
  const t = useTranslations();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: ResetPasswordDto) =>
      authService.resetPassword.post(data),
    onSuccess: () => {
      setError(null);
      toast.success(t("auth.resetPassword.resetSuccess"));
      router.push("/login");
    },
    onError: (error: unknown) => {
      const msg = getErrorMessage(error, t("auth.resetPassword.resetError"));
      setError(msg);
      toast.error(msg);
    },
  });

  return {
    reset: (data: ResetPasswordDto) => {
      setError(null);
      mutation.mutate(data);
    },
    error,
    isLoading: mutation.isPending,
    clearError: () => setError(null),
  };
};
