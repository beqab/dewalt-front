"use client";

import type { CompareProductWithSpecs } from "../../types";
import ClearAllProductsButton from "../clearAllProductsButton";
import CompareProductCard from "../compareProductCard";
import TrashIcon from "@/components/icons/trashIcon";
import { Button } from "@/components/ui/button";

interface ProductSpecsProps {
  products: CompareProductWithSpecs[];

  onDelete?: (id: number) => void;
}

export default function ProductSpecsForDesktop({
  products,

  onDelete,
}: ProductSpecsProps) {
  // Get all unique spec labels from all products
  const allSpecLabels = products[0]?.specs.map((spec) => spec.label) || [];

  return (
    <div className="w-full">
      {/* <h3 className="text-text-secondary mb-6 text-sm">დეტალები</h3> */}

      {/* Scrollable container synchronized with products */}
      <div className="overflow-visible">
        <div
          className="inline-grid gap-px bg-[#D2D2D2]"
          style={{
            gridTemplateColumns: "repeat(4, minmax(280px, 1fr))",
            minWidth: "1120px",
          }}
        >
          {/* Label Column - პროდუქტი */}
          <div className="flex items-center justify-between bg-white p-4 pt-0">
            <div className="flex w-full flex-col items-center justify-center gap-6">
              <div className="text-text-secondary text-sm">პროდუქტი</div>
              <div>
                <ClearAllProductsButton />
              </div>
            </div>
          </div>
          {/* Always render 3 product columns */}
          {Array.from({ length: 3 }).map((_, index) => {
            const product = products[index];
            return (
              <div
                key={
                  product ? `product-${product.id}` : `empty-product-${index}`
                }
                className="bg-white p-4 pt-0"
              >
                {product ? (
                  <CompareProductCard product={product} />
                ) : (
                  <div className="min-h-[200px]"></div>
                )}
              </div>
            );
          })}

          {/* Label Column - სპეციფიკაციები */}
          <div className="flex w-full justify-center bg-white p-4">
            <div className="text-text-secondary text-sm">დეტალები</div>
          </div>
          {/* Always render 3 spec columns */}
          {Array.from({ length: 3 }).map((_, index) => {
            const product = products[index];
            return (
              <div
                key={product ? `specs-${product.id}` : `empty-specs-${index}`}
                className="bg-white p-4"
              >
                {product ? (
                  <div className="space-y-3">
                    {allSpecLabels.map((label, labelIndex) => {
                      const spec = product.specs.find((s) => s.label === label);
                      if (!spec) return null;

                      return (
                        <div
                          key={labelIndex}
                          className="border-line-color border-b pb-3 last:border-0"
                        >
                          <div className="text-text-secondary mb-1 text-sm">
                            {spec.label}:
                          </div>
                          <div className="text-dark-secondary-100 flex items-baseline gap-1 text-sm">
                            <span>{spec.value}</span>
                            {spec.unit && (
                              <span className="text-text-secondary text-xs">
                                {spec.unit}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="min-h-[200px]"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
