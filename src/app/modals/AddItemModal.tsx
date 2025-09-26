import { Calendar, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

// Define the shape of your form data
interface FormData {
  itemName: string;
  category: string;
  quantity: string;
  status: string;
  storageLocation: string;
  supplierName: string;
  supplierEmail: string;
  supplierPhone: string;
  supplierAddress: string;
  purchaseDate: string;
  quantityPurchased: string;
  cost: string;
  mfdDate: string;
  bestBefore: string;
}

// Props for the modal
interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (formData: FormData) => void;

  onEdit?: (formData: FormData) => void;
  initialData?: FormData;
  mode?: "add" | "edit";
}

export const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  onEdit,
  initialData,
  mode = "add",
}) => {
  const [formData, setFormData] = useState<FormData>({
    itemName: "",
    category: "",
    quantity: "",
    status: "",
    storageLocation: "",
    supplierName: "",
    supplierEmail: "",
    supplierPhone: "",
    supplierAddress: "",
    purchaseDate: "",
    quantityPurchased: "",
    cost: "",
    mfdDate: "",
    bestBefore: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleSubmit = () => {
    if (validateForm()) {
      if (mode === "add" && onAdd) onAdd(formData);
      if (mode === "edit" && onEdit) onEdit(formData);

      handleReset();
      onClose();
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.itemName.trim()) newErrors.itemName = "Item name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.quantity.trim()) newErrors.quantity = "Quantity is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.storageLocation)
      newErrors.storageLocation = "Storage location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setFormData({
      itemName: "",
      category: "",
      quantity: "",
      status: "",
      storageLocation: "",
      supplierName: "",
      supplierEmail: "",
      supplierPhone: "",
      supplierAddress: "",
      purchaseDate: "",
      quantityPurchased: "",
      cost: "",
      mfdDate: "",
      bestBefore: "",
    });
    setErrors({});
  };

  const handleDelete = () => {
    handleReset();
  };

  // Don't render anything if modal is not open
  if (!isOpen) return null;

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
          } flex flex-col`}
        >
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-6">
            <h2 className="text-[20px] font-semibold text-[#333333]">
              Add Items
            </h2>
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-gray-100 absolute -left-20 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-8 h-8 text-[#BABABA] font-regular" />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 mx-6 rounded-lg">
            {/* Item Information */}
            <div className="space-y-4 bg-[#F2F2F2] rounded-[20px] p-8">
              <h3 className="text-sm font-medium text-gray-900">
                Item Information
              </h3>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">Item Name</label>
                <input
                  type="text"
                  value={formData.itemName}
                  onChange={(e) =>
                    handleInputChange("itemName", e.target.value)
                  }
                  className={`w-full px-3 py-2 text-black border bg-white rounded-[10px] focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${
                    errors.itemName ? "border-red-300" : "border-[#D0D5DD]"
                  }`}
                  placeholder="Enter item name"
                />
                {errors.itemName && (
                  <p className="text-xs text-red-500">{errors.itemName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className={`w-full px-3 py-2 border bg-white text-black rounded-[10px] focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${
                    errors.category ? "border-red-300" : "border-[#D0D5DD]"
                  }`}
                >
                  <option value="">Select category</option>
                  <option value="food">Food</option>
                  <option value="beverages">Beverages</option>
                  <option value="spices">Spices</option>
                  <option value="dairy">Dairy</option>
                  <option value="meat">Meat</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="grains">Grains</option>
                </select>
                {errors.category && (
                  <p className="text-xs text-red-500">{errors.category}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">Quantity</label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) =>
                    handleInputChange("quantity", e.target.value)
                  }
                  className={`w-full px-3 py-2 border bg-white text-black rounded-[10px] focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${
                    errors.quantity ? "border-red-300" : "border-[#D0D5DD]"
                  }`}
                  placeholder="e.g., 10 kg, 5 liters"
                />
                {errors.quantity && (
                  <p className="text-xs text-red-500">{errors.quantity}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className={`w-full px-3 py-2 border bg-white rounded-[10px] text-black focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${
                    errors.status ? "border-red-300" : "border-[#D0D5DD]"
                  }`}
                >
                  <option value="">Select status</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                  <option value="expired">Expired</option>
                </select>
                {errors.status && (
                  <p className="text-xs text-red-500">{errors.status}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">
                  Storage Location
                </label>
                <select
                  value={formData.storageLocation}
                  onChange={(e) =>
                    handleInputChange("storageLocation", e.target.value)
                  }
                  className={`w-full px-3 py-2 border bg-white text-black rounded-[10px] focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none ${
                    errors.storageLocation
                      ? "border-red-300"
                      : "border-[#D0D5DD]"
                  }`}
                >
                  <option value="">Select storage location</option>
                  <option value="freezer">Freezer</option>
                  <option value="refrigerator">Refrigerator</option>
                  <option value="pantry">Pantry</option>
                  <option value="dry-storage">Dry Storage</option>
                  <option value="cold-storage">Cold Storage</option>
                </select>
                {errors.storageLocation && (
                  <p className="text-xs text-red-500">
                    {errors.storageLocation}
                  </p>
                )}
              </div>
            </div>

            {/* Supplier Information */}
            <div className="space-y-4 bg-[#F2F2F2] rounded-[20px] p-8">
              <h3 className="text-sm font-medium text-gray-900">
                Supplier Information
              </h3>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">
                  Supplier Name
                </label>
                <input
                  type="text"
                  value={formData.supplierName}
                  onChange={(e) =>
                    handleInputChange("supplierName", e.target.value)
                  }
                  className="w-full px-3 py-2 border text-black bg-white border-[#D0D5DD] rounded-[10px] focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="Enter supplier name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">
                  Supplier Email
                </label>
                <input
                  type="email"
                  value={formData.supplierEmail}
                  onChange={(e) =>
                    handleInputChange("supplierEmail", e.target.value)
                  }
                  className="w-full px-3 py-2 border bg-white text-black border-[#D0D5DD] rounded-[10px] focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="Enter supplier email"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">
                  Supplier Phone
                </label>
                <input
                  type="tel"
                  value={formData.supplierPhone}
                  onChange={(e) =>
                    handleInputChange("supplierPhone", e.target.value)
                  }
                  className="w-full px-3 py-2 border bg-white text-black border-[#D0D5DD] rounded-[10px] focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="Enter supplier phone"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">
                  Supplier Address
                </label>
                <input
                  type="text"
                  value={formData.supplierAddress}
                  onChange={(e) =>
                    handleInputChange("supplierAddress", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-[#D0D5DD] bg-white rounded-[10px] focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="Enter supplier address"
                />
              </div>
            </div>

            {/* Purchase Information */}
            <div className="space-y-4 bg-[#F2F2F2] rounded-[20px] p-8">
              <h3 className="text-sm font-medium text-gray-900">
                Purchase Information
              </h3>

              <div className="space-y-2 flex flex-row items-center gap-2">
                <label className="block text-sm text-gray-700">
                  Purchase Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) =>
                      handleInputChange("purchaseDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border text-black border-[#D0D5DD] bg-white rounded-[10px] focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  />
                  {/* <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /> */}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">
                  Quantity Purchased
                </label>
                <input
                  type="text"
                  value={formData.quantityPurchased}
                  onChange={(e) =>
                    handleInputChange("quantityPurchased", e.target.value)
                  }
                  className="w-full px-3 py-2 border text-black border-[#D0D5DD] bg-white rounded-[10px] focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="Enter quantity purchased"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">Cost</label>
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => handleInputChange("cost", e.target.value)}
                  className="w-full px-3 py-2 border text-black border-[#D0D5DD] bg-white rounded-[10px] focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  placeholder="Enter cost"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">Mfd Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.mfdDate}
                    onChange={(e) =>
                      handleInputChange("mfdDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border text-black border-[#D0D5DD] bg-white rounded-[10px] focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  />
                  {/* <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /> */}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">
                  Best Before
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.bestBefore}
                    onChange={(e) =>
                      handleInputChange("bestBefore", e.target.value)
                    }
                    className="w-full px-3 py-2 border text-black border-[#D0D5DD] bg-white rounded-[10px] focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                  />
                  {/* <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /> */}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 p-4 flex items-center justify-between">
            <button
              onClick={handleDelete}
              className="flex items-center justify-center sm:justify-start space-x-2 rounded-lg border-[0.8px] border-[#DDDDDD] px-3 py-2 text-[#CBCBCB] hover:text-[#c0bdbd] font-medium transition-colors"
            >
              <img
                src="/images/material-symbols-light_delete-outline.png"
                alt="delete"
                className="h-4 w-4"
              />
              Delete
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center sm:justify-start space-x-2 text-white hover:text-gray-700 bg-[#008080] rounded border-[0.8px] border-[#DBDFE4] hover:bg-gray-100 px-3 py-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm">
                {mode === "add" ? "Add Item" : "Save Changes"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
