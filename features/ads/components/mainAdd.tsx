import { AdPosition } from "../types";
import { getAdsByPosition } from "../server/getAds";
import Add from "./add";

export default async function MainPageAds() {
  const ads = await getAdsByPosition(AdPosition.MAIN_PAGE);
  const firstAd = ads;

  return <Add className="h-[152px] md:h-[252px]" ad={firstAd} />;
}
