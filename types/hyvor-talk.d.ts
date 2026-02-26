import type * as React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "hyvor-talk-comments": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "website-id"?: string;
        "page-id"?: string;
        "page-language"?: string;
      };
    }
  }
}

export {};

