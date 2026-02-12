export interface NewsApi {
  _id: string;
  imageUrl: string;
  title: string;
  summary: string;
  content: string;
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
