"use client";
import React, { useState } from "react";
import { Plus, Edit, Trash2, Calendar, Users, Filter } from "lucide-react";
import DashboardLayout from "@/app/components/shared/DashboardLayout";
import { useRouter } from "next/navigation";

// Types
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
  calories: string; // we keep string here so input binding works smoothly
  time: string;
  category: MealCategory;
  image: string;
}

export default function MealPlanningForm() {
  const router = useRouter();

  const [activeView, setActiveView] = useState<
    "day" | "week" | "month" | "event"
  >("day");
  const [selectedDate, setSelectedDate] = useState("2024-08-20");
  const [selectedWeek, setSelectedWeek] = useState("2024-08-20");
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [isEventMode, setIsEventMode] = useState(false);
  const [eventName, setEventName] = useState("");

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

  const renderMealSection = (
    title: string,
    category: MealCategory,
    items: MealItem[]
  ) => (
    <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <span className="text-sm text-gray-500">
            {items.reduce((sum, item) => sum + item.calories, 0)} calories
          </span>
        </div>
        <button
          onClick={() => {
            setNewItem((prev) => ({ ...prev, category }));
            setShowAddForm(true);
          }}
          className="text-teal-600 hover:text-teal-800 p-2 rounded-full hover:bg-teal-50"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
              {item.image}
            </div>

            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-600">{item.time}</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => toggleEaten(category, item.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    item.eaten
                      ? "bg-teal-600 border-teal-600"
                      : "border-gray-300 hover:border-teal-600"
                  }`}
                >
                  {item.eaten && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
                <span
                  className={`text-sm ${
                    item.eaten ? "text-teal-600" : "text-gray-500"
                  }`}
                >
                  {item.eaten ? "Eaten" : "Not eaten"}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-medium text-gray-900">
                {item.calories} calories
              </div>
              <div className="flex gap-1 mt-2">
                <button className="text-gray-400 hover:text-teal-600 p-1">
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => deleteMealItem(category, item.id)}
                  className="text-gray-400 hover:text-red-600 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>No items added yet</p>
          </div>
        )}
      </div>
    </div>
  );

  const handleTabChange = (tab: string) => {
    console.log(`Switched to: ${tab}`);
  };

  return (
    <DashboardLayout activeTab="Dashboard" onTabChange={handleTabChange}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveView("day")}
                className={`px-4 py-2 rounded ${
                  activeView === "day"
                    ? "bg-teal-100 text-teal-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setActiveView("week")}
                className={`px-4 py-2 rounded ${
                  activeView === "week"
                    ? "bg-teal-100 text-teal-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setActiveView("month")}
                className={`px-4 py-2 rounded ${
                  activeView === "month"
                    ? "bg-teal-100 text-teal-700"
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
                className={`px-4 py-2 rounded ${
                  activeView === "event"
                    ? "bg-teal-100 text-teal-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Event
              </button>
            </div>

            <div className="flex gap-2">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
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
                  className="border border-gray-300 rounded px-3 py-2"
                />
              )}
            </div>
          </div>

          {activeView === "week" && (
            <div className="flex gap-4 mt-4 text-sm">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <button
                  key={day}
                  className={`px-3 py-1 rounded ${
                    day === "Wednesday"
                      ? "bg-teal-100 text-teal-700 border-b-2 border-teal-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              {/* Title and Summary */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {isEventMode
                    ? `${eventName || "Family Reunion"} Menu`
                    : activeView === "month"
                    ? `${selectedMonth} Meal Plan`
                    : activeView === "week"
                    ? `Week of ${selectedDate}`
                    : `Today's Menu - ${selectedDate}`}
                </h1>

                <div className="flex gap-6 text-sm text-gray-600">
                  <span>Total: {getTotalCalories()} Calories</span>
                  <span>Consumed: {getEatenCalories()} Calories</span>
                  {activeView === "month" && <span>84 Meals Planned</span>}
                  {isEventMode && <span>10 Dishes</span>}
                </div>
              </div>

              {/* Meal Sections */}
              {!isEventMode ? (
                <>
                  {renderMealSection("Breakfast", "breakfast", meals.breakfast)}
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

              {/* Monthly Summary */}
              {activeView === "month" && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Monthly Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Monthly Summary:</span> 84
                      Meals
                    </p>
                    <p>
                      <span className="font-medium">Total:</span> 39200 Calories
                    </p>
                    <div className="mt-4">
                      <p className="font-medium mb-2">
                        Aggregated Choices for the Month
                      </p>
                      <p>Jollof Rice with Chicken: 800</p>
                      <p>Fried Rice: 600</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Event Summary */}
              {isEventMode && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
                  <h3 className="text-lg font-semibold mb-4">Event Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Event Summary:</span> 10
                      Dishes
                    </p>
                    <p>
                      <span className="font-medium">Total:</span> 6000 Calories
                    </p>
                    <div className="mt-4">
                      <p className="font-medium mb-2">
                        Aggregated Choices for the Event
                      </p>
                      <p>Amala & Ewedu: 36</p>
                      <p>Fruit Salad: 30</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <div className="space-y-4">
              <button className="w-full flex items-center gap-2 text-teal-600 hover:text-teal-800 p-2 rounded hover:bg-teal-50">
                <Plus size={16} />
                Create Menu
              </button>

              <button
                onClick={() => router.push("/dashboard/favorites")}
                className="w-full flex items-center gap-2 text-teal-600 hover:text-teal-800 p-2 rounded hover:bg-teal-50"
              >
                <Users size={16} />
                Favorites
              </button>

              <button className="w-full flex items-center gap-2 text-teal-600 hover:text-teal-800 p-2 rounded hover:bg-teal-50">
                <Calendar size={16} />
                Diet Plans
              </button>

              <button className="w-full flex items-center gap-2 text-teal-600 hover:text-teal-800 p-2 rounded hover:bg-teal-50">
                <Filter size={16} />
                Share Menu
              </button>

              {/* Filters */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Filter by Category
                </h4>
                <div className="space-y-2">
                  {Object.keys(filters.category).map((filter) => (
                    <label key={filter} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.category[filter]}
                        onChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            category: {
                              ...prev.category,
                              [filter]: !prev.category[filter],
                            },
                          }))
                        }
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="capitalize text-sm text-gray-700">
                        {filter.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Filter by Menu Type
                </h4>
                <div className="space-y-2">
                  {Object.keys(filters.menuType).map((filter) => (
                    <label key={filter} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.menuType[filter]}
                        onChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            menuType: {
                              ...prev.menuType,
                              [filter]: !prev.menuType[filter],
                            },
                          }))
                        }
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="capitalize text-sm text-gray-700">
                        {filter}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Item Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
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
                      setNewItem((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
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
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
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
                      setNewItem((prev) => ({ ...prev, time: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
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
                        category: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
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
                      setNewItem((prev) => ({ ...prev, image: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="🍽️"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={addMealItem}
                  className="flex-1 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Add Item
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
