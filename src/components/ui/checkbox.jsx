"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({ className, checked, defaultChecked, onCheckedChange, ...props }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "peer size-[18px] shrink-0 rounded-[6px] border border-light-gray/30 bg-light-gray/10 outline-none transition-all cursor-pointer flex items-center justify-center",
        "data-checked:bg-secondary data-checked:border-secondary",
        "focus-visible:ring-2 focus-visible:ring-ring/30",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-primary-foreground"
      >
        <Check className="size-3 stroke-[3px]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
