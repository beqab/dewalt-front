"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { signOut } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import LogoutIcon from "../icons/logOut";
import GearIcon from "../icons/gearIcon";
import { BucketIcon } from "../icons/bucketIcon";

interface ProfileSidebarProps {
  onItemClick?: () => void;
}

export default function ProfileSidebar({ onItemClick }: ProfileSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
    onItemClick?.();
  };

  const menuItems = [
    {
      icon: <GearIcon className="h-5 w-5" />,
      label: t("profile.sidebar.profile"),
      href: "/profile",
    },
    {
      icon: <BucketIcon className="h-5 w-5" />,
      label: t("profile.sidebar.orders"),
      href: "/orders",
    },
    {
      icon: <LogoutIcon className="h-5 w-5" />,
      label: t("profile.sidebar.logout"),
      onClick: handleLogout,
    },
  ];

  return (
    <div className="w-full shrink-0 md:w-56">
      <div className="space-y-6 border-[#D2D2D2] md:mr-0 md:border-r md:pr-6">
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = item.href ? pathname === item.href : false;

            return (
              <Link
                key={index}
                href={item.href!}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }

                  onItemClick?.();
                }}
                className={cn(
                  "flex items-center gap-2 p-2 text-sm transition-colors hover:bg-gray-100",
                  isActive
                    ? "text-dark-secondary-100 bg-gray-100 font-medium"
                    : "text-text-secondary hover:text-dark-secondary-100"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
