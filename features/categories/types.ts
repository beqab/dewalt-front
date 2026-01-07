export interface Brand {
  id: string;
  name: string;
  slug: string;
  categories: MenuCategory[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subCategories: MenuSubCategory[];
}

export interface ChildCategory {
  id: string;
  name: string;
  slug: string;
}

// Menu types for header navigation (returned by /categories/menu)
export interface MenuSubCategory {
  id: string;
  name: string;
  slug: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  subCategories: MenuSubCategory[];
}

export interface MenuBrand {
  id: string;
  name: string;
  slug: string;
  categories: MenuCategory[];
}
