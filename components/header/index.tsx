"use client";
import Image from "next/image";
import LanguageSelector from "../languageSelector/languageSelector";
import MenuIcon from "../icons/menuIcon";
import { useState } from "react";
import { BucketIcon } from "../icons/bucketIcon";
import Search from "./search";
import ProfileIcon from "../icons/profileIcon";
import DesktopMenu from "./menu/desktopMenu/desktopMenu";
import MobileMenu from "./mobileMenu";
import CloseIcon from "../icons/closeIcon";
import { Link } from "@/i18n/navigation";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className="relative z-40">
      <div className="bg-dark-secondary-100 flex items-center justify-between px-5 py-4">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="h-6 md:h-8"
          />
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <Search />

          <LanguageSelector className="hidden md:block" />
          <BucketIcon className="text-primary" />
          <ProfileIcon className="hidden md:block" />
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
