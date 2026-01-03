import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { authService } from "../services/authService";
import { RegisterDto } from "../types";
import QUERY_KEYS from "@/lib/queryKeys";

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterDto) => authService.register.post(data),
    onSuccess: () => {
      // Invalidate and refetch current user
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.CURRENT_USER,
      });
      toast.success("Registration successful!");
      router.push("/");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";
      toast.error(errorMessage);
    },
  });
};
