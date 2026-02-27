"use client";

import { useEffect, useMemo } from "react";
import Breadcrumb from "@/components/ui/breadcrumb";
import ProductSpecsForMobile from "./compare/components/productSpecs/productSpecsForMobile";
import ProductSpecsForDesktop from "./compare/components/productSpecs/productSpecsForDesktop";
import { useCompareContext } from "./compare/compareContext";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import ProductComparisonSkeleton from "./compare/components/productComparisonSkeleton";
import { useGetProductsByIds } from "./hooks/useGetProductsByIds";

export default function ProductComparisonPage() {
  const t = useTranslations();
  const { productIds, clearAllProducts } = useCompareContext();

  const { products, isLoading, isError, error } =
    useGetProductsByIds(productIds);

  const breadcrumbItems = [
    { label: t("breadcrumb.home"), href: "/" },
    { label: t("breadcrumb.comparison") },
  ];

  useEffect(() => {
    if (isError) {
      clearAllProducts();
    }
  }, [isError, error]);
  // Show loading if:
  // 1. productIds is null (still initializing from localStorage)
  // 2. React Query is loading/fetching
  // 3. We have productIds but no products yet (still loading)
  const showLoading = useMemo(() => {
    // Show loading if productIds is null (localStorage hasn't been checked yet)
    if (productIds === null) return true;

    // Always show loading if React Query is loading/fetching
    if (isLoading) return true;

    // If we have productIds but no products yet, we're still loading
    if (productIds.length > 0 && products.length === 0) return true;

    return false;
  }, [isLoading, productIds, products.length]);

  if (isError) {
    return (
      <div className="text-text-secondary min-h-[60vh] py-10 text-center text-sm">
        Error: {error?.message || "Something went wrong"}
      </div>
    );
  }
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-neutral min-h-[calc(100vh-100px)] md:bg-white">
        <div className="customContainer pb-16 md:pt-0">
          {showLoading ? (
            <ProductComparisonSkeleton />
          ) : products.length === 0 ? (
            <div>
              <div className="customContainer py-10 text-center">
                <p className="text-text-secondary text-sm">
                  {t("products.selectToCompare")}{" "}
                  <Link href="/products" className="text-primary">
                    {t("navigation.products")}
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="md:hidden">
                <ProductSpecsForMobile products={products} />
              </div>
              <div className="hidden md:block">
                <ProductSpecsForDesktop products={products} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
