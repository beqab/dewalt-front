import ProductDetailsSkeleton from "@/features/products/components/productDetails/productDetailsSkeleton";
import ProductCardSliderLoader from "@/features/products/ui/productCard/productCardSkileton";

export default function LoadingPage() {
  return (
    <>
      <section className="min-h-screen">
        <ProductDetailsSkeleton />
        <ProductCardSliderLoader />
      </section>
    </>
  );
}
