"use client";

import { useState } from "react";
import Breadcrumb from "@/components/ui/breadcrumb";

import { dummyCompareProducts } from "./compare/data/dummyCompareProducts";
import type { CompareProductWithSpecs } from "./compare/types";
import ProductSpecsForMobile from "./compare/components/productSpecs/productSpecsForMobile";
import ProductSpecsForDesktop from "./compare/components/productSpecs/productSpecsForDesktop";

const breadcrumbItems = [
  { label: "მთავარი", href: "/" },
  { label: "შედარება" },
];

export default function ProductComparisonPage() {
  const [products, setProducts] =
    useState<CompareProductWithSpecs[]>(dummyCompareProducts);

  // Synchronize scrolling between products and specs

  if (products.length === 0) {
    return (
      <div>
        <Breadcrumb items={breadcrumbItems} />
        <div className="customContainer py-10 text-center">
          <p className="text-text-secondary text-lg">შედარების სია ცარიელია</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="bg-neutral md:bg-background">
        <div className="customContainer pb-16 md:pt-8">
          {/* Product Cards - 2 rows × 4 columns */}
          <div className="mb-8 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-visible [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col gap-4 md:grid md:grid-cols-4 md:grid-rows-2"></div>
          </div>

          {/* Product Specifications - Synchronized Scroll */}
          <div className="md:hidden">
            <ProductSpecsForMobile products={products} />
          </div>
          <div className="hidden md:block">
            <ProductSpecsForDesktop products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
