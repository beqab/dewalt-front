"use client";

import { brandsInfo } from "./brandInfo";
import Image from "next/image";
import classNames from "classnames";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

interface BrandPageProps {
  brandName: string;
  brandSlug: string;
}

export default function BrandPage({ brandName, brandSlug }: BrandPageProps) {
  const brandInfo = brandsInfo[brandName];

  if (!brandInfo) {
    return (
      <div className="min-h-screen py-20">
        <div className="customContainer">
          <div className="text-dark-secondary-100 text-center">
            <p className="text-lg">ბრენდი ვერ მოიძებნა.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="customContainer">
        {/* Brand Header */}
        <div className="mb-10 flex flex-col items-center gap-6 md:mb-12">
          <div className="flex items-center justify-center">
            <Image
              src={brandInfo.logo}
              alt={brandInfo.name}
              width={200}
              height={92}
              className={classNames("h-16 w-auto md:h-24", {
                "brightness-100 grayscale invert filter":
                  brandInfo.name === "DeWalt",
              })}
            />
          </div>
          <h1 className="font-bpg-web-002-caps text-dark-secondary-100 text-center text-3xl md:text-4xl">
            {brandInfo.name}
          </h1>
        </div>

        {/* Brand Information Section */}
        <div className="mx-auto max-w-4xl space-y-8 px-5 md:px-0">
          {/* Description */}
          <div className="space-y-4">
            <h2 className="font-bpg-web-002-caps text-dark-secondary-100 text-xl md:text-2xl">
              ბრენდის შესახებ
            </h2>
            <p className="text-dark-secondary-100 leading-7 md:text-base">
              {brandInfo.description}
            </p>
          </div>

          {/* History */}
          <div className="space-y-4">
            <h2 className="font-bpg-web-002-caps text-dark-secondary-100 text-xl md:text-2xl">
              ისტორია
            </h2>
            <p className="text-dark-secondary-100 leading-7 md:text-base">
              {brandInfo.history}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h2 className="font-bpg-web-002-caps text-dark-secondary-100 text-xl md:text-2xl">
              ძირითადი მახასიათებლები
            </h2>
            <ul className="text-dark-secondary-100 space-y-2 md:text-base">
              {brandInfo.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1.5">•</span>
                  <span className="leading-7">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to Action Button */}
          <div className="flex justify-center pt-8">
            <Button
              variant="dark"
              size="default"
              className="w-full md:w-auto"
              asChild
            >
              <Link href={`/products?brand=${brandSlug}`}>
                იხილეთ {brandInfo.name} პროდუქტები
              </Link>
            </Button>
          </div>

          {/* Official Website Link */}
          {brandInfo.website && (
            <div className="flex justify-center pt-4">
              <Link
                href={brandInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm hover:underline md:text-base"
              >
                ოფიციალური ვებ-გვერდი →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
