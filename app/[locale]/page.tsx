import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LanguageSelector from "@/components/languageSelector/languageSelector";
import { BucketIcon } from "@/components/icons/bucketIcon";
import BannerCarusel from "@/features/bannerCarusel";
import ProductSlider from "@/features/products/components/prductSlider";

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
      <BannerCarusel />
      <ProductSlider />
    </div>
  );
}
