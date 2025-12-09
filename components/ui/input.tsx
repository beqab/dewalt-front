import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="text-text-secondary absolute top-1/2 left-3 -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "bg-background border-line-color flex h-11.5 w-full rounded-lg border px-3 py-2 text-sm transition-colors",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-text-secondary",
            "focus-visible:ring-primary/50 focus-visible:ring-2 focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            icon ? "pl-10" : "pl-3",
            rightIcon ? "pr-10" : "pr-3",
            error
              ? "border-red-500 focus-visible:ring-red-500/50"
              : "border-gray-200",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="text-text-secondary absolute top-1/2 right-3 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
