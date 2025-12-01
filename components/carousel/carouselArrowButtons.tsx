import { cn } from "@/lib/utils";

export default function CarouselArrowButtons({
  scrollPrev,
  scrollNext,
  prevBtnDisabled,
  nextBtnDisabled,
  nextBtnClass,
  prevBtnClass,
}: {
  scrollPrev: () => void;
  scrollNext: () => void;
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  nextBtnClass?: string;
  prevBtnClass?: string;
}) {
  return (
    <>
      <button
        type="button"
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        className={cn(
          "absolute top-1/2 left-[-24px] z-10 hidden -translate-x-1/2 -translate-y-1/2 cursor-pointer disabled:opacity-50 **:disabled:cursor-not-allowed md:block",

          {
            "cursor-not-allowed opacity-50": prevBtnDisabled,
          },
          prevBtnClass
        )}
        aria-label="Previous"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="40"
            y="40"
            width="40"
            height="40"
            rx="4"
            transform="rotate(180 40 40)"
            fill="#EEEEEE"
          />
          <path
            d="M23.75 10L15.712 18.2323C14.7627 19.2045 14.7627 20.7955 15.712 21.7677L23.75 30"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        className={cn(
          "absolute top-1/2 right-[-24px] z-10 hidden translate-x-1/2 -translate-y-1/2 cursor-pointer disabled:opacity-50 **:disabled:cursor-not-allowed md:block",
          {
            "cursor-not-allowed opacity-50": nextBtnDisabled,
            nextBtnClass,
          },
          nextBtnClass
        )}
        aria-label="Next"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="4" fill="#EEEEEE" />
          <path
            d="M16.25 30L24.288 21.7677C25.2373 20.7955 25.2373 19.2045 24.288 18.2323L16.25 10"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
