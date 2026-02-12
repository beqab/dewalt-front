import BannerCarousel from "./carousel";
import { getBannerCarousel } from "../server";

export default async function Banner() {
  const bannerCarousel = await getBannerCarousel();

  return <BannerCarousel bannerCarouselResponse={bannerCarousel} />;
}
