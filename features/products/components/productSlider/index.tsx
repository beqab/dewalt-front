"use client";

import Carousel from "@/components/carousel";
import ProductCard from "../../ui/productCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { dummyProducts } from "../../data/dummyProducts";

export default function ProductSlider() {
  const products = dummyProducts.slice(0, 10);
  return (
    <div className="customContainer relative mt-18 w-full">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between px-5 md:px-0">
        <h2 className="font-bpg-web-002-caps text-dark-secondary-100 text-2xl md:text-2xl">
          პროდუქტები
        </h2>
        {/* <div className="flex items-end gap-6">
          <button
            type="button"
            className="bg-primary text-dark-secondary-100 hover:bg-primary/90 flex h-10 items-center gap-2 rounded-sm px-3 py-2 text-xs font-medium transition-colors"
          >
            <CompareIcon />
            შედარება (3)
          </button>
          <button
            type="button"
            aria-label="Messenger"
            className="rounded-lg bg-[#FAFAFA] p-1 shadow-[1px_1px_10.1px_0_rgba(0,0,0,0.25)]"
          >
            <Image src={FbMessenger} alt="heart" className="h-10 w-10" />
          </button>
        </div> */}
      </div>

      <div className="mb-4 md:mb-4">
        <Carousel>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      </div>

      <div className="mb-4 md:mb-4">
        <Carousel>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      </div>

      <Carousel>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Carousel>

      <div className="end mt-3 flex justify-end md:mt-6">
        <Button variant="outline" asChild>
          <Link href="/products">ყველას ნახვა</Link>
        </Button>
      </div>
    </div>
  );
}
