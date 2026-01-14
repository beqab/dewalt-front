"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface FacebookCommentsProps {
  href: string; // Unique URL for this product/page
  width?: string;
  numPosts?: number;
}

const FACEBOOK_APP_ID = "660683246621860";

// Global flag to track if SDK is initialized
let isSDKInitialized = false;

export default function FacebookComments({
  href,
  width = "100%",
  numPosts = 10,
}: FacebookCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  const initializeComments = () => {
    if (containerRef.current && window.FB) {
      window.FB.XFBML.parse(containerRef.current);
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
    // Re-parse comments when href changes or if SDK is already loaded
    // Note: window.FB will be undefined initially - this is normal!
    // The SDK loads asynchronously via Script component
    if (isSDKLoaded && typeof window !== "undefined" && window.FB) {
      console.log("Re-parsing Facebook comments for href:", href);
      initializeComments();
    } else {
      console.log(
        "Facebook SDK not ready yet. isSDKLoaded:",
        isSDKLoaded,
        "window.FB:",
        typeof window !== "undefined" ? window.FB : "N/A"
      );
    }
  }, [href, isSDKLoaded]);
  return (
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={handleSDKLoad}
      />
      <div className="w-full">
        <div
          ref={containerRef}
          className="fb-comments"
          data-href={href}
          data-width={width}
          data-numposts={numPosts}
          data-colorscheme="light"
        />
      </div>
    </>
  );
}
