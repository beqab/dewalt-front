"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/ui/breadcrumb";
import Loading from "@/components/ui/loading";
import { Link } from "@/i18n/navigation";
import useGetOrderStatus from "./hooks/useGetOrderStatus";

export default function PaymentStatusPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  const { data, isLoading, isError } = useGetOrderStatus(orderId);

  const breadcrumbItems = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("paymentStatus.title") },
  ];

  if (isLoading) {
    return (
      <div className="min-h-[60vh]">
        <Breadcrumb items={breadcrumbItems} />
        <Loading minHeight="60vh" message={t("paymentStatus.loading")} />
      </div>
    );
  }

  const hasError = isError || !orderId || !data?.status;
  const isPaid = data?.status === "paid";
  const isFailed = data?.status === "failed";
  const isPending = data?.status === "pending";

  const displayStatusLabel =
    isPaid
      ? t("paymentStatus.paid")
      : isFailed
        ? t("paymentStatus.failed")
        : t("paymentStatus.pending");

  const statusStyles =
    isPaid
      ? {
          wrapper: "bg-green-50 text-green-700 border-green-200",
          iconBg: "bg-green-600",
        }
      : isFailed
        ? {
            wrapper: "bg-red-50 text-red-700 border-red-200",
            iconBg: "bg-red-600",
          }
        : {
            wrapper: "bg-amber-50 text-amber-700 border-amber-200",
            iconBg: "bg-amber-500",
          };

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="customContainer px-5 py-10 text-center lg:px-0 min-h-[60vh]">
        <h1 className="text-dark-secondary-100 text-2xl font-semibold">
          {isPaid ? t("paymentStatus.successTitle") : t("paymentStatus.title")}
        </h1>
        {hasError ? (
          <p className="text-text-secondary mt-3">{t("paymentStatus.error")}</p>
        ) : (
          <>
            {(isPending || isFailed) && (
              <p className="text-text-secondary mt-3">
                {t("paymentStatus.description")}
              </p>
            )}
            {isPaid && (
              <p className="text-text-secondary mt-3">
                {t("paymentStatus.successMessage")}
              </p>
            )}
            <div
              className={`mt-6 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold ${statusStyles.wrapper}`}
            >
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${statusStyles.iconBg}`}
              >
                {isFailed ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12" />
                    <path d="M18 6l-12 12" />
                  </svg>
                ) : isPaid ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                )}
              </span>
              <span>{displayStatusLabel}</span>
            </div>
          </>
        )}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="bg-primary text-dark-secondary-100 rounded-md px-5 py-2 text-sm font-semibold transition-colors hover:opacity-90"
          >
            {t("paymentStatus.goHome")}
          </Link>
          <Link
            href="/orders"
            className="border-primary text-primary hover:bg-primary/10 rounded-md border px-5 py-2 text-sm font-semibold transition-colors"
          >
            {t("paymentStatus.viewOrders")}
          </Link>
        </div>
      </div>
    </div>
  );
}
