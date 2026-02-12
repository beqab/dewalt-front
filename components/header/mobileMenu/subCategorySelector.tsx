import { MenuBrand } from "@/features/categories/types";
import classNames from "classnames";
import { useState, useRef, useEffect } from "react";

export default function SubCategorySelector({
  selectedCategory,
  onchangeCategory,
  brands,
}: {
  selectedCategory: number;
  onchangeCategory: (category: number) => void;

  brands: MenuBrand[];
}) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Close select when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isSelectOpen &&
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSelectOpen]);

  return (
    <div className="relative flex-1" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsSelectOpen((prev) => !prev)}
        className={classNames(
          "flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[16px] font-medium transition-all duration-200 hover:border-gray-400",
          {
            "border-primary shadow-sm": isSelectOpen,
          }
        )}
      >
        <span className="text-dark-secondary-100">
          {brands?.[selectedCategory].name}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={classNames(
            "text-dark-secondary-70 transition-transform duration-200",
            {
              "rotate-180": isSelectOpen,
            }
          )}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Options */}
      <div
        className={classNames(
          "absolute right-0 left-0 z-10 mt-1 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-200",
          {
            "visible translate-y-0 opacity-100": isSelectOpen,
            "invisible -translate-y-2 opacity-0": !isSelectOpen,
          }
        )}
        style={{ pointerEvents: isSelectOpen ? "auto" : "none" }}
      >
        <div className="max-h-[200px] overflow-y-auto">
          {brands?.map((brand, index) => (
            <button
              type="button"
              key={index}
              onClick={() => {
                onchangeCategory(index);
                setIsSelectOpen(false);
              }}
              className={classNames(
                "w-full px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50",
                {
                  "bg-primary/10 text-primary font-medium":
                    index === selectedCategory,
                  "text-dark-secondary-100": index !== selectedCategory,
                }
              )}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
