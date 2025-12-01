"use client";

import { useState } from "react";
import { brands } from "@/components/header/menu/staticMenu";
import Image from "next/image";
import PriceRange from "@/components/ui/priceRange";
import { Checkbox } from "@/components/ui/checkbox";

export default function Filters() {
  const [priceRange, setPriceRange] = useState<[number, number]>([230, 12983]);

  return (
    <div className="w-full shrink-0 md:w-56">
      <div className="space-y-6 border-[#D2D2D2] md:mr-0 md:border-r md:pr-6">
        {/* Price Filter */}
        <div>
          <h3 className="text-text-secondary mb-6 text-sm">ფასით გაფილტვრა</h3>
          <PriceRange
            values={priceRange}
            onChange={(values) => setPriceRange(values)}
          />
        </div>

        {/* Manufacturers Filter */}
        <div>
          <h3 className="text-text-secondary mb-4 text-sm">მწარმოებლები</h3>
          <div className="space-y-3">
            {brands.map((brand) => (
              <label
                key={brand.name}
                className="text-dark-secundary-100 flex cursor-pointer items-center gap-2 text-sm"
              >
                <Checkbox checked={true} />
                <span className="text-text-secondary text-sm">
                  {brand.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Promotional Banners */}
      </div>
      <div className="hidden space-y-4 pr-6 md:block">
        <div className="bg-background-secondary relative mt-18 overflow-hidden rounded-lg">
          <div className="relative w-full cursor-pointer">
            <Image
              src="/imgs/sideBanner.png"
              alt="Tool case"
              width={200}
              height={400}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
