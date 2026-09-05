import { ArrowRight } from "lucide-react"

const AlbumsHeader = ({ totalCollection, recentAdditions }) => {
    return (
        <div className="flex w-full flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
                <h1 className="text-2xl text-whitetext sm:text-[32px]">Albums</h1>
                <button type="button" className="hidden shrink-0 cursor-pointer items-center gap-2 text-sm text-secondary sm:flex sm:text-base">
                    View All Collections
                    <ArrowRight className="size-4" />
                </button>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
                <span className="border-r border-dark-gray pr-3 font-semibold text-secondary sm:pr-6">
                    Total Collection: {totalCollection}
                </span>
                <span className="font-semibold text-light-gray">{recentAdditions} Recent Additions</span>
            </div>
        </div>
    )
}

export default AlbumsHeader
