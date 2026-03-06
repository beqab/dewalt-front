"use client";

import { useState, useRef } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import SearchIcon from "@/components/icons/searchIcon";
import { useSearchProducts } from "@/features/products/hooks/useSearchProducts";
import SearchResults from "./searchResults";
import { useDebounce } from "@/hooks/useDebounce";
import useOnClickOutside from "@/hooks/useOnClickOutside";

export const SearchWithoutWrapper = () => {
  const t = useTranslations();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch search results
  const { data: products = [], isLoading } =
    useSearchProducts(debouncedSearchQuery);

  useOnClickOutside(searchRef, () => {
    setIsFocused(false);
  });

  // Show dropdown when there are results or when typing
  const isOpen =
    isFocused && (debouncedSearchQuery.length >= 2 || isLoading);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleSearchSubmit = () => {
    const trimmedQuery = debouncedSearchQuery.trim();
    if (trimmedQuery.length < 2) {
      return;
    }

    // Navigate to products page with search query
    router.push(`/products?search=${encodeURIComponent(trimmedQuery)}`);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleProductClick = () => {
    setIsFocused(false);
    setSearchQuery("");
    inputRef.current?.blur();
  };

  return (
    <div className="bg-transparent md:block">
      <div className="relative w-full md:w-auto" ref={searchRef}>
        <div className="text-primary border-primary flex h-10 items-center gap-2 rounded-sm border border-solid bg-transparent p-3 md:h-8 md:min-w-86 md:p-2">
          <button
            type="button"
            onClick={handleSearchSubmit}
            className="flex items-center"
            aria-label={t("search")}
          >
            <SearchIcon className="max-h-4 min-h-4 max-w-4 min-w-4 shrink-0" />
          </button>
          <input
            ref={inputRef}
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
            className="font-inter dark-secondary-70 placeholder:text-primary w-full bg-transparent text-sm outline-none"
          />
        </div>

        {/* Search Results Dropdown */}
        {isOpen && (
          <SearchResults
            products={products}
            isLoading={isLoading}
            onProductClick={handleProductClick}
          />
        )}
      </div>
    </div>
  );
};

export default function Search() {
  return (
    <div className="bg-dark-secondary-100 absolute top-full left-0 w-full p-4 md:static md:top-auto md:w-auto md:bg-transparent md:p-0">
      <SearchWithoutWrapper />
    </div>
  );
}
