import React, { useState } from "react";
import { Heart, Clock, Loader2 } from "lucide-react";
import { useFavorites } from "../hooks/useFavourite"; // Adjust path as needed

export const PopularRecipe = () => {
  const [loadMoreRecipes, setLoadMoreRecipes] = useState(false);
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    isLoading,
    isClient,
  } = useFavorites();

  const recipes = [
    {
      id: 1,
      name: "Beef Tacos with Salsa",
      image: "/images/060e1f6ada2746f4d25b58aa0c44d00867c96940.png",
      duration: "25 mins",
      rating: 3,
      category: "Mexican",
    },
    {
      id: 2,
      name: "Spaghetti Carbonara",
      image: "/images/300dc7e941ad08343e6b2d21f06d852ad7e94224.png",
      duration: "25 mins",
      rating: 3,
      category: "Italian",
    },
    {
      id: 3,
      name: "Chicken Fajitas",
      image: "/images/789313d3a5b1206893a14d90ccc4fe15f75a8d3e.png",
      duration: "30 mins",
      rating: 4,
      category: "Mexican",
    },
    {
      id: 4,
      name: "Beef Stir Fry",
      image: "/images/f54ec138b947e0220876fe93babd7ef2a680c834.png",
      duration: "20 mins",
      rating: 4,
      category: "Asian",
    },
    {
      id: 5,
      name: "Margherita Pizza",
      image: "/images/060e1f6ada2746f4d25b58aa0c44d00867c96940.png",
      duration: "45 mins",
      rating: 5,
      category: "Italian",
    },
    {
      id: 6,
      name: "Caesar Salad",
      image: "/images/f54ec138b947e0220876fe93babd7ef2a680c834.png",
      duration: "15 mins",
      rating: 3,
      category: "Salad",
    },
    {
      id: 7,
      name: "Chicken Curry",
      image: "/images/300dc7e941ad08343e6b2d21f06d852ad7e94224.png",
      duration: "40 mins",
      rating: 4,
      category: "Indian",
    },
    {
      id: 8,
      name: "Fish and Chips",
      image: "/images/f54ec138b947e0220876fe93babd7ef2a680c834.png",
      duration: "35 mins",
      rating: 4,
      category: "British",
    },
    {
      id: 9,
      name: "Pad Thai",
      image: "/images/f54ec138b947e0220876fe93babd7ef2a680c834.png",
      duration: "25 mins",
      rating: 4,
      category: "Thai",
    },
    {
      id: 10,
      name: "Greek Salad",
      image: "/images/060e1f6ada2746f4d25b58aa0c44d00867c96940.png",
      duration: "10 mins",
      rating: 3,
      category: "Greek",
    },
    {
      id: 11,
      name: "Mushroom Risotto",
      image: "/images/f54ec138b947e0220876fe93babd7ef2a680c834.png",
      duration: "50 mins",
      rating: 5,
      category: "Italian",
    },
    {
      id: 12,
      name: "BBQ Ribs",
      image: "/images/300dc7e941ad08343e6b2d21f06d852ad7e94224.png",
      duration: "2 hours",
      rating: 5,
      category: "American",
    },
    {
      id: 13,
      name: "Chicken Wings",
      image: "/images/f54ec138b947e0220876fe93babd7ef2a680c834.png",
      duration: "30 mins",
      rating: 4,
      category: "American",
    },
  ];

  const moreRecipes = [
    {
      id: 14,
      name: "Vegetable Stir Fry",
      image: "/images/060e1f6ada2746f4d25b58aa0c44d00867c96940.png",
      duration: "20 mins",
      rating: 3,
      category: "Vegetarian",
    },
    {
      id: 15,
      name: "Lasagna",
      image: "/images/300dc7e941ad08343e6b2d21f06d852ad7e94224.png",
      duration: "1 hour",
      rating: 5,
      category: "Italian",
    },
    {
      id: 16,
      name: "Chicken Quesadilla",
      image: "/images/789313d3a5b1206893a14d90ccc4fe15f75a8d3e.png",
      duration: "15 mins",
      rating: 4,
      category: "Mexican",
    },
    {
      id: 17,
      name: "Beef Burger",
      image: "/images/f54ec138b947e0220876fe93babd7ef2a680c834.png",
      duration: "25 mins",
      rating: 4,
      category: "American",
    },
    {
      id: 18,
      name: "Chicken Soup",
      image: "/images/060e1f6ada2746f4d25b58aa0c44d00867c96940.png",
      duration: "45 mins",
      rating: 4,
      category: "Comfort Food",
    },
    {
      id: 19,
      name: "Shrimp Scampi",
      image: "/images/f54ec138b947e0220876fe93babd7ef2a680c834.png",
      duration: "20 mins",
      rating: 4,
      category: "Italian",
    },
    {
      id: 20,
      name: "Taco Salad",
      image: "/images/300dc7e941ad08343e6b2d21f06d852ad7e94224.png",
      duration: "15 mins",
      rating: 3,
      category: "Mexican",
    },
    {
      id: 21,
      name: "Grilled Salmon",
      image: "/images/f54ec138b947e0220876fe93babd7ef2a680c834.png",
      duration: "25 mins",
      rating: 5,
      category: "Seafood",
    },
    {
      id: 22,
      name: "Chicken Parmesan",
      image: "/images/f54ec138b947e0220876fe93babd7ef2a680c834.png",
      duration: "35 mins",
      rating: 4,
      category: "Italian",
    },
    {
      id: 23,
      name: "French Toast",
      image: "/images/060e1f6ada2746f4d25b58aa0c44d00867c96940.png",
      duration: "15 mins",
      rating: 4,
      category: "Breakfast",
    },
    {
      id: 24,
      name: "Beef Stroganoff",
      image: "/images/f54ec138b947e0220876fe93babd7ef2a680c834.png",
      duration: "40 mins",
      rating: 4,
      category: "Russian",
    },
    {
      id: 25,
      name: "Chicken Alfredo",
      image: "/images/300dc7e941ad08343e6b2d21f06d852ad7e94224.png",
      duration: "30 mins",
      rating: 4,
      category: "Italian",
    },
    {
      id: 26,
      name: "Pancakes",
      image: "/images/f54ec138b947e0220876fe93babd7ef2a680c834.png",
      duration: "20 mins",
      rating: 4,
      category: "Breakfast",
    },
  ];

  function handleLoadMoreRecipes() {
    setLoadMoreRecipes((prev) => !prev);
  }

  const displayedRecipes = loadMoreRecipes
    ? [...recipes, ...moreRecipes]
    : recipes;

  const toggleFavorite = (recipe: any) => {
    if (!recipe || !recipe.id) {
      console.error("Invalid recipe data:", recipe);
      return;
    }

    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < rating ? "text-orange-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  // Show loading state while favorites are being loaded
  if (isLoading || !isClient) {
    return (
      <div className="w-full max-w-8xl mx-auto p-2">
        <h2 className="text-[20px] font-semibold text-gray-800 mb-6 md:mb-8">
          Popular Recipe
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="h-48 md:h-52 lg:h-56 bg-gray-200 animate-pulse" />
              <div className="p-4 md:p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-8xl mx-auto p-2">
      {/* Header */}
      <h2 className="text-[20px] font-semibold text-gray-800 mb-6 md:mb-8">
        Popular Recipe
      </h2>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {displayedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 md:h-52 lg:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.currentTarget;
                  target.src = "/api/placeholder/400/250";
                }}
              />

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(recipe)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-sm"
                aria-label={
                  isFavorite(recipe.id)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                <Heart
                  className={`w-4 h-4 transition-all duration-200 ${
                    isFavorite(recipe.id)
                      ? "text-red-500 fill-current scale-110"
                      : "text-gray-400 hover:text-red-400 hover:scale-110"
                  }`}
                />
              </button>

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 rounded-full">
                  {recipe.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-5">
              {/* Recipe Title */}
              <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-3 line-clamp-2 leading-tight">
                {recipe.name}
              </h3>

              {/* Duration and Rating */}
              <div className="flex items-center justify-between">
                {/* Duration */}
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{recipe.duration}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {renderStars(recipe.rating)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8 md:mt-12">
        <button
          onClick={handleLoadMoreRecipes}
          className="px-8 py-3 bg-[#008080] text-white font-medium rounded-xl hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {loadMoreRecipes ? "Show Less Recipes" : "Load More Recipes"}
        </button>
      </div>
    </div>
  );
};

export default PopularRecipe;
