import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../services/authService";
import { ChangePasswordDto } from "../types";
import { ApiErrorResponse } from "@/lib/apiClient";
import { useTranslations } from "next-intl";

export const useChangePassword = () => {
  const t = useTranslations();

  return useMutation({
    mutationFn: (data: ChangePasswordDto) =>
      authService.changePassword.patch(data),
    onSuccess: () => {
      toast.success(t("profile.passwordChangeSuccess"));
    },
    onError: (error: unknown) => {
      let errorMessage = t("profile.passwordChangeError");

      if (error && typeof error === "object" && "statusCode" in error) {
        const apiError = error as ApiErrorResponse;
        // Use API error message if available, otherwise use default translation
        errorMessage = apiError.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
      }

      toast.error(errorMessage);
    },
  });
};
