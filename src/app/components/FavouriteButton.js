// components/FavoriteButton.js
("use client");

import { Heart } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";

export const FavoriteButton = ({
  recipe,
  size = "md",
  variant = "default",
  redirectOnAdd = false,
  showText = false,
  className = "",
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isRecipeFavorited = isFavorite(recipe.id);

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling if button is inside a card
    toggleFavorite(recipe, redirectOnAdd);
  };

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const baseClasses = `
    ${sizeClasses[size]} 
    rounded-full 
    transition-all 
    duration-200 
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2
    ${className}
  `;

  if (variant === "floating") {
    return (
      <button
        onClick={handleClick}
        className={`
          ${baseClasses}
          absolute top-3 right-3 z-10
          ${
            isRecipeFavorited
              ? "bg-white shadow-md hover:bg-gray-50"
              : "bg-white/80 hover:bg-white shadow-sm"
          }
          focus:ring-red-500
        `}
        aria-label={
          isRecipeFavorited ? "Remove from favorites" : "Add to favorites"
        }
      >
        <Heart
          size={iconSizes[size]}
          className={`
            transition-all duration-200
            ${
              isRecipeFavorited
                ? "text-red-500 fill-current scale-110"
                : "text-gray-600 hover:text-red-500"
            }
          `}
        />
      </button>
    );
  }

  if (variant === "button") {
    return (
      <button
        onClick={handleClick}
        className={`
          ${baseClasses}
          flex items-center gap-2
          ${
            isRecipeFavorited
              ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
              : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-red-500"
          }
          focus:ring-red-500
          px-4 py-2 rounded-md font-medium text-sm
        `}
      >
        <Heart
          size={iconSizes[size]}
          className={`
            transition-all duration-200
            ${isRecipeFavorited ? "fill-current" : ""}
          `}
        />
        {showText && (
          <span>{isRecipeFavorited ? "Favorited" : "Add to Favorites"}</span>
        )}
      </button>
    );
  }

  // Default variant
  return (
    <button
      onClick={handleClick}
      className={`
        ${baseClasses}
        ${
          isRecipeFavorited
            ? "text-red-500 hover:text-red-600"
            : "text-gray-400 hover:text-red-500"
        }
        hover:bg-red-50
        focus:ring-red-500
      `}
      aria-label={
        isRecipeFavorited ? "Remove from favorites" : "Add to favorites"
      }
    >
      <Heart
        size={iconSizes[size]}
        className={`
          transition-all duration-200
          ${isRecipeFavorited ? "fill-current scale-110" : ""}
        `}
      />
    </button>
  );
};
