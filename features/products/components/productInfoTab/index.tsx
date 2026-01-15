"use client";

import { useState } from "react";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { Product } from "../../types";
import FacebookComments from "@/components/facebook/FacebookComments";
import { useGetLocale } from "@/lib/utils/useGetLocale";

const RenderCommentsTab = ({
  productUrl,
  locale,
  activeTab,
}: {
  productUrl: string;
  locale: "ka" | "en";
  activeTab: number;
}) => (
  <div
    key={productUrl}
    className={classNames("bg-background rounded-lg p-4 md:min-h-[160px]", {
      hidden: activeTab !== 3,
    })}
  >
    <FacebookComments href={productUrl} locale={locale} />
  </div>
);

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

  // Render all tabs but show/hide based on activeTab
  const renderDescriptionTab = () => (
    <div
      className={classNames("bg-background rounded-lg p-4 md:min-h-[160px]", {
        hidden: activeTab !== 1,
      })}
    >
      <p className="text-dark-secondary-100 whitespace-pre-line">
        {description}
      </p>
    </div>
  );

  const renderSpecsTab = () => {
    if (!specs || specs.length === 0) {
      return (
        <div
          className={classNames(
            "bg-background rounded-lg p-4 md:min-h-[160px]",
            {
              hidden: activeTab !== 2,
            }
          )}
        >
          <p className="text-text-secondary text-center">
            {t("products.noSpecs", {
              defaultValue: "No specifications available",
            })}
          </p>
        </div>
      );
    }

    return (
      <div
        className={classNames(
          "bg-background overflow-hidden rounded-lg md:min-h-[160px]",
          {
            hidden: activeTab !== 2,
          }
        )}
      >
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
      <div className="mt-4">
        {renderDescriptionTab()}
        {renderSpecsTab()}
        <RenderCommentsTab
          key={productUrl}
          productUrl={productUrl}
          locale={locale}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
}
