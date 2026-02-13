import BannerCarousel from "./carousel";
import { getBannerCarousel } from "../server";
import { getLocale } from "next-intl/server";

export default async function Banner() {
  const locale = (await getLocale()) as "ka" | "en";
  const bannerCarousel = await getBannerCarousel(locale);

  return (
    <BannerCarousel locale={locale} bannerCarouselResponse={bannerCarousel} />
  );
}
