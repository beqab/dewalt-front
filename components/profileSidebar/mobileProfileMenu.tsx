"use client";

import { useState } from "react";
import ProfileIcon from "@/components/icons/profileIcon";
import CloseIcon from "@/components/icons/closeIcon";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { Button } from "@/components/ui/button";
import ProfileSidebar from ".";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import MenuIcon from "../icons/menuIcon";

export default function MobileProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    if (isOpen === false) {
      setIsOpen(true);
    }
  };

  useBodyScrollLock(isOpen);

  return (
    <div className="relative z-20 md:hidden">
      <Button variant="dark" className="mb-4 w-full gap-2" onClick={handleOpen}>
        <MenuIcon /> <span>{t("profile.sidebar.profile")}</span>
      </Button>

      {/* Animated mobile drawer */}
      <div
        onClick={handleClose}
        className={cn(
          "fixed inset-0 top-30 left-0 z-30 flex justify-end bg-black/40 transition-opacity duration-300 ease-out",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div
          className={cn(
            "relative h-full w-full max-w-xs translate-x-full bg-white pt-6 pr-4 pb-10 pl-4 shadow-xl transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseIcon
            onClick={handleClose}
            className="absolute top-4 right-4 min-h-6.5 min-w-6.5 cursor-pointer"
          />
          <ProfileSidebar onItemClick={handleClose} />
        </div>
      </div>
    </div>
  );
}
