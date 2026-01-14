"use client";

import { useEffect, type RefObject } from "react";

// Generic hook to detect clicks / touches outside the given element
export default function useOnClickOutside(
  ref: RefObject<HTMLDivElement | null>,
  callback: () => void
) {
  useEffect(() => {
    const handleEvent = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      if (!element) return;

      // If click is outside the element, trigger callback
      if (!element.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleEvent);

    return () => {
      document.removeEventListener("click", handleEvent);
    };
  }, [ref, callback]);
}
