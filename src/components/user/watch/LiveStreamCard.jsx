import Link from "next/link"
import { Play } from "lucide-react"

const LiveStreamCard = ({ stream }) => {
    return (
        <Link href={`/watch/${stream.id}`} className="flex w-full flex-1 flex-col gap-4">
            <div
                className="relative flex h-[200px] w-full flex-col justify-between overflow-hidden rounded-[16px] p-4 shadow-[0px_0px_10px_0px_rgba(204,151,255,0.2)]"
                style={{ backgroundImage: `url(${stream.background})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
                <div className="absolute inset-0 bg-black/30" />
                <span className="relative w-fit rounded-2xl bg-live-badge-bg px-2 py-1 text-xs font-black text-live-badge-text">
                    LIVE
                </span>
                <div className="relative flex items-end justify-between">
                    <span className="text-xs font-bold text-whitetext">{stream.viewers}</span>
                    <span className="flex size-10 items-center justify-center rounded-full bg-(--glass-panel-bg) backdrop-blur-md">
                        <Play className="size-4 text-whitetext" fill="currentColor" />
                    </span>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <img
                    alt={stream.title}
                    src={stream.avatar}
                    className="size-12 shrink-0 rounded-full border-2 border-secondary/40 object-cover"
                />
                <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-base font-semibold text-whitetext">{stream.title}</span>
                    <span className="truncate text-sm text-light-gray">{stream.subtitle}</span>
                </div>
            </div>
        </Link>
    )
}

export default LiveStreamCard
