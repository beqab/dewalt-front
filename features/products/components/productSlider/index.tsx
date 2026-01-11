import Carousel from "@/components/carousel";
import ProductCard from "../../ui/productCard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getProducts } from "../../server/getProucts";
import { getBrands } from "@/features/categories/server/getBrands";
import { getLocale, getTranslations } from "next-intl/server";

export default async function ProductSlider() {
  const locale = (await getLocale()) as "ka" | "en";
  const t = await getTranslations();

  // Fetch brands (first 3)
  const brands = await getBrands(locale).catch(() => []);
  const firstThreeBrands = brands.slice(0, 3);

  if (firstThreeBrands.length === 0) {
    return null;
  }

  // Fetch products for each brand using Promise.all
  const brandProductsList = await Promise.all(
    firstThreeBrands.map(async (brand) => {
      try {
        const response = await getProducts(1, 10, {
          brandId: brand._id,
          language: locale,
        });
        return {
          brand,
          products: response.data,
        };
      } catch {
        return {
          brand,
          products: [] as Awaited<ReturnType<typeof getProducts>>["data"],
        };
      }
    })
  );

  // Filter out brands with no products
  const brandsWithProducts = brandProductsList.filter(
    ({ products }) => products.length > 0
  );

  if (brandsWithProducts.length === 0) {
    return null;
  }

  return (
    <div className="relative mx-auto mt-18 w-full max-w-[1300px] pr-[15px] pl-2 md:px-[15px] md:py-[15px]">
      {/* Render slider for each brand */}
      {brandsWithProducts.map(({ brand, products }, index) => {
        return (
          <div key={brand._id} className={index > 0 ? "mt-6 md:mt-8" : ""}>
            {/* Header */}
            <div className="mb-4 flex items-center justify-between px-2 md:px-0">
              <h2 className="font-bpg-web-002-caps text-dark-secondary-100 text-2xl md:text-2xl">
                {brand.name[locale]}
              </h2>
            </div>

            {/* Products Carousel */}
            <div
              className={
                index < brandsWithProducts.length - 1 ? "mb-4 md:mb-4" : ""
              }
            >
              <Carousel>
                {products.map((product: (typeof products)[0]) => {
                  return <ProductCard key={product._id} product={product} />;
                })}
              </Carousel>
            </div>
          </div>
        );
      })}

      {/* View All Button */}
      <div className="end mt-3 flex justify-end md:mt-6">
        <Button variant="outline" asChild>
          <Link href="/products">{t("common.viewAll")}</Link>
        </Button>
      </div>
    </div>
  );
}
