import { NO_INDEX_METADATA } from "@/lib/seo";
import ProductComparisonPage from "@/features/products/productComparisonPage";

export const metadata = NO_INDEX_METADATA;

export default function ComparePage() {
  return (
    <div>
      <ProductComparisonPage />
    </div>
  );
}
