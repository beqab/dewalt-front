"use client";

import { useState } from "react";
import classNames from "classnames";
import { useTranslations } from "next-intl";

export default function ProductInfoTab() {
  const t = useTranslations("");
  const tabs = [
    {
      id: 1,
      name: "description",
      content: "description",
    },
    {
      id: 2,
      name: "details",
      content: "details",
    },
    {
      id: 3,
      name: "comments",
      content: "comments",
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
      <div>
        {tabs.map((tab) => (
          <button
            className={classNames(
              "text-dark-secondary-100 font-sm mr-6 mb-4 cursor-pointer md:text-base",
              {
                "font-bold": activeTab === tab.id,
              }
            )}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {t(tab.name)}
          </button>
        ))}
      </div>
      <div className="bg-background rounded-lg p-4 md:min-h-[160px]">
        <p>
          DeWalt DW088K-XJ გამოიყენება მშენებლობისას და რემონტის დროს ზედაპირის
          სისწორის შესამოწმებლად. სქელი დამცავი მინა და მთლიანი კაუჩუკის საფარი
          უზრუნველყოფს ინსტრუმენტის დაცვას და გამართულად მუშაობას.
        </p>
      </div>
    </div>
  );
}
