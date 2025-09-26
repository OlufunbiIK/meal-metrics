// components/QRCodeDisplay.tsx (For the QR Code display page)

"use clients";
import React from "react";
import { ShoppingItem } from "@/app/types";
import { EditItemModal } from "@/app/modals/EditItemModal";
import { QRScanner } from "@/app/components/QRScanner";
import { ItemCard } from "@/app/components/ItemCars";
import DashboardLayout from "@/app/layout/DashboardLayout";

interface QRCodeDisplayProps {
  isOpen: boolean;
  onClose: () => void;
  itemData?: any;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  isOpen,
  onClose,
  itemData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="min-h-screen flex flex-col">
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Scan Item</h1>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-64 h-64 mx-auto mb-6 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
              {/* QR Code placeholder - in real app, use a QR code library */}
              <div className="w-48 h-48 bg-black grid grid-cols-8 gap-1 p-2">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${
                      Math.random() > 0.5 ? "bg-white" : "bg-black"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Scan the above QR code to access the availability and authentic
              verification of this particular item.
            </p>
            <button
              onClick={onClose}
              className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700"
            >
              Scan Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
