import classNames from "classnames";
import { useState, useRef, useEffect } from "react";
import { brands } from "../menu/staticMenu";

export default function SubCategorySelector({
  selectedCategory,
  onchangeCategory,
}: {
  selectedCategory: number;
  onchangeCategory: (category: number) => void;
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
          "flex items-center justify-between gap-2 px-3 py-2 text-[16px] font-medium rounded-lg hover:border-gray-400 transition-all duration-200",
          {
            "border-primary shadow-sm": isSelectOpen,
          }
        )}
      >
        <span className="text-dark-secundary-100">
          {brands[selectedCategory].name}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={classNames(
            "transition-transform duration-200 text-dark-secundary-70",
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
          "absolute w-44 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden transition-all duration-200",
          {
            "opacity-100 visible translate-y-0": isSelectOpen,
            "opacity-0 invisible -translate-y-2": !isSelectOpen,
          }
        )}
        style={{ pointerEvents: isSelectOpen ? "auto" : "none" }}
      >
        <div className="max-h-[200px] overflow-y-auto">
          {brands.map((brand, index) => (
            <button
              type="button"
              key={index}
              onClick={() => {
                onchangeCategory(index);
                setIsSelectOpen(false);
              }}
              className={classNames(
                "w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors",
                {
                  "bg-primary/10 text-primary font-medium":
                    index === selectedCategory,
                  "text-dark-secundary-100": index !== selectedCategory,
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
