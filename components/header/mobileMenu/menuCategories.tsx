import { brands } from "../menu/staticMenu";
import MenuItem, { MenuSubItem } from "../menu/menuItm";
import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import SubCategorySelector from "./subCategorySelctor";

export default function MenuCategories({
  category,
  onchangeCategory,
}: {
  category: number;
  onchangeCategory: (category: number | null) => void;
}) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null
  );

  const handleClose = () => {
    if (selectedSubCategory !== null) {
      setSelectedSubCategory(null);
    } else {
      onchangeCategory(null);
    }
  };

  const selectedCategory = brands[category];

  const handleCategoryChange = (newCategoryIndex: number) => {
    if (newCategoryIndex !== category) {
      onchangeCategory(newCategoryIndex);
      setSelectedSubCategory(null);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 bg-background pl-5 mb-4">
        <button
          className="flex items-center gap-2 text-[12px] cursor-pointer hover:opacity-70 transition-opacity"
          onClick={handleClose}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 4L6.28478 7.29293C5.90507 7.68182 5.90507 8.31818 6.28478 8.70707L9.5 12"
              stroke="#9A9A9A"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          უკან
        </button>

        {/* Custom Select Dropdown */}
        <SubCategorySelector
          selectedCategory={category}
          onchangeCategory={handleCategoryChange}
        />
      </div>
      <div>
        {selectedSubCategory === null && (
          <ul className="flex flex-col gap-2 ml-1   ">
            {brands[category].categories.map((category, index) => (
              <MenuSubItem
                key={index}
                onClick={() => setSelectedSubCategory(index)}
                parentId={selectedCategory.name}
                id={category.toString()}
                displayName={category.name}
                hasSubCategories={category.subCategories.length > 0}
                isActive={false}
              />
            ))}
          </ul>
        )}
        {selectedSubCategory !== null && (
          <ul className="flex flex-col gap-2 ml-1">
            {brands[category].categories[selectedSubCategory].subCategories.map(
              (subCategory, index) => (
                <MenuItem
                  key={index}
                  label={subCategory.name}
                  href={subCategory.slug}
                />
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
