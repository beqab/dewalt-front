import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/authService";
import QUERY_KEYS from "@/lib/queryKeys";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.AUTH.CURRENT_USER,
    queryFn: () => authService.getCurrentUser.post(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
