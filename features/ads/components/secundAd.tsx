import { getAds } from "../server/getAds";
import { AdPosition } from "../types";
import Add from "./add";

export default async function SecundAd() {
  const ads = await getAds();

  // Filter ads by position - get main_page ads
  const secundPageAds = ads.filter((ad) => ad.position === AdPosition.FOOTER);

  // Get first two ads for display
  const secundAd = secundPageAds[0];

  return <Add className="mb-10 h-[152px] px-0 md:h-[252px]" ad={secundAd} />;
}
