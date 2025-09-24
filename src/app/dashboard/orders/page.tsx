"use client";

// pages/shopping.tsx (Main Shopping Page)
import { useState, useEffect } from "react";
import { Search, Plus, QrCode, Filter } from "lucide-react";
import { ShoppingItem } from "@/app/types";
import { ItemCard } from "@/app/components/ItemCars";
import { EditItemModal } from "@/app/components/EditItemModal";
import { QRScanner } from "@/app/components/QRScanner";
import DashboardLayout from "@/app/components/shared/DashboardLayout";

const ShoppingPage: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([
    {
      id: "1",
      name: "Rice",
      category: "Grocery",
      quantity: 2,
      unit: "kg",
      image: "/api/placeholder/60/60",
      notes: "Basmati rice",
    },
    {
      id: "2",
      name: "Chicken Breast",
      category: "Grocery",
      quantity: 1,
      unit: "kg",
      image: "/api/placeholder/60/60",
      notes: "Fresh chicken",
    },
    {
      id: "3",
      name: "Onions",
      category: "Grocery",
      quantity: 3,
      unit: "kg",
      image: "/api/placeholder/60/60",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewItemModal, setIsNewItemModal] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);

  const categories = [
    "All",
    "Grocery",
    "Household",
    "Personal Care",
    "Electronics",
    "Clothing",
  ];

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleEditItem = (item: ShoppingItem) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleSaveItem = (item: ShoppingItem) => {
    if (editingItem) {
      setItems(items.map((i) => (i.id === item.id ? item : i)));
    } else {
      setItems([...items, item]);
    }
    setEditingItem(null);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleAddNewItem = () => {
    setEditingItem(null);
    setIsNewItemModal(true);
    setIsEditModalOpen(true);
  };

  const handleQRScan = (data: string) => {
    // Handle scanned QR code data
    console.log("Scanned:", data);
    setIsQRScannerOpen(false);
    // You can add logic to add item based on QR code
  };

  const handleTabChange = (tab: string) => {
    console.log(`Switched to: ${tab}`);
  };
  return (
    <DashboardLayout activeTab="Dashboard" onTabChange={handleTabChange}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Shopping</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsQRScannerOpen(true)}
                className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg"
              >
                <QrCode size={20} />
              </button>
              <button
                onClick={handleAddNewItem}
                className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Available Items Section */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Available Items
              </h2>
              <p className="text-sm text-gray-500">{totalItems} items needed</p>
            </div>
            <button className="text-teal-600 hover:bg-teal-50 p-2 rounded-lg">
              <Filter size={20} />
            </button>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={handleEditItem}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-2">🛒</div>
              <p className="text-gray-500">No items found</p>
              <button
                onClick={handleAddNewItem}
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Add First Item
              </button>
            </div>
          )}
        </div>

        {/* Modals */}
        <EditItemModal
          item={editingItem}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setIsNewItemModal(false);
            setEditingItem(null);
          }}
          onSave={handleSaveItem}
          isNewItem={isNewItemModal}
        />

        <QRScanner
          isOpen={isQRScannerOpen}
          onClose={() => setIsQRScannerOpen(false)}
          onScan={handleQRScan}
        />
      </div>
    </DashboardLayout>
  );
};

export default ShoppingPage;
