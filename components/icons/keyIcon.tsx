export default function KeyIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15.8333 5.83333C15.8333 7.67428 14.3409 9.16667 12.5 9.16667C12.1264 9.16667 11.7681 9.09722 11.4367 8.97083L8.33333 12.0833H5.83333V14.5833H3.33333V16.6667H1.66667V12.0833L8.02917 5.72083C7.90278 5.38958 7.83333 5.03125 7.83333 4.66667C7.83333 2.82572 9.32572 1.33333 11.1667 1.33333C13.0076 1.33333 14.5 2.82572 14.5 4.66667C14.5 5.03125 14.4306 5.38958 14.3042 5.72083L15.8333 5.83333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12.5"
        cy="4.66667"
        r="1.25"
        fill="currentColor"
      />
    </svg>
  );
}

