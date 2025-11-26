"use client";
import Image from "next/image";
import LanguageSelector from "../languageSelector/languageSelector";
import MenuIcon from "../icons/menuIcon";
import { useState } from "react";
import { BucketIcon } from "../icons/bucketIcon";
import Search from "./search";
import ProfileIcon from "../icons/profileIcon";
import DesctopMenu from "./menu/desctopMenu/desctopMenu";
import MobileMenu from "./mobileMenu";
import CloseIcon from "../icons/closeIcont";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className="relative z-10">
      <div className="flex items-center justify-between bg-dark-secundary-100 px-5 py-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="h-6 md:h-8"
        />
        <div className="flex items-center gap-4 md:gap-6">
          <Search />

          <LanguageSelector className="hidden md:block" />
          <BucketIcon />
          <ProfileIcon className=" hidden md:block " />
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="relative z-50 flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer md:hidden"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  openMenu
                    ? "opacity-0 rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              >
                <MenuIcon />
              </div>
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  openMenu
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-0"
                }`}
              >
                <CloseIcon />
              </div>
            </div>
          </button>
        </div>
      </div>
      <DesctopMenu />
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
