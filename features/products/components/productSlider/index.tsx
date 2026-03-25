import Carousel from "@/components/carousel";
import ProductCard from "../../ui/productCard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getSliderGroups } from "../../server/getSliderGroups";
import type { Product } from "../../types";

const SLIDER_KEYS = [1, 2, 3, 4, 5] as const;

export default async function ProductSlider() {
  const locale = (await getLocale()) as "ka" | "en";
  const t = await getTranslations();

  const groups = await getSliderGroups(locale).catch(() => ({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  }));

  const sliders = SLIDER_KEYS.map((key) => ({
    key,
    products: groups[key] ?? [],
  })).filter((s) => s.products.length > 0);

  if (sliders.length === 0) {
    return null;
  }

  return (
    <div className="relative mx-auto mt-18 w-full max-w-[1300px] pr-[15px] pl-2 md:px-[15px] md:py-[15px]">
      {sliders.map(({ key, products }, index) => (
        <div key={key} className={index > 0 ? "mt-6 md:mt-8" : ""}>
          <div
            className={
              index < sliders.length - 1 ? "mb-4 md:mb-4" : ""
            }
          >
            <Carousel>
              {products.map((product: Product) => (
                <ProductCard size="sm" key={product._id} product={product} />
              ))}
            </Carousel>
          </div>
        </div>
      ))}

      {/* View All Button */}
      <div className="end mt-3 flex justify-end md:mt-6">
        <Button variant="outline" asChild>
          <Link href="/products">{t("common.viewAll")}</Link>
        </Button>
      </div>
    </div>
  );
}
