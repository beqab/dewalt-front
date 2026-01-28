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

  const displayStatusLabel =
    data?.status === "paid"
      ? t("paymentStatus.paid")
      : data?.status === "failed"
        ? t("paymentStatus.failed")
        : t("paymentStatus.pending");

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="customContainer px-5 py-10 text-center lg:px-0">
        <h1 className="text-dark-secondary-100 text-2xl font-semibold">
          {t("paymentStatus.title")}
        </h1>
        {hasError ? (
          <p className="text-text-secondary mt-3">{t("paymentStatus.error")}</p>
        ) : (
          <>
            <p className="text-text-secondary mt-3">
              {t("paymentStatus.description")}
            </p>
            <div className="mt-6 inline-flex items-center justify-center rounded-full border border-gray-200 px-6 py-2 text-sm font-semibold">
              {displayStatusLabel}
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
