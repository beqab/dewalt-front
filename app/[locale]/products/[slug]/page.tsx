import ProductDetailsPage from "@/features/products/productDetailsPage";
import { getProductById } from "@/features/products/server";
import { extractIdFromSlug } from "@/lib/utils/extractIdFromSlug";
import { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as "ka" | "en";

  const id = await extractIdFromSlug(slug);
  if (!id) {
    return { title: "Product not found" };
  }

  const product = await getProductById(id, locale);
  if (!product) {
    return { title: "Product not found" };
  }

  const description = product.description.substring(0, 160);

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}
