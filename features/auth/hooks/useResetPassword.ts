import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { authService } from "../services/authService";
import { ResetPasswordDto } from "../types";

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordDto) => authService.resetPassword.post(data),
    onSuccess: () => {
      toast.success("Password has been reset successfully");
      router.push("/login");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to reset password. Please try again.";
      toast.error(errorMessage);
    },
  });
};


