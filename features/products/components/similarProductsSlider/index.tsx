import Carousel from "@/components/carousel";
import { getSimilarProducts } from "../../server";
import { getLocale } from "next-intl/server";
import ProductCard from "../../ui/productCard";

interface SimilarProductsSliderProps {
  productId: string;
}

export default async function SimilarProductsSlider({
  productId,
}: SimilarProductsSliderProps) {
  const locale = (await getLocale()) as "ka" | "en";
  const products = await getSimilarProducts(productId, locale);

  if (products.length === 0) {
    return null;
  }

  return (
    <Carousel>
      {products.map((product) => (
        <ProductCard size="sm" key={product._id} product={product} />
      ))}
    </Carousel>
  );
}
