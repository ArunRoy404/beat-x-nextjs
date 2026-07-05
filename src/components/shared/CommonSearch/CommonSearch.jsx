import React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const CommonSearch = ({
    value,
    onChange,
    placeholder = "Search .....",
    className,
    ...props
}) => {
    return (
        <div className={cn("relative w-full md:w-72", className)}>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-light-gray" />
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 text-sm bg-transparent border border-border rounded-full text-whitetext placeholder-dark-gray focus:outline-none transition-all"
                {...props}
            />
        </div>
    )
}

export default CommonSearch