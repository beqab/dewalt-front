"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useCompareContext } from "../compareContext";

export function CompareButton({ productId }: { productId: string }) {
  const { productIds, setProductIds } = useCompareContext();
  return (
    <label className="text-dark-secondary-70 bg-line-color/50 flex cursor-pointer items-center gap-1 rounded p-2 text-xs">
      <Checkbox
        type="checkbox"
        checked={productIds.includes(productId)}
        onChange={(e) => setProductIds(productId)}
        className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
      />
      <span>შედარება</span>
    </label>
  );
}
