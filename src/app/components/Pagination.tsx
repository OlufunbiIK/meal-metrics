import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalEntries: number;
  entriesPerPage: number;
  onPageChange: (page: number) => void;
  onEntriesPerPageChange?: (entriesPerPage: number) => void;
  showEntriesSelector?: boolean;
  entriesOptions?: number[];
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalEntries,
  entriesPerPage,
  onPageChange,
  onEntriesPerPageChange,
  showEntriesSelector = true,
  entriesOptions = [5, 10, 20, 50],
  className = "",
}) => {
  // Calculate visible page numbers
  const getVisiblePages = () => {
    const delta = 1; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Always include first page
    if (totalPages > 0) range.push(1);

    // Add pages around current page
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Always include last page if there's more than one page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Remove duplicates and sort
    const uniqueRange = [...new Set(range)].sort((a, b) => a - b);

    // Add dots where there are gaps
    let prev = 0;
    for (const page of uniqueRange) {
      if (page - prev > 1) {
        rangeWithDots.push("...");
      }
      rangeWithDots.push(page);
      prev = page;
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const PageButton = ({
    page,
    isActive = false,
    disabled = false,
    children,
    onClick,
  }: {
    page?: number;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        min-w-[40px] mt-4 mb-4 h-10 px-3 text-sm font-medium transition-colors duration-200 border border-gray-300
        flex items-center justify-center
        ${
          isActive
            ? "bg-[#F9FAFB] text-black border-[#F9FAFB] shadow-sm z-10 relative"
            : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800"
        }
        ${
          disabled
            ? "opacity-50 cursor-not-allowed hover:bg-white hover:text-gray-600"
            : "cursor-pointer"
        }
        first:rounded-l-md last:rounded-r-md -ml-px first:ml-0
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:z-10
      `}
    >
      {children}
    </button>
  );

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between p-8">
        {/* Left: Entries info */}
        <div className="text-[#5B5B5B] text-[12px]">
          Showing {startEntry}-{endEntry} of {totalEntries} entries
        </div>

        {/* Center: Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center">
            <div className="inline-flex">
              {/* Previous button */}
              <PageButton
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </div>
              </PageButton>

              {/* Page numbers */}
              {visiblePages.map((page, index) => {
                if (page === "...") {
                  return (
                    <div
                      key={`dots-${index}`}
                      className="min-w-[40px] h-10 px-3 text-sm text-[#959595] border border-[#1018280D] bg-white -ml-px flex items-center justify-center"
                    >
                      ...
                    </div>
                  );
                }
                return (
                  <PageButton
                    key={page}
                    page={page as number}
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(page as number)}
                  >
                    {page}
                  </PageButton>
                );
              })}

              {/* Next button */}
              <PageButton
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <div className="flex items-center gap-2">
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </PageButton>
            </div>
          </div>
        )}

        {/* Right: Entries selector */}
        {showEntriesSelector && onEntriesPerPageChange && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-[#5B5B5B]">Show</span>
            <div className="relative">
              <select
                value={entriesPerPage}
                onChange={(e) =>
                  onEntriesPerPageChange(parseInt(e.target.value))
                }
                className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                {entriesOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <span className="text-[#5B5B5B]">entries</span>
          </div>
        )}
      </div>

      {/* Tablet Layout */}
      <div className="hidden md:flex lg:hidden flex-col gap-4">
        {/* Top row: Entries info and selector */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startEntry}-{endEntry} of {totalEntries} entries
          </div>

          {showEntriesSelector && onEntriesPerPageChange && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Show</span>
              <div className="relative">
                <select
                  value={entriesPerPage}
                  onChange={(e) =>
                    onEntriesPerPageChange(parseInt(e.target.value))
                  }
                  className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  {entriesOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <span>entries</span>
            </div>
          )}
        </div>

        {/* Bottom row: Pagination controls centered */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <div className="inline-flex shadow-sm rounded-md">
              <PageButton
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <div className="flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </div>
              </PageButton>

              {visiblePages.map((page, index) => {
                if (page === "...") {
                  return (
                    <div
                      key={`dots-${index}`}
                      className="min-w-[40px] h-10 px-3 text-sm text-gray-500 border border-gray-300 bg-white -ml-px flex items-center justify-center"
                    >
                      ...
                    </div>
                  );
                }
                return (
                  <PageButton
                    key={page}
                    page={page as number}
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(page as number)}
                  >
                    {page}
                  </PageButton>
                );
              })}

              <PageButton
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <div className="flex items-center gap-1">
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </PageButton>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col gap-3">
        {/* Entries info */}
        <div className="text-center text-sm text-gray-600">
          Showing {startEntry}-{endEntry} of {totalEntries} entries
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <div className="inline-flex shadow-sm rounded-md">
              <PageButton
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </PageButton>

              <div className="min-w-[80px] h-10 px-3 text-sm font-medium bg-[#F9FAFB] text-white border border-[#F9FAFB] -ml-px flex items-center justify-center">
                {currentPage} of {totalPages}
              </div>

              <PageButton
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </PageButton>
            </div>
          </div>
        )}

        {/* Entries selector */}
        {showEntriesSelector && onEntriesPerPageChange && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>Show</span>
            <div className="relative">
              <select
                value={entriesPerPage}
                onChange={(e) =>
                  onEntriesPerPageChange(parseInt(e.target.value))
                }
                className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                {entriesOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <span>entries</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
