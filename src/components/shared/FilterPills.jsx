import { cn } from "@/lib/utils"

const FilterPills = ({ filters, activeFilter, activeFilters, onChange, className, multiple = false }) => {
    const isActive = (filter) => (multiple ? activeFilters?.includes(filter) : filter === activeFilter)

    return (
        <div className={cn("flex flex-wrap items-center gap-2", className)}>
            {filters.map((filter) => (
                <button
                    key={filter}
                    type="button"
                    onClick={() => onChange(filter)}
                    className={cn(
                        "cursor-pointer rounded-full px-4 py-2 text-base transition-colors",
                        isActive(filter) ? "bg-secondary text-button-text" : "bg-dark-accent text-light-gray hover:text-whitetext"
                    )}
                >
                    {filter}
                </button>
            ))}
        </div>
    )
}

export default FilterPills
