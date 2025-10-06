import { useState, useMemo } from "react";
import { ShoppingItem } from "@/app/types";

export interface FilterOptions {
  categories: string[];
  priceRange: { min: number; max: number };
  sortBy: "name" | "price" | "quantity" | "category";
  sortOrder: "asc" | "desc";
}

interface UseItemsFilterOptions {
  items: ShoppingItem[];
  searchTerm: string;
  additionalFilter?: (item: ShoppingItem) => boolean;
}

export const useItemsFilter = ({
  items,
  searchTerm,
  additionalFilter,
}: UseItemsFilterOptions) => {
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: { min: 0, max: Infinity },
    sortBy: "name",
    sortOrder: "asc",
  });

  // Get unique categories from items
  const availableCategories = useMemo(() => {
    return [
      ...new Set(
        items
          .map((item) => item.category)
          .filter((category): category is string => Boolean(category))
      ),
    ];
  }, [items]);

  // Apply filters and search
  const filteredItems = useMemo(() => {
    let filtered = items.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const passesAdditionalFilter = additionalFilter
        ? additionalFilter(item)
        : true;
      return matchesSearch && passesAdditionalFilter;
    });

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(
        (item) => item.category && filters.categories.includes(item.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter((item) => {
      if (!item.price) return true;
      return (
        item.price >= filters.priceRange.min &&
        item.price <= filters.priceRange.max
      );
    });

    // Sort items
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = (a.price || 0) - (b.price || 0);
          break;
        case "quantity":
          comparison = a.quantity - b.quantity;
          break;
        case "category":
          comparison = (a.category || "").localeCompare(b.category || "");
          break;
      }

      return filters.sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [items, searchTerm, filters, additionalFilter]);

  return {
    filters,
    setFilters,
    filteredItems,
    availableCategories,
  };
};
