import { getAds } from "../server/getAds";
import { AdPosition } from "../types";
import Add from "./add";

export default async function MainPageAds() {
  const ads = await getAds();

  // Filter ads by position - get main_page ads
  const mainPageAds = ads.filter((ad) => ad.position === AdPosition.MAIN_PAGE);

  // Get first two ads for display
  const firstAd = mainPageAds[0];

  return <Add className="h-[152px] md:h-[252px]" ad={firstAd} />;
}
