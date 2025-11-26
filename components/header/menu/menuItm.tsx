import MenuArrow from "@/components/icons/menuArrow";
import MenuArrowRight from "@/components/icons/menuArroRight";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  isActive: boolean;
  label: string;
  onClick?: (index: string) => void;
  hasChildren?: boolean;
  href?: string;
  className?: string;
}

export function MenuItemWithArrow({
  isActive,
  label,
  onClick,
  className,
}: MenuItemProps) {
  return (
    <button
      className={classNames(
        "flex items-center cursor-pointer gap-1 py-3 text-dark-secundary-100 font-inter text-sm hover:text-black transition-colors relative",
        className,
        {
          "text-black": isActive,
        }
      )}
      onClick={() => onClick?.(label)}
    >
      <span>{label}</span>

      <MenuArrow
        className={classNames("transition-transform duration-200", {
          "rotate-180": isActive,
        })}
      />

      {isActive && (
        <div className="absolute top-[44px] left-1/2 transform -translate-x-1/2">
          <svg
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.2302 0.999999C11 -0.333335 12.9245 -0.333333 13.6943 1L23.6536 18.25C24.4234 19.5833 23.4612 21.25 21.9216 21.25H2.00299C0.463385 21.25 -0.498863 19.5833 0.270937 18.25L10.2302 0.999999Z"
              fill="#F3F3F3"
            />
          </svg>
        </div>
      )}
    </button>
  );
}

export const MenuSubItem = ({
  onClick,
  parentId,
  id,
  displayName,
  hasSubCategories,
  isActive,
}: {
  onClick: (parentId: string, id: string) => void;
  parentId: string;
  id: string;
  displayName: string;
  hasSubCategories: boolean;
  isActive: boolean;
}) => {
  return (
    <li
      onClick={() => onClick(parentId, id)}
      className="cursor-pointer transition-colors hover:bg-gray-50"
    >
      <div className="flex items-start justify-between px-4 py-2">
        <span
          className={classNames("text-sm font-roboto text-dark-secundary-70", {
            "text-dark-secundary-100 font-bold": isActive,
          })}
        >
          {displayName}
        </span>
        {hasSubCategories && (
          <MenuArrowRight
            className={`text-dark-secundary-70  mt-1.5 shrink-0 transition-transform duration-200 ${
              isActive ? "rotate-90" : ""
            }`}
          />
        )}
      </div>
    </li>
  );
};

export default function MenuItem({
  label,
  href = "#",
}: {
  label: string;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={classNames(
        "flex items-center gap-1 py-3 text-dark-secundary-100 font-inter text-sm hover:text-black transition-colors relative",
        {
          "text-black": isActive,
        }
      )}
    >
      <span>{label}</span>
    </Link>
  );
}
