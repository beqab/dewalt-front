"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
  label?: string;
  labelClassName?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, label, labelClassName, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked);
    const handleChange = () => {
      setIsChecked(!isChecked);
    };
    React.useEffect(() => {
      setIsChecked(checked);
    }, [checked]);
    return (
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={handleChange}
          className="peer sr-only"
          {...props}
        />
        <div
          className={cn(
            "flex h-4 w-4 items-center justify-center",
            "peer-focus-visible:ring-primary/50 peer-focus-visible:ring-2 peer-focus-visible:outline-none",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            className
          )}
        >
          {checked ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="16" height="16" rx="2" fill="#FFBA00" />
              <path
                d="M11.7932 5.17524C11.8566 5.23276 11.9075 5.30162 11.9429 5.37787C11.9784 5.45412 11.9977 5.53628 11.9998 5.61964C12.0019 5.70301 11.9868 5.78596 11.9552 5.86375C11.9236 5.94153 11.8763 6.01264 11.8159 6.073L6.88934 10.9999L4.18409 8.29517C4.06209 8.17326 3.99594 8.01018 4.00019 7.84182C4.00444 7.67346 4.07875 7.5136 4.20675 7.39741C4.33476 7.28122 4.50599 7.21823 4.68277 7.22227C4.85955 7.22632 5.0274 7.29709 5.14939 7.419L6.88934 9.15865L10.8506 5.19682C10.911 5.13645 10.9833 5.088 11.0633 5.05424C11.1434 5.02047 11.2297 5.00207 11.3172 5.00006C11.4047 4.99806 11.4918 5.0125 11.5735 5.04255C11.6552 5.07261 11.7298 5.1177 11.7932 5.17524Z"
                fill="#1A1A1A"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="15"
                height="15"
                rx="1.5"
                stroke="#1A1A1A"
              />
            </svg>
          )}
        </div>
        {label && (
          <span
            className={cn("font-dark-secondary-100 text-sm" + labelClassName)}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
