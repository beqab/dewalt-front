"use client";

import { useState } from "react";
import ProductCard from "../../ui/productCard";
import Pagination from "../pagination";
import type { Product } from "../../types";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [sortBy, setSortBy] = useState("price-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="flex-1">
      {/* Header with Sorting and Product Count */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <label
            htmlFor="sort"
            className="text-text-secondary text-sm font-medium"
          >
            დალაგება
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-dark-secundary-100 focus:ring-primary rounded border border-transparent bg-white px-3 text-sm focus:ring-2 focus:outline-none"
          >
            <option value="price-desc">ფასი: კლებადობით</option>
            <option value="price-asc">ფასი: ზრდადობით</option>
          </select>
        </div>

        <div className="text-dark-secundary-100 text-sm">
          <span className="text-text-secondary"> მოიძებნა </span>{" "}
          {products.length} პროდუქტი
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} size="sm" />
        ))}
      </div>

      {/* Pagination */}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

