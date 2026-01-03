"use client";

import { useTranslations } from "next-intl";
import ProfileSidebar from "@/components/profileSidebar";
import MobileProfileMenu from "@/components/profileSidebar/mobileProfileMenu";

export default function OrdersPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen py-10">
      <div className="customContainer">
        <div className="mt-10 flex gap-6 md:mt-0">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block">
            <ProfileSidebar />
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            <div className="md:px-0">
              {/* Mobile Profile Menu */}
              <MobileProfileMenu />

              <h1 className="mb-8 text-2xl font-bold">{t("orders.title")}</h1>
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <p className="text-gray-600">{t("orders.empty")}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
