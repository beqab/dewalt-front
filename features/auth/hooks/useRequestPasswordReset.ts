import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../services/authService";
import { RequestPasswordResetDto } from "../types";

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (data: RequestPasswordResetDto) =>
      authService.requestPasswordReset.post(data),
    onSuccess: () => {
      toast.success(
        "If an account with that email exists, a password reset link has been sent."
      );
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to request password reset. Please try again.";
      toast.error(errorMessage);
    },
  });
};


