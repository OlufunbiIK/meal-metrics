// components/ItemCard.tsx
import React from "react";
import { ShoppingItem } from "../types";
import { Edit2, Plus, Minus } from "lucide-react";

interface ItemCardProps {
  item: ShoppingItem;
  onEdit: (item: ShoppingItem) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onEdit,
  onUpdateQuantity,
}) => {
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(0, item.quantity + delta);
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3">
        <img
          src={item.image}
          alt={item.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.category}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="p-1 rounded-full hover:bg-gray-100"
            disabled={item.quantity === 0}
          >
            <Minus size={16} className="text-gray-600" />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Plus size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() => onEdit(item)}
            className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg"
          >
            <Edit2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
