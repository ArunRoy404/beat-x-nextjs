import React from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

const CommonSearch = ({
  value,
  onChange,
  placeholder = "Search .....",
  className,
  ...props
}) => {
  return (
    <InputGroup
      className={cn(
        "w-full md:w-72 h-auto bg-transparent border border-border rounded-full text-whitetext placeholder-dark-gray focus-within:border-border",
        className
      )}
    >
      <InputGroupAddon align="inline-start" className="pl-3.5 pr-0 py-2">
        <Search className="w-4 h-4 text-light-gray" />
      </InputGroupAddon>
      <InputGroupInput
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-2 pr-4 py-2 text-sm bg-transparent text-whitetext placeholder-dark-gray focus:outline-none transition-all"
        {...props}
      />
    </InputGroup>
  )
}

export default CommonSearch