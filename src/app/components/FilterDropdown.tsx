import { useState } from "react";
import { Filter, X, Check } from "lucide-react";
import { TiArrowSortedDown } from "react-icons/ti";

export interface FilterOptions {
  categories: string[];
  priceRange: { min: number; max: number };
  sortBy: "name" | "price" | "quantity" | "category";
  sortOrder: "asc" | "desc";
}

interface FilterDropdownProps {
  availableCategories: string[];
  filters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
  showPriceRange?: boolean;
  showCategories?: boolean;
  showSort?: boolean;
}

export const FilterDropdown = ({
  availableCategories,
  filters,
  onApplyFilters,
  showPriceRange = true,
  showCategories = true,
  showSort = true,
}: FilterDropdownProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Local filter states
  const [localCategories, setLocalCategories] = useState<string[]>(
    filters.categories
  );
  const [localPriceMin, setLocalPriceMin] = useState<number>(
    filters.priceRange.min
  );
  const [localPriceMax, setLocalPriceMax] = useState<string>(
    filters.priceRange.max === Infinity ? "" : filters.priceRange.max.toString()
  );
  const [localSortBy, setLocalSortBy] = useState<
    "name" | "price" | "quantity" | "category"
  >(filters.sortBy);
  const [localSortOrder, setLocalSortOrder] = useState<"asc" | "desc">(
    filters.sortOrder
  );

  // Calculate active filter count
  const activeFilterCount =
    filters.categories.length +
    (filters.priceRange.min > 0 || filters.priceRange.max < Infinity ? 1 : 0);

  const toggleCategory = (category: string) => {
    setLocalCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const applyFilters = () => {
    onApplyFilters({
      categories: localCategories,
      priceRange: {
        min: localPriceMin,
        max: localPriceMax === "" ? Infinity : Number(localPriceMax),
      },
      sortBy: localSortBy,
      sortOrder: localSortOrder,
    });
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      categories: [],
      priceRange: { min: 0, max: Infinity },
      sortBy: "name",
      sortOrder: "asc",
    };

    setLocalCategories([]);
    setLocalPriceMin(0);
    setLocalPriceMax("");
    setLocalSortBy("name");
    setLocalSortOrder("asc");
    onApplyFilters(defaultFilters);
  };

  return (
    <div className="lg:flex-1 lg:flex lg:justify-end relative">
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="text-teal-600 flex flex-row items-center justify-center gap-2 hover:bg-teal-50 p-2 rounded-lg flex-shrink-0 border-[0.8px] border-[#DBDFE4] relative"
      >
        <Filter size={20} className="text-[#828282]" />
        <span className="text-xs lg:text-[12px] text-[#828282]">Filter</span>
        {activeFilterCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
        <TiArrowSortedDown className="text-[#828282]" />
      </button>

      {/* Filter Dropdown */}
      {isFilterOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-800">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            {/* Categories */}
            {showCategories && availableCategories.length > 0 && (
              <div className="mb-4">
                <label className="text-xs font-medium text-gray-700 mb-2 block">
                  Categories
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {availableCategories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={localCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                            localCategories.includes(category)
                              ? "bg-teal-600 border-teal-600"
                              : "border-gray-300"
                          }`}
                        >
                          {localCategories.includes(category) && (
                            <Check size={12} className="text-white" />
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range */}
            {showPriceRange && (
              <div className="mb-4">
                <label className="text-xs font-medium text-gray-700 mb-2 block">
                  Price Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={localPriceMin || ""}
                    onChange={(e) => setLocalPriceMin(Number(e.target.value))}
                    className="w-1/2 px-3 py-2 text-sm border text-[#333333] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={localPriceMax}
                    onChange={(e) => setLocalPriceMax(e.target.value)}
                    className="w-1/2 px-3 py-2 text-sm border text-[#333333] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            )}

            {/* Sort By */}
            {showSort && (
              <div className="mb-4">
                <label className="text-xs font-medium text-gray-700 mb-2 block">
                  Sort By
                </label>
                <div className="flex gap-2">
                  <select
                    value={localSortBy}
                    onChange={(e) =>
                      setLocalSortBy(
                        e.target.value as
                          | "name"
                          | "price"
                          | "quantity"
                          | "category"
                      )
                    }
                    className="flex-1 px-3 py-2 text-sm border text-[#333333] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="quantity">Quantity</option>
                    <option value="category">Category</option>
                  </select>
                  <select
                    value={localSortOrder}
                    onChange={(e) =>
                      setLocalSortOrder(e.target.value as "asc" | "desc")
                    }
                    className="px-3 py-2 text-sm border border-gray-300 text-[#333333] rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="asc">↑ Asc</option>
                    <option value="desc">↓ Desc</option>
                  </select>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={resetFilters}
                className="flex-1 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 px-4 py-2 text-sm text-white bg-[#008080] rounded-lg hover:bg-teal-700"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
