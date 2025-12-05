"use client";

import Breadcrumb from "@/components/ui/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import TrashIcon from "@/components/icons/trashIcon";
import { useCartContext } from "./cart/cartContext";
import CartItem from "./cart/components/cartItem";
import OrderSummary from "./cart/components/orderSummary";
import { useTranslations } from "next-intl";

export default function CartPage() {
  const t = useTranslations();

  const breadcrumbItems = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("breadcrumb.cart") },
  ];
  const { items, toggleSelectAll, removeSelected, getSelectedItems } =
    useCartContext();

  const allSelected = items.length > 0 && items.every((item) => item.selected);
  const hasSelectedItems = getSelectedItems().length > 0;

  if (items.length === 0) {
    return (
      <div>
        <Breadcrumb items={breadcrumbItems} />
        <div className="customContainer py-10 text-center">
          <p className="text-text-secondary text-lg">{t("cart.empty")}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="bg-neutral md:bg-white">
        <div className="mx-auto max-w-[1070px] px-[15px] py-6 md:py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
            {/* Main Cart Content */}
            <div>
              {/* Header with Select All and Delete */}
              <div className="mb-4 flex items-center justify-between rounded-lg md:px-6">
                <div className="bg-line-color/50 flex h-8 items-center gap-3 rounded p-2">
                  <Checkbox
                    checked={allSelected}
                    onChange={() => toggleSelectAll()}
                    label={t("cart.selectAll")}
                    className="text-dark-secondary-100 mr-2 text-xs"
                    labelClassName="text-dark-secondary-100 text-xs"
                  />
                </div>
                {hasSelectedItems && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={removeSelected}
                    className="text-text-secondary bg-line-color/50 border-line-color hover:text-dark-secondary-100 flex h-8 items-center gap-2 rounded border p-2 text-xs"
                  >
                    <TrashIcon />
                    <span className="text-xs">{t("cart.delete")}</span>
                  </Button>
                )}
              </div>

              {/* Cart Items */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6">
                {items.map((item) => (
                  <CartItem key={item.product._id} item={item} />
                ))}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:sticky lg:top-4 lg:h-fit">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
