import Filters from "./components/filters";
import ProductGrid from "./components/productGrid";
import AsideAdd from "@/features/ads/components/asideAdd";
import { getProducts } from "./server/getProucts";
import { getBrands } from "@/features/categories/server/getBrands";
import { getLocale } from "next-intl/server";
import MobileFilter from "./components/filters/mobileFilter";

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    brand?: string;
    categoryId?: string;
    childCategoryId?: string;
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
    categoryId?: string;
    childCategoryId?: string;
    inStock?: boolean;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    language?: "ka" | "en";
  } = {
    language: locale,
  };

  if (params.brand) filters.brandSlug = params.brand;
  if (params.categoryId) filters.categoryId = params.categoryId;
  if (params.childCategoryId) filters.childCategoryId = params.childCategoryId;
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

  // Fetch products and brands in parallel
  const [productsResponse, brands] = await Promise.all([
    getProducts(currentPage, itemsPerPage, filters),
    getBrands(locale).catch(() => []),
  ]);

  return (
    <div className="min-h-screen py-10">
      <div className="customContainer">
        <div className="mt-10 flex gap-6 md:mt-0">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block">
            <Filters brands={brands} initialFilters={params}>
              <AsideAdd />
            </Filters>
          </aside>
          <MobileFilter brands={brands} initialFilters={params} />

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            <div className="md:px-0">
              <ProductGrid
                products={productsResponse.data}
                pagination={{
                  currentPage: productsResponse.page,
                  totalPages: productsResponse.totalPages,
                  total: productsResponse.total,
                }}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
