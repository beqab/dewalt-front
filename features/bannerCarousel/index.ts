// Barrel export for bannerCarousel feature
export * from "./types";
export { default as BannerCarousel } from "./components/carousel";
export { getBannerCarousel } from "./server";

// Default export is the main component that fetches and renders
export { default } from "./components/carousel";
