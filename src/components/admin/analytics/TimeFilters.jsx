import React from "react";
import { cn } from "@/lib/utils";

const TimeFilters = ({ activeFilter = "7D", onChange }) => {
  const filters = ["7D", "30D", "3M", "6M", "1Y"];

  const handleSelect = (filter) => {
    if (onChange) onChange(filter);
  };

  return (
    <div className="flex items-center gap-2 select-none">
      {filters.map((filter) => {
        const isActive = activeFilter.toUpperCase() === filter.toUpperCase();
        return (
          <button
            key={filter}
            type="button"
            onClick={() => handleSelect(filter)}
            className={cn(
              "px-3 py-1.5 rounded-[6px] text-xs font-semibold cursor-pointer transition-all duration-200",
              isActive
                ? "bg-[#1E245766] border border-secondary text-secondary"
                : "border border-border text-light-gray hover:text-whitetext hover:bg-white/5"
            )}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};

export default TimeFilters;
