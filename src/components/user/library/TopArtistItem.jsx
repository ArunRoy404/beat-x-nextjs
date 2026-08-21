import { BadgeCheck } from "lucide-react"

const TopArtistItem = ({ artist }) => {
    return (
        <div className="flex w-full items-center gap-3.5">
            <div className="size-12 shrink-0 overflow-hidden rounded-[12px]">
                <img alt={artist.name} src={artist.avatar} className="h-full w-full object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="truncate text-lg text-whitetext">{artist.name}</span>
                <span className="truncate text-xs text-light-gray">{artist.subtitle}</span>
            </div>
            {artist.verified && <BadgeCheck className="size-6 shrink-0 text-primary" />}
        </div>
    )
}

export default TopArtistItem
