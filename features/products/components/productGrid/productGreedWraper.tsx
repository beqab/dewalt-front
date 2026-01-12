import { Suspense } from "react";
import ProductGrid from ".";
import ProductGridSkeleton from "./productGridSkeleton";
import type { Product } from "../../types";

interface ProductGridWrapperProps {
  productsPromise: Promise<{
    data: Product[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }>;
}

async function ProductGridContent({
  productsPromise,
}: {
  productsPromise: Promise<{
    data: Product[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }>;
}) {
  const productsResponse = await productsPromise;

  return (
    <ProductGrid
      products={productsResponse.data}
      pagination={{
        currentPage: productsResponse.page,
        totalPages: productsResponse.totalPages,
        total: productsResponse.total,
      }}
    />
  );
}

export default function ProductGridWrapper({
  productsPromise,
}: ProductGridWrapperProps) {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductGridContent productsPromise={productsPromise} />
    </Suspense>
  );
}
