"use client";

import Carusel from "@/components/carusel";
import CompearIcon from "@/components/icons/compearIcon";
import FbMessenger from "@/public/icons/fbmessenger.svg";
import Image from "next/image";
import ProductCard from "../productCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Product {
  id: number;
  image: string;
  name: string;
  code: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  inStock?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    image: "/imgs/product.png",
    name: "კუთხსახეხი",
    code: "DWP849k",
    description: "სახეხი და საპრიალებელი ხელსაწყოები",
    price: 1290,
    originalPrice: 1830,
    discount: 23,
    inStock: true,
  },
  {
    id: 2,
    image: "/imgs/product.png",
    name: "კუთხსახეხი",
    code: "DEW-86511 55",
    description: "სახეხი და საპრიალებელი ხელსაწყოები, ბარგალკა",
    price: 1950,
    originalPrice: 2360,
    discount: 23,
    inStock: true,
  },
  {
    id: 3,
    image: "/imgs/product.png",
    name: "კუთხსახეხი",
    code: "DWP849k",
    description: "სახეხი და საპრიალებელი ხელსაწყოები",
    price: 1290,
    originalPrice: 1830,
    discount: 23,
    inStock: true,
  },
  {
    id: 4,
    image: "/imgs/product.png",
    name: "კუთხსახეხი",
    code: "DEW-86511 55",
    description: "სახეხი და საპრიალებელი ხელსაწყოები, ბარგალკა",
    price: 1950,
    originalPrice: 2360,
    discount: 23,
    inStock: true,
  },
  {
    id: 5,
    image: "/imgs/product.png",
    name: "კუთხსახეხი",
    code: "DWP849k",
    description: "სახეხი და საპრიალებელი ხელსაწყოები",
    price: 1290,
    originalPrice: 1830,
    discount: 23,
    inStock: true,
  },
  {
    id: 6,
    image: "/imgs/product.png",
    name: "კუთხსახეხი",
    code: "DEW-86511 55",
    description: "სახეხი და საპრიალებელი ხელსაწყოები, ბარგალკა",
    price: 1950,
    originalPrice: 2360,
    discount: 23,
    inStock: true,
  },
];

export default function ProductSlider() {
  return (
    <div className="customContiner relative mt-18 w-full">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between px-5 md:px-0">
        <h2 className="font-bpg-web-002-caps text-dark-secundary-100 text-xl md:text-2xl">
          პროდუქტები
        </h2>
        <div className="flex items-end gap-6">
          <button
            type="button"
            className="bg-primary text-dark-secundary-100 hover:bg-primary/90 flex h-10 items-center gap-2 rounded-sm px-3 py-2 text-xs font-medium transition-colors"
          >
            <CompearIcon />
            შედარება (3)
          </button>
          <button
            type="button"
            aria-label="Messenger"
            className="rounded-lg bg-[#FAFAFA] p-1 shadow-[1px_1px_10.1px_0_rgba(0,0,0,0.25)]"
          >
            <Image src={FbMessenger} alt="heart" className="h-10 w-10" />
          </button>
        </div>
      </div>

      <Carusel>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Carusel>

      <Carusel>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Carusel>

      <Carusel>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Carusel>

      <div className="end mt-3 flex justify-end">
        <Button variant="outline" asChild>
          <Link href="/products">ყველას ნახვა</Link>
        </Button>
      </div>
    </div>
  );
}
