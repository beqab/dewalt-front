"use client";
import { CompareProductWithSpecs } from "../../types";

import CompareProductCard from "../compareProductCard";
import ClearAllProductsButton from "../clearAllProductsButton";
import { useTranslations } from "next-intl";

export default function ProductSpecsForMobile({
  products,
}: {
  products: CompareProductWithSpecs[];
}) {
  const t = useTranslations();
  return (
    <div className="w-full">
      <div className="mb-4 overflow-visible">
        <div className="flex items-center justify-between">
          <div className="text-text-secondary text-sm">
            {t("products.products")}
          </div>

          <div>
            {/* <Button variant="outline" className="border text-sm">
              გასუფთავება
            </Button> */}
            <ClearAllProductsButton />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col">
          <div className="flex">
            {products.map((product) => (
              <div key={product._id} className="mr-4">
                <CompareProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-text-secondary py-6 text-sm md:hidden">
            {t("products.specs")}
          </div>
          <div className="flex">
            {products.map((product) => (
              <div
                key={product._id}
                className="border-line-color mr-2 min-w-[228px] border-r pr-2 last:border-r-0"
              >
                <div>
                  {product.specs.map((spec, labelIndex) => (
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
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
