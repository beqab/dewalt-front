import FbIcon from "@/public/icons/fbmessenger.svg";

import Image from "next/image";

export default function MessengerButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed right-6 bottom-6 z-50 flex h-16 w-16 items-center justify-center rounded-full p-2 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <span className="relative inline-flex items-center justify-center before:absolute before:h-[30px] before:w-[30px] before:rounded-full before:bg-[#fff] before:content-['']">
        <Image
          src={FbIcon}
          alt="Messenger"
          width={56}
          height={56}
          className="relative z-10"
        />
      </span>
      <span className="sr-only">{label}</span>
    </a>
  );
}
