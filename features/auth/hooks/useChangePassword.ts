import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../services/authService";
import { ChangePasswordDto } from "../types";
import { useTranslations } from "next-intl";
import { getErrorMessage } from "@/lib/getErrorMessage";

export const useChangePassword = () => {
  const t = useTranslations();

  return useMutation({
    mutationFn: (data: ChangePasswordDto) =>
      authService.changePassword.patch(data),
    onSuccess: () => {
      toast.success(t("profile.passwordChangeSuccess"));
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, t("profile.passwordChangeError")));
    },
  });
};
