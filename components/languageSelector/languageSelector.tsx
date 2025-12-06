"use client";

import classNames from "classnames";
import { useParams } from "next/navigation";
import { Locale } from "next-intl";
import { useTransition, useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import LanguageIcon from "../icons/languageIcon";
import { routing } from "@/i18n/routing";

export default function LanguageSelector({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLocale = (params?.locale as Locale) || routing.defaultLocale;

  const locales = routing.locales;

  function handleLanguageChange(locale: Locale) {
    if (locale === currentLocale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale }
      );
      setIsOpen(false);
    });
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={classNames("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          "relative z-10 flex cursor-pointer items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95",
          isPending && "cursor-not-allowed opacity-50"
        )}
        disabled={isPending}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        {children || <LanguageIcon />}
      </button>

      {/* Dropdown */}
      <div
        className={classNames(
          "md bg-dark-secondary-100 absolute top-full right-auto z-50 mt-2 w-32 overflow-hidden rounded-lg shadow-lg transition-all duration-300 md:right-0",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        )}
      >
        <div className="py-2">
          {locales.map((locale) => {
            const isActive = locale === currentLocale;
            return (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale as Locale)}
                className={classNames(
                  "w-full px-4 py-2 text-left text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "hover:text-primary text-white hover:bg-white/5"
                )}
                disabled={isPending}
              >
                <div className="flex items-center justify-between">
                  <span>{locale === "ka" ? "Geo" : "Eng"}</span>
                  {isActive && <span className="text-primary text-xs">✓</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
