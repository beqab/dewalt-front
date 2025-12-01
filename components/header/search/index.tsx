import SearchIcon from "@/components/icons/searchIcon";
import { useTranslations } from "next-intl";

export const SearchWithoutWrapper = () => {
  const t = useTranslations();

  return (
    <div className="bg-background md:block md:bg-transparent">
      <div className="text-dark-secondary-70 md:text-primary md:border-primary border-dark-secondary-70 flex h-8 items-center gap-2 rounded-sm border p-2 md:min-w-86">
        <SearchIcon className="" />
        <input
          type="text"
          placeholder={t("search")}
          className="font-inter dark-secundary-70 w-full text-sm"
        />
      </div>
    </div>
  );
};

export default function Search() {
  return (
    <div className="bg-background absolute top-14 left-0 w-full p-5 py-4 md:static md:top-auto md:w-auto md:bg-transparent md:p-0">
      <SearchWithoutWrapper />
    </div>
  );
}
