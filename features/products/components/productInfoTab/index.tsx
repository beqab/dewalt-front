"use client";

import { useState } from "react";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { Product } from "../../types";
import FacebookComments from "@/components/facebook/FacebookComments";
import { useGetLocale } from "@/lib/utils/useGetLocale";

export default function ProductInfoTab({
  product,
  productUrl,
}: {
  product: Product;
  productUrl: string;
}) {
  const { specs, description } = product;
  const t = useTranslations("");
  const locale = useGetLocale() as "ka" | "en";
  const tabs = [
    {
      id: 1,
      name: "description",
      content: "description",
    },
    {
      id: 2,
      name: "details",
      content: "specs",
    },
    {
      id: 3,
      name: "comments",
      content: "comments",
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const renderTabContent = () => {
    switch (activeTab) {
      case 1: // Description
        return (
          <div className="bg-background rounded-lg p-4 md:min-h-[160px]">
            <p className="text-dark-secondary-100 whitespace-pre-line">
              {description}
            </p>
          </div>
        );

      case 2: // Specs/Details
        if (!specs || specs.length === 0) {
          return (
            <div className="bg-background rounded-lg p-4 md:min-h-[160px]">
              <p className="text-text-secondary text-center">
                {t("products.noSpecs", {
                  defaultValue: "No specifications available",
                })}
              </p>
            </div>
          );
        }

        return (
          <div className="bg-background overflow-hidden rounded-lg md:min-h-[160px]">
            <div className="divide-y divide-gray-200 p-2">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 gap-4 p-2 transition-colors hover:bg-gray-50/50 md:grid-cols-[200px_1fr]"
                >
                  <div className="text-text-secondary font-medium md:font-normal">
                    {spec.label}
                  </div>
                  <div className="text-dark-secondary-100">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // Comments
        return (
          <div className="bg-background rounded-lg p-4 md:min-h-[160px]">
            <FacebookComments href={productUrl} locale={locale} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            className={classNames(
              "text-dark-secondary-100 font-sm hover:text-primary mr-6 mb-2 cursor-pointer transition-colors md:text-base",
              {
                "border-primary border-b-2 pb-2 font-bold":
                  activeTab === tab.id,
              }
            )}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {t(tab.name)}
          </button>
        ))}
      </div>
      <div className="mt-4">{renderTabContent()}</div>
    </div>
  );
}
