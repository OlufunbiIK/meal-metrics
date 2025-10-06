"use client";

import React, { useState, useRef } from "react";
import { ShoppingItem } from "../types";
import { X, Upload } from "lucide-react";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: ShoppingItem) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<ShoppingItem>>({
    name: "",
    category: "",
    quantity: 1,
    unit: "pcs",
    notes: "",
    image: "/api/placeholder/60/60",
    storage: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (formData.name) {
      const itemData: ShoppingItem = {
        id: Date.now().toString(),
        name: formData.name!,
        category: formData.category || "Uncategorized",
        quantity: formData.quantity || 1,
        unit: formData.unit || "pcs",
        notes: formData.notes || "",
        image: formData.image || "/api/placeholder/60/60",
        storage: formData.storage || "",
      };
      onSave(itemData);
      // Reset form after saving
      setFormData({
        name: "",
        category: "",
        quantity: 1,
        unit: "pcs",
        notes: "",
        image: "/api/placeholder/60/60",
        storage: "",
      });
      onClose();
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      name: "",
      category: "",
      quantity: 1,
      unit: "pcs",
      notes: "",
      image: "/api/placeholder/60/60",
      storage: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div className="relative w-full max-w-md">
        {/* Close Button - Outside Modal */}
        <button
          onClick={handleClose}
          className="absolute -top-16 right-0 md:right-0 text-white hover:text-gray-300 transition-colors bg-[#FFFFFF] bg-opacity-50 rounded-full p-2"
        >
          <X size={32} className="text-[#BABABA]" />
        </button>

        {/* Modal Content */}
        <div
          className="bg-white rounded-[40px] w-full max-h-[90vh] p-6 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-left p-6">
            <h2 className="text-[#333333] text-[20px] font-bold text-left">
              Add New Item
            </h2>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-[#474747] text-[14px] font-regular">
              Item image
            </p>
            <div className="flex justify-left mb-4">
              <div className="relative group">
                <img
                  src={formData.image}
                  alt="Item"
                  className="w-[120px] h-[95px] rounded-[5px] object-cover border-2 border-dashed border-[#008080]"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="absolute inset-0 bg-[#008080] bg-opacity-0 hover:bg-opacity-20 transition-all rounded-[5px] flex items-center justify-center"
                >
                  <Upload
                    size={24}
                    className="text-[#008080] opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
                <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
                  Click to upload
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-regular text-[#474747] mb-1">
                Item Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#D0D5DD] text-[#474747] text-[14px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter item name"
                required
              />
            </div>

            <div>
              <label className="block text-[14px] font-regular text-[#474747] mb-1">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#D0D5DD] text-[#474747] text-[14px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="e.g., Grocery, Dairy, Beverages"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] font-regular text-[#474747] mb-1">
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
                  className="w-full px-3 py-2 border border-[#D0D5DD] text-[#474747] text-[14px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-[14px] font-regular text-[#474747] mb-1">
                  Unit
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#D0D5DD] text-[#474747] text-[14px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              <label className="block text-[14px] font-regular text-[#474747] mb-1">
                Storage Location
              </label>
              <select
                value={formData.storage}
                onChange={(e) =>
                  setFormData({ ...formData, storage: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#D0D5DD] text-[#474747] text-[14px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select storage location</option>
                <option value="Refrigerator">Refrigerator</option>
                <option value="Freezer">Freezer</option>
                <option value="Pantry">Pantry</option>
                <option value="Cabinet">Cabinet</option>
                <option value="Shelf">Shelf</option>
                <option value="Counter">Counter</option>
                <option value="Storage Room">Storage Room</option>
              </select>
            </div>

            <div>
              <label className="block text-[14px] font-regular text-[#474747] mb-1">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#D0D5DD] text-[#474747] text-[14px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                placeholder="Add any additional notes..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3 p-6">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-4 border-[0.6px] border-[#DDDDDD] rounded-[10px] text-[#CBCBCB] hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!formData.name}
              className="flex-1 px-4 py-4 bg-[#008080] rounded-[10px] text-[#FFFFFF] hover:bg-teal-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
