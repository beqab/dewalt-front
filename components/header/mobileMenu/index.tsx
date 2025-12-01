"use client";

import LanguageIcon from "@/components/icons/languageIcon";
import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import MobileMenuNav from "./mobileMenuNav";
import ProfileIcon from "@/components/icons/profileIcon";
import LanguageSelector from "@/components/languageSelector/languageSelector";
import { useBodyScrollLock } from "../../../hooks/useBodyScrollLock";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const params = useParams();
  const currentLocale = (params?.locale as Locale) || routing.defaultLocale;

  // Reactively lock body scroll when menu is open
  useBodyScrollLock(isOpen);

  return (
    <>
      {/* Backdrop Overlay */}
      <div />

      {/* Mobile Menu Panel */}
      <div
        className={
          "bg-background-secondary fixed top-[61px] right-0 z-50 flex h-full w-full max-w-full transform flex-col shadow-2xl transition-transform duration-300 ease-in-out md:hidden"
        }
      >
        {/* Header */}

        {/* Language & Auth Buttons */}
        <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4">
          <LanguageSelector>
            <div className="border-text-secondary flex h-12 items-center gap-2 rounded-sm border px-4 py-2 transition-colors hover:bg-gray-50">
              <LanguageIcon className="stroke-text-secondary" />

              <span className="font-inter text-dark-secundary-70 text-sm font-medium uppercase">
                {currentLocale === "en" ? "ENG" : "GEO"}
              </span>
            </div>
          </LanguageSelector>
          <Link
            href="/auth"
            className="bg-primary text-dark-secundary-100 hover:bg-primary/90 flex h-12 flex-1 items-center justify-center gap-2.5 rounded-sm px-4 py-2 transition-colors"
          >
            <ProfileIcon className="" />
            <span className="text-sm font-medium">ავტორიზაცია</span>
          </Link>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          <MobileMenuNav onClose={onClose} />
        </div>
      </div>
    </>
  );
}
