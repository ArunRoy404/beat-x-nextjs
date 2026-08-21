import { cn } from "@/lib/utils"

const CommonGlassPanel = ({ children, className, ...props }) => {
    return (
        <div
            className={cn(
                "relative rounded-[16px] border border-(--glass-panel-border) bg-(--glass-panel-bg) backdrop-blur-md",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export default CommonGlassPanel
