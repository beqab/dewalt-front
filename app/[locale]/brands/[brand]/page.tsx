import BrandPage from "@/features/brands/brandPage";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    brand: string;
    locale: string;
  }>;
}

// Brand slug to actual brand name mapping
const brandMapping: Record<string, string> = {
  dewalt: "DeWalt",
  stanley: "Stanley",
  "black-decker": "Black&Decker",
};

export default async function Page({ params }: PageProps) {
  const { brand } = await params;
  const normalizedBrand = brand.toLowerCase();

  // Check if brand exists in mapping
  if (!brandMapping[normalizedBrand]) {
    return notFound();
  }

  const brandName = brandMapping[normalizedBrand];
  return <BrandPage brandName={brandName} brandSlug={normalizedBrand} />;
}
