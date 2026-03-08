"use client";

import { ReactNode } from "react";
import classNames from "classnames";
import { useProductMenuContext } from "./context";

type PanelProps = {
  children: ReactNode;
  className?: string;
  width?: "narrow" | "wide" | "full";
  isOpen: boolean;
};

export default function ProductMenuPanel({
  children,
  className,
  width = "wide",
  isOpen,
}: PanelProps) {
  const { categories } = useProductMenuContext();
  const isAllCategoriesMode = categories && categories.length > 1;

  const widthClasses = {
    narrow: "min-w-[500px]",
    wide: "min-w-[600px]",
    full: "w-full",
  };

  if (!isOpen) return null;

  return (
    <div
      className={classNames(
        "bg-neutral absolute top-full left-0 z-50 mt-5 overflow-hidden rounded-lg shadow-lg",
        widthClasses[width],
        {
          "-left-40 -translate-x-1/2": isAllCategoriesMode,
        },
        className
      )}
    >
      <div className="flex">{children}</div>
    </div>
  );
}
