import React from "react";
import { ShoppingItem } from "../types";
import { Edit2 } from "lucide-react";
import { LiaStoreSolid } from "react-icons/lia";
import { FiBox } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ItemCardProps {
  item: ShoppingItem;
  onEdit: (item: ShoppingItem) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onDelete: (item: ShoppingItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onEdit,
  onUpdateQuantity,
  onDelete,
}) => {
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(0, item.quantity + delta);
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="bg-white rounded-lg border max-w-xl mx-auto border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-[142px] h-[112px] rounded-lg object-cover flex-shrink-0"
        />

        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 text-[16px]">
              {item.name}
            </h3>
          </div>

          <div className="flex flex-row items-center gap-2">
            <FiBox className="text-[#343434]" size={14} />
            <p className="text-[#333333] text-[14px]">Quantity:</p>
            <span className="text-[14px] text-[#333333] font-bold">
              {item.quantity}
            </span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <LiaStoreSolid className="text-[#343434]" size={14} />
            <p className="text-[#333333] text-[14px]">Storage:</p>
            <span className="text-[#333333] text-[14px] font-bold">
              {item.storage}
            </span>
          </div>
        </div>

        <div className="flex md:flex-col flex-row gap-2 md:gap-3 md:pl-4 md:ml-4 md:border-l border-t md:border-t-0 border-[#E0E0E0] pt-3 md:pt-0 w-full md:w-auto md:h-[112px] justify-center md:justify-between">
          <button
            onClick={() => onEdit(item)}
            className="p-2.5 text-[#008080] hover:bg-teal-50 rounded-lg transition-colors flex-1 md:flex-initial"
            aria-label="Edit item"
          >
            <Edit2 size={18} className="mx-auto" />
          </button>

          <button
            onClick={() => onDelete(item)}
            className="p-2.5 text-[#E53E3E] hover:bg-red-50 rounded-lg transition-colors flex-1 md:flex-initial"
            aria-label="Delete item"
          >
            <RiDeleteBin6Line size={18} className="mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};
