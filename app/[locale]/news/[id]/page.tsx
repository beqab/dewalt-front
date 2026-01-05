import NewsDetail from "@/features/news/newsDetail";
import { NewsErrorBoundary } from "@/features/news/components/errorBoundary";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  return (
    <NewsErrorBoundary>
      <NewsDetail params={Promise.resolve({ id })} />
    </NewsErrorBoundary>
  );
}

