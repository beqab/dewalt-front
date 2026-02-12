import { getAdsByPosition } from "../server/getAds";
import { AdPosition } from "../types";
import Add from "./add";

export default async function SecundAd() {
  // Footer ad slot
  const footerAd = await getAdsByPosition(AdPosition.FOOTER);
  return <Add className="mb-10 h-[152px] px-0 md:h-[252px]" ad={footerAd} />;
}
