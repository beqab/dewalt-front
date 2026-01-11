import { Product } from ".";

export interface PaginatedProductsResponse {
  data: Product[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
