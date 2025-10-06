"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ShoppingItem } from "@/app/types";

interface ShoppingContextType {
  items: ShoppingItem[];
  setItems: (items: ShoppingItem[]) => void;
  addItem: (item: ShoppingItem) => void;
  updateItem: (item: ShoppingItem) => void;
  deleteItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(
  undefined
);

export const ShoppingProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ShoppingItem[]>([
    {
      id: "1",
      name: "Rice",
      category: "Grocery",
      quantity: 2,
      unit: "kg",
      image: "/images/image1.png",
      notes: "Basmati rice",
      storage: "Pantry",
    },
    {
      id: "2",
      name: "Chicken Breast",
      category: "Grocery",
      quantity: 1,
      unit: "kg",
      image: "/images/image2.png",
      notes: "Fresh chicken",
      storage: "Freezer",
    },
    {
      id: "3",
      name: "Onions",
      category: "Grocery",
      quantity: 3,
      unit: "kg",
      image: "/images/image3.png",
      storage: "Pantry",
    },
  ]);

  const addItem = (item: ShoppingItem) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const updateItem = (updatedItem: ShoppingItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <ShoppingContext.Provider
      value={{
        items,
        setItems,
        addItem,
        updateItem,
        deleteItem,
        updateQuantity,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

// Custom hook to use the shopping context
export const useShopping = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error("useShopping must be used within ShoppingProvider");
  }
  return context;
};
