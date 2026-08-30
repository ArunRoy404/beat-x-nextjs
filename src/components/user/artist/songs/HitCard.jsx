import { Play } from "lucide-react"

const HitCard = ({ hit }) => {
    return (
        <div className="flex w-full flex-1 flex-col gap-4">
            <div
                className="relative flex h-50 w-full flex-col justify-between overflow-hidden rounded-[16px] p-4 shadow-[0px_0px_10px_0px_rgba(204,151,255,0.2)]"
                style={{ backgroundImage: `url(${hit.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
                <div className="absolute inset-0 bg-black/30" />
                <span className="relative text-2xl font-black text-secondary">#{hit.rank}</span>
                <div className="relative flex items-end justify-end">
                    <span className="flex size-10 items-center justify-center rounded-full bg-(--glass-panel-bg) backdrop-blur-md">
                        <Play className="size-4 text-whitetext" fill="currentColor" />
                    </span>
                </div>
            </div>
            <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-base font-semibold text-whitetext">{hit.title}</span>
                <span className="truncate text-sm text-light-gray">{hit.subtitle}</span>
            </div>
        </div>
    )
}

export default HitCard
