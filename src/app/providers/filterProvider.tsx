import { ReactNode, useState } from "react";

// Filter Provider Component
export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const activeFilterCount =
    filters.categories.length +
    (filters.priceRange.min > 0 || filters.priceRange.max < Infinity ? 1 : 0);

  return (
    <FilterContext.Provider
      value={{ filters, updateFilters, resetFilters, activeFilterCount }}
    >
      {children}
    </FilterContext.Provider>
  );
};
