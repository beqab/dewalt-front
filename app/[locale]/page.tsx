import { getTranslations, setRequestLocale } from "next-intl/server";
import BannerCarousel from "@/features/bannerCarousel/components";
import ProductSlider from "@/features/products/components/productSlider";
import MainAdd from "@/features/ads/components/mainAdd";
import NewsSlider from "@/features/news/components/newsSlider";
import AboutBanner from "@/features/about/aboutBanner";
import Brands from "@/components/brands";
import BenefitsList from "@/components/benefitsList";
import SecundAd from "@/features/ads/components/secundAd";
import { Suspense } from "react";
import ProductSliderLoader from "@/features/products/components/productSlider/productSliderLoader";
import {
  buildCanonicalUrl,
  buildLanguageAlternates,
  getOgLocale,
  getSafeLocale,
} from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = getSafeLocale(routeLocale);
  const canonicalUrl = buildCanonicalUrl(locale);

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: buildLanguageAlternates(),
    },
    openGraph: {
      url: canonicalUrl,
      type: "website",
      siteName: locale === "ka" ? "DEWALT საქართველო" : "DEWALT Georgia",
      locale: getOgLocale(locale),
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="">
      <h1 className="sr-only">
        {t("meta.siteTitle")} — {t("meta.siteDescription")}
      </h1>
      <BannerCarousel />

      <Suspense fallback={<ProductSliderLoader />}>
        <ProductSlider />
      </Suspense>
      <MainAdd />
      <NewsSlider />
      <SecundAd />
      <AboutBanner />
      <Brands />
      <BenefitsList />
    </div>
  );
}
