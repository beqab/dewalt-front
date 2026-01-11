import { extractIdFromSlug } from "@/lib/utils/extractIdFromSlug";
import ProductDetails from "@/features/products/productDetails";
import { getProductById } from "@/features/products/server/getProucts";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const language = (await getLocale()) as "ka" | "en";
  const id = await extractIdFromSlug(slug);
  if (!id) {
    return notFound();
  }
  const product = await getProductById(id, language);
  if (!product) {
    return notFound();
  }

  return <ProductDetails product={product} />;
}
