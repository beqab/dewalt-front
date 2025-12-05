"use client";

import TrashIcon from "@/components/icons/trashIcon";
import { Button } from "@/components/ui/button";
import { useCompareContext } from "../compareContext";
import { useTranslations } from "next-intl";

export default function ClearAllProductsButton() {
  const t = useTranslations();
  const { deleteProductId } = useCompareContext();

  const handleDeleteProductId = () => {
    deleteProductId("all");
  };

  return (
    <Button
      variant="outline"
      onClick={handleDeleteProductId}
      className="border text-sm"
    >
      <TrashIcon /> {t("products.clearAll")}
    </Button>
  );
}
