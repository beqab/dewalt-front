"use client";

import { useRouter } from "next/navigation";

interface AuthPageWrapperProps {
  children: React.ReactNode;
  title?: string;
}

export default function AuthPageWrapper({
  children,
  title,
}: AuthPageWrapperProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-white py-8 md:py-16">
      <div className="customContainer mx-auto w-full max-w-md px-5">
        {/* Back Link */}
        <span
          onClick={() => router.back()}
          className="text-text-secondary hover:text-dark-secondary-100 mb-6 inline-flex items-center gap-2 text-sm transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          უკან
        </span>

        {/* Form Container */}
        <div className="bg-neutral border-line-color mx-auto w-full max-w-[640px] rounded-lg border p-6 md:p-8">
          <div className="mx-auto max-w-[340px]">
            {title && (
              <h1 className="text-dark-secondary-100 font-bpg-web-002-caps mb-8 text-center text-xl md:text-2xl">
                {title}
              </h1>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
