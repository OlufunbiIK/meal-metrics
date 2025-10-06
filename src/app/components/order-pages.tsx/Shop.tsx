// app/pages/shopping/Shop.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ShoppingCart } from "lucide-react";
import { TiArrowSortedDown } from "react-icons/ti";
import { ShoppingItem } from "@/app/types";
import { ItemCard } from "@/app/components/ItemCars";
import { EditItemModal } from "@/app/modals/EditItemModal";
import { DeleteConfirmModal } from "@/app/modals/DeleteConfirmModal";
import Pagination from "@/app/components/Pagination";
import { useShopping } from "@/app/context/ShoppingContext";

export const ShopPage = () => {
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

  // Filter items: Show items that need to be purchased (quantity = 0)
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const needsToBuy = item.quantity === 0;
    return matchesSearch && needsToBuy;
  });

  const totalEntries = filteredItems.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
        <div className="flex-shrink-0 lg:flex-1">
          <h2 className="text-[18px] font-semibold text-[#333333]">
            Shopping List
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Items to purchase (out of stock)
          </p>
        </div>

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

        <div className="lg:flex-1 lg:flex lg:justify-end">
          <button className="text-teal-600 flex flex-row items-center justify-center gap-2 hover:bg-teal-50 p-2 rounded-lg flex-shrink-0 border-[0.8px] border-[#DBDFE4]">
            <Filter size={20} className="text-[#828282]" />
            <span className="text-xs lg:text-[12px] text-[#828282]">
              Filter
            </span>
            <TiArrowSortedDown className="text-[#828282]" />
          </button>
        </div>
      </div>

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
          <div className="text-gray-400 text-3xl sm:text-4xl mb-2">
            <ShoppingCart className="mx-auto" size={60} />
          </div>
          <p className="text-gray-500 text-sm sm:text-base mb-3 sm:mb-4">
            No items to shop for
          </p>
          <p className="text-sm text-gray-400">All items are in stock!</p>
        </div>
      )}

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
