import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { authService } from "../services/authService";
import { ResetPasswordDto } from "../types";
import { useTranslations } from "next-intl";
import { ApiErrorResponse } from "@/lib/apiClient";

export const useResetPassword = () => {
  const router = useRouter();
  const t = useTranslations();

  return useMutation({
    mutationFn: (data: ResetPasswordDto) => authService.resetPassword.post(data),
    onSuccess: () => {
      toast.success(t("auth.resetPassword.resetSuccess"));
      router.push("/login");
    },
    onError: (error: unknown) => {
      let errorMessage = t("auth.resetPassword.resetError");

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


