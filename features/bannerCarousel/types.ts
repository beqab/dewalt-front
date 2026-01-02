export interface BannerCarouselResponse {
  banners: {
    _id: string;
    title: {
      ka: string;
      en: string;
    };
    description: {
      ka: string;
      en: string;
    };
    imageUrl: string;
    buttonLink?: string;
  }[];
}
