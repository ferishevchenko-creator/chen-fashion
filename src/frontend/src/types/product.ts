export type Category = "pria" | "wanita" | "anak";

export type SortOption = "terbaru" | "termurah" | "termahal";

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  pria: "Pria",
  wanita: "Wanita",
  anak: "Anak",
};

export const SORT_LABELS: Record<SortOption, string> = {
  terbaru: "Terbaru",
  termurah: "Harga Terendah",
  termahal: "Harga Tertinggi",
};
