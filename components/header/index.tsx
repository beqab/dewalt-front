"use client";
import Image from "next/image";
import LanguageSelector from "../languageSelector/languageSelector";
import MenuIcon from "../icons/menuIcon";
import { useState } from "react";
import Search from "./search";
import ProfileIcon from "../icons/profileIcon";
import DesktopMenu from "./menu/desktopMenu/desktopMenu";
import MobileMenu from "./mobileMenu";
import CloseIcon from "../icons/closeIcon";
import { Link } from "@/i18n/navigation";
import CartPreview from "@/features/products/cart/components/cartPreview";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className="bg-dark-secondary-100 relative z-40">
      <div className="customContainer flex items-center justify-between px-5 py-4">
        <Link href="/" prefetch={true}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={132}
            height={32}
            quality={100}
            className="h-6 w-auto md:h-8"
          />
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <Search />

          <LanguageSelector className="hidden md:block" />
          <CartPreview />
          <ProfileIcon className="hidden cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 md:block" />
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="relative z-50 flex cursor-pointer items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 md:hidden"
            aria-label="Toggle menu"
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
        </div>
      </div>
      <DesktopMenu />
      {openMenu && (
        <MobileMenu
          isOpen={openMenu}
          onClose={() => {
            setOpenMenu(false);
          }}
        />
      )}
    </header>
  );
}
