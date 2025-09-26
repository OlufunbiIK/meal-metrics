"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Package,
  Filter,
  ChevronDown,
  Edit,
  MoreHorizontal,
  Search,
  Plus,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/layout/DashboardLayout";
import { inventoryItems } from "../../data/AllMeals";
import { AddItemModal } from "@/app/modals/AddItemModal";
import { Pagination } from "@/app/components/Pagination";
import { DetailsModal } from "@/app/modals/DetailsModal";

// Define the shape of an inventory item
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
  quantityPurchased?: string;
}

interface Filters {
  status: string[];
  storage: string[];
  category: string[];
}

// Confirmation Modal Component
const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>(
    inventoryItems.map((item, index) => ({ ...item, id: index.toString() }))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    status: [],
    storage: [],
    category: [],
  });
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const [entriesPerPage, setEntriesPerPage] = React.useState(10);
  const totalEntries = 32;

  const router = useRouter();

  const [viewMore, setViewMore] = useState<number | null>(null);

  function handleViewMore(index: number) {
    setViewMore(viewMore === index ? null : index);
  }

  const handleDeleteItem = (item: InventoryItem) => {
    setSelectedItem(item); // Make sure this is set BEFORE opening the modal
    setIsDeleteModalOpen(true);
    setIsDetailsModalOpen(false); // Close details modal if open
    setViewMore(null);
  };

  const confirmDelete = () => {
    if (selectedItem) {
      setItems(items.filter((item) => item.id !== selectedItem.id));
      setIsDeleteModalOpen(false);
      setSelectedItem(null);
    }
  };

  // Handle edit item
  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDetailsModalOpen(false);
    setIsEditModalOpen(true);
    setViewMore(null);
  };

  // Handle view details
  const handleViewDetails = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDetailsModalOpen(true);
    setViewMore(null);
  };

  const handleSaveEdit = (updatedForm: FormData) => {
    if (!selectedItem) return;

    setItems((prev) =>
      prev.map((it) =>
        it.id === selectedItem.id
          ? {
              ...it,
              ...updatedForm,
              quantity: parseInt(updatedForm.quantity) || 0,
              lastUpdated: new Date().toLocaleDateString(),
            }
          : it
      )
    );
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target as HTMLElement).closest(".dropdown-container")) {
        setViewMore(null);
      }
    }

    if (viewMore !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [viewMore]);

  // Extract unique values for filter options
  const filterOptions = useMemo(() => {
    const statuses = [...new Set(items.map((item) => item.status))];
    const storageLocations = [...new Set(items.map((item) => item.storage))];
    const categories = [
      ...new Set(
        items.map((item) => {
          const name = item.name.toLowerCase();
          if (
            name.includes("rice") ||
            name.includes("pasta") ||
            name.includes("bread")
          )
            return "Grains";
          if (
            name.includes("chicken") ||
            name.includes("beef") ||
            name.includes("fish")
          )
            return "Protein";
          if (
            name.includes("tomato") ||
            name.includes("onion") ||
            name.includes("carrot")
          )
            return "Vegetables";
          if (
            name.includes("apple") ||
            name.includes("banana") ||
            name.includes("orange")
          )
            return "Fruits";
          return "Other";
        })
      ),
    ];

    return { statuses, storageLocations, categories };
  }, [items]);

  // Filter logic
  const filteredItems = useMemo(() => {
    return items.filter((item: InventoryItem) => {
      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.storage.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.quantity.toString().includes(searchQuery);

      const matchesStatus =
        selectedFilters.status.length === 0 ||
        selectedFilters.status.includes(item.status);

      const matchesStorage =
        selectedFilters.storage.length === 0 ||
        selectedFilters.storage.includes(item.storage);

      const itemCategory =
        item.name.toLowerCase().includes("rice") ||
        item.name.toLowerCase().includes("pasta") ||
        item.name.toLowerCase().includes("bread")
          ? "Grains"
          : item.name.toLowerCase().includes("chicken") ||
            item.name.toLowerCase().includes("beef") ||
            item.name.toLowerCase().includes("fish")
          ? "Protein"
          : item.name.toLowerCase().includes("tomato") ||
            item.name.toLowerCase().includes("onion") ||
            item.name.toLowerCase().includes("carrot")
          ? "Vegetables"
          : item.name.toLowerCase().includes("apple") ||
            item.name.toLowerCase().includes("banana") ||
            item.name.toLowerCase().includes("orange")
          ? "Fruits"
          : "Other";

      const matchesCategory =
        selectedFilters.category.length === 0 ||
        selectedFilters.category.includes(itemCategory);

      return (
        matchesSearch && matchesStatus && matchesStorage && matchesCategory
      );
    });
  }, [searchQuery, selectedFilters, items]);

  // Pagination logic
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[filterType];
      const updatedFilters = currentFilters.includes(value)
        ? currentFilters.filter((item) => item !== value)
        : [...currentFilters, value];

      return { ...prev, [filterType]: updatedFilters };
    });
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedFilters({ status: [], storage: [], category: [] });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const getActiveFilterCount = () =>
    selectedFilters.status.length +
    selectedFilters.storage.length +
    selectedFilters.category.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good":
        return "bg-[#E1FCDA] text-[#217A09]";
      case "Low Stock":
        return "bg-[#E3CF1A1A] text-[#958600]";
      case "Out of Stock":
        return "bg-[#FEECDD] text-[#B15306]";
      case "Expired":
        return "bg-[#FED9D9] text-[#A20404]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryEmoji = (category: string): string => {
    switch (category.toLowerCase()) {
      case "food":
      case "grains":
        return "🌾";
      case "beverages":
        return "🥤";
      case "spices":
        return "🌶️";
      case "dairy":
        return "🥛";
      case "meat":
        return "🥩";
      case "vegetables":
        return "🥬";
      case "fruits":
        return "🍎";
      default:
        return "📦";
    }
  };

  const handleTabChange = (tab: string) => {
    console.log(`Switched to: ${tab}`);
  };

  return (
    <DashboardLayout activeTab="Dashboard" onTabChange={handleTabChange}>
      <div className="space-y-4 sm:space-y-6 lg:space-y-6 bg-[#f8f8f8]">
        {/* Top Section with Stats */}
        <div className="grid grid-cols-1 gap-2 sm:gap-6">
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2 lg:gap-3 h-full">
              {/* Stats Cards - with consistent image sizing */}
              <div className="bg-white rounded-4xl p-2 sm:p-3 lg:p-4">
                <div className="flex items-center gap-4 mb-3 sm:mb-4">
                  <div className="rounded-[14px] p-4 bg-[#4FBFA314]">
                    <img
                      src="../../images/bxs_box.svg"
                      className="h-6 w-6 sm:h-7 sm:w-7 text-[#4FBFA3]"
                      alt="item 1"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">
                    Inventory status
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="pr-2 sm:pr-4">
                    <div className="text-xs text-gray-500 mb-1">
                      Total Items in stock
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#333333]">
                      {items.length}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-4xl p-2 sm:p-3 lg:p-4">
                <div className="flex items-center gap-4 mb-3 sm:mb-4">
                  <div className="rounded-[14px] p-4 bg-[#D7650712]">
                    <img src="/images/Group.png" className="" alt="item 2" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">
                    Pending Orders
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="pr-2 sm:pr-4">
                    <div className="text-xs text-gray-500 mb-1">
                      Number of items that are running low
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#333333]">
                      {
                        items.filter((item) => item.status === "Low Stock")
                          .length
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-4xl p-2 sm:p-3 lg:p-4">
                <div className="flex items-center gap-4 mb-3 sm:mb-4">
                  <div className="rounded-[14px] p-4 bg-[#FED9D966]">
                    <img
                      src="/images/pajamas_expire.png"
                      className=""
                      alt="item 3"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">
                    Today's Meal
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="pr-2 sm:pr-4">
                    <div className="text-xs text-gray-500 mb-1">
                      Count of items currently out of stock
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#333333]">
                      {
                        items.filter((item) => item.status === "Out of Stock")
                          .length
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-4xl p-2 sm:p-3 lg:p-4">
                <div className="flex items-center gap-4 mb-3 sm:mb-4">
                  <div className="rounded-[14px] p-4 bg-[#F2F1F1]">
                    <img
                      src="/images/game-icons_cook.png"
                      className=""
                      alt="item 4"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">
                    Active Staff
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full sm:gap-4">
                  <div className="pr-2 sm:pr-4">
                    <div className="text-xs text-gray-500 mb-1">
                      Expired Items
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#333333]">
                      {items.filter((item) => item.status === "Expired").length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Overview Section */}
        <div className="bg-white rounded-lg px-2 lg:px-4 border-white border-[0.8px]">
          <div className="p-2 sm:py-4 sm:px-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between md:flex-col md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between gap-2">
              <h2 className="text-lg font-semibold whitespace-nowrap text-[#333333]">
                Inventory Overview
                {(searchQuery || getActiveFilterCount() > 0) &&
                  filteredItems.length > 0 && (
                    <> ({filteredItems.length} items)</>
                  )}
              </h2>

              <div className="flex flex-row gap-4 items-center">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full sm:w-64 lg:w-64 xl:w-96 pl-10 pr-4 py-3 bg-white border-[#DDDDDD] border-1 rounded-full text-[#333333] text-[12px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                {/* Filter Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className="flex items-center justify-center sm:justify-start space-x-2 text-gray-500 hover:text-gray-700 bg-white rounded border-[0.8px] border-[#DBDFE4] hover:bg-gray-100 px-3 py-2 transition-colors"
                  >
                    <Filter className="h-4 w-4" />
                    <span className="text-sm">Filter</span>
                    {getActiveFilterCount() > 0 && (
                      <span className="bg-teal-500 text-white text-xs rounded-full px-2 py-1 ml-1">
                        {getActiveFilterCount()}
                      </span>
                    )}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Filter Dropdown Content */}
                  {showFilterDropdown && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-800">Filters</h3>
                        <button
                          onClick={() => setShowFilterDropdown(false)}
                          className="text-gray-400 cursor-pointer hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Status Filter */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2">
                          Status
                        </h4>
                        <div className="space-y-2">
                          {filterOptions.statuses.map((status) => (
                            <label key={status} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedFilters.status.includes(
                                  status
                                )}
                                onChange={() =>
                                  handleFilterChange("status", status)
                                }
                                className="mr-2 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                              />
                              <span className="text-sm text-gray-700">
                                {status}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Storage Location Filter */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2">
                          Storage Location
                        </h4>
                        <div className="space-y-2">
                          {filterOptions.storageLocations.map((storage) => (
                            <label key={storage} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedFilters.storage.includes(
                                  storage
                                )}
                                onChange={() =>
                                  handleFilterChange("storage", storage)
                                }
                                className="mr-2 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                              />
                              <span className="text-sm text-gray-700">
                                {storage}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Category Filter */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-700 mb-2">
                          Category
                        </h4>
                        <div className="space-y-2">
                          {filterOptions.categories.map((category) => (
                            <label key={category} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedFilters.category.includes(
                                  category
                                )}
                                onChange={() =>
                                  handleFilterChange("category", category)
                                }
                                className="mr-2 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                              />
                              <span className="text-sm text-gray-700">
                                {category}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Clear Filters Button */}
                      <button
                        onClick={clearAllFilters}
                        className="w-full py-2 px-4 cursor-pointer bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </div>

                {/* ➕ Add Items Button */}
                <button
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="flex items-center hover:bg-[#006666] justify-center cursor-pointer whitespace-nowrap sm:justify-start space-x-2 text-white bg-[#008080] rounded border-[0.8px] border-[#DBDFE4] px-3 py-2 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">Add Items</span>
                </button>

                {/* Add Modal */}
                <AddItemModal
                  isOpen={isAddItemModalOpen}
                  onClose={() => setIsAddItemModalOpen(false)}
                  onAdd={(formData) => {
                    const newItem: InventoryItem = {
                      id: (items.length + 1).toString(),
                      name: formData.itemName,
                      status: formData.status,
                      storage: formData.storageLocation,
                      quantity: parseInt(formData.quantity) || 0,
                      lastUpdated: new Date().toLocaleDateString(),
                      image: getCategoryEmoji(formData.category),
                      mfgDate: formData.mfdDate,
                      bestBefore: formData.bestBefore,
                      purchaseDate: formData.purchaseDate,
                      cost: formData.cost,
                      supplierName: formData.supplierName,
                      supplierEmail: formData.supplierEmail,
                      supplierPhone: formData.supplierPhone,
                      supplierAddress: formData.supplierAddress,
                    };

                    setItems((prevItems) => [...prevItems, newItem]);
                    console.log("New item added:", newItem);
                  }}
                  mode="add"
                />

                {/* Edit Modal */}
                <AddItemModal
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                  onEdit={handleSaveEdit}
                  initialData={{
                    itemName: selectedItem?.name || "",
                    category: "",
                    quantity: String(selectedItem?.quantity || ""),
                    status: selectedItem?.status || "",
                    storageLocation: selectedItem?.storage || "",
                    supplierName: selectedItem?.supplierName || "",
                    supplierEmail: selectedItem?.supplierEmail || "",
                    supplierPhone: selectedItem?.supplierPhone || "",
                    supplierAddress: selectedItem?.supplierAddress || "",
                    purchaseDate: selectedItem?.purchaseDate || "",
                    quantityPurchased: selectedItem?.quantityPurchased || "",
                    cost: selectedItem?.cost || "",
                    mfdDate: selectedItem?.mfgDate || "",
                    bestBefore: selectedItem?.bestBefore || "",
                  }}
                  mode="edit"
                />
              </div>
            </div>

            {/* Active Filters Display */}
            {(getActiveFilterCount() > 0 || searchQuery) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedFilters.status.map((status) => (
                  <span
                    key={status}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                  >
                    Status: {status}
                    <button
                      onClick={() => handleFilterChange("status", status)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {selectedFilters.storage.map((storage) => (
                  <span
                    key={storage}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                  >
                    Storage: {storage}
                    <button
                      onClick={() => handleFilterChange("storage", storage)}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {selectedFilters.category.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                  >
                    Category: {category}
                    <button
                      onClick={() => handleFilterChange("category", category)}
                      className="ml-2 text-orange-600 hover:text-orange-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Card View */}
          <div className="block sm:hidden">
            <div className="divide-y divide-gray-200">
              {paginatedItems.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No items found matching your criteria</p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-2 text-teal-600 hover:text-teal-800 text-sm"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                paginatedItems.map((item, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="text-2xl">{item.image}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-gray-900 truncate">
                              {item.name}
                            </h3>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                item.status
                              )}`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-500 mb-1">
                            Storage: {item.storage}
                          </p>
                          <p className="text-xs text-gray-400">
                            Updated: {item.lastUpdated}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-3">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Edit className="h-4 w-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto rounded-t-xl">
            {paginatedItems.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No items found matching your criteria</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-2 text-teal-600 hover:text-teal-800 text-sm"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <table className="w-full rounded">
                <thead className="bg-[#EFEFEFB2] rounded-t-lg">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="bg-[#D3D3D3] h-[26px] w-[26px] rounded-[6px]"></div>
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Storage Location
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Last Updated
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-[12px]">
                  {paginatedItems.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="bg-[#EEEEEE] h-[26px] w-[24px] rounded-[6px]"></div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-2xl">
                        {item.image}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.storage}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                        {item.lastUpdated}
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="relative px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        <div className="flex items-center space-x-2 dropdown-container">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="hover:text-gray-600 p-1 hover:bg-gray-200 rounded"
                          >
                            <img
                              src="/images/iconamoon_edit-thin.png"
                              className="h-4 w-4"
                            />
                          </button>
                          <button
                            onClick={() => handleViewMore(index)}
                            className="hover:text-gray-600 p-1 hover:bg-gray-200 rounded"
                          >
                            <img
                              src="/images/iwwa_option-horizontal.png"
                              className="h-4 w-4"
                            />
                          </button>

                          {viewMore === index && (
                            <div className="flex flex-col gap-2 items-start justify-start absolute top-full left-0 bg-white border border-gray-200 rounded shadow-lg p-2 z-10">
                              <button
                                onClick={() => handleDeleteItem(item)}
                                className="flex text-[#000000B2] hover:bg-gray-100 w-full flex-row gap-2 justify-start items-center p-2 rounded"
                              >
                                <img
                                  src="/images/material-symbols-light_delete-outline.png"
                                  className="text-[#5B5B5B"
                                  alt="delete"
                                />
                                Delete
                              </button>

                              <button
                                onClick={() => handleViewDetails(item)}
                                className="flex text-[#000000B2] hover:bg-gray-100 w-full flex-row gap-2 justify-start items-center p-2 rounded"
                              >
                                <img
                                  src="/images/wpf_view-file.png"
                                  className="text-[#5B5B5B"
                                  alt="view details"
                                />
                                View Details
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {filteredItems.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalEntries={totalEntries}
              entriesPerPage={entriesPerPage}
              onPageChange={setCurrentPage}
              onEntriesPerPageChange={(newEntriesPerPage) => {
                setEntriesPerPage(newEntriesPerPage);
                setCurrentPage(1); // Reset to first page when changing entries per page
              }}
            />
          )}
        </div>

        {/* Modals */}
        <DetailsModal
          item={selectedItem}
          isOpen={isDetailsModalOpen}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedItem(null);
          }}
        />

        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedItem(null);
          }}
          onConfirm={confirmDelete}
          title="Delete Item"
          message={`Are you sure you want to delete "${selectedItem?.name}"? This action cannot be undone.`}
        />
      </div>
    </DashboardLayout>
  );
}
