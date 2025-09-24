"use client";

import { useState, useEffect } from "react"; // ✅ added useEffect
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Clock, Trash2, Heart, Loader2 } from "lucide-react";
import { useFavorites } from "../hooks/useFavourite"; // Adjust path as needed

// Define a recipe type
interface Recipe {
  id: string;
  title: string;
  image: string;
  cookTime: number;
  rating: number;
  addedAt: string;
  category?: string;
}

const FavoritesPage = () => {
  const router = useRouter();
  const {
    favorites,
    isLoading,
    isClient,
    removeFromFavorites,
    sortFavorites,
    clearAllFavorites,
    favoritesCount,
  } = useFavorites();

  const [sortBy, setSortBy] = useState("recently-added");
  const [sortedFavorites, setSortedFavorites] = useState<Recipe[]>([]); // ✅ typed array

  // Update sorted favorites when favorites change or sort option changes
  useEffect(() => {
    setSortedFavorites(sortFavorites(sortBy));
  }, [favorites, sortBy, sortFavorites]);

  // Sorting handler
  const handleSort = (value: string) => {
    setSortBy(value);
  };

  // Delete handler
  const handleDeleteFavorite = (id: string) => {
    removeFromFavorites(id);
  };

  // Navigate to recipe
  const handleViewRecipe = (id: string) => {
    router.push(`/recipe/${id}`);
  };

  // Clear all favorites
  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all favorites?")) {
      clearAllFavorites();
    }
  };

  // Star rendering
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? "text-orange-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  // Loading state
  if (isLoading || !isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-teal-600" />
          <p className="text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-lg font-bold text-[#333333] mb-2">
              Your Favorites ({favoritesCount})
            </h1>
            <p className="text-gray-600">All your saved recipes in one place</p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-[#828282] mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="block w-48 px-3 py-2 border text-[#000000B2] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-sm"
              >
                <option value="recently-added">Recently Added</option>
                <option value="alphabetically">Alphabetically</option>
                <option value="cook-time">Cook Time</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Clear All Button */}
            {favoritesCount > 0 && (
              <div className="relative">
                <label className="block text-sm font-medium text-transparent mb-2">
                  Actions
                </label>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 hover:border-red-300 rounded-md transition-colors duration-200 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recipe Grid */}
        {sortedFavorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedFavorites.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Recipe Image */}
                <div className="relative h-48 bg-gray-200">
                  {/* ✅ Next.js Image does not support `onError` with fallback directly.
                      Use `onLoadingComplete` with a state fallback instead */}
                  <Image
                    src={recipe.image || "/api/placeholder/400/250"}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => handleDeleteFavorite(recipe.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-all duration-200 group"
                    aria-label="Remove from favorites"
                  >
                    <Heart
                      size={20}
                      className="text-red-500 fill-current group-hover:scale-110 transition-transform"
                    />
                  </button>

                  {/* Category Badge */}
                  {recipe.category && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 rounded-full">
                        {recipe.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Recipe Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {recipe.title}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={16} className="mr-1" />
                      {recipe.cookTime} mins
                    </div>
                    <div className="flex items-center">
                      {renderStars(recipe.rating)}
                    </div>
                  </div>

                  {/* Added date */}
                  <div className="text-xs text-gray-400 mb-3">
                    Added {new Date(recipe.addedAt).toLocaleDateString()}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteFavorite(recipe.id)}
                      className="flex items-center justify-center px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 text-sm font-medium border border-gray-200 hover:border-red-200 flex-1"
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </button>
                    <button
                      onClick={() => handleViewRecipe(recipe.id)}
                      className="px-4 py-2 bg-[#008080] hover:bg-teal-700 text-white rounded-md transition-colors duration-200 text-sm font-medium flex-1"
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Heart size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start adding recipes to your favorites to see them here
            </p>
            <button
              onClick={() => router.push("/recipes")}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium transition-colors duration-200"
            >
              Browse Recipes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
