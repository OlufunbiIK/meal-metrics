import { Delete, Edit, X } from "lucide-react";
import { useState } from "react";

interface InventoryItem {
  id?: string;
  name: string;
  status: string;
  storage: string;
  quantity: number;
  lastUpdated: string;
  image: React.ReactNode | string;
  // Additional fields for detailed view
  mfgDate?: string;
  bestBefore?: string;
  temperature?: string;
  purchaseDate?: string;
  cost?: string;
  supplierName?: string;
  supplierEmail?: string;
  supplierPhone?: string;
  supplierAddress?: string;
}

// Details Modal Component
export const DetailsModal: React.FC<{
  item: InventoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEditItem: (item: InventoryItem) => void;
  onDeleteItem: (item: InventoryItem) => void;
}> = ({ item, isOpen, onClose, onEditItem, onDeleteItem }) => {
  if (!isOpen || !item) return null;

  const [isSupplierDropDown, setIsSupplierDropDown] = useState(true);
  const [isProductDropDown, setIsProductDropDown] = useState(true);

  function handleSupplierDropdown() {
    setIsSupplierDropDown((prev) => !prev);
  }

  function handleProductDropdown() {
    setIsProductDropDown((prev) => !prev);
  }

  const handleEdit = () => {
    onEditItem(item);
  };

  const handleDelete = () => {
    onDeleteItem(item);
  };

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-6">
            <h2 className="text-[20px] font-semibold text-[#333333]">
              {item?.name} Details
            </h2>
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-gray-100 absolute -left-20 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-8 h-8 text-[#BABABA] font-regular" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex flex-col gap-4 overflow-y-auto p-6">
            {/* Status and Quantity */}
            <div className="mb-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-[#333333] font-medium text-[16px]">
                    Status:
                  </span>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      item.status === "Good"
                        ? "bg-green-100 text-green-800"
                        : item.status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-800"
                        : item.status === "Out of Stock"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <span className="text-[#333333] font-medium text-[16px]">
                    Quantity:
                  </span>
                  <span className="text-[#333333] font-medium text-[16px]">
                    {item.quantity}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              {/* Supplier Information */}
              <div className="mb-8 border border-[#EEEEEE] rounded-lg p-4 bg-white">
                <h3 className="flex justify-between items-center text-sm font-semibold text-gray-900 mb-4">
                  Supplier Information
                  <button onClick={handleSupplierDropdown}>
                    {isSupplierDropDown ? (
                      <img src="/images/dropdown2.svg" alt="" className="" />
                    ) : (
                      <img src="/images/dropdown1.svg" alt="" className="" />
                    )}
                  </button>
                </h3>
                {isSupplierDropDown && (
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-medium text-gray-600 min-w-[60px]">
                        Name:
                      </span>
                      <p className="text-sm text-gray-900 flex-1">
                        {item.supplierName || "Best Foods Supplier Co."}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-medium text-gray-600 min-w-[60px]">
                        Email:
                      </span>
                      <p className="text-sm text-gray-900 flex-1">
                        {item.supplierEmail || "supplier@bestfoods.com"}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-medium text-gray-600 min-w-[60px]">
                        Phone:
                      </span>
                      <p className="text-sm text-gray-900 flex-1">
                        {item.supplierPhone || "+234 800 1234 5678"}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-medium text-gray-600 min-w-[60px]">
                        Address:
                      </span>
                      <p className="text-sm text-gray-900 flex-1">
                        {item.supplierAddress ||
                          "23 Food Street, Lagos, Nigeria"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Information */}
              <div className="mb-8 border border-[#EEEEEE] rounded-lg p-4 bg-white">
                <h3 className="flex justify-between items-center text-sm font-semibold text-gray-900 mb-4">
                  Product Information
                  <button onClick={handleProductDropdown}>
                    {isProductDropDown ? (
                      <img src="/images/dropdown2.svg" alt="" className="" />
                    ) : (
                      <img src="/images/dropdown1.svg" alt="" className="" />
                    )}
                  </button>
                </h3>
                {isProductDropDown && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        Manufacturing Date:
                      </span>
                      <span className="text-sm text-gray-900">
                        {item.mfgDate || "July 1, 2024"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        Best Before:
                      </span>
                      <span className="text-sm text-gray-900">
                        {item.bestBefore || "September 31, 2024"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        Storage Temperature:
                      </span>
                      <span className="text-sm text-gray-900 text-right max-w-[200px]">
                        {item.temperature ||
                          "Store in a cool, dry place (15-25°C)"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        Purchase Date:
                      </span>
                      <span className="text-sm text-gray-900">
                        {item.purchaseDate || "July 1, 2024"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        Cost:
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {item.cost || `${item.quantity} kg for ₦200,000`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        Storage Location:
                      </span>
                      <span className="text-sm text-gray-900">
                        {item.storage}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Last Updated */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Last Updated:
                </span>
                <span className="text-sm text-gray-500">
                  {item.lastUpdated}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-10 pt-4">
              <button
                onClick={handleDelete}
                className="flex justify-center cursor-pointer gap-2 py-3 px-4 rounded-[10px] border-[0.6px] border-[#DDDDDD] bg-white text-[#CBCBCB] hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
              >
                <Delete className="text-[#CBCBCB] hover:text-red-600" />
                Delete
              </button>
              <button
                onClick={handleEdit}
                className="flex justify-center gap-2 py-3 px-4 cursor-pointer rounded-[10px] border-[0.6px] border-[#DDDDDD] bg-[#008080] text-white hover:bg-[#006666] transition-colors"
              >
                <Edit className="text-white" />
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
