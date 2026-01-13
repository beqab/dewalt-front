import { extractIdFromSlug } from "@/lib/utils/extractIdFromSlug";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductDetails from "./components/productDetails";
import SimilarProductsSlider from "./components/similarProductsSlider";
import ProductCardSliderLoader from "./ui/productCard/productCardSkileton";
import ProductDetailsSkeleton from "./components/productDetails/productDetailsSkeleton";
import { getTranslations } from "next-intl/server";

export default async function ProductDetailsPage({
  slug,
  language,
}: {
  slug: string;
  language: "ka" | "en";
}) {
  const t = await getTranslations();

  const id = await extractIdFromSlug(slug);
  if (!id) {
    return notFound();
  }

  return (
    <div>
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails productId={id} language={language} />
      </Suspense>
      <div className="mx-auto max-w-[1070px] py-8">
        <div className="text-dark-secondary-100 pt-10 pb-6 text-sm">
          {t("products.similarProducts")}
        </div>
        <div className="ml-[-10px] md:ml-[-5px]">
          <Suspense fallback={<ProductCardSliderLoader />}>
            <SimilarProductsSlider productId={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
