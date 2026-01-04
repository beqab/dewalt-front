import { getAds } from "../server/getAds";
import { AdPosition } from "../types";
import Add from "./add";

export default async function AsideAdd() {
  const ads = await getAds();

  // Filter ads by position - get main_page ads
  const asideAds = ads.filter((ad) => ad.position === AdPosition.ASIDE);

  // Get first two ads for display
  const asideAd = asideAds[0];

  return (
    <Add className="mt-0 h-auto pr-0 md:mt-0 md:h-auto md:pr-0" ad={asideAd} />
  );
}
