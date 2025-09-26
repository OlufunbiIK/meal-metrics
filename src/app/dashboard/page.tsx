"use client";

import React, { useState } from "react";
import {
  Package,
  ShoppingCart,
  Calendar,
  Users,
  Filter,
  ChevronDown,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/layout/DashboardLayout";
import MealPlansModal from "@/app/modals/DashboardModal";
import PopularRecipe from "@/app/components/PopularRecipes";

const Dashboard = () => {
  const [isMealPlansOpen, setIsMealPlansOpen] = useState(false);
  const router = useRouter();
  // Sample data
  const inventoryItems = [
    {
      name: "Tomatoes",
      image: "🍅",
      quantity: "120kg",
      storage: "Freezer",
      lastUpdated: "Aug 15, 2024, 14:30",
      status: "Good",
    },
    {
      name: "Chicken Breast",
      image: "🍗",
      quantity: "40kg",
      storage: "Freezer",
      lastUpdated: "Aug 15, 2024, 14:30",
      status: "Low Stock",
    },
    {
      name: "Egg",
      image: "🥚",
      quantity: "0kg",
      storage: "Freezer 2",
      lastUpdated: "Aug 15, 2024, 14:30",
      status: "Out of Stock",
    },
    {
      name: "Pasta",
      image: "🍝",
      quantity: "40kg",
      storage: "Pantry",
      lastUpdated: "Aug 15, 2024, 14:30",
      status: "Expired",
    },
    {
      name: "Oil",
      image: "🫗",
      quantity: "120kg",
      storage: "Pantry",
      lastUpdated: "Aug 15, 2024, 14:30",
      status: "Good",
    },
  ];

  const mealPlans = [
    {
      name: "Jollof Rice",
      time: "1pm",
      ingredients: "Rice, tomatoes, bell peppers, onions, chicken",
      image: "/images/side-view-pilaf-with-stewed-beef-meat-plate.jpg",
    },
    {
      name: "Egusi Soup",
      time: "5pm",
      ingredients: "Melon seeds, spinach, assorted meat, stockfish",
      image: "/images/321a3a968ae71fe9c2042c2a2111583048599cca.png",
    },
    {
      name: "Jollof Rice",
      time: "1pm",
      ingredients: "Rice, tomatoes, bell peppers, onions, chicken",
      image: "/images/side-view-pilaf-with-stewed-beef-meat-plate.jpg",
    },
    {
      name: "Egusi Soup",
      time: "5pm",
      ingredients: "Melon seeds, spinach, assorted meat, stockfish",
      image: "/images/321a3a968ae71fe9c2042c2a2111583048599cca.png",
    },
  ];

  const getStatusColor = (status: any) => {
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

  const handleTabChange = (tab: any) => {
    console.log(`Switched to: ${tab}`);
    // Here you would typically handle routing
    // router.push(`/dashboard/${tab.toLowerCase().replace(" ", "-")}`);
  };

  // Handle settings click
  const handleFavoriteClick = () => {
    window.location.href = "/dashboard/favorites";
  };

  return (
    <DashboardLayout activeTab="Dashboard" onTabChange={handleTabChange}>
      {/* Dashboard Content */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-6 bg-[#f8f8f8]">
        {/* Top Section with Stats and Meal Planner */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6 items-stretch">
          {/* Left Section */}
          <div className="relative lg:col-span-4">
            <div className="relative w-full h-[300px] md:h-[350px] lg:h-[350px] xl:h-[400px]">
              <img
                src="/images/7f5252a6396a178b4b0daaeddf39d5394b03b027.png"
                alt=""
                className="w-full h-full object-cover rounded-2xl md:rounded-3xl lg:rounded-4xl"
              />
              {/* Overlay content */}
              <div className="absolute top-1/2 left-4 md:left-6 lg:left-8 transform -translate-y-1/2 max-w-xs lg:max-w-sm">
                <div className="space-y-2 md:space-y-3">
                  <h3 className="bg-[#F4F4F499] text-[10px] md:text-xs rounded-[30px] px-3 py-2 text-center inline-block">
                    Our Specials
                  </h3>
                  <h3 className="text-xl md:text-2xl lg:text-3xl text-white font-semibold leading-tight">
                    Vegetable Salad
                  </h3>
                  <h4 className="text-white text-sm md:text-[12px] lg:text-[14px] leading-relaxed">
                    Indulge in the Menu of the Week with a crisp and flavorful
                    vegetable salad, perfect for a light, healthy meal
                  </h4>
                  <button
                    onClick={() => router.push("/dashboard/recipes")}
                    className="flex items-center justify-center space-x-2 text-white hover:text-gray-700 bg-[#008080] rounded border-[0.8px] border-[#008080] hover:bg-gray-100 px-4 py-2 xl:px-6 xl:py-3 transition-colors text-sm xl:text-base font-medium mt-4"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Favorites Card */}
          <div className="lg:col-span-3 bg-[#004949] rounded-[30px] p-6 flex flex-col justify-center items-center h-[300px] md:h-[350px] lg:h-[350px] xl:h-[400px]">
            <div className="flex flex-col justify-center items-center text-center max-w-xs xl:max-w-sm">
              <img
                src="/images/d46bb41426f65649a5e6b33df2d4ea65282c3ce9.png"
                alt="favorite"
                className="w-[80px] sm:w-[90px] md:w-[100px] xl:w-[120px] mb-4 xl:mb-6"
              />
              <h3 className="text-white text-[18px] sm:text-[20px] xl:text-[24px] font-semibold mb-2 xl:mb-3">
                Your Favorites
              </h3>
              <p className="text-white text-[14px] sm:text-[15px] xl:text-[16px] mb-4 xl:mb-6 leading-relaxed">
                Quick access to your saved recipes
              </p>
              <button
                onClick={handleFavoriteClick}
                className="flex items-center justify-center space-x-2 text-white hover:text-gray-700 bg-[#00B4A9] rounded border-[0.8px] border-[#008080] hover:bg-gray-100 px-4 py-2 xl:px-6 xl:py-3 transition-colors text-[14px] xl:text-[16px] font-medium"
              >
                View All
              </button>
            </div>
          </div>
        </div>

        {/* Top Section with Stats */}
        <div className="grid grid-cols-1 gap-2 sm:gap-6 w-full">
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2 lg:gap-3 h-full">
              {/* Stats Cards - with consistent image sizing */}
              <div className="bg-white rounded-4xl p-2 sm:p-3 lg:p-4">
                <div className="flex items-center gap-4 mb-3 sm:mb-4">
                  <div className="rounded-[14px] p-4 bg-[#4FBFA314]">
                    <img
                      src="./images/bxs_box.svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-[#4FBFA3"
                      alt="item 1"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">
                    Inventory status
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="border-r border-gray-200 pr-2 sm:pr-4">
                    <div className="text-xs text-gray-500 mb-1">
                      Total Items in stock
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#333333]">
                      120
                    </div>
                  </div>
                  <div className="pl-2 sm:pl-4">
                    <div className="text-xs text-gray-500 mb-1">
                      Out of stock items
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#333333]">
                      5
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Orders */}
              <div className="bg-white rounded-4xl p-2 sm:p-3 lg:p-4">
                <div className="flex items-center gap-4 mb-3 sm:mb-4">
                  <div className="rounded-[14px] p-4 bg-[#D7650712]">
                    <img
                      src="./images/raphael_cart.svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500"
                      alt="item 2"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">
                    Pending Orders
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="border-r border-gray-200 pr-2 sm:pr-4">
                    <div className="text-xs text-gray-500 mb-1">
                      Orders Awaiting Delivery
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#333333]">
                      8
                    </div>
                  </div>
                  <div className="pl-2 sm:pl-4">
                    <div className="text-xs text-gray-500 mb-1">
                      Orders Placed Today
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#333333]">
                      3
                    </div>
                  </div>
                </div>
              </div>

              {/* Today's Meal */}
              <div className="bg-white rounded-4xl p-2 sm:p-3 lg:p-4">
                <div className="flex items-center gap-4 mb-3 sm:mb-4">
                  <div className="rounded-[14px] p-4 bg-[#3B5AFB1A]">
                    <img
                      src="./images/solar_plate-bold.svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500"
                      alt="item 2"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">
                    Today's Meal
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="border-r border-gray-200 pr-2 sm:pr-4">
                    <div className="text-xs text-gray-500 mb-1">
                      Total Meals Planned
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#333333]">
                      40
                    </div>
                  </div>
                  <div className="pl-2 sm:pl-4">
                    <div className="text-xs text-gray-500 mb-1">
                      Special Diets Included
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#333333]">
                      10
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Staff */}
              <div className="bg-white rounded-4xl p-2 sm:p-3 lg:p-4">
                <div className="flex items-center gap-4 mb-3 sm:mb-4">
                  <div className="rounded-[14px] p-4 bg-[#F2F1F1]">
                    <img
                      src="./images/game-icons_cook.svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500"
                      alt="item 2"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">
                    Active Staff
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="border-r border-gray-200 pr-2 sm:pr-4">
                    <div className="text-xs text-gray-500 mb-1">
                      Number of Staff Currently Working
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#333333]">
                      15
                    </div>
                  </div>
                  <div className="pl-2 sm:pl-4">
                    <div className="text-xs text-gray-500 mb-1">
                      Scheduled for Today
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#333333]">
                      5
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:mt-10 mt-2">
        <PopularRecipe />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
