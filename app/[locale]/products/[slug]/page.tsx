import ProductDetailsPage from "@/features/products/productDetailsPage";
import { getProductById } from "@/features/products/server";
import { extractIdFromSlug } from "@/lib/utils/extractIdFromSlug";
import { generateSlug } from "@/lib/utils/slugify";
import {
  buildCanonicalUrl,
  buildLanguageAlternatesByLocale,
  buildAbsoluteUrl,
  buildSocialImageUrl,
  getImageMimeType,
  getOgLocale,
  Locale,
  toMetaDescription,
} from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import type { Product } from "@/features/products/types";
import { routing } from "@/i18n/routing";
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

  const id = await extractIdFromSlug(slug);
  const product = id ? await getProductById(id, language) : null;

  return (
    <>
      {product ? <JsonLd data={buildProductJsonLd(product, language)} /> : null}
      <ProductDetailsPage slug={slug} language={language} />
    </>
  );
}

function getProductDescription(product: Product) {
  return (
    toMetaDescription(product.description) ||
    [product.name, product.brandId?.name, "DEWALT Georgia"]
      .filter(Boolean)
      .join(" — ")
  );
}

function getAvailability(product: Product) {
  if (product.inStock && product.quantity > 0) {
    return "https://schema.org/InStock";
  }
  if (product.orderOnly) return "https://schema.org/PreOrder";
  return "https://schema.org/OutOfStock";
}

function buildProductJsonLd(product: Product, locale: Locale) {
  const url = buildCanonicalUrl(
    locale,
    `/products/${generateSlug(product.name, product._id)}`
  );
  const images = [product.image, ...(product.images ?? [])]
    .filter((image): image is string => Boolean(image?.trim()))
    .map((image) =>
      image.startsWith("http") ? image : buildAbsoluteUrl(image)
    );

  const productLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: toMetaDescription(product.description, 500) || undefined,
    image: images.length ? images : undefined,
    sku: product.code || undefined,
    brand: product.brandId?.name
      ? { "@type": "Brand", name: product.brandId.name }
      : undefined,
    category: product.categoryId?.name || undefined,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "GEL",
      price: product.price,
      availability: getAvailability(product),
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  if (product.reviewCount > 0 && product.rating > 0) {
    productLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    };
  }

  const breadcrumbItems = [
    { name: locale === "ka" ? "მთავარი" : "Home", url: buildCanonicalUrl(locale) },
    {
      name: locale === "ka" ? "პროდუქტები" : "Products",
      url: buildCanonicalUrl(locale, "/products"),
    },
    { name: product.name, url },
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return [productLd, breadcrumbLd];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale: routeLocale } = await params;
  const locale = routing.locales.includes(routeLocale as Locale)
    ? (routeLocale as Locale)
    : routing.defaultLocale;

  const id = await extractIdFromSlug(slug);
  if (!id) {
    return { title: "Product not found" };
  }

  const product = await getProductById(id, locale);
  if (!product) {
    return { title: "Product not found" };
  }

  const description = getProductDescription(product);
  const canonicalPath = `/products/${generateSlug(product.name, product._id)}`;
  const localizedProducts = await Promise.all(
    routing.locales.map(async (alternateLocale) => {
      const localizedProduct =
        alternateLocale === locale
          ? product
          : await getProductById(id, alternateLocale);

      return [
        alternateLocale,
        localizedProduct
          ? `/products/${generateSlug(localizedProduct.name, localizedProduct._id)}`
          : undefined,
      ] as const;
    })
  );
  const pathsByLocale = Object.fromEntries(
    localizedProducts.filter((entry) => entry[1])
  ) as Partial<Record<Locale, string>>;
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);
  const imageUrl = buildSocialImageUrl(product.image);
  const imageType = imageUrl ? getImageMimeType(product.image) : undefined;

  return {
    title: product.name,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildLanguageAlternatesByLocale(pathsByLocale),
    },
    openGraph: {
      title: product.name,
      description,
      type: "website",
      url: canonicalUrl,
      locale: getOgLocale(locale),
      images: imageUrl
        ? [
            {
              url: imageUrl,
              secureUrl: imageUrl,
              width: 1200,
              height: 630,
              alt: product.name,
              type: imageType,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : undefined,
    },
  };
}
