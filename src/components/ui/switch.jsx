"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  checked,
  defaultChecked,
  style,
  ...props
}) {
  const isLg = size === "lg"
  const isChecked = checked ?? defaultChecked ?? false

  const lgStyle = isLg
    ? {
      backgroundColor: isChecked ? "#22c55e" : "rgba(173, 170, 170, 0.2)",
      boxShadow:
        "0 -0.5px 1px 0 rgba(94, 94, 94, 0.30) inset, 0 -0.5px 1px 0 rgba(255, 255, 255, 0.20) inset, 0 3px 3px 0 rgba(128, 128, 128, 0.18) inset, 0 3px 3px 0 rgba(0, 0, 0, 0.15) inset",
      ...style,
    }
    : style

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      checked={checked}
      defaultChecked={defaultChecked}
      style={lgStyle}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        isLg
          ? "h-8 w-14 p-[3px]"
          : cn(
            "data-[size=default]:h-[16.6px] data-[size=default]:w-[28px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px]",
            "data-checked:bg-green-500 data-unchecked:bg-input dark:data-unchecked:bg-input/80"
          ),
        className
      )}
      {...props}>
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full ring-0 transition-transform",
          isLg
            ? cn("size-6 bg-white", isChecked ? "translate-x-[26px]" : "translate-x-0")
            : cn(
              "bg-background dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground",
              "group-data-[size=default]/switch:size-3.5 group-data-[size=sm]/switch:size-3",
              "group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)]",
              "group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0"
            )
        )} />
    </SwitchPrimitive.Root>
  );
}

export { Switch }