import React from "react"
import { cn } from "@/lib/utils"
import CommonFilterItem from "./commonFilterItem"

const CommonFilter = ({
  tabs = [],
  activeTab,
  onChange,
  className,
  children
}) => {
  return (
    <div className={cn("flex items-center gap-2 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none", className)}>
      {children
        ? children
        : tabs.map((tab) => (
            <CommonFilterItem
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onClick={() => onChange?.(tab)}
            />
          ))}
    </div>
  )
}

export default CommonFilter