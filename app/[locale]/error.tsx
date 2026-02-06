"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  const t = useTranslations();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="text-2xl font-semibold text-dark-secondary-100">
        {t("errors.generic.title")}
      </h2>
      <p className="text-sm text-text-secondary">
        {t("errors.generic.message")}
      </p>
      <Button type="button" onClick={reset}>
        {t("errors.generic.retry")}
      </Button>
      {process.env.NODE_ENV !== "production" && error?.message ? (
        <p className="text-xs text-text-secondary">{error.message}</p>
      ) : null}
    </div>
  );
}
  