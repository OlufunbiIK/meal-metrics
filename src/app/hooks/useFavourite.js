import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export const useFavorites = (showToast) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load favorites from localStorage on mount (client-side only)
  useEffect(() => {
    if (!isClient) return;

    try {
      const savedFavorites = localStorage.getItem("recipe-favorites");
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        // Convert addedAt strings back to Date objects if needed
        const favoritesWithDates = parsedFavorites.map((fav) => ({
          ...fav,
          addedAt: new Date(fav.addedAt),
        }));
        setFavorites(favoritesWithDates);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
      // Clear corrupted data
      localStorage.removeItem("recipe-favorites");
      if (showToast) {
        showToast("Error loading favorites", "error");
      }
    } finally {
      setIsLoading(false);
    }
  }, [isClient, showToast]);

  const sortFavorites = useCallback(
    (sortBy) => {
      switch (sortBy) {
        case "alphabetically":
          return [...favorites].sort((a, b) => a.title.localeCompare(b.title));
        case "cook-time":
          return [...favorites].sort((a, b) => a.cookTime - b.cookTime);
        case "rating":
          return [...favorites].sort((a, b) => b.rating - a.rating);
        case "recently-added":
        default:
          return [...favorites].sort(
            (a, b) =>
              new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
          );
      }
    },
    [favorites] // ✅ only re-create when favorites changes
  );

  // Save favorites to localStorage whenever favorites change (client-side only)
  useEffect(() => {
    if (!isLoading && isClient && favorites.length >= 0) {
      try {
        localStorage.setItem("recipe-favorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Error saving favorites:", error);
        if (showToast) {
          showToast("Error saving favorites", "error");
        }
      }
    }
  }, [favorites, isLoading, isClient, showToast]);

  const addToFavorites = (recipe, redirectToFavorites = false) => {
    if (!recipe || !recipe.id) {
      console.error("Invalid recipe data:", recipe);
      if (showToast) {
        showToast("Error adding to favorites", "error");
      }
      return;
    }

    const favoriteItem = {
      id: recipe.id,
      title: recipe.name || recipe.title, // Handle both 'name' and 'title' properties
      image: recipe.image,
      cookTime:
        typeof recipe.duration === "string"
          ? parseInt(recipe.duration.replace(/\D/g, "")) || 25 // Extract numbers from "25 mins"
          : recipe.cookTime || recipe.duration || 25,
      rating: recipe.rating || 0,
      category: recipe.category || "General",
      addedAt: new Date(),
    };

    setFavorites((prev) => {
      // Check if already exists
      const exists = prev.some((fav) => fav.id === recipe.id);
      if (exists) {
        if (showToast) {
          showToast(
            `"${recipe.name || recipe.title}" is already in favorites`,
            "error"
          );
        }
        return prev;
      }

      // Show success toast
      if (showToast) {
        showToast(
          `Added "${recipe.name || recipe.title}" to favorites`,
          "favorite-added"
        );
      }

      return [favoriteItem, ...prev];
    });

    // Redirect to favorites page if requested
    if (redirectToFavorites) {
      setTimeout(() => {
        router.push("/dashboard/favorites");
      }, 500);
    }
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites((prev) => {
      const filteredFavorites = prev.filter((fav) => fav.id !== recipeId);
      const removedItem = prev.find((fav) => fav.id === recipeId);

      if (removedItem && showToast) {
        showToast(
          `Removed "${removedItem.title}" from favorites`,
          "favorite-removed"
        );
      }

      return filteredFavorites;
    });
  };

  const isFavorite = (recipeId) => {
    return favorites.some((fav) => fav.id === recipeId);
  };

  const toggleFavorite = (recipe, redirectToFavorites = false) => {
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe, redirectToFavorites);
    }
  };

  const clearAllFavorites = () => {
    const count = favorites.length;
    setFavorites([]);

    if (showToast && count > 0) {
      showToast(`Cleared all ${count} favorites`, "success");
    }
  };

  const getFavoriteById = (recipeId) => {
    return favorites.find((fav) => fav.id === recipeId);
  };

  return {
    favorites,
    isLoading,
    isClient,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearAllFavorites,
    getFavoriteById,
    favoritesCount: favorites.length,
    sortFavorites,
  };
};
