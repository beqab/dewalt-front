import Image from "next/image";
import LanguageSelector from "../languageSelector/languageSelector";
import Search from "./search";
import DesktopMenu from "./menu/desktopMenu/desktopMenu";
import { Link } from "@/i18n/navigation";
import CartPreview from "@/features/products/cart/components/cartPreview";
import MobileMenuToggle from "./mobileMenuToggle";
import { MenuBrand } from "@/features/categories/types";
import ProfileLink from "./profileLink";

export default async function Header({
  menuBrands,
}: {
  menuBrands: MenuBrand[];
}) {
  return (
    <header className="bg-dark-secondary-100 relative z-40">
      <div className="customContainer flex items-center justify-between px-5 py-4">
        <Link href="/" prefetch={true}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={132}
            height={32}
            quality={100}
            className="h-6 w-auto md:h-8"
          />
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <Search />

          <LanguageSelector className="hidden md:block" />
          <CartPreview />
          <ProfileLink />
          <MobileMenuToggle menuBrands={menuBrands} />
        </div>
      </div>
      <DesktopMenu menuBrands={menuBrands} />
    </header>
  );
}
