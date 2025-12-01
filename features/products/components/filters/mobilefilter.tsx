import { Button } from "@/components/ui/button";
import Filters from ".";
import FilterIcon from "@/components/icons/filterIcon";
import { Activity, useState } from "react";
import SearchIcon from "@/components/icons/searchIcon";
import CloseIcon from "@/components/icons/closeIcont";
import { useBodyScrollLock } from "@/components/header/mobileMenu/useBodyScrollLock";

export default function MobileFilter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  useBodyScrollLock(isOpen);
  return (
    <div className="relative z-20 md:hidden">
      <Button
        variant="dark"
        className="mb-4 w-full gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FilterIcon /> <span>ფილტრი</span>
      </Button>
      <Activity mode={isOpen ? "visible" : "hidden"}>
        <div className="absolute top-0 w-screen bg-white pt-6 pr-4 pb-10 pl-4">
          <CloseIcon
            onClick={handleClose}
            className="absolute top-0 right-4 min-h-6.5 min-w-6.5"
          />
          <Filters />
          <div className="mt-4 border-t border-[#D2D2D2] pt-4 pb-10">
            <Button onClick={handleClose} className="w-full gap-2">
              <SearchIcon /> <span>ძებნა</span>
            </Button>
          </div>
        </div>
      </Activity>
    </div>
  );
}
