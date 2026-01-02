import { useParams } from "next/navigation";

export const useGetLocale = () => {
  const params = useParams();
  const locale = (params?.locale as "ka" | "en") || "ka";
  return locale;
};
