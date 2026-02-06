"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import footerImg from "@/public/imgs/footerImg.jpg";
import PhoneIcon from "../icons/phoneIcon";
import EnvelopIcon from "../icons/envelopIcon";
import LocationIcon from "../icons/locationIcon";
import FbIcon from "../icons/fbIcon";
import { useTranslations } from "next-intl";
import MastercardLogo from "@/public/mastercard.png";
import VisaLogo from "@/public/visa.png";
import { useMenuBrands } from "../header/menu/hooks/useMenuBrands";

export default function Footer() {
  const { data: brands } = useMenuBrands();

  const t = useTranslations();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark-secondary-100 text-neutral">
      {/* Main Footer Content */}
      <div className="customContainer px-5 py-12 lg:px-0">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-[1fr_120px_120px_310px] lg:gap-16">
          {/* Logo */}
          <div className="col-span-2 lg:col-span-1">
            <Image src={footerImg} alt="Logo" />
          </div>

          {/* Navigation Links */}
          <div className="col-span-1 pl-9">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-neutral hover:text-primary text-xs whitespace-nowrap transition-colors"
                >
                  {t("navigation.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-neutral hover:text-primary text-xs whitespace-nowrap transition-colors"
                >
                  {t("navigation.news")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-neutral hover:text-primary text-xs whitespace-nowrap transition-colors"
                >
                  {t("navigation.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/service-center"
                  className="text-neutral hover:text-primary text-xs whitespace-nowrap transition-colors"
                >
                  {t("navigation.serviceCenter")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral hover:text-primary text-xs whitespace-nowrap transition-colors"
                >
                  {t("navigation.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Products/Brands */}
          <div>
            <ul className="space-y-4 pl-9 lg:pl-0">
              <li>
                <Link
                  href="/products"
                  className="text-neutral hover:text-primary text-xs transition-colors"
                >
                  {t("navigation.products")}
                </Link>
              </li>
              {brands?.map((brand, index) => (
                <li key={index}>
                  <Link
                    href={`/products?brand=${brand.name.toLowerCase()}`}
                    className="text-neutral hover:text-primary text-xs transition-colors"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-dark-secondary-90 col-span-2 rounded-lg p-4 lg:col-span-1 lg:bg-transparent lg:p-0">
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <PhoneIcon />
                <a
                  href="tel:+995577955582"
                  className="text-neutral hover:text-primary text-xs transition-colors"
                >
                  +995 577 95 55 82
                </a>
              </li>
              <li className="flex items-center gap-2">
                <EnvelopIcon className="text-primary" />
                <a
                  href="mailto:ksanisale@dewalt.com"
                  className="text-neutral hover:text-primary text-xs transition-colors"
                >
                  ksanisale@dewalt.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <LocationIcon />
                <address className="text-neutral hover:text-primary text-xs not-italic transition-colors">
                  {t("footer.address")}
                </address>
              </li>
              <li className="flex items-center gap-2">
                <FbIcon />
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral hover:text-primary text-xs transition-colors"
                >
                  {t("footer.followUs")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Yellow Bar - Copyright & Payment Methods */}
      <div className="bg-primary px-5 py-4 lg:px-0">
        <div className="customContainer">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            {/* Copyright */}
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
              <Image height={30} src={MastercardLogo} alt="Logo" />
              <Image height={30} src={VisaLogo} alt="Logo" />
            </div>

            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center">
              <div className="text-dark-secondary-100 text-center text-xs lg:text-left">
                <span>{year} - </span>
                <span className="ml-2">{t("footer.allRightsReserved")}</span>
              </div>

              {/* Separator */}
              <div className="bg-dark-secondary-100 mx-6 hidden h-6 w-px lg:block" />

              {/* Terms & Privacy */}
              <div className="text-dark-secondary-100 flex flex-wrap items-center justify-center gap-2 text-xs lg:justify-start">
                <Link
                  href="/terms"
                  className="transition-colors hover:underline"
                >
                  {t("footer.termsAndConditions")}
                </Link>

                <Link
                  href="/privacy"
                  className="transition-colors hover:underline"
                >
                  {t("footer.privacyPolicy")}
                </Link>
              </div>
            </div>

            {/* Payment Methods */}
          </div>
        </div>
      </div>
    </footer>
  );
}
