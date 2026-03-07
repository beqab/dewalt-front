"use client";

import { useMutation } from "@tanstack/react-query";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { devLogger } from "@/lib/devLogger";
import { useState } from "react";

type LoginVars = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const { update } = useSession();

  const mutation = useMutation({
    mutationFn: async ({ email, password }: LoginVars) => {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      return result;
    },
    onSuccess: async (result) => {
      if (result?.error) {
        setError(t("auth.login.invalidCredentials"));
        toast.error(t("auth.login.loginFailed"));
        return;
      }

      if (result?.ok) {
        setError(null);
        toast.success(t("auth.login.success"));

        await update();
        const callbackUrl = searchParams.get("callbackUrl");
        const targetPath =
          callbackUrl && callbackUrl.startsWith("/")
            ? callbackUrl.replace(/^\/(en|ka)/, "")
            : "/profile";
        router.push(targetPath);
      }
    },

    onError: (error) => {
      devLogger.error("Login error:", error);
      setError(t("auth.login.unexpectedError"));
      toast.error(t("auth.login.loginFailed"));
    },
  });

  return {
    login: (vars: LoginVars) => {
      setError(null);
      mutation.mutate(vars);
    },
    error,
    isLoading: mutation.isPending,
    clearError: () => setError(null),
  };
};
