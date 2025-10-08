"use client";
import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Users,
  Filter,
  Menu,
  X,
  Printer,
} from "lucide-react";
import DashboardLayout from "@/app/layout/DashboardLayout";
import { useRouter } from "next/navigation";

type MealCategory =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "snacks"
  | "appetizers"
  | "mainCourse"
  | "desserts";

interface MealItem {
  id: number;
  name: string;
  calories: number;
  time: string;
  eaten: boolean;
  image: string;
}

type MealsState = Record<MealCategory, MealItem[]>;

interface FiltersState {
  category: {
    diabetic: boolean;
    lowCarb: boolean;
    vegetarian: boolean;
    vegan: boolean;
    highProtein: boolean;
  };
  menuType: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    snacks: boolean;
  };
}

interface NewItemState {
  name: string;
  calories: string;
  time: string;
  category: MealCategory;
  image: string;
}

export default function MealPlanningForm() {
  const [activeView, setActiveView] = useState<
    "day" | "week" | "month" | "event"
  >("day");
  const [selectedDate, setSelectedDate] = useState("2024-08-20");
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [isEventMode, setIsEventMode] = useState(false);
  const [eventName, setEventName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [editingItem, setEditingItem] = useState<{
    id: number;
    category: MealCategory;
  } | null>(null);

  const [meals, setMeals] = useState<MealsState>({
    breakfast: [
      {
        id: 1,
        name: "Apple",
        calories: 90,
        time: "8:00 AM - 9:00 AM",
        eaten: true,
        image: "🍎",
      },
      {
        id: 2,
        name: "Jollof Rice",
        calories: 350,
        time: "9:00 AM - 10:00 AM",
        eaten: false,
        image: "🍚",
      },
    ],
    lunch: [],
    dinner: [
      {
        id: 3,
        name: "Amala & Ewedu",
        calories: 220,
        time: "7:00 PM - 8:00 PM",
        eaten: false,
        image: "🍲",
      },
    ],
    snacks: [],
    appetizers: [
      {
        id: 4,
        name: "Spring rolls",
        calories: 120,
        time: "6:00 PM - 7:00 PM",
        eaten: true,
        image: "🥟",
      },
    ],
    mainCourse: [
      {
        id: 5,
        name: "Amala & Ewedu",
        calories: 220,
        time: "7:00 PM - 8:00 PM",
        eaten: false,
        image: "🍲",
      },
    ],
    desserts: [
      {
        id: 6,
        name: "Fruit Salad",
        calories: 90,
        time: "8:00 PM - 9:00 PM",
        eaten: false,
        image: "🥗",
      },
    ],
  });

  const [filters, setFilters] = useState<FiltersState>({
    category: {
      diabetic: false,
      lowCarb: false,
      vegetarian: false,
      vegan: false,
      highProtein: false,
    },
    menuType: { breakfast: false, lunch: false, dinner: false, snacks: false },
  });

  const [newItem, setNewItem] = useState<NewItemState>({
    name: "",
    calories: "",
    time: "",
    category: "breakfast",
    image: "🍽️",
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const getTotalCalories = () =>
    Object.values(meals)
      .flat()
      .reduce((total, meal) => total + meal.calories, 0);

  const getEatenCalories = () =>
    Object.values(meals)
      .flat()
      .filter((meal) => meal.eaten)
      .reduce((total, meal) => total + meal.calories, 0);

  const addMealItem = () => {
    if (!newItem.name || !newItem.calories) return;

    if (editingItem) {
      // Update existing
      setMeals((prev) => ({
        ...prev,
        [editingItem.category]: prev[editingItem.category].map((meal) =>
          meal.id === editingItem.id
            ? {
                ...meal,
                name: newItem.name,
                calories: parseInt(newItem.calories),
                time: newItem.time,
                image: newItem.image,
              }
            : meal
        ),
      }));
      setEditingItem(null);
    } else {
      // Add new
      const newMeal: MealItem = {
        id: Date.now(),
        name: newItem.name,
        calories: parseInt(newItem.calories),
        time: newItem.time,
        eaten: false,
        image: newItem.image,
      };

      setMeals((prev) => ({
        ...prev,
        [newItem.category]: [...prev[newItem.category], newMeal],
      }));
    }

    setNewItem({
      name: "",
      calories: "",
      time: "",
      category: "breakfast",
      image: "🍽️",
    });
    setShowAddForm(false);
  };

  const toggleEaten = (category: MealCategory, id: number) => {
    setMeals((prev) => ({
      ...prev,
      [category]: prev[category].map((meal) =>
        meal.id === id ? { ...meal, eaten: !meal.eaten } : meal
      ),
    }));
  };

  const deleteMealItem = (category: MealCategory, id: number) => {
    setMeals((prev) => ({
      ...prev,
      [category]: prev[category].filter((meal) => meal.id !== id),
    }));
  };

  const editMealItem = (category: MealCategory, item: MealItem) => {
    setEditingItem({ id: item.id, category });
    setNewItem({
      name: item.name,
      calories: String(item.calories),
      time: item.time,
      category,
      image: item.image,
    });
    setShowAddForm(true);
  };

  const applyFilters = (category: MealCategory, items: MealItem[]) => {
    // If any menuType filter is selected, only show matching ones
    const activeMenuFilters = Object.entries(filters.menuType).filter(
      ([, v]) => v
    );

    // For regular meal planning (not event mode)
    if (!isEventMode) {
      // Check if this category should be shown based on menu type filters
      if (activeMenuFilters.length > 0) {
        const categoryKey = category as keyof typeof filters.menuType;
        if (
          filters.menuType[categoryKey] === undefined ||
          !filters.menuType[categoryKey]
        ) {
          return [];
        }
      }
    }

    // If menuType filters are active and this category doesn't match, return empty
    if (
      activeMenuFilters.length > 0 &&
      !filters.menuType[category as keyof typeof filters.menuType]
    ) {
      // For event mode categories (appetizers, mainCourse, desserts), show them if snacks filter is not exclusively active
      if (
        isEventMode &&
        !["breakfast", "lunch", "dinner", "snacks"].includes(category)
      ) {
        // Show event categories unless only standard meal filters are active
        const onlyStandardMeals = activeMenuFilters.every(([key]) =>
          ["breakfast", "lunch", "dinner", "snacks"].includes(key)
        );
        if (onlyStandardMeals) return [];
      } else {
        return [];
      }
    }

    return items;
  };

  const renderMealSection = (
    title: string,
    category: MealCategory,
    items: MealItem[]
  ) => {
    const filteredItems = applyFilters(category, items);

    return (
      <div className="mb-6 lg:mb-8 bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 lg:gap-3">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-800">
              {title}
            </h3>
            <span className="text-xs lg:text-sm text-gray-500">
              {filteredItems.reduce((sum, item) => sum + item.calories, 0)} cal
            </span>
          </div>
          <button
            onClick={() => {
              setNewItem((prev) => ({ ...prev, category }));
              setShowAddForm(true);
            }}
            className="text-teal-600 hover:text-teal-800 p-2 rounded-full hover:bg-teal-50"
          >
            <Plus size={18} className="lg:w-5 lg:h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 lg:gap-4 p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xl lg:text-2xl flex-shrink-0">
                {item.image}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm lg:text-base truncate">
                  {item.name}
                </h4>
                <p className="text-xs lg:text-sm text-gray-600">{item.time}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => toggleEaten(category, item.id)}
                    className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      item.eaten
                        ? "bg-[#008080] border-[#008080]"
                        : "border-gray-300 hover:border-teal-600"
                    }`}
                  >
                    {item.eaten && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </button>
                  <span
                    className={`text-xs lg:text-sm ${
                      item.eaten ? "text-teal-600" : "text-gray-500"
                    }`}
                  >
                    {item.eaten ? "Eaten" : "Not eaten"}
                  </span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-sm lg:text-lg font-medium text-gray-900">
                  {item.calories}
                </div>
                <div className="text-xs text-gray-500">cal</div>
                <div className="flex gap-1 mt-2">
                  <button
                    onClick={() => editMealItem(category, item)}
                    className="text-gray-400 hover:text-[#008080] p-1"
                  >
                    <Edit size={14} className="lg:w-4 lg:h-4" />
                  </button>
                  <button
                    onClick={() => deleteMealItem(category, item.id)}
                    className="text-gray-400 hover:text-red-600 p-1"
                  >
                    <Trash2 size={14} className="lg:w-4 lg:h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">No items added yet</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const SidebarContent = () => (
    <div className="space-y-4">
      <button
        onClick={() => setShowAddForm(true)}
        className="w-full flex items-center gap-2 text-[#008080] hover:text-teal-800 p-2 rounded hover:bg-teal-50 text-sm lg:text-base"
      >
        <Plus size={16} />
        Create Menu
      </button>
      <button
        onClick={() => router.push("./favorites")}
        className="w-full flex items-center gap-2 text-[#008080] hover:text-teal-800 p-2 rounded hover:bg-teal-50 text-sm lg:text-base"
      >
        <Users size={16} />
        Favorites
      </button>
      <button
        onClick={() => alert("Diet Plans feature coming soon!")}
        className="w-full flex items-center gap-2 text-[#008080] hover:text-teal-800 p-2 rounded hover:bg-teal-50 text-sm lg:text-base"
      >
        <Calendar size={16} />
        Diet Plans
      </button>
      <button
        onClick={() => {
          // Simple share functionality
          const shareText = `${
            isEventMode ? eventName || "Event" : "Today's"
          } Menu\nTotal: ${getTotalCalories()} Cal\nConsumed: ${getEatenCalories()} Cal`;
          if (navigator.share) {
            navigator
              .share({
                title: "My Meal Plan",
                text: shareText,
              })
              .catch(() => {});
          } else {
            navigator.clipboard.writeText(shareText);
            alert("Menu details copied to clipboard!");
          }
        }}
        className="w-full flex items-center gap-2 text-[#008080] hover:text-teal-800 p-2 rounded hover:bg-teal-50 text-sm lg:text-base"
      >
        <Filter size={16} />
        Share Menu
      </button>

      <button
        onClick={handlePrint}
        className="w-full flex items-center gap-2 text-[#008080] hover:text-teal-800 p-2 rounded hover:bg-teal-50 text-sm lg:text-base"
      >
        <Printer size={16} />
        Print
      </button>

      {/* Filters */}
      <div className="pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3 text-sm lg:text-base">
          Filter by Category
        </h4>
        <div className="space-y-2">
          {Object.keys(filters.category).map((filter) => (
            <label key={filter} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={
                  filters.category[filter as keyof typeof filters.category]
                }
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    category: {
                      ...prev.category,
                      [filter]:
                        !prev.category[filter as keyof typeof prev.category],
                    },
                  }))
                }
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="capitalize text-xs lg:text-sm text-gray-700">
                {filter.replace(/([A-Z])/g, " $1").trim()}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3 text-sm lg:text-base">
          Filter by Menu Type
        </h4>
        <div className="space-y-2">
          {Object.keys(filters.menuType).map((filter) => (
            <label key={filter} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={
                  filters.menuType[filter as keyof typeof filters.menuType]
                }
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    menuType: {
                      ...prev.menuType,
                      [filter]:
                        !prev.menuType[filter as keyof typeof prev.menuType],
                    },
                  }))
                }
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="capitalize text-xs lg:text-sm text-gray-700">
                {filter}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area,
          .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <DashboardLayout activeTab="Dashboard">
        <div className="min-h-screen bg-white">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-3 lg:px-6 py-3 lg:py-4">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 lg:gap-0">
              <div className="flex items-center justify-between">
                <div className="flex gap-2 lg:gap-6 border rounded-lg p-1.5 lg:p-2 border-gray-200 overflow-x-auto scrollbar-hide no-print">
                  <button
                    onClick={() => setActiveView("day")}
                    className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded text-sm whitespace-nowrap ${
                      activeView === "day"
                        ? "bg-gray-100 text-gray-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => setActiveView("week")}
                    className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded text-sm whitespace-nowrap ${
                      activeView === "week"
                        ? "bg-gray-100 text-gray-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setActiveView("month")}
                    className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded text-sm whitespace-nowrap ${
                      activeView === "month"
                        ? "bg-gray-100 text-gray-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => {
                      setActiveView("event");
                      setIsEventMode(true);
                    }}
                    className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded text-sm whitespace-nowrap ${
                      activeView === "event"
                        ? "bg-gray-100 text-gray-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Event
                  </button>
                </div>

                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  <Menu size={20} />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border border-gray-300 text-gray-700 rounded px-3 py-2 text-sm w-full sm:w-auto"
                >
                  <option value="2024-08-20">Aug 20, 2024</option>
                  <option value="2024-08-21">Aug 21, 2024</option>
                  <option value="2024-08-22">Aug 22, 2024</option>
                </select>

                {isEventMode && (
                  <input
                    type="text"
                    placeholder="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="border border-gray-300 text-gray-700 rounded px-3 py-2 text-sm w-full sm:w-auto"
                  />
                )}
              </div>
            </div>

            {activeView === "week" && (
              <div className="flex gap-2 lg:gap-4 mt-3 lg:mt-4 text-xs lg:text-sm overflow-x-auto pb-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, idx) => (
                    <button
                      key={day}
                      className={`px-2 py-1 lg:px-3 rounded whitespace-nowrap ${
                        idx === 2
                          ? "bg-gray-100 text-gray-700 border-b-2 border-teal-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {day}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="flex-1 p-3 lg:p-6 print-area">
              <div className="max-w-6xl mx-auto">
                {/* Title and Summary */}
                <div className="mb-4 lg:mb-6">
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    {isEventMode
                      ? `${eventName || "Family Reunion"} Menu`
                      : activeView === "month"
                      ? `${selectedMonth} Meal Plan`
                      : activeView === "week"
                      ? `Week of ${selectedDate}`
                      : `Today's Menu - ${selectedDate}`}
                  </h1>

                  <div className="flex flex-wrap gap-3 lg:gap-6 text-xs lg:text-sm text-gray-600">
                    <span>Total: {getTotalCalories()} Cal</span>
                    <span>Consumed: {getEatenCalories()} Cal</span>
                    {activeView === "month" && <span>84 Meals</span>}
                    {isEventMode && <span>10 Dishes</span>}
                  </div>
                </div>

                {/* Meal Sections */}
                {!isEventMode ? (
                  <>
                    {renderMealSection(
                      "Breakfast",
                      "breakfast",
                      meals.breakfast
                    )}
                    {renderMealSection("Lunch", "lunch", meals.lunch)}
                    {renderMealSection("Dinner", "dinner", meals.dinner)}
                    {renderMealSection("Snacks", "snacks", meals.snacks)}
                  </>
                ) : (
                  <>
                    {renderMealSection(
                      "Appetizers",
                      "appetizers",
                      meals.appetizers
                    )}
                    {renderMealSection(
                      "Main Course",
                      "mainCourse",
                      meals.mainCourse
                    )}
                    {renderMealSection("Desserts", "desserts", meals.desserts)}
                    {renderMealSection("Snacks", "snacks", meals.snacks)}
                  </>
                )}

                {/* Monthly/Event Summary */}
                {(activeView === "month" || isEventMode) && (
                  <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6 mt-6 lg:mt-8">
                    <h3 className="text-lg lg:text-xl font-semibold mb-4 text-gray-800">
                      {isEventMode ? "Event Summary" : "Monthly Summary"}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">
                        <span className="font-medium">
                          {isEventMode ? "Event Summary:" : "Monthly Summary:"}
                        </span>{" "}
                        {isEventMode ? "10 Dishes" : "84 Meals"}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Total:</span>{" "}
                        {isEventMode ? "6000" : "39200"} Calories
                      </p>
                      <div className="mt-4">
                        <p className="font-medium mb-2 text-gray-700">
                          Aggregated Choices for the{" "}
                          {isEventMode ? "Event" : "Month"}
                        </p>
                        <p className="text-gray-600">
                          {isEventMode
                            ? "Amala & Ewedu: 36"
                            : "Jollof Rice with Chicken: 800"}
                        </p>
                        <p className="text-gray-600">
                          {isEventMode ? "Fruit Salad: 30" : "Fried Rice: 600"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-80 bg-white border-l border-gray-200 p-6 no-print">
              <SidebarContent />
            </div>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div
                  className="absolute inset-0 bg-black bg-opacity-50"
                  onClick={() => setSidebarOpen(false)}
                ></div>
                <div className="absolute right-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-lg">Menu</h3>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <SidebarContent />
                </div>
              </div>
            )}
          </div>

          {/* Add Item Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-4 lg:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Add New Item</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) =>
                        setNewItem((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calories
                    </label>
                    <input
                      type="number"
                      value={newItem.calories}
                      onChange={(e) =>
                        setNewItem((prev) => ({
                          ...prev,
                          calories: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 8:00 AM - 9:00 AM"
                      value={newItem.time}
                      onChange={(e) =>
                        setNewItem((prev) => ({
                          ...prev,
                          time: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newItem.category}
                      onChange={(e) =>
                        setNewItem((prev) => ({
                          ...prev,
                          category: e.target.value as MealCategory,
                        }))
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snacks">Snacks</option>
                      {isEventMode && (
                        <>
                          <option value="appetizers">Appetizers</option>
                          <option value="mainCourse">Main Course</option>
                          <option value="desserts">Desserts</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emoji
                    </label>
                    <input
                      type="text"
                      value={newItem.image}
                      onChange={(e) =>
                        setNewItem((prev) => ({
                          ...prev,
                          image: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                      placeholder="🍽️"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={addMealItem}
                    className="flex-1 bg-teal-600 text-white py-2 px-4 rounded text-sm hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Add Item
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded text-sm hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
