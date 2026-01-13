import Breadcrumb from "@/components/ui/breadcrumb";
import DetailsSlider from "../detailsSlider";
import ProductInfo from "../productInfo";
import ProductInfoTab from "../productInfoTab";
import { Product } from "../../types";
import { useTranslations } from "next-intl";
import SimilarProductsSlider from "../similarProductsSlider";
import { Suspense } from "react";
import ProductCardSliderLoader from "../../ui/productCard/productCardSkileton";
import { notFound } from "next/navigation";
import { getProductById } from "../../server";
import { getTranslations } from "next-intl/server";

export default async function ProductDetails({
  productId,
  language,
}: {
  productId: string;
  language: "ka" | "en";
}) {
  const t = await getTranslations();

  const product = await getProductById(productId, language);
  if (!product) {
    return notFound();
  }

  const breadcrumbItems = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("breadcrumb.products"), href: "/products" },
    {
      label: product.brandId?.name,
      href: `/products?brand=${product.brandId?.slug}`,
    },
    { label: product.name },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="bg-neutral md:bg-background">
        <div className="mx-auto max-w-[1070px] px-[15px] py-8 pt-0 md:pt-8">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[410px_1fr]">
            <DetailsSlider
              images={[product.image, ...(product.images || [])]}
              productName={product.name}
            />
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1070px] px-[15px]">
        <ProductInfoTab product={product} />
      </div>
    </>
  );
}
