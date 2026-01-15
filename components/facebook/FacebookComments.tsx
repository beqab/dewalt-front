"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface FacebookCommentsProps {
  href: string; // Unique URL for this product/page
  locale?: "ka" | "en"; // Language for Facebook comments

  width?: string;
  numPosts?: number;
}

const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "";

if (!FACEBOOK_APP_ID) {
  console.log("NEXT_PUBLIC_FACEBOOK_APP_ID is not set");
}
// Global flag to track if SDK is initialized
let isSDKInitialized = false;

// Map locale to Facebook locale code
const getFacebookLocale = (locale?: "ka" | "en"): string => {
  return locale === "ka" ? "ka_GE" : "en_US";
};

export default function FacebookComments({
  href,
  locale = "en",
  width = "100%",
  numPosts = 10,
}: FacebookCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevHrefRef = useRef<string>(href);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isCommentsReady, setIsCommentsReady] = useState(false);
  const facebookLocale = getFacebookLocale(locale);

  const initializeComments = () => {
    if (containerRef.current && window.FB) {
      window.FB.XFBML.parse(containerRef.current);
      setIsCommentsReady(true);
    }
  };

  const handleSDKLoad = () => {
    console.log("Facebook SDK loaded, window.FB:", window.FB);

    // SDK loaded, initialize Facebook (only once globally)
    if (typeof window !== "undefined" && window.FB && !isSDKInitialized) {
      console.log("Initializing Facebook SDK with App ID:", FACEBOOK_APP_ID);
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        xfbml: true,
        version: "v21.0",
      });
      isSDKInitialized = true;
      console.log("Facebook SDK initialized successfully");
    }

    setIsSDKLoaded(true);

    // Parse comments after a short delay to ensure DOM is ready
    setTimeout(() => {
      console.log("Parsing Facebook comments, window.FB:", window.FB);
      initializeComments();
    }, 100);
  };

  useEffect(() => {
    // If SDK is already available (client-side navigation), mark it as loaded
    if (!isSDKLoaded && typeof window !== "undefined" && window.FB) {
      setTimeout(() => {
        setIsSDKLoaded(true);
      }, 0);
    }

    // Reset loading state when href changes
    if (prevHrefRef.current !== href) {
      prevHrefRef.current = href;
      // Use setTimeout to avoid setState in effect warning
      setTimeout(() => {
        setIsCommentsReady(false);
      }, 0);
    }

    // Re-parse comments when href changes or if SDK is already loaded
    // Note: window.FB will be undefined initially - this is normal!
    // The SDK loads asynchronously via Script component
    if (isSDKLoaded && typeof window !== "undefined" && window.FB) {
      console.log("Re-parsing Facebook comments for href:", href);
      // Use setTimeout to avoid setState in effect warning
      setTimeout(() => {
        initializeComments();
      }, 0);
    } else {
      console.log(
        "Facebook SDK not ready yet. isSDKLoaded:",
        isSDKLoaded,
        "window.FB:",
        typeof window !== "undefined" ? window.FB : "N/A"
      );
    }
    return () => {
      console.log("Unmounting Facebook Comments");
      isSDKInitialized = false;
      setIsSDKLoaded(false);
      setIsCommentsReady(false);
    };
  }, [href, isSDKLoaded]);

  useEffect(() => {
    return () => {
      if (containerRef.current) {
        window.FB.XFBML.parse(containerRef.current);
      }
      isSDKInitialized = false;
      setIsSDKLoaded(false);
      setIsCommentsReady(true);
    };
  }, [containerRef]);
  return (
    <>
      <Script
        src={`https://connect.facebook.net/${facebookLocale}/sdk.js`}
        strategy="lazyOnload"
        onLoad={handleSDKLoad}
      />
      <div className="w-full">
        {!isCommentsReady && (
          <div className="flex min-h-[200px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-gray-200" />
              <p className="text-text-secondary text-sm">Loading comments...</p>
            </div>
          </div>
        )}
        <div
          ref={containerRef}
          className={`fb-comments ${!isCommentsReady ? "hidden" : ""}`}
          data-href={href}
          data-width={width}
          data-numposts={numPosts}
          data-colorscheme="light"
          data-locale={facebookLocale}
        />
      </div>
    </>
  );
}
