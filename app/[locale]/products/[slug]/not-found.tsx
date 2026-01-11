import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800 dark:text-gray-200">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
          {t("errors.productNotFound", { defaultValue: "Product not found" })}
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          {t("errors.productNotFoundDescription", {
            defaultValue:
              "The product you are looking for does not exist or has been removed.",
          })}
        </p>
        <Link
          href="/products"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
        >
          {t("common.backToProducts", { defaultValue: "Back to Products" })}
        </Link>
      </div>
    </div>
  );
}
