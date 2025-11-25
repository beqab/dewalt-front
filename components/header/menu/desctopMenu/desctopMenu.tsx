"use client";

import { useState } from "react";
import { brands } from "../staticMenu";
import MenuItem from "../menuItm";
import DropDownMenu from "./dropDownMenu";

export default function DesctopMenu() {
  const [activeBrand, setActiveBrand] = useState<number | null>(null);

  const handleBrandToggle = (brandIndex: number) => {
    if (activeBrand === brandIndex) {
      // Close menu if clicking the same brand
      setActiveBrand(null);
    } else {
      // Open menu for the clicked brand
      setActiveBrand(brandIndex);
    }
  };

  const handleBrandClose = () => {
    setActiveBrand(null);
  };

  return (
    <nav className="hidden md:block bg-background">
      <div className="container flex items-center justify-between mx-auto px-5">
        <div className="flex items-center gap-6 relative">
          {brands.map((brand, brandIndex) => (
            <DropDownMenu
              key={`${brandIndex}-${activeBrand === brandIndex}`}
              brand={brand}
              brandIndex={brandIndex}
              isOpen={activeBrand === brandIndex}
              onToggle={() => handleBrandToggle(brandIndex)}
              onClose={handleBrandClose}
            />
          ))}
        </div>
        <div className="flex items-center gap-6">
          <MenuItem label="მთავარი" href="/" />
          <MenuItem label="სიახლეები" href="/news" />
          <MenuItem label="სერვის ცენტრი" href="/service-center" />
          <MenuItem label="კონტაქტი" href="/contact" />
        </div>
      </div>
    </nav>
  );
}
