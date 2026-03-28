import { getAdsByPosition } from "../server/getAds";
import { AdPosition } from "../types";
import Add from "./add";

export default async function SecundAd() {
  // Footer ad slot
  const footerAd = await getAdsByPosition(AdPosition.FOOTER);
  return (
    <div className="pb-10 md:pb-18">
      {" "}
      <Add ad={footerAd} />{" "}
    </div>
  );
}
