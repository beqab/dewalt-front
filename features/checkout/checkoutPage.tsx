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

type DeliveryType = "tbilisi" | "region";

const DELIVERY_PRICES: Record<DeliveryType, number> = {
  tbilisi: 5,
  region: 15,
};

export default function CheckoutPage() {
  const t = useTranslations();
  const { getSelectedItems } = useCartContext();
  const selectedItems = getSelectedItems();

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

  const validationSchema = Yup.object({
    name: Yup.string().trim().required(t("checkout.validation.name")),
    surname: Yup.string().trim().required(t("checkout.validation.surname")),
    personalId: Yup.string()
      .matches(/^\d{11}$/, t("checkout.personalIdHint"))
      .required(t("checkout.validation.personalId")),
    phone: Yup.string().trim().required(t("checkout.validation.phone")),
    address: Yup.string().trim().required(t("checkout.validation.address")),
    deliveryType: Yup.mixed<DeliveryType>()
      .oneOf(["tbilisi", "region"])
      .required(),
  });

  const breadcrumbItems = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("breadcrumb.cart"), href: "/cart" },
    { label: t("breadcrumb.checkout") },
  ];

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
              name: "",
              surname: "",
              personalId: "",
              phone: "",
              address: "",
              deliveryType: "tbilisi" as DeliveryType,
            }}
            validationSchema={validationSchema}
            validateOnMount
            onSubmit={() => {}}
          >
            {({ values, handleChange, isValid }) => {
              const deliveryPrice = selectedItems.length
                ? DELIVERY_PRICES[values.deliveryType]
                : 0;
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

                    <div className="mt-6">
                      <p className="text-dark-secondary-100 mb-3 text-sm font-semibold">
                        {t("checkout.deliveryTitle")}
                      </p>
                      <div className="space-y-3">
                        <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="deliveryType"
                              value="tbilisi"
                              checked={values.deliveryType === "tbilisi"}
                              onChange={handleChange}
                            />
                            <span>{t("checkout.deliveryTbilisi")}</span>
                          </div>
                          <span className="text-text-secondary">
                            +{DELIVERY_PRICES.tbilisi} GEL
                          </span>
                        </label>
                        <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="deliveryType"
                              value="region"
                              checked={values.deliveryType === "region"}
                              onChange={handleChange}
                            />
                            <span>{t("checkout.deliveryRegion")}</span>
                          </div>
                          <span className="text-text-secondary">
                            +{DELIVERY_PRICES.region} GEL
                          </span>
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="default"
                      size="md"
                      className="bg-primary hover:bg-primary/90 text-dark-secondary-100 mt-6 w-full"
                      disabled={!isValid}
                    >
                      {t("checkout.placeOrder")}
                    </Button>
                  </div>

                  <div className="lg:sticky lg:top-4 lg:h-fit">
                    <div className="border-line-color rounded-lg border bg-white p-4 md:p-6">
                      <h3 className="text-dark-secondary-100 mb-4 text-sm">
                        {t("checkout.summaryTitle")}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-text-secondary">
                            {t("checkout.itemsCount")}
                          </span>
                          <span className="text-dark-secondary-100">
                            {totalItems}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-text-secondary">
                            {t("checkout.subtotal")}
                          </span>
                          <span className="text-dark-secondary-100">
                            {subtotal.toLocaleString("ka-GE")} GEL
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-text-secondary">
                            {t("checkout.deliveryPrice")}
                          </span>
                          <span className="text-dark-secondary-100">
                            {deliveryPrice.toLocaleString("ka-GE")} GEL
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 text-sm font-semibold">
                        <span className="text-dark-secondary-100">
                          {t("checkout.total")}
                        </span>
                        <span className="text-dark-secondary-100">
                          {totalPrice.toLocaleString("ka-GE")} GEL
                        </span>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
