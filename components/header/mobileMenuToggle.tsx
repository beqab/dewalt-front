"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import MenuIcon from "../icons/menuIcon";
import CloseIcon from "../icons/closeIcon";
import MobileMenu from "./mobileMenu";
import { MenuBrand } from "@/features/categories/types";

export default function MobileMenuToggle({
  menuBrands,
}: {
  menuBrands: MenuBrand[];
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const t = useTranslations();

  return (
    <>
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="relative z-50 flex cursor-pointer items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 md:hidden"
        aria-label={t("header.toggleMenu")}
      >
        <div className="relative h-6 w-6">
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              openMenu
                ? "scale-0 rotate-90 opacity-0"
                : "scale-100 rotate-0 opacity-100"
            }`}
          >
            <MenuIcon />
          </div>
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              openMenu
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 -rotate-90 opacity-0"
            }`}
          >
            <CloseIcon className="text-primary" />
          </div>
        </div>
      </button>

      {openMenu && (
        <MobileMenu
          isOpen={openMenu}
          onClose={() => {
            setOpenMenu(false);
          }}
          menuBrands={menuBrands}
        />
      )}
    </>
  );
}
