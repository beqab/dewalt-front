"use client";

import { Button } from "@/components/ui/button";
import { BucketIcon } from "@/components/icons/bucketIcon";
import { useCartContext } from "../../cartContext";

export default function OrderSummary() {
  const { getTotalItems, getTotalPrice, getSelectedItems } = useCartContext();
  const selectedItems = getSelectedItems();
  const totalItems = selectedItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="border-line-color rounded-lg border bg-white p-4 md:p-6">
      <h3 className="text-dark-secondary-100 mb-4 text-lg font-bold">
        შეკვეთის დეტალები
      </h3>

      <div className="space-y-3 border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary text-sm">
            ნივთების რაოდენობა
          </span>
          <span className="text-dark-secondary-100 font-semibold">
            {totalItems}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-dark-secondary-100 text-base font-semibold md:text-lg">
            სულ გადასახადი
          </span>
          <span className="text-dark-secondary-100 text-lg font-bold md:text-xl">
            {totalPrice.toLocaleString("ka-GE")} GEL
          </span>
        </div>

        <Button
          variant="default"
          size="md"
          className="bg-primary hover:bg-primary/90 text-dark-secondary-100 w-full"
          disabled={selectedItems.length === 0}
        >
          <BucketIcon className="fill-dark-secondary-100" />
          <span>ყიდვა</span>
        </Button>
      </div>
    </div>
  );
}
