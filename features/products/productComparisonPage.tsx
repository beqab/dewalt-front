"use client";

import Breadcrumb from "@/components/ui/breadcrumb";

import ProductSpecsForMobile from "./compare/components/productSpecs/productSpecsForMobile";
import ProductSpecsForDesktop from "./compare/components/productSpecs/productSpecsForDesktop";
import { useCompareContext } from "./compare/compareContext";
import { dummyProducts } from "./data/dummyProducts";
import Link from "next/link";

const breadcrumbItems = [
  { label: "მთავარი", href: "/" },
  { label: "შედარება" },
];

export default function ProductComparisonPage() {
  const { productIds } = useCompareContext();

  const products = dummyProducts.filter((product) =>
    productIds.includes(product._id)
  );

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-neutral md:bg-white">
        <div className="customContainer pb-16 md:pt-0">
          {products.length === 0 && (
            <div>
              <div className="customContainer py-10 text-center">
                <p className="text-text-secondary text-sm">
                  შსადარებლად შეარჩიეთ{" "}
                  <Link href="/products" className="text-primary">
                    პროდუქი
                  </Link>
                </p>
              </div>
            </div>
          )}

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
