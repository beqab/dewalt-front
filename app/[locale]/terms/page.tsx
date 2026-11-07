import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import TermsPage from "@/features/terms/termsPage";
import { getTerms } from "@/features/terms/server/getTerms";
import { getLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale, "terms", "/terms");
}

export default async function Terms() {
  const locale = (await getLocale()) as "ka" | "en";
  const terms = await getTerms();

  return <TermsPage content={terms?.content?.[locale] ?? ""} />;
}

