import { Suspense } from "react";
import ProductsPage from "@/features/products/productsPage";
import Loading from "@/components/ui/loading";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    brandId?: string;
    categoryId?: string;
    childCategoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
    inStock?: string;
  }>;
}

export default async function ProductPage({ searchParams }: PageProps) {
  return <ProductsPage searchParams={searchParams} />;
}
