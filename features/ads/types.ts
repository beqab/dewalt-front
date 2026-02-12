export enum AdPosition {
  MAIN_PAGE = "main_page",
  ASIDE = "aside",
  FOOTER = "footer",
}

export interface Ad {
  _id: string;
  imageUrl: string;
  urlLink?: string;
  position: AdPosition;
  createdAt: Date;
  updatedAt: Date;
}

export type AdsResponse = Ad[];
