export type MenuData = {
  name: string;
  categories: {
    name: string;
    nameEn: string;
    subCategories: {
      name: string;
      nameEn: string;
      slug: string;
      items: never[];
    }[];
  }[];
};
