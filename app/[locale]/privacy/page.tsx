import type { Metadata } from "next";
import { buildStaticPageMetadata } from "@/lib/seo";
import PrivacyPage from "@/features/privacy/privacyPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale, "privacy", "/privacy");
}

export default function Privacy() {
  return <PrivacyPage />;
}
