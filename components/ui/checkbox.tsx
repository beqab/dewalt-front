"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
  label?: string;
  labelClassName?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, label, labelClassName, ...props }, ref) => {
    return (
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          className="peer sr-only"
          {...props}
        />
        <div
          className={cn(
            "flex h-4 w-4 items-center justify-center rounded border-2 border-gray-300 transition-all",
            checked && "border-primary bg-primary",
            "peer-focus-visible:ring-primary/50 peer-focus-visible:ring-2 peer-focus-visible:outline-none",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            className
          )}
        >
          {checked && (
            <svg
              width="8"
              height="6"
              viewBox="0 0 8 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.79321 0.175358C7.8566 0.232882 7.90748 0.301737 7.94293 0.37799C7.97837 0.454242 7.9977 0.536398 7.99981 0.619766C8.00191 0.703134 7.98675 0.78608 7.95519 0.863867C7.92363 0.941654 7.87629 1.01276 7.81588 1.07312L2.88934 6L0.184087 3.29529C0.0620908 3.17338 -0.00405781 3.01031 0.000192895 2.84194C0.0044436 2.67358 0.0787454 2.51372 0.206753 2.39753C0.334761 2.28135 0.505988 2.21835 0.682768 2.2224C0.859547 2.22644 1.0274 2.29721 1.14939 2.41912L2.88934 4.15877L6.85057 0.196945C6.91097 0.13657 6.98326 0.0881179 7.06333 0.0543571C7.14339 0.0205963 7.22966 0.00218808 7.31719 0.000183477C7.40473 -0.00182113 7.49182 0.0126172 7.5735 0.0426741C7.65517 0.0727309 7.72983 0.117817 7.79321 0.175358Z"
                fill="#1A1A1A"
              />
            </svg>
          )}
        </div>
        {label && (
          <span
            className={cn("font-dark-secundary-100 text-sm" + labelClassName)}
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
