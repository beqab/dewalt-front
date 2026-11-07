import { NO_INDEX_METADATA } from "@/lib/seo";
import PaymentStatusPage from "@/features/orders/paymentStatusPage";

export const metadata = NO_INDEX_METADATA;

export default function Page() {
  return <PaymentStatusPage />
}

