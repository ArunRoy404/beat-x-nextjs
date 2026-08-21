import { Clock } from "lucide-react"
import { useUserAudiobooksStore } from "@/zustandStore/user/userStore/userAudiobooksStore"

const ContinueListeningSection = () => {
    const continueListening = useUserAudiobooksStore((state) => state.continueListening)

    return (
        <section className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl text-whitetext sm:text-[32px]">Continue Listening</h2>
                <button type="button" className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">
                    View Library
                </button>
            </div>
            <p className="text-sm text-light-gray sm:text-base">Pick up right where you left off in your sonic journey.</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {continueListening.map((book) => (
                    <div key={book.id} className="flex flex-col gap-3">
                        <div className="aspect-[3/4] w-full overflow-hidden rounded-[6px] shadow-[0px_10px_20px_-5px_rgba(0,0,0,0.7)]">
                            <img alt={book.title} src={book.art} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-secondary">{book.progress} COMPLETED</span>
                            <span className="truncate text-lg font-semibold text-whitetext">{book.title}</span>
                            <span className="truncate text-sm text-light-gray">{book.author}</span>
                            <div className="flex items-center gap-1">
                                <Clock className="size-4 shrink-0 text-light-gray" />
                                <span className="truncate text-xs text-light-gray">{book.timeLeft}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ContinueListeningSection
