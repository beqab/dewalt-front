"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { axiosInterceptorAddLanguage } from "@/lib/apiClient";

export default function LanguageInterceptor() {
  const locale = useLocale();

  useEffect(() => {
    axiosInterceptorAddLanguage(locale);
  }, [locale]);

  return null;
}
