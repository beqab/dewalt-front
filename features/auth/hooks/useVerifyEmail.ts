import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (token: string) => authService.verifyEmail.get(token),
  });
};
