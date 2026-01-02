import BannerCarousel from "./carousel";
import { getBannerCarousel } from "../server";
import { Suspense } from "react";

export default async function Banner() {
  const bannerCarousel = await getBannerCarousel();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BannerCarousel bannerCarouselResponse={bannerCarousel} />{" "}
    </Suspense>
  );
}
