import { getProducts } from "./server/getProucts";
import { getLocale } from "next-intl/server";
import FilterWrapper from "./components/filters/filtereWrapper";
import { Suspense } from "react";
import FilterSkeleton from "./components/filters/filterSkeleton";
import ProductGridWrapper from "./components/productGrid/productGreedWraper";
import ActiveFilters from "./components/filters/activeFilters";

interface ProductsPageProps {
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

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const locale = (await getLocale()) as "ka" | "en";
  const params = await searchParams;

  // Parse and validate page number
  const rawPage = parseInt(params.page || "1", 10);
  const currentPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
  const itemsPerPage = 16;

  // Build filters object
  const filters: {
    brandSlug?: string;
    categorySlug?: string;
    childCategorySlug?: string;
    inStock?: boolean;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    language?: "ka" | "en";
  } = {
    language: locale,
  };

  if (params.brand) filters.brandSlug = params.brand;
  if (params.category) filters.categorySlug = params.category;
  if (params.childCategory) filters.childCategorySlug = params.childCategory;
  if (params.minPrice) {
    const minPrice = parseFloat(params.minPrice);
    if (!isNaN(minPrice)) filters.minPrice = minPrice;
  }
  if (params.maxPrice) {
    const maxPrice = parseFloat(params.maxPrice);
    if (!isNaN(maxPrice)) filters.maxPrice = maxPrice;
  }
  if (params.search) filters.search = params.search;
  if (params.inStock !== undefined) {
    filters.inStock = params.inStock === "true" || params.inStock === "1";
  }

  // Create products promise for Suspense
  const productsPromise = getProducts(currentPage, itemsPerPage, filters);

  return (
    <div className="min-h-screen py-10">
      <div className="customContainer">
        <div className="mt-10 block gap-6 md:mt-0 md:flex">
          {/* Desktop Filters Sidebar */}
          <Suspense fallback={<FilterSkeleton />}>
            <FilterWrapper searchParams={searchParams} />
          </Suspense>

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            <div className="md:px-0">
              <ActiveFilters />
              <ProductGridWrapper productsPromise={productsPromise} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
