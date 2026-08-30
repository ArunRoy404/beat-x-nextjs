import { MoreVertical } from "lucide-react"

const SongRow = ({ song }) => {
    return (
        <div className="flex flex-1 items-center gap-4">
            <img alt={song.title} src={song.art} className="size-15 shrink-0 rounded-2xl object-cover" />
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
                <span className="truncate text-lg font-semibold text-whitetext sm:text-2xl">{song.title}</span>
                <span className="truncate text-sm text-light-gray sm:text-base">{song.subtitle}</span>
            </div>
            <div className="flex shrink-0 flex-col items-center gap-2">
                <span className="text-sm text-secondary sm:text-base">{song.duration}</span>
                <MoreVertical className="size-4 text-light-gray" />
            </div>
        </div>
    )
}

export default SongRow
