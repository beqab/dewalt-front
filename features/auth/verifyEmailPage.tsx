"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { authService } from "./services/authService";

type Status = "idle" | "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");


  
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage(t("auth.verifyEmail.missingToken"));
      return;
    }

    let isMounted = true;
    setStatus("loading");
    authService.verifyEmail
      .get(token)
      .then((response) => {
        if (!isMounted) return;
        setStatus("success");
        setMessage(response.message || t("auth.verifyEmail.success"));
      })
      .catch(() => {
        if (!isMounted) return;
        setStatus("error");
        setMessage(t("auth.verifyEmail.error"));
      });

    return () => {
      isMounted = false;
    };
  }, [token, t]);

  const title = useMemo(() => {
    if (status === "success") return t("auth.verifyEmail.titleSuccess");
    if (status === "error") return t("auth.verifyEmail.titleError");
    return t("auth.verifyEmail.title");
  }, [status, t]);

  return (
    <div className="customContainer flex min-h-[70vh] items-center justify-center px-5 py-10 text-center lg:px-0">
      <div className="max-w-lg">
        <h1 className="text-dark-secondary-100 text-2xl font-semibold">
          {title}
        </h1>
        <p className="text-text-secondary mt-3 text-sm">
          {status === "loading" ? t("auth.verifyEmail.loading") : message}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="bg-primary text-dark-secondary-100 rounded-md px-5 py-2 text-sm font-semibold transition-colors hover:opacity-90"
          >
            {t("auth.verifyEmail.goToLogin")}
          </Link>
          <Link
            href="/"
            className="border-primary text-primary hover:bg-primary/10 rounded-md border px-5 py-2 text-sm font-semibold transition-colors"
          >
            {t("auth.verifyEmail.goHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
