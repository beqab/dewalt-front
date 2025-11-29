"use client";

import Filters from "./components/filters";
import ProductGrid from "./components/productGrid";
import { dummyProducts } from "./data/dummyProducts";

export default function ProductsPage() {
  return (
    <div className="min-h-screen py-10">
      <div className="customContiner">
        <div className="mt-10 flex gap-6 md:mt-0">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block">
            <Filters />
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            <div className="md:px-0">
              <ProductGrid products={dummyProducts} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
