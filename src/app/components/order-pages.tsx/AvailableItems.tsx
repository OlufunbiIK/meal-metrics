"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { ShoppingItem } from "@/app/types";
import { ItemCard } from "@/app/components/ItemCars";
import { EditItemModal } from "@/app/modals/EditItemModal";
import { DeleteConfirmModal } from "@/app/modals/DeleteConfirmModal";
import Pagination from "@/app/components/Pagination";
import { useShopping } from "@/app/context/ShoppingContext";
import { FilterDropdown } from "@/app/components/FilterDropdown";
import { useItemsFilter } from "@/app/hooks/useItem";

export const AvailableItemsPage = () => {
  const { items, updateItem, addItem, deleteItem, updateQuantity } =
    useShopping();

  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewItemModal, setIsNewItemModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ShoppingItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Use the filter hook
  const { filters, setFilters, filteredItems, availableCategories } =
    useItemsFilter({
      items,
      searchTerm,
      additionalFilter: (item) => item.quantity > 0, // Only available items
    });

  // Pagination
  const totalEntries = filteredItems.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  // Reset to page 1 when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handleEditItem = (item: ShoppingItem) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleSaveItem = (item: ShoppingItem) => {
    if (editingItem) {
      updateItem(item);
    } else {
      addItem(item);
    }
    setEditingItem(null);
    setIsEditModalOpen(false);
    setIsNewItemModal(false);
  };

  const handleDeleteItem = (item: ShoppingItem) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete.id);
      setItemToDelete(null);
    }
    setIsDeleteModalOpen(false);
  };

  const handleAddNewItem = () => {
    setEditingItem(null);
    setIsNewItemModal(true);
    setIsEditModalOpen(true);
  };

  return (
    <div className="px-4 py-4">
      <div className="flex flex-col lg:flex-row w-full gap-3 lg:gap-4 lg:items-center lg:justify-between mb-4">
        {/* Title */}
        <div className="flex-shrink-0 lg:flex-1">
          <h2 className="text-[18px] font-semibold text-[#333333]">
            Available Items
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative lg:flex-1 lg:max-w-md lg:mx-auto">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm text-[#333333] lg:text-[10px] border border-gray-300 rounded-[30px] focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-[#BABABA]"
          />
        </div>

        {/* Filter Component */}
        <FilterDropdown
          availableCategories={availableCategories}
          filters={filters}
          onApplyFilters={setFilters}
          showPriceRange={true}
          showCategories={true}
          showSort={true}
        />
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {paginatedItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onEdit={handleEditItem}
            onUpdateQuantity={updateQuantity}
            onDelete={handleDeleteItem}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8 sm:py-12 px-4">
          <div className="text-gray-400 text-3xl sm:text-4xl mb-2">🛒</div>
          <p className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4">
            No available items found
          </p>
          <button
            onClick={handleAddNewItem}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-teal-600 text-white text-sm sm:text-base rounded-lg hover:bg-teal-700 transition-colors"
          >
            Add First Item
          </button>
        </div>
      )}

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
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        itemName={itemToDelete?.name || ""}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
      />

      {filteredItems.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalEntries={totalEntries}
          entriesPerPage={entriesPerPage}
          onPageChange={setCurrentPage}
          onEntriesPerPageChange={(newEntries) => {
            setEntriesPerPage(newEntries);
            setCurrentPage(1);
          }}
          showEntriesSelector={true}
          entriesOptions={[5, 10, 20, 50]}
        />
      )}
    </div>
  );
};
