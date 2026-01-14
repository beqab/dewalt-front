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
    // SDK loaded, initialize Facebook (only once globally)
    if (typeof window !== "undefined" && window.FB && !isSDKInitialized) {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        xfbml: true,
        version: "v21.0",
      });
      isSDKInitialized = true;
    }

    setIsSDKLoaded(true);

    // Parse comments after a short delay to ensure DOM is ready
    setTimeout(() => {
      initializeComments();
    }, 100);
  };

  useEffect(() => {
    // Re-parse comments when href changes or if SDK is already loaded
    if (isSDKLoaded && window.FB) {
      initializeComments();
    }
  }, [href, isSDKLoaded]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(window.FB, "window.FB");
    }
  }, []);
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
