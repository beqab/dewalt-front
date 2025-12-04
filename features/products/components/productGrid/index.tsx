"use client";

import { useState } from "react";
import ProductCard from "../../ui/productCard";
import Pagination from "../pagination";
import type { Product } from "../../types";
import MobileFilter from "../filters/mobilefilter";
import GridHeader from "./gridHeader/indeex";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="flex-1">
      {/* Header with Sorting and Product Count */}
      <MobileFilter />
      <GridHeader productsCount={products.length} />
      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            size="sm"
            className="px-0 md:px-0"
          />
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
