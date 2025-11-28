"use client";

import { useState } from "react";
import { brands } from "../staticMenu";
import MenuItem from "../menuItm";
import ProductMenu from "./productMenu";
import MainMenuItem from "./productMenu/mainMenuItem";
import classNames from "classnames";

export default function NewDesctopMenu() {
  const [activeMainCategory, setActiveMainCategory] = useState<number | null>(
    null
  );
  const [activeProductsMenu, setActiveProductsMenu] = useState(false);

  const handleBrandToggle = (brandIndex: number) => {
    if (activeMainCategory === brandIndex) {
      // Close menu if clicking the same main category
      setActiveMainCategory(0);
    } else {
      // Open menu for the clicked main category
      setActiveMainCategory(brandIndex);
    }
    // Close products menu when opening main category menu
    setActiveProductsMenu(false);
  };

  const handleBrandClose = () => {
    setActiveMainCategory(null);
  };

  const handleProductsToggle = () => {
    setActiveProductsMenu(!activeProductsMenu);
    // Close main category menus when opening products menu
    setActiveMainCategory(null);
  };

  const handleProductsClose = () => {
    setActiveProductsMenu(false);
  };

  // Close menu when clicking outside

  return (
    <nav className="bg-background hidden md:block">
      <div className="customContiner mx-auto flex items-center justify-between px-5">
        <div className="relative flex items-center">
          {brands.map((brand, brandIndex) => (
            <div
              key={brandIndex}
              className={classNames("my-1 border-r border-[#D2D2D2] px-3", {
                "border-r-0": brandIndex === brands.length - 1,
                "pl-0": brandIndex === 0,
              })}
            >
              <ProductMenu
                onClose={() => handleBrandClose()}
                isOpen={activeMainCategory === brandIndex}
                productCategories={[brand]}
              >
                <MainMenuItem
                  isOpen={activeMainCategory === brandIndex}
                  onToggle={() => handleBrandToggle(brandIndex)}
                  label={brand.name}
                />
                <ProductMenu.Panel isOpen={activeMainCategory === brandIndex}>
                  <ProductMenu.Categories />
                  <ProductMenu.SubCategory />
                </ProductMenu.Panel>
              </ProductMenu>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <MenuItem label="მთავარი" href="/" />
          <ProductMenu
            key={`products-`}
            onClose={handleProductsClose}
            isOpen={activeProductsMenu}
            productCategories={brands}
          >
            <MainMenuItem
              isOpen={activeProductsMenu}
              onToggle={handleProductsToggle}
              label="პროდუქტები"
            />
            <ProductMenu.Panel width="wide" isOpen={activeProductsMenu}>
              <ProductMenu.MainCategories />
              <ProductMenu.Categories />
              <ProductMenu.SubCategory />
            </ProductMenu.Panel>
          </ProductMenu>
          <MenuItem label="სიახლეები" href="/news" />
          <MenuItem label="სერვის ცენტრი" href="/service-center" />
          <MenuItem label="კონტაქტი" href="/contact" />
        </div>
      </div>
    </nav>
  );
}
