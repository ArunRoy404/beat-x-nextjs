import { TrendingDown, TrendingUp } from "lucide-react"
import { useUserAudiobooksStore } from "@/zustandStore/user/userStore/userAudiobooksStore"

const BestsellerListPanel = () => {
    const bestsellerList = useUserAudiobooksStore((state) => state.bestsellerList)

    return (
        <div className="flex w-full flex-1 flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl text-whitetext sm:text-[32px]">Bestseller List</h2>
                <span className="rounded-full bg-trending-badge-bg px-3 py-1 text-xs text-trending-badge-text">
                    GLOBAL TOP 50
                </span>
            </div>
            <div className="flex flex-col gap-4 rounded-[16px] bg-dark-accent p-4">
                {bestsellerList.map((book) => (
                    <div key={book.id} className="flex items-center gap-4 rounded-[16px] bg-dark-accent px-4 py-3">
                        <span className="w-8 shrink-0 text-2xl font-black text-dark-gray">{book.rank}</span>
                        <img alt={book.title} src={book.art} className="size-20 shrink-0 rounded-[16px] object-cover" />
                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                            <span className="truncate text-lg font-semibold text-whitetext">{book.title}</span>
                            <span className="truncate text-sm text-dark-gray">{book.author}</span>
                        </div>
                        {book.trend === "up" ? (
                            <TrendingUp className="size-5 shrink-0 text-trending-badge-bg" />
                        ) : (
                            <TrendingDown className="size-5 shrink-0 text-red-error" />
                        )}
                    </div>
                ))}
                <button type="button" className="cursor-pointer text-center text-xs font-black text-secondary">
                    EXPLORE ALL RANKINGS
                </button>
            </div>
        </div>
    )
}

export default BestsellerListPanel
