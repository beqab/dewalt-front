import { setRequestLocale } from "next-intl/server";
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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="">
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
