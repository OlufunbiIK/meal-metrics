import React, { useState, useEffect } from "react";
import { Search, X, Edit3, Trash2 } from "lucide-react";
import { Pagination } from "./Pagination";

// Define MealPlan type
interface MealPlan {
  id: number;
  name: string;
  mealTime: string;
  ingredients: string;
  image: string;
  storageLocation: string;
}

interface MealPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

// Props for MealCard
interface MealCardProps {
  meal: MealPlan;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    <img
      src={meal.image}
      alt={meal.name}
      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
    />
    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-gray-900 text-lg mb-1">{meal.name}</h3>
      <p className="text-gray-600 text-sm mb-2">Meal Time: {meal.mealTime}</p>
      <p className="text-gray-700 text-sm">
        <span className="font-medium">Ingredients:</span> {meal.ingredients}
      </p>
    </div>
    <div className="flex flex-col gap-2">
      <button
        onClick={() => onEdit(meal.id)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Edit3 className="w-5 h-5 text-gray-600" />
      </button>
      <button
        onClick={() => onDelete(meal.id)}
        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 className="w-5 h-5 text-red-500" />
      </button>
    </div>
  </div>
);

const MealPlansModal: React.FC<MealPlansModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([
    {
      id: 1,
      name: "Jollof Rice",
      mealTime: "1pm",
      ingredients: "Rice, tomatoes, bell peppers, onions, chicken",
      image: "/images/side-view-pilaf-with-stewed-beef-meat-plate.jpg",
      storageLocation: "Freezer",
    },
    {
      id: 2,
      name: "Egusi Soup",
      mealTime: "5pm",
      ingredients: "Melon seeds, spinach, assorted meat, stockfish",
      image: "/images/321a3a968ae71fe9c2042c2a2111583048599cca.png",
      storageLocation: "Freezer",
    },
  ]);

  const handleDelete = (id: number) => {
    setMealPlans((prev) => prev.filter((meal) => meal.id !== id));
    onDelete?.(id);
  };

  const handleEdit = (id: number) => {
    onEdit?.(id);
    console.log("Edit meal:", id);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const filteredMealPlans = mealPlans.filter(
    (meal) =>
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[100%] transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-3xl shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-48 border-r border-gray-200 p-6 flex flex-col">
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-8 hover:bg-gray-200 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-[20px] font-semibold text-gray-900">
                  All Meal Plans
                </h1>
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search meal plans..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-68 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Meal Plans List */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                {filteredMealPlans.map((meal) => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>

            {/* Pagination */}
            <Pagination
              totalPages={10}
              onPageChange={(p: any) => console.log("Page:", p)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlansModal;
