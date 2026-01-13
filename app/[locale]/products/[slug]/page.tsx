import ProductDetailsPage from "@/features/products/productDetailsPage";
import { getLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const language = (await getLocale()) as "ka" | "en";

  return <ProductDetailsPage slug={slug} language={language} />;
}
