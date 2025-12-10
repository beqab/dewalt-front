import { Suspense } from "react";
import ProductsPage from "@/features/products/productsPage";
import Loading from "@/components/ui/loading";

export default function ProductPage() {
  return (
    <Suspense
      fallback={<Loading message="პროდუქტები იტვირთება..." minHeight="60vh" />}
    >
      <ProductsPage />
    </Suspense>
  );
}
