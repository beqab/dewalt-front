import { useEffect, useRef } from "react";

/**
 * Custom hook to lock/unlock body scroll reactively
 * Preserves scroll position when locking
 */
export function useBodyScrollLock(isLocked: boolean) {
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    if (!isLocked) {
      return;
    }

    // Save current scroll position
    scrollPositionRef.current = window.scrollY;

    // Apply lock styles
    const originalStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    // Cleanup: restore scroll position and styles
    return () => {
      document.body.style.position = originalStyles.position;
      document.body.style.top = originalStyles.top;
      document.body.style.width = originalStyles.width;
      document.body.style.overflow = originalStyles.overflow;

      // Restore scroll position
      window.scrollTo(0, scrollPositionRef.current);
    };
  }, [isLocked]);
}
