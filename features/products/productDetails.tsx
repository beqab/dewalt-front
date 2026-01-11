import Breadcrumb from "@/components/ui/breadcrumb";
import DetailsSlider from "./components/detailsSlider";
import ProductInfo from "./components/productInfo";
import ProductInfoTab from "./components/productInfoTab";
import { Product } from "./types";
import { useTranslations } from "next-intl";
import SimilarProductsSlider from "./components/similarProductsSlider";
import { Suspense } from "react";
import ProductCardSliderLoader from "./ui/productCard/productCardSkileton";

export default function ProductDetails({ product }: { product: Product }) {
  const t = useTranslations();

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
    <div>
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
      <div className="mx-auto max-w-[1070px] px-[15px] py-8">
        <ProductInfoTab product={product} />

        <div className="text-dark-secondary-100 pt-10 pb-6 text-sm">
          {t("products.similarProducts")}
        </div>
        <div className="ml-[-10px] md:ml-[-5px]">
          <Suspense fallback={<ProductCardSliderLoader />}>
            <SimilarProductsSlider productId={product._id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
