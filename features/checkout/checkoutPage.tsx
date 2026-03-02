"use client";

import { useMemo } from "react";
import Breadcrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import FormField from "@/components/formField";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useCartContext } from "@/features/products/cart/cartContext";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Loading from "@/components/ui/loading";
import { useSession } from "next-auth/react";
import OrderSummary from "./components/orderSummary";
import OrderDeliveryOptions from "./components/orderDeliveryOptions";
import { getAvailableDeliveryTypes } from "./utils/delivery";
import { useCreateOrderPayment } from "@/features/orders/hooks/useCreateOrderPayment";

type DeliveryType = "tbilisi" | "region";

export type DeliveryInformation = {
  tbilisi: {
    price: number;
    freeOver: number;
    freeEnabled?: boolean;
  };
  region: {
    price: number;
    freeOver: number;
    freeEnabled?: boolean;
  };
};

export default function CheckoutPage({
  deliveryInformation,
}: {
  deliveryInformation?: DeliveryInformation | null;
}) {
  const t = useTranslations();
  const { getSelectedItems, isLoading } = useCartContext();
  const selectedItems = getSelectedItems();
  const { data: session } = useSession();
  const { startPayment, error: paymentError } = useCreateOrderPayment({
    fallbackErrorMessage: t("checkout.paymentError"),
  });

  const availableDeliveryTypes = useMemo(
    () => getAvailableDeliveryTypes(deliveryInformation),
    [deliveryInformation]
  );

  const hasDeliveryOptions = availableDeliveryTypes.length > 0;
  const defaultDeliveryType: DeliveryType =
    availableDeliveryTypes[0] ?? "tbilisi";

  const subtotal = useMemo(
    () =>
      selectedItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    [selectedItems]
  );

  const totalItems = useMemo(
    () => selectedItems.reduce((total, item) => total + item.quantity, 0),
    [selectedItems]
  );

  const getDeliveryPrice = (type: DeliveryType) => {
    if (!selectedItems.length) return 0;
    const info = deliveryInformation?.[type];
    const price = info?.price ?? 0;
    if (typeof price !== "number" || price <= 0) return 0;

    const freeOver = info?.freeOver;
    const freeEnabled = info?.freeEnabled ?? true;
    if (
      freeEnabled &&
      typeof freeOver === "number" &&
      freeOver > 0 &&
      subtotal >= freeOver
    ) {
      return 0;
    }

    return price;
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required(t("checkout.validation.name")),
    surname: Yup.string().trim().required(t("checkout.validation.surname")),
    email: Yup.string().trim().optional(),
    personalId: Yup.string()
      .matches(/^\d{11}$/, t("checkout.personalIdHint"))
      .required(t("checkout.validation.personalId")),
    phone: Yup.string()
      .trim()
      .matches(/^\d{9,}$/, t("checkout.validation.phoneInvalid"))
      .required(t("checkout.validation.phone")),
    address: Yup.string().trim().required(t("checkout.validation.address")),
    deliveryType: hasDeliveryOptions
      ? Yup.mixed<DeliveryType>().oneOf(availableDeliveryTypes).required()
      : Yup.mixed<DeliveryType>().optional(),
  });

  const breadcrumbItems = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("breadcrumb.cart"), href: "/cart" },
    { label: t("breadcrumb.checkout") },
  ];

  if (isLoading) {
    return (
      <div className="min-h-[60vh]">
        <Breadcrumb items={breadcrumbItems} />
        <Loading minHeight="60vh" message={t("checkout.loadingMessage")} />
      </div>
    );
  }

  if (selectedItems.length === 0) {
    return (
      <div>
        <Breadcrumb items={breadcrumbItems} />
        <div className="customContainer py-10 text-center">
          <p className="text-text-secondary text-lg">
            {t("checkout.emptySelection")}
          </p>
          <Link
            href="/cart"
            className="text-primary mt-3 inline-flex text-sm font-semibold hover:underline"
          >
            {t("checkout.backToCart")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="bg-neutral md:bg-white">
        <div className="customContainer px-5 py-8 lg:px-0">
          <Formik
            initialValues={{
              name: session?.user?.name ?? "",
              surname: session?.user?.surname ?? "",
              email: session?.user?.email ?? "",
              personalId: "",
              phone: "",
              address: "",
              deliveryType: defaultDeliveryType as DeliveryType,
            }}
            validationSchema={validationSchema}
            validateOnMount
            onSubmit={async (values, { setSubmitting }) => {
              if (selectedItems.length === 0) {
                setSubmitting(false);
                return;
              }

              try {
                const effectiveDeliveryType = hasDeliveryOptions
                  ? values.deliveryType
                  : defaultDeliveryType;

                await startPayment(
                  {
                    name: values.name.trim(),
                    surname: values.surname.trim(),
                    email: values.email.trim(),
                    personalId: values.personalId.trim(),
                    phone: values.phone.trim(),
                    address: values.address.trim(),
                    deliveryType: effectiveDeliveryType,
                    items: selectedItems.map((item) => ({
                      productId: item.product._id,
                      quantity: item.quantity,
                    })),
                    userId: session?.user?._id,
                  },
                  { redirect: true }
                );
              } catch {
                // Error message is handled by the mutation hook
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, handleChange, isValid, isSubmitting }) => {
              const effectiveDeliveryType =
                hasDeliveryOptions &&
                availableDeliveryTypes.includes(values.deliveryType)
                  ? values.deliveryType
                  : defaultDeliveryType;
              const deliveryPrice = getDeliveryPrice(effectiveDeliveryType);
              const totalPrice = subtotal + deliveryPrice;

              return (
                <Form className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6">
                    <h1 className="text-dark-secondary-100 mb-2 text-lg font-semibold">
                      {t("checkout.title")}
                    </h1>
                    <p className="text-text-secondary mb-6 text-sm">
                      {t("checkout.subtitle")}
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        name="name"
                        label={t("checkout.name")}
                        placeholder={t("checkout.namePlaceholder")}
                        required
                      />
                      <FormField
                        name="surname"
                        label={t("checkout.surname")}
                        placeholder={t("checkout.surnamePlaceholder")}
                        required
                      />
                      <FormField
                        name="email"
                        label={t("checkout.email")}
                        placeholder={t("checkout.emailPlaceholder")}
                        inputMode="email"
                      />
                      <FormField
                        name="personalId"
                        label={t("checkout.personalId")}
                        placeholder={t("checkout.personalIdPlaceholder")}
                        inputMode="numeric"
                        maxLength={11}
                        transform={(value) => value.replace(/\D/g, "")}
                        required
                      />
                      <FormField
                        name="phone"
                        label={t("checkout.phone")}
                        placeholder={t("checkout.phonePlaceholder")}
                        inputMode="tel"
                        transform={(value) => value.replace(/\D/g, "")}
                        required
                      />
                    </div>

                    <div className="mt-4">
                      <FormField
                        name="address"
                        label={t("checkout.address")}
                        placeholder={t("checkout.addressPlaceholder")}
                        as="textarea"
                        rows={4}
                        required
                      />
                    </div>

                    <OrderDeliveryOptions
                      deliveryInformation={deliveryInformation}
                      subtotal={subtotal}
                      value={effectiveDeliveryType}
                      onChange={handleChange}
                      availableDeliveryTypes={availableDeliveryTypes}
                    />

                    {paymentError && (
                      <p className="mt-3 text-sm text-red-500">
                        {paymentError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="default"
                      size="md"
                      className="bg-primary hover:bg-primary/90 text-dark-secondary-100 mt-6 w-full"
                      disabled={!isValid || isSubmitting}
                    >
                      {isSubmitting
                        ? t("checkout.submitting")
                        : t("checkout.placeOrder")}
                    </Button>
                  </div>

                  <OrderSummary
                    totalItems={totalItems}
                    subtotal={subtotal}
                    deliveryPrice={deliveryPrice}
                    totalPrice={totalPrice}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
