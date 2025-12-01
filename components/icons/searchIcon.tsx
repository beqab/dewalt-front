import classNames from "classnames";

export default function SearchIcon({
  className = "stroke-dark-secondary-70 md:stroke-primary",
}: {
  className?: string;
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={"min-h-6 min-w-6"}
    >
      <path
        d="M7.66659 14C11.1644 14 13.9999 11.1644 13.9999 7.66665C13.9999 4.16884 11.1644 1.33331 7.66659 1.33331C4.16878 1.33331 1.33325 4.16884 1.33325 7.66665C1.33325 11.1644 4.16878 14 7.66659 14Z"
        stroke="currentColor"
        className={classNames(
          "stroke-dark-secondary-100 md:stroke-primary",
          className
        )}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6666 14.6666L13.3333 13.3333"
        stroke="currentColor"
        className={classNames(
          "stroke-dark-secondary-100 md:stroke-primary",
          className
        )}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
