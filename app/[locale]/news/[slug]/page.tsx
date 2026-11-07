import NewsDetail from "@/features/news/newsDetail";
import { NewsErrorBoundary } from "@/features/news/components/errorBoundary";
import { extractIdFromSlug } from "@/lib/utils/extractIdFromSlug";
import { generateSlug } from "@/lib/utils/slugify";
import {
  buildAbsoluteUrl,
  buildCanonicalUrl,
  buildLanguageAlternatesByLocale,
  buildSocialImageUrl,
  getImageMimeType,
  getOgLocale,
  getSafeLocale,
  Locale,
  toMetaDescription,
} from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getNewsById } from "@/features/news/server";
import type { NewsApi } from "@/features/news/types/api";
import JsonLd from "@/components/seo/JsonLd";
import { Metadata } from "next";

function getNewsDescription(news: NewsApi) {
  return toMetaDescription(news.summary) || toMetaDescription(news.content);
}

function buildNewsJsonLd(news: NewsApi, locale: Locale) {
  const image = news.imageUrl?.trim();

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    description: getNewsDescription(news) || undefined,
    image: image
      ? [image.startsWith("http") ? image : buildAbsoluteUrl(image)]
      : undefined,
    datePublished: news.createdAt || undefined,
    dateModified: news.updatedAt || news.createdAt || undefined,
    inLanguage: locale,
    mainEntityOfPage: buildCanonicalUrl(
      locale,
      `/news/${generateSlug(news.title, news._id)}`
    ),
    publisher: {
      "@type": "Organization",
      name: "DEWALT Georgia",
      logo: { "@type": "ImageObject", url: buildAbsoluteUrl("/logo.png") },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale: routeLocale } = await params;
  const locale = getSafeLocale(routeLocale);

  // Extract ID from hybrid slug
  const id = await extractIdFromSlug(slug);

  if (!id) {
    notFound();
  }

  const news = await getNewsById(id, locale);

  return (
    <>
      {news ? <JsonLd data={buildNewsJsonLd(news, locale)} /> : null}
      <NewsErrorBoundary>
        <NewsDetail id={id} />
      </NewsErrorBoundary>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale: routeLocale } = await params;
  const locale = getSafeLocale(routeLocale);

  const id = await extractIdFromSlug(slug);
  if (!id) {
    return { title: "News not found" };
  }
  const newsApi = await getNewsById(id, locale);

  if (!newsApi) {
    return { title: "News not found" };
  }

  const localizedPaths = await Promise.all(
    routing.locales.map(async (alternateLocale) => {
      const localizedNews =
        alternateLocale === locale
          ? newsApi
          : await getNewsById(id, alternateLocale);

      return [
        alternateLocale,
        localizedNews
          ? `/news/${generateSlug(localizedNews.title, localizedNews._id)}`
          : undefined,
      ] as const;
    })
  );
  const pathsByLocale = Object.fromEntries(
    localizedPaths.filter((entry) => entry[1])
  ) as Partial<Record<Locale, string>>;

  const canonicalUrl = buildCanonicalUrl(
    locale,
    `/news/${generateSlug(newsApi.title, newsApi._id)}`
  );
  const description = getNewsDescription(newsApi);
  const imageUrl = buildSocialImageUrl(newsApi.imageUrl);
  const imageType = imageUrl ? getImageMimeType(newsApi.imageUrl) : undefined;

  return {
    title: newsApi.title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildLanguageAlternatesByLocale(pathsByLocale),
    },
    openGraph: {
      title: newsApi.title,
      type: "article",
      description,
      url: canonicalUrl,
      locale: getOgLocale(locale),
      publishedTime: newsApi.createdAt || undefined,
      modifiedTime: newsApi.updatedAt || undefined,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              secureUrl: imageUrl,
              width: 1200,
              height: 630,
              alt: newsApi.title,
              type: imageType,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: newsApi.title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
