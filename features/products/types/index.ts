export interface ProductSpec {
  label: string;
  value: string | number;
  unit?: string;
}
export interface Product {
  id: number;
  image: string;
  name: string;
  code: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  inStock?: boolean;
  rating: number;
  reviewCount: number;
  category: string;
  brand: string;
  _id: string;
  specs: ProductSpec[];
}
