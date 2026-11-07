import { NO_INDEX_METADATA } from "@/lib/seo";
import VerifyEmailPage from "@/features/auth/verifyEmailPage";

export const metadata = NO_INDEX_METADATA;

export default function Page() {
  return <VerifyEmailPage />;
}
