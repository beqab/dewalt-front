"use client";

import LanguageIcon from "@/components/icons/languageIcon";
import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import MobileMenuNav from "./mobileMenuNav";
import ProfileIcon from "@/components/icons/profileIcon";
import LanguageSelector from "@/components/languageSelector/languageSelector";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const params = useParams();
  const currentLocale = (params?.locale as Locale) || routing.defaultLocale;

  return (
    <>
      {/* Backdrop Overlay */}
      <div />

      {/* Mobile Menu Panel */}
      <div
        className={
          "fixed top-[61px] right-0 h-full w-full max-w-full bg-background-secondary z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col"
        }
      >
        {/* Header */}

        {/* Language & Auth Buttons */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
          <LanguageSelector>
            <div className="flex items-center h-12 gap-2 px-4 py-2 border border-text-secondary rounded-sm hover:bg-gray-50 transition-colors">
              <LanguageIcon className="stroke-text-secondary" />

              <span className="text-sm font-inter uppercase font-medium text-dark-secundary-70">
                {currentLocale === "en" ? "ENG" : "GEO"}
              </span>
            </div>
          </LanguageSelector>
          <Link
            href="/auth"
            className="flex items-center h-12 px-4 py-2 bg-primary gap-2.5 text-dark-secundary-100 rounded-sm hover:bg-primary/90 transition-colors flex-1 justify-center"
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
