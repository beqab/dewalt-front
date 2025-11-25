import SearchIcon from "@/components/icons/searchIcon";
import { useTranslations } from "next-intl";

export const SearchWithoutWrapper = () => {
  const t = useTranslations();

  return (
    <div className=" bg-background md:block md:bg-transparent">
      <div className="flex gap-2 items-center border text-dark-secundary-70 md:text-primary md:border-primary h-8 border-dark-secundary-70  rounded-sm p-2 md:min-w-86">
        <SearchIcon className="" />
        <input
          type="text"
          placeholder={t("search")}
          className="w-full font-inter text-sm  dark-secundary-70"
        />
      </div>
    </div>
  );
};

export default function Search() {
  return (
    <div className="bg-background  absolute left-0 w-full p-5 py-4 top-14 md:static md:p-0 md:w-auto md:bg-transparent md:top-auto">
      <SearchWithoutWrapper />
    </div>
  );
}
