"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useVerifyEmail } from "./hooks";

export default function VerifyEmailPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const verifyEmailMutation = useVerifyEmail();
  const {
    mutate,
    reset,
    data,
    isPending,
    isSuccess,
    status: mutationStatus,
  } = verifyEmailMutation;

  useEffect(() => {
    if (!token) return;
    reset();
    mutate(token);
  }, [token, mutate, reset]);

  const status: "loading" | "success" | "error" = !token
    ? "error"
    : isPending || mutationStatus === "idle"
      ? "loading"
      : isSuccess
        ? "success"
        : "error";

  const title =
    status === "success"
      ? t("auth.verifyEmail.titleSuccess")
      : status === "error"
        ? t("auth.verifyEmail.titleError")
        : t("auth.verifyEmail.title");

  const description =
    status === "loading"
      ? t("auth.verifyEmail.loading")
      : status === "success"
        ? data?.message || t("auth.verifyEmail.success")
        : !token
          ? t("auth.verifyEmail.missingToken")
          : t("auth.verifyEmail.error");

  return (
    <div className="customContainer flex min-h-[70vh] items-center justify-center px-5 py-10 text-center lg:px-0">
      <div className="max-w-lg">
        <h1 className="text-dark-secondary-100 text-2xl font-semibold">
          {title}
        </h1>
        <p className="text-text-secondary mt-3 text-sm">{description}</p>
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
