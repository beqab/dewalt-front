"use client";

import Script from "next/script";
import { createElement } from "react";
import type { HTMLAttributes } from "react";

interface HyvorTalkProps {
  href: string; // Unique identifier (URL or stable ID) for this page
  pageLanguage?: string;
}

const HYVOR_TALK_WEBSITE_ID = process.env.NEXT_PUBLIC_HYVOR_TALK_WEBSITE_ID;

export default function HyvorTalk({ href, pageLanguage }: HyvorTalkProps) {
  const websiteId = HYVOR_TALK_WEBSITE_ID;
  if (!websiteId) return null;

  return (
    <>
      <Script
        src="https://talk.hyvor.com/embed/embed.js"
        type="module"
        strategy="afterInteractive"
      />
      <div className="w-full">
        {createElement("hyvor-talk-comments", {
          "website-id": websiteId,
          "page-id": href,
          ...(pageLanguage ? { "page-language": pageLanguage } : {}),
        } as unknown as HTMLAttributes<HTMLElement>)}
      </div>
    </>
  );
}
