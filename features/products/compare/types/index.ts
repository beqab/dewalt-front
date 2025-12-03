import type { Product } from "../../types";

export interface CompareProduct extends Product {
  // Additional compare-specific fields can be added here
}

export interface ProductSpec {
  label: string;
  value: string | number;
  unit?: string;
}

export interface CompareProductWithSpecs extends CompareProduct {
  specs: ProductSpec[];
}

