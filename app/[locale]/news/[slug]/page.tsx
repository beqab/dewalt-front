import NewsDetail from "@/features/news/newsDetail";
import { NewsErrorBoundary } from "@/features/news/components/errorBoundary";
import { extractIdFromSlug } from "@/lib/utils/extractIdFromSlug";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;

  // Extract ID from hybrid slug
  const id = await extractIdFromSlug(slug);

  console.log("id", id);
  if (!id) {
    notFound();
  }

  return (
    <NewsErrorBoundary>
      <NewsDetail id={id} />
    </NewsErrorBoundary>
  );
}
