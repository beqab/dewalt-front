"use client";

import LanguageIcon from "@/components/icons/languageIcon";
import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import MobileMenuNav from "./mobileMenuNav";
import ProfileIcon from "@/components/icons/profileIcon";
import LanguageSelector from "@/components/languageSelector/languageSelector";
import { useBodyScrollLock } from "../../../hooks/useBodyScrollLock";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { MenuBrand } from "@/features/categories/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuBrands: MenuBrand[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  menuBrands,
}: MobileMenuProps) {
  const params = useParams();
  const currentLocale = (params?.locale as Locale) || routing.defaultLocale;
  const { data: session } = useSession();
  const profileLink = session ? "/profile" : "/login";
  const t = useTranslations();

  // Reactively lock body scroll when menu is open
  useBodyScrollLock(isOpen);

  return (
    <>
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

              <span className="font-inter text-dark-secondary-70 text-sm font-medium uppercase">
                {currentLocale === "en"
                  ? t("language.enShort")
                  : t("language.kaShort")}
              </span>
            </div>
          </LanguageSelector>
          <Link
            href={profileLink}
            className="bg-primary text-dark-secondary-100 hover:bg-primary/90 flex h-12 flex-1 items-center justify-center gap-2.5 rounded-sm px-4 py-2 transition-colors"
          >
            <ProfileIcon className="" />
            <span className="text-sm font-medium">
              {session ? t("profile.title") : t("breadcrumb.login")}
            </span>
          </Link>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          <MobileMenuNav menuBrands={menuBrands} onClose={onClose} />
        </div>
      </div>
    </>
  );
}
