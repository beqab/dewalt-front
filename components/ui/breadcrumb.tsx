"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: string;
}

export default function Breadcrumb({
  items,
  className,
  separator = "/",
}: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav
      className={cn(
        "customContainer bg-neutral md:bg-background mt-16 overflow-x-auto py-4 text-sm md:mt-0 md:bg-white md:py-4",
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-nowrap items-center gap-2 whitespace-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li
              key={`${item.label}-${index}`}
              className="text-text-secondary flex items-center gap-2"
            >
              {!isFirst && (
                <span
                  className="text-text-secondary select-none"
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
              {isLast || !item.href ? (
                <span
                  className={cn("text-dark-secondary-100 font-medium", {
                    "text-dark-secondary-100": isLast,
                  })}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={
                    "text-text-secondary hover:text-dark-secondary-100 transition-colors"
                  }
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
