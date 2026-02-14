"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import ProductCard from "../../ui/productCard";
import Pagination from "../pagination";
import type { Product } from "../../types";
import GridHeader from "./gridHeader";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    total: number;
  };
}

export default function ProductGrid({
  products,
  pagination,
}: ProductGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex-1">
      {/* Header with Sorting and Product Count */}
      <GridHeader productsCount={pagination.total} />
      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-text-secondary text-sm">
              {t("products.noProductsFound")}
            </p>
            <Button variant="outline" onClick={() => router.push("/products")}>
              {t("products.viewAllProducts")}
            </Button>
          </div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              size="sm"
              className="px-0 md:px-0"
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
