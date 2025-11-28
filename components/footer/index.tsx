import Link from "next/link";
import { brands } from "@/components/header/menu/staticMenu";
import Image from "next/image";
import footerImg from "@/public/imgs/footerImg.jpg";
import PhoneIcon from "../icons/phoneicon";
import EnvelopIcon from "../icons/envelopIcon";
import LocationIcon from "../icons/locationIcon";
import FbIcon from "../icons/fbIcon";

export default function Footer() {
  return (
    <footer className="bg-dark-secundary-100 text-neutral">
      {/* Main Footer Content */}
      <div className="customContiner px-5 py-12 lg:px-0">
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
                  className="text-neutral hover:text-primary text-xs transition-colors"
                >
                  მთავარი
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-neutral hover:text-primary text-xs transition-colors"
                >
                  სიახლეები
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-neutral hover:text-primary text-xs transition-colors"
                >
                  ჩვენს შესახებ
                </Link>
              </li>
              <li>
                <Link
                  href="/service-center"
                  className="text-neutral hover:text-primary text-xs transition-colors"
                >
                  სერვის ცენტრი
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral hover:text-primary text-xs transition-colors"
                >
                  კონტაქტი
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
                  პროდუქტები
                </Link>
              </li>
              {brands.map((brand, index) => (
                <li key={index}>
                  <Link
                    href={`/brands/${brand.name.toLowerCase()}`}
                    className="text-neutral hover:text-primary text-xs transition-colors"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-dark-secundary-90 col-span-2 rounded-lg p-4 lg:col-span-1 lg:bg-transparent lg:p-0">
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
                <EnvelopIcon />
                <a
                  href="mailto:ksanisale@dewalt.com"
                  className="text-neutral hover:text-primary text-xs transition-colors"
                >
                  ksanisale@dewalt.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <LocationIcon />
                <span className="text-neutral hover:text-primary text-xs transition-colors">
                  ქსნის ქუჩა 36. თბილისი 0141, საქართველო
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FbIcon />
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral hover:text-primary text-xs transition-colors"
                >
                  გამოგვყევით
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Yellow Bar - Copyright & Payment Methods */}
      <div className="bg-primary px-5 py-4 lg:px-0">
        <div className="customContiner">
          <div className="lgitems-center flex flex-col justify-between gap-4 lg:flex-row">
            {/* Copyright */}
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center">
              <div className="text-dark-secundary-100 text-center text-xs lg:text-left">
                <span>2020 - </span>
                <span className="ml-2">ყველა უფლება დაცულია</span>
              </div>

              {/* Separator */}
              <div className="bg-dark-secundary-100 mx-6 hidden h-6 w-px lg:block" />

              {/* Terms & Privacy */}
              <div className="text-dark-secundary-100 flex flex-wrap items-center justify-center gap-2 text-xs lg:justify-start">
                <Link
                  href="/terms"
                  className="transition-colors hover:underline"
                >
                  წესები და პირობები
                </Link>

                <Link
                  href="/privacy"
                  className="transition-colors hover:underline"
                >
                  კონფიდენციალურობის პოლიტიკა
                </Link>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
              <span className="text-dark-secundary-100 text-xs font-semibold">
                Mastercard
              </span>
              <span className="text-dark-secundary-100 text-xs font-semibold">
                VISA
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
