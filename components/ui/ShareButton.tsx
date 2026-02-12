"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type ShareButtonProps = {
  className?: string;
  /**
   * URL to share. Can be absolute (`https://...`) or relative (`/en/news/...`).
   * If omitted, shares the current page URL.
   */
  url?: string;
};

export default function ShareButton({ className, url }: ShareButtonProps) {
  const t = useTranslations();
  const [popupBlocked, setPopupBlocked] = useState(false);

  useEffect(() => {
    if (!popupBlocked) return;
    const timeout = window.setTimeout(() => setPopupBlocked(false), 5000);
    return () => window.clearTimeout(timeout);
  }, [popupBlocked]);

  const handleShare = () => {
    if (typeof window === "undefined") return;
    setPopupBlocked(false);

    const resolvedUrl = (() => {
      const target = url?.trim();
      if (!target) return window.location.href;

      try {
        // Supports both absolute and relative URLs.
        return new URL(target, window.location.origin).toString();
      } catch {
        return window.location.href;
      }
    })();

    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      resolvedUrl
    )}`;

    const w = window.open(
      shareUrl,
      "_blank",
      "noopener,noreferrer,width=600,height=500"
    );

    if (!w) {
      setPopupBlocked(true);
    }
  };

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleShare}
        aria-label={t("common.share")}
        title={t("common.share")}
        className={cn(
          "flex h-8 cursor-pointer items-center gap-2 rounded bg-[#1877F2] px-3 text-sm font-medium text-white transition-colors hover:bg-[#166FE5]",
          className
        )}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M22 12.06C22 6.504 17.523 2 12 2S2 6.504 2 12.06C2 17.08 5.657 21.25 10.438 22v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.776-1.63 1.57v1.887h2.773l-.443 2.91h-2.33V22C18.343 21.25 22 17.08 22 12.06z" />
        </svg>
        <span>{t("common.share")}</span>
      </button>

      {popupBlocked && (
        <span className="text-xs text-red-600" aria-live="polite">
          {t("common.popupBlocked")}
        </span>
      )}
    </div>
  );
}
