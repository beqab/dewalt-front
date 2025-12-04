import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LanguageSelector from "@/components/languageSelector/languageSelector";
import { BucketIcon } from "@/components/icons/bucketIcon";
import BannerCarousel from "@/features/bannerCarousel";
import ProductSlider from "@/features/products/components/productSlider";
import MainPageAds from "@/features/ads/mainPageAds";
import NewsSlider from "@/features/news/components/newsSlider";
import AboutBanner from "@/features/about/aboutBanner";
import Brands from "@/components/brands";
import BenefitsList from "@/components/benefitsList";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale });
  return (
    <div className="">
      <BannerCarousel />

      <ProductSlider />
      <MainPageAds />
      <NewsSlider />
      <AboutBanner />
      <Brands />
      <BenefitsList />
    </div>
  );
}
