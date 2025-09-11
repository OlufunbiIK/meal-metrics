"use client";

import React from "react";
import DashboardLayout from "../components/shared/DashboardLayout";
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

const Dashboard = () => {
  const router = useRouter;
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

  return (
    <DashboardLayout activeTab="Dashboard" onTabChange={handleTabChange}>
      {/* Dashboard Content */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-6 bg-[#f8f8f8]">
        {/* Top Section with Stats and Meal Planner */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-2 sm:gap-6">
          {/* Stats Cards Section */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2 lg:gap-3 h-full">
              {/* Inventory Status */}
              <div className="bg-white rounded-lg p-2 sm:p-3 lg:p-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-sm font-medium text-gray-600">
                    Inventory status
                  </h3>
                  <div className="rounded-full p-4 bg-[#4FBFA314]">
                    <img
                      src="./images/bxs_box.svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-[#4FBFA3"
                      alt="item 1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Total Items in stock
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">120</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Out of stock items
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">5</div>
                  </div>
                </div>
              </div>

              {/* Pending Orders */}
              <div className="bg-white rounded-lg p-2 sm:p-3 lg:p-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-sm font-medium text-gray-600">
                    Pending Orders
                  </h3>
                  <div className="rounded-full p-4 bg-[#D7650712]">
                    <img
                      src="./images/raphael_cart.svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500"
                      alt="item 2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Orders Awaiting Delivery
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">8</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Orders Placed Today
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">3</div>
                  </div>
                </div>
              </div>

              {/* Today's Meal */}
              <div className="bg-white rounded-lg p-2 sm:p-3 lg:p-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-sm font-medium text-gray-600">
                    Today's Meal
                  </h3>
                  <div className="rounded-full p-4 bg-[#3B5AFB1A]">
                    <img
                      src="./images/solar_plate-bold.svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500"
                      alt="item 2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Total Meals Planned
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">40</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Special Diets Included
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">10</div>
                  </div>
                </div>
              </div>

              {/* Active Staff */}
              <div className="bg-white rounded-lg p-2 sm:p-3 lg:p-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-sm font-medium text-gray-600">
                    Active Staff
                  </h3>
                  <div className="rounded-full p-4 bg-[#F2F1F1]">
                    <img
                      src="./images/game-icons_cook.svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500"
                      alt="item 2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Number of Staff Currently Working
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">15</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Scheduled for Today
                    </div>
                    <div className="text-xl sm:text-2xl font-bold">5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Meal Planner Preview */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border-[#FFFFFF] border-[0.8px] p-2 sm:p-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[20px] text-[#333333]">
                  Meal Planner Preview
                </h2>
              </div>

              <div className="space-y-2 sm:space-y-3 flex-1">
                {mealPlans.map((meal, index) => (
                  <div
                    key={index}
                    className="border-[#DADADAB2] border-[0.8px] rounded-2xl p-2 sm:p-2 text-[#333333]"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 sm:w-20 sm:h-20 md:w-28 bg-orange-200 rounded-lg flex-shrink-0">
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate text-[18px]">
                          {meal.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                          Meal Time: {meal.time}
                        </p>
                        <div className="bg-[#DADADAB2] w-full h-[0.5px] mb-2"></div>
                        <p className="text-xs text-gray-500 line-clamp-2 text-[14px]">
                          <span className="font-medium">Ingredients: </span>
                          {meal.ingredients}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-teal-600 shadow-sm hover:text-teal-700 text-sm font-medium py-2 border border-[#DADADA80] rounded-lg hover:bg-teal-50 transition-colors">
                See all meal plans
              </button>
            </div>
          </div>
        </div>
        {/* Inventory Overview Section */}
        <div className="bg-white rounded-lg px-2 lg:px-4 border-white border-[0.8px]">
          <div className="p-2 sm:py-4 sm:px-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-lg font-semibold">Inventory Overview</h2>
              <button className="flex items-center justify-center sm:justify-start space-x-2 text-gray-500 hover:text-gray-700 bg-white rounded border-[0.8px] border-[#DBDFE4] hover:bg-gray-100 px-3 py-2 transition-colors">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filter</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block sm:hidden">
            <div className="divide-y divide-gray-200">
              {inventoryItems.map((item, index) => (
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
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Edit className="h-4 w-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto rounded-t-xl">
            <table className="w-full rounded">
              <thead className="bg-[#EFEFEFB2] rounded-t-lg">
                <tr>
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
                {inventoryItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
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
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <button className="hover:text-gray-600 p-1 hover:bg-gray-200 rounded">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="hover:text-gray-600 p-1 hover:bg-gray-200 rounded">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
