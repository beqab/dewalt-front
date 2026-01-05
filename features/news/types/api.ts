export interface LocalizedText {
  ka: string;
  en: string;
}

export interface NewsApi {
  _id: string;
  imageUrl: string;
  title: LocalizedText;
  summary: LocalizedText;
  content: LocalizedText;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedNewsResponse {
  data: NewsApi[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

