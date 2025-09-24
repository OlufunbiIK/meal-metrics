"use client";

// components/EditItemModal.tsx
import React, { useState, useEffect } from "react";
import { ShoppingItem } from "../types";
import { X, Upload } from "lucide-react";

interface EditItemModalProps {
  item: ShoppingItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: ShoppingItem) => void;
  isNewItem?: boolean;
}

export const EditItemModal: React.FC<EditItemModalProps> = ({
  item,
  isOpen,
  onClose,
  onSave,
  isNewItem = false,
}) => {
  const [formData, setFormData] = useState<Partial<ShoppingItem>>({
    name: "",
    category: "",
    quantity: 1,
    unit: "pcs",
    notes: "",
    image: "/api/placeholder/60/60",
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else if (isNewItem) {
      setFormData({
        name: "",
        category: "",
        quantity: 1,
        unit: "pcs",
        notes: "",
        image: "/api/placeholder/60/60",
      });
    }
  }, [item, isNewItem]);

  const handleSave = () => {
    if (formData.name && formData.category) {
      const itemData: ShoppingItem = {
        id: item?.id || Date.now().toString(),
        name: formData.name!,
        category: formData.category!,
        quantity: formData.quantity || 1,
        unit: formData.unit || "pcs",
        notes: formData.notes || "",
        image: formData.image || "/api/placeholder/60/60",
      };
      onSave(itemData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">
            {isNewItem ? "Add New Item" : "Edit Item"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src={formData.image}
                alt="Item"
                className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200"
              />
              <button className="absolute -bottom-2 -right-2 bg-teal-600 text-white rounded-full p-1">
                <Upload size={16} />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter item name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select category</option>
              <option value="Grocery">Grocery</option>
              <option value="Household">Household</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="pcs">Pieces</option>
                <option value="kg">Kilograms</option>
                <option value="g">Grams</option>
                <option value="l">Liters</option>
                <option value="ml">Milliliters</option>
                <option value="dozen">Dozen</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={2}
              placeholder="Optional notes"
            />
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
