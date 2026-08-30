import SongRow from "@/components/user/artist/songs/SongRow"

const BestSongsList = ({ section }) => {
    return (
        <div className="flex w-full flex-col gap-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-whitetext sm:text-2xl">{section.title}</h3>
                <span className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">{section.viewAllLabel}</span>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {section.items.map((song) => (
                    <SongRow key={song.id} song={song} />
                ))}
            </div>
        </div>
    )
}

export default BestSongsList
