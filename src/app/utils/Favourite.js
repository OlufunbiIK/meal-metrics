// utils/favorites.js
export const favoritesStorage = {
  getFavorites: () => {
    try {
      const favorites = localStorage.getItem("recipe-favorites");
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error("Error getting favorites:", error);
      return [];
    }
  },

  saveFavorites: (favorites) => {
    try {
      localStorage.setItem("recipe-favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  },

  addFavorite: (recipe) => {
    const favorites = favoritesStorage.getFavorites();
    const exists = favorites.some((fav) => fav.id === recipe.id);

    if (!exists) {
      const favoriteItem = {
        ...recipe,
        addedAt: new Date().toISOString(),
      };
      favorites.unshift(favoriteItem);
      favoritesStorage.saveFavorites(favorites);
      return true;
    }
    return false;
  },

  removeFavorite: (recipeId) => {
    const favorites = favoritesStorage.getFavorites();
    const filtered = favorites.filter((fav) => fav.id !== recipeId);
    favoritesStorage.saveFavorites(filtered);
    return filtered.length !== favorites.length;
  },

  isFavorite: (recipeId) => {
    const favorites = favoritesStorage.getFavorites();
    return favorites.some((fav) => fav.id === recipeId);
  },
};
