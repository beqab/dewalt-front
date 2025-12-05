"use client";

import Carousel from "@/components/carousel";
import Breadcrumb from "@/components/ui/breadcrumb";
import DetailsSlider from "./components/detailsSlider";
import ProductInfo from "./components/productInfo";
import ProductInfoTab from "./components/productInfoTab";
import ProductCard from "./ui/productCard";
import { dummyProducts } from "./data/dummyProducts";
import { Product } from "./types";
import { useTranslations } from "next-intl";

export default function ProductDetails({ product }: { product: Product }) {
  const t = useTranslations();

  const breadcrumbItems = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("breadcrumb.products"), href: "/products" },
    { label: "Dewalt", href: "/products?brand=dewalt" },
    { label: product.name },
  ];
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="bg-neutral md:bg-background">
        <div className="mx-auto max-w-[1070px] px-[15px] py-8 pt-0 md:pt-8">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[410px_1fr]">
            <DetailsSlider />
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1070px] px-[15px] py-8">
        <ProductInfoTab />

        <div className="text-dark-secondary-100 pt-10 pb-6">
          {t("products.similarProducts")}
        </div>

        <Carousel>
          {dummyProducts.map((product) => (
            <ProductCard size="sm" key={product.id} product={product} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
