import AsideAdd from "@/features/ads/components/asideAdd";
import Filters from ".";
import MobileFilter from "./mobileFilter";
import { getBrands } from "@/features/categories/server/getBrands";
import { getLocale } from "next-intl/server";

interface FilterWrapperProps {
  searchParams: Promise<{
    page?: string;
    brand?: string;
    category?: string;
    childCategory?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
    inStock?: string;
  }>;
}

export default async function FilterWrapper({
  searchParams,
}: FilterWrapperProps) {
  const locale = (await getLocale()) as "ka" | "en";
  const params = await searchParams;

  const brands = await getBrands(locale).catch(() => []);

  const initialFilters = {
    brand: params.brand,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
  };

  return (
    <>
      <aside className="hidden md:block">
        <Filters brands={brands} initialFilters={initialFilters}>
          <AsideAdd />
        </Filters>
      </aside>
      <MobileFilter brands={brands} initialFilters={initialFilters} />
    </>
  );
}
