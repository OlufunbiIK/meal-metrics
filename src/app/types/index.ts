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
