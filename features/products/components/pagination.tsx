interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="mt-10 mb-10 flex items-center justify-center gap-2 md:mt-12.5 md:mb-18">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="text-dark-secundary-100 hover:bg-dark-secundary-100 border-line-color flex h-10 w-10 cursor-pointer items-center justify-center rounded border transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Previous page"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.2324 4.18414C10.4621 4.423 10.4546 4.80282 10.2158 5.0325L7.06557 8L10.2158 10.9675C10.4546 11.1972 10.4621 11.577 10.2324 11.8159C10.0027 12.0547 9.6229 12.0622 9.38404 11.8325L5.78404 8.4325C5.66639 8.31938 5.5999 8.16321 5.5999 8C5.5999 7.83679 5.66639 7.68062 5.78404 7.5675L9.38404 4.1675C9.6229 3.93782 10.0027 3.94527 10.2324 4.18414Z"
            fill="#9A9A9A"
          />
        </svg>
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`${
            currentPage === page
              ? "bg-dark-secundary-100 font-bold text-white"
              : "text-dark-secundary-100 hover:bg-dark-secundary-100 border-line-color border hover:text-white"
          } flex h-10 w-10 cursor-pointer items-center justify-center rounded transition-colors disabled:cursor-default`}
          aria-label={`Page ${page}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="text-dark-secundary-100 hover:bg-dark-secundary-100 border-line-color flex h-10 w-10 cursor-pointer items-center justify-center rounded border transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Next page"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.7676 11.8159C5.53792 11.577 5.54537 11.1972 5.78423 10.9675L8.93443 8L5.78423 5.0325C5.54537 4.80282 5.53792 4.423 5.7676 4.18413C5.99727 3.94527 6.3771 3.93782 6.61596 4.1675L10.216 7.5675C10.3336 7.68062 10.4001 7.83679 10.4001 8C10.4001 8.16321 10.3336 8.31938 10.216 8.4325L6.61596 11.8325C6.3771 12.0622 5.99727 12.0547 5.7676 11.8159Z"
            fill="#9A9A9A"
          />
        </svg>
      </button>
    </div>
  );
}
