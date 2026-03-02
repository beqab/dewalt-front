import type { DeliveryType } from "@/features/orders/types";
import type { DeliveryInformation } from "../types";

export type DeliveryUi = {
  basePrice: number;
  freeOver?: number;
  freeEnabled: boolean;
  isAvailable: boolean;
  isFreeEligible: boolean;
  effectivePrice: number;
};

export function getAvailableDeliveryTypes(
  deliveryInformation?: DeliveryInformation | null
): DeliveryType[] {
  const types: DeliveryType[] = ["tbilisi", "region"];
  return types.filter((type) => {
    const price = deliveryInformation?.[type]?.price ?? 0;
    return typeof price === "number" && price > 0;
  });
}

export function getDeliveryPrice({
  type,
  deliveryInformation,
  subtotal,
}: {
  type: DeliveryType;
  deliveryInformation?: DeliveryInformation | null;
  subtotal: number;
}) {
  return getDeliveryUi({ type, deliveryInformation, subtotal }).effectivePrice;
}

export function getDeliveryUi({
  type,
  deliveryInformation,
  subtotal,
}: {
  type: DeliveryType;
  deliveryInformation?: DeliveryInformation | null;
  subtotal: number;
}): DeliveryUi {
  const info = deliveryInformation?.[type];
  const basePrice = info?.price ?? 0;
  const freeOver = info?.freeOver;
  const freeEnabled = info?.freeEnabled ?? true;

  const isAvailable = typeof basePrice === "number" && basePrice > 0;
  const isFreeEligible =
    isAvailable &&
    freeEnabled &&
    typeof freeOver === "number" &&
    freeOver > 0 &&
    subtotal >= freeOver;

  return {
    basePrice,
    freeOver,
    freeEnabled,
    isAvailable,
    isFreeEligible,
    effectivePrice: isFreeEligible ? 0 : basePrice,
  };
}

