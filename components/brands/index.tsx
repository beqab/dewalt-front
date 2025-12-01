import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

const brandsData = [
  {
    name: "Dewalt",
    src: "/imgs/dewalt.png",
    description:
      "შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს",
    href: "/",
    bg: "bg-primary",
  },

  {
    name: "Stanley",
    src: "/imgs/stanley.png",
    description:
      "შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს",
    href: "/",
  },

  {
    name: "Black&Decker",
    src: "/imgs/black-decker.svg",
    description:
      "შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და ტიპოგრაფიული ნაწარმის შემქმნელებს",
    href: "/",
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
          <div
            key={index}
            className="bg-primary flex flex-col gap-8 rounded p-12 shadow-md"
          >
            {/* Brand Logo/Name */}
            <div className="border-dark-secondary-100">
              <Image
                src={brand.src}
                alt={brand.name}
                width={100}
                height={46}
                className={classNames("m-auto h-10 w-auto", {
                  "brightness-100 grayscale invert filter":
                    brand.name === "Dewalt",
                })}
              />
            </div>

            {/* Description */}
            <p className="text-dark-secondary-100 flex-1 text-center text-sm leading-6">
              შემთხვევითად გენერირებული ტექსტი ეხმარება დიზაინერებს და
              ტიპოგრაფიული ნაწარმის შემქმნელებს.
            </p>

            {/* Button */}
            <Button variant="dark" className="m-auto w-[229px]" asChild>
              <Link href={`/brands/${brand.name.toLowerCase()}`}>სრულად</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
