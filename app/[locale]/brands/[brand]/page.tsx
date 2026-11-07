import BrandPage from "@/features/brands/brandPage";
import {
  BRAND_KEY_BY_SLUG,
  BRAND_STATIC_INFO,
} from "@/features/brands/brandInfo";
import { buildPageMetadata, getSafeLocale } from "@/lib/seo";
import type { Metadata } from "next";
import { getBrandContent } from "@/features/brands/server/getBrandContent";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    brand: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand, locale: routeLocale } = await params;
  const locale = getSafeLocale(routeLocale);
  const brandKey = BRAND_KEY_BY_SLUG[brand.toLowerCase()];
  if (!brandKey) return {};

  const { name, slug } = BRAND_STATIC_INFO[brandKey];
  const messages = (await import(`@/messages/${locale}.json`)).default as {
    meta?: { pages?: { brand?: { title?: string; description?: string } } };
  };
  const brandMeta = messages.meta?.pages?.brand;
  const fill = (text?: string) => text?.replaceAll("{brand}", name);

  return buildPageMetadata({
    locale,
    path: `/brands/${slug}`,
    title: fill(brandMeta?.title) ?? name,
    description: fill(brandMeta?.description),
  });
}

export default async function Page({ params }: PageProps) {
  const { brand, locale } = await params;
  const normalizedBrand = brand.toLowerCase();

  if (!BRAND_KEY_BY_SLUG[normalizedBrand]) {
    return notFound();
  }

  const brandKey = BRAND_KEY_BY_SLUG[normalizedBrand];
  const content = await getBrandContent();

  return (
    <BrandPage
      brandKey={brandKey}
      brandSlug={normalizedBrand}
      lang={locale === "ka" ? "ka" : "en"}
      content={content?.[brandKey]}
    />
  );
}
