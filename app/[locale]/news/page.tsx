import NewsPage from "@/features/news/newsPage";
import { NewsErrorBoundary } from "@/features/news/components/errorBoundary";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <NewsErrorBoundary>
      <NewsPage searchParams={searchParams} />
    </NewsErrorBoundary>
  );
}
