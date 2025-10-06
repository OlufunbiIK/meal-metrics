"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { ShoppingItem } from "@/app/types";
import { ItemCard } from "@/app/components/ItemCars";
import { EditItemModal } from "@/app/modals/EditItemModal";
import { DeleteConfirmModal } from "@/app/modals/DeleteConfirmModal";
import Pagination from "@/app/components/Pagination";
import { useShopping } from "@/app/context/ShoppingContext";
import { FaPlusCircle } from "react-icons/fa";
import { AddItemModal } from "@/app/modals/AddOrderItems";
import { FilterDropdown } from "@/app/components/FilterDropdown";
import { useItemsFilter } from "@/app/hooks/useItem";

export const QuantitiesNeededPage = () => {
  const { items, updateItem, addItem, deleteItem, updateQuantity } =
    useShopping();

  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ShoppingItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Use the filter hook with custom filter for low stock items
  const { filters, setFilters, filteredItems, availableCategories } =
    useItemsFilter({
      items,
      searchTerm,
      additionalFilter: (item) => item.quantity < 5 && item.quantity > 0,
    });

  // Pagination
  const totalEntries = filteredItems.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  // Reset pagination when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Handlers
  const handleEditItem = (item: ShoppingItem) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleAddNewItem = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = (item: ShoppingItem) => {
    updateItem(item);
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  const handleSaveNew = (item: ShoppingItem) => {
    addItem(item);
    setIsAddModalOpen(false);
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

  return (
    <div className="px-4 py-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row w-full gap-3 lg:gap-4 lg:items-center lg:justify-between mb-4">
        <div className="flex-shrink-0 lg:flex-1">
          <h2 className="text-[18px] font-semibold text-[#333333]">
            Quantities Needed
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredItems.length === 0
              ? "No items running low"
              : filteredItems.length === 1
              ? "1 item running low (less than 5 units)"
              : `${filteredItems.length} items running low (less than 5 units)`}
          </p>
        </div>

        {/* Search */}
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

      {/* Items list */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-6">
        <div className="flex-1 space-y-3 w-full">
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

        {/* Add button */}
        <div className="flex justify-center lg:justify-start lg:flex-shrink-0">
          <button
            onClick={handleAddNewItem}
            className="text-[#008080] flex flex-row items-center gap-2 hover:bg-teal-50 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <FaPlusCircle className="text-xl" />
            <span className="font-medium">Add New Items</span>
          </button>
        </div>
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="text-center py-8 sm:py-12 px-4">
          <div className="text-gray-400 text-3xl sm:text-4xl mb-2">✅</div>
          <p className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4">
            All items are well stocked!
          </p>
        </div>
      )}

      {/* Modals */}
      <EditItemModal
        item={editingItem}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveEdit}
      />

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNew}
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

      {/* Pagination */}
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
