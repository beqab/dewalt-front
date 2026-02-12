import { AdPosition } from "../types";
import { getAdsByPosition } from "../server/getAds";
import Add from "./add";

export default async function AsideAdd() {
  const asideAd = await getAdsByPosition(AdPosition.ASIDE);

  return (
    <Add className="mt-0 h-auto pr-0 md:mt-0 md:h-auto md:pr-0" ad={asideAd} />
  );
}
