"use client";
import CompareIcon from "@/components/icons/compareIcon";
import { Button } from "@/components/ui/button";
import { useCompareContext } from "../compareContext";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function CompareLinkButton() {
  const t = useTranslations();
  const { productIds } = useCompareContext();
  const count = productIds?.length ?? 0;

  return (
    <Button
      asChild
      variant="default"
      size="sm"
      className="fixed right-4 bottom-4 z-50 flex h-10 items-center gap-2"
    >
      <Link href="/compare">
        <CompareIcon />
        <span className="hidden md:inline">{t("breadcrumb.comparison")}</span> (
        {count})
      </Link>
    </Button>
  );
}
