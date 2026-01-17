import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="bg-background flex min-h-[70vh] items-center justify-center px-5 py-12">
      <div className="mx-auto w-full max-w-xl text-center">
        <p className="text-primary text-sm font-semibold">
          {t("errors.notFound.code")}
        </p>
        <h1 className="text-dark-secondary-100 mt-2 text-2xl font-bold md:text-3xl">
          {t("errors.notFound.title")}
        </h1>
        <p className="text-text-secondary mt-3 text-sm md:text-base">
          {t("errors.notFound.message")}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            prefetch
            className="bg-primary text-dark-secondary-100 rounded-md px-5 py-2 text-sm font-semibold transition-colors hover:opacity-90"
          >
            {t("errors.notFound.goHome")}
          </Link>
          <Link
            href="/products"
            prefetch
            className="border-primary text-primary hover:bg-primary/10 rounded-md border px-5 py-2 text-sm font-semibold transition-colors"
          >
            {t("errors.notFound.browseProducts")}
          </Link>
        </div>
      </div>
    </div>
  );
}
