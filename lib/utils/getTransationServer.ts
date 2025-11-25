import { getLocale, getTranslations } from "next-intl/server";

export const getTransationServer = async () => {
  const locale = await getLocale();
  const t = await getTranslations({ locale });
  return t;
};
