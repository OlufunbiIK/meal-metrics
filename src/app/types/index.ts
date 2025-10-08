export interface ShoppingItem {
  id: string;
  name: string;
  image: string;
  category: string;
  quantity: number;
  unit: string;
  price?: number;
  notes?: string;
  storage?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

// Types
export interface FilterOptions<T extends string = string> {
  categories: string[];
  priceRange: { min: number; max: number };
  sortBy: T;
  sortOrder: "asc" | "desc";
}

// Types
export type MealCategory =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "snacks"
  | "appetizers"
  | "mainCourse"
  | "desserts";

export interface MealItem {
  id: number;
  name: string;
  calories: number;
  time: string;
  eaten: boolean;
  image: string;
}
