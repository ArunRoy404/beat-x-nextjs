import { cn } from "@/lib/utils"

const variantClasses = {
    filled: "bg-trending-badge-bg text-trending-badge-text",
    glass: "backdrop-blur-md bg-(--glass-panel-bg) text-whitetext",
    outline: "border border-secondary text-secondary",
    tag: "px-0 py-0",
}

const CommonPill = ({ children, variant = "filled", as: Component = "span", className, ...props }) => {
    return (
        <Component
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap text-xs",
                variant !== "tag" && "rounded-full px-3 py-1",
                variantClasses[variant],
                Component === "button" && "cursor-pointer",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    )
}

export default CommonPill
