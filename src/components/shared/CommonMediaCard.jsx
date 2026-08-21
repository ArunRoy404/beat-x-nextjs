import { cn } from "@/lib/utils"

const CommonMediaCard = ({ art, title, subtitle, className, imgClassName, shadow = false }) => {
    return (
        <div className={cn("flex min-w-0 flex-col gap-2", className)}>
            <div
                className={cn(
                    "w-full overflow-hidden rounded-[16px]",
                    shadow && "shadow-[0px_0px_10px_0px_rgba(204,151,255,0.2)]",
                    imgClassName
                )}
            >
                <img alt={title} src={art} className="h-full w-full object-cover" />
            </div>
            <span className="truncate text-lg font-semibold text-whitetext">{title}</span>
            <span className="truncate text-sm text-light-gray">{subtitle}</span>
        </div>
    )
}

export default CommonMediaCard
