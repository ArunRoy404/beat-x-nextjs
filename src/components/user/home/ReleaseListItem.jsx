import { cn } from "@/lib/utils"
import GradientPlayButton from "@/components/shared/GradientPlayButton"

const tagColorClass = {
    primary: "text-primary",
    secondary: "text-secondary",
}

const ReleaseListItem = ({ release }) => {
    return (
        <div className="flex flex-1 min-w-0 items-center gap-3.5 rounded-[16px] bg-(--release-item-bg) p-4">
            <div className="size-20 shrink-0 overflow-hidden rounded-[12px]">
                <img alt={release.title} src={release.art} className="h-full w-full object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="truncate text-lg text-whitetext">{release.title}</span>
                <span className="truncate text-xs text-light-gray">{release.subtitle}</span>
                <span className={cn("truncate text-xs", tagColorClass[release.tagColor])}>{release.tag}</span>
            </div>
            <GradientPlayButton size="sm" />
        </div>
    )
}

export default ReleaseListItem
