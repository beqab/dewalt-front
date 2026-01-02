import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "www.dewaltgeorgia.com",
      "mgxuc2sd6bc4ygmd.public.blob.vercel-storage.com",
    ],
  },
  /* config options here */
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
