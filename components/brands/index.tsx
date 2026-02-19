import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import classNames from "classnames";

const brandsData = [
  {
    name: "Dewalt",
    slug: "dewalt",
    src: "/imgs/dwalt.png",
    description:
      "შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს",
    bg: "bg-primary",
  },

  {
    name: "Stanley",
    slug: "stanley",
    src: "/imgs/stanley@2x 1.png",
    description:
      "შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს",
  },

  {
    name: "Black&Decker",
    slug: "black-decker",
    src: "/imgs/black-decker.svg",
    description:
      "შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს",
  },
];

export default function Brands() {
  return (
    <div className="customContainer bg-background px-5 pt-18 pb-10 md:bg-transparent md:px-0">
      <h2 className="font-bpg-web-002-caps text-dark-secondary-100 mb-4 text-2xl md:mb-6 md:text-2xl">
        ბრენდები
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {brandsData.map((brand, index) => (
          <Link
            key={index}
            href={`/brands/${brand.slug}`}
            className="bg-primary flex cursor-pointer flex-col gap-8 rounded-lg p-12 shadow-md transition-transform hover:scale-105"
          >
            {/* Brand Logo/Name */}
            <div className="border-dark-secondary-100">
              <Image
                src={brand.src}
                alt={brand.name}
                width={400}
                height={184}
                className={classNames("m-auto h-10 w-auto")}
              />
            </div>

            {/* Description */}
            <p className="text-dark-secondary-100 flex-1 text-center text-sm leading-6">
              შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და
              ტიპოგრაფიული ნაწარმის შემქმნელებს.
            </p>

            {/* Button */}
            <Button variant="dark" className="m-auto w-[229px]">
              სრულად
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
