import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../services/authService";
import { RequestPasswordResetDto } from "../types";
import { useTranslations } from "next-intl";
import { ApiErrorResponse } from "@/lib/apiClient";

export const useRequestPasswordReset = () => {
  const t = useTranslations();

  return useMutation({
    mutationFn: (data: RequestPasswordResetDto) =>
      authService.requestPasswordReset.post(data),
    onSuccess: () => {
      toast.success(t("auth.resetPassword.requestSuccess"));
    },
    onError: (error: unknown) => {
      let errorMessage = t("auth.resetPassword.requestError");

      if (error && typeof error === "object" && "statusCode" in error) {
        const apiError = error as ApiErrorResponse;
        errorMessage = apiError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }

      toast.error(errorMessage);
    },
  });
};


