"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { authService } from "../services/authService";
import { RegisterDto } from "../types";
import { useTranslations } from "next-intl";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useState } from "react";

export const useRegister = () => {
  const router = useRouter();
  const t = useTranslations();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: RegisterDto) => authService.register.post(data),
    onSuccess: () => {
      setError(null);
      toast.success(t("auth.register.verifyEmailSent"));
      router.push("/login");
    },
    onError: (error: unknown) => {
      const msg = getErrorMessage(error, t("auth.register.error"));
      setError(msg);
      toast.error(msg);
    },
  });

  return {
    register: (data: RegisterDto) => {
      setError(null);
      mutation.mutate(data);
    },
    error,
    isLoading: mutation.isPending,
    clearError: () => setError(null),
  };
};
