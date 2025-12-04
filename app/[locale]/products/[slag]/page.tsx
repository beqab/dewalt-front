import { dummyProducts } from "@/features/products";
import ProductDetails from "@/features/products/productDetails";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slag: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slag } = await params;

  const product = dummyProducts.find((product) => product._id === slag);
  if (!product) {
    return notFound();
  }
  return <ProductDetails product={product} />;
}
