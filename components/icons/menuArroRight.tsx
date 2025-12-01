export default function MenuArrowRight({ className }: { className: string }) {
  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      className={`text-dark-secondary-70 , shrink-0 transition-transform duration-200 ${className}`}
    >
      <path
        d="M1 1L5 5L1 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
