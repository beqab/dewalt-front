import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("Logged out successfully");
      router.push("/");
      // Todo call logout api
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Logout failed";
      toast.error(errorMessage);
    }
  };

  return { logout };
};
