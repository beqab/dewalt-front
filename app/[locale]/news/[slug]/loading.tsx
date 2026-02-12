"use client";

import Loading from "@/components/ui/loading";
import { useTranslations } from "next-intl";

export default function LoadingPage() {
  const t = useTranslations();
  return <Loading message={t("news.loading")} minHeight="60vh" />;
}
