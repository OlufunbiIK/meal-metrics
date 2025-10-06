// pages/shopping.tsx (Updated Parent Page)
"use client";

import { useState } from "react";
import DashboardLayout from "@/app/layout/DashboardLayout";
import { ShoppingProvider } from "@/app/context/ShoppingContext";
import { ScanPage } from "@/app/components/order-pages.tsx/Scan";
import { ShopPage } from "@/app/components/order-pages.tsx/Shop";
import { QuantitiesNeededPage } from "@/app/components/order-pages.tsx/QuantityNeeded";
import { AvailableItemsPage } from "@/app/components/order-pages.tsx/AvailableItems";

const ShoppingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Available Items");

  const categories = ["Available Items", "Quantities Needed", "Scan", "Shop"];

  const handleTabChange = (tab: string) => {
    console.log(`Switched to: ${tab}`);
  };

  // Render the appropriate page based on selected category
  const renderPage = () => {
    switch (selectedCategory) {
      case "Available Items":
        return <AvailableItemsPage />;
      case "Quantities Needed":
        return <QuantitiesNeededPage />;
      case "Scan":
        return <ScanPage />;
      case "Shop":
        return <ShopPage />;
      default:
        return <AvailableItemsPage />;
    }
  };

  return (
    <ShoppingProvider>
      <DashboardLayout activeTab="Dashboard" onTabChange={handleTabChange}>
        <div className="min-h-screen bg-white rounded-[30px] p-2 md:p-6">
          {/* Category Tabs */}
          <div className="flex space-x-2 border-b-[1px] border-[#EAECF0] max-w-lg overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-[16px] text-sm font-medium cursor-pointer whitespace-nowrap ${
                  selectedCategory === category
                    ? "text-[#008080] border-b-[1px] border-[#008080] pb-3"
                    : "text-[#576275]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Render Selected Page */}
          {renderPage()}
        </div>
      </DashboardLayout>
    </ShoppingProvider>
  );
};

export default ShoppingPage;
