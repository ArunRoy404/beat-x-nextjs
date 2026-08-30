import { Headphones, Play, Plus } from "lucide-react"

const RecentEpisodesList = ({ section }) => {
    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-whitetext sm:text-2xl">{section.title}</h3>
                <span className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">{section.viewAllLabel}</span>
            </div>
            <div className="flex flex-col gap-4">
                {section.items.map((episode) => (
                    <div key={episode.id} className="flex w-full items-center gap-2 rounded-2xl bg-(--modal-footer-bg) px-4 py-2">
                        <img alt={episode.title} src={episode.art} className="size-20 shrink-0 rounded-2xl object-cover" />
                        <div className="flex min-w-0 flex-1 flex-col gap-1 pt-1">
                            <span className="truncate text-lg font-semibold text-whitetext sm:text-2xl">{episode.title}</span>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm whitespace-nowrap text-light-gray sm:text-base">{episode.meta}</span>
                                <span className="flex items-center gap-1">
                                    <Headphones className="size-4 text-light-gray" />
                                    <span className="text-sm text-light-gray sm:text-base">{episode.listens}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-4">
                            <Plus className="size-5 text-whitetext" />
                            <span className="flex size-12 items-center justify-center rounded-full border border-dark-gray p-px">
                                <Play className="size-5 text-whitetext" fill="currentColor" />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentEpisodesList
