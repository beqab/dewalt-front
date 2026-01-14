import { useState, useEffect } from "react";

const ANONYMOUS_USER_ID_KEY = "anonymousUserId";

/**
 * Generates a UUID v4
 */
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Hook to get or create anonymous user ID
 * Stores in localStorage for persistence across sessions
 */
export function useAnonymousUserId(): string {
  const [anonymousUserId, setAnonymousUserId] = useState<string>("");

  useEffect(() => {
    // Try to get from localStorage
    let userId = "";
    try {
      userId = localStorage.getItem(ANONYMOUS_USER_ID_KEY) || "";
    } catch (error) {
      // localStorage might be disabled or unavailable
      console.warn("localStorage not available, using session-only ID");
    }

    // If no ID exists, generate a new one
    if (!userId) {
      userId = generateUUID();
      try {
        localStorage.setItem(ANONYMOUS_USER_ID_KEY, userId);
      } catch (error) {
        // If localStorage fails, we'll use the in-memory ID
        // but it will be lost on refresh
        console.warn("Failed to save anonymousUserId to localStorage");
      }
    }

    setTimeout(() => {
      setAnonymousUserId(userId);
    }, 0);
  }, []);

  return anonymousUserId;
}
