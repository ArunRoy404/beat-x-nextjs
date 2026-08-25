import { ChevronLeft, ChevronRight } from "lucide-react"
import { useUserAudiobooksStore } from "@/zustandStore/user/userStore/userAudiobooksStore"

const NewlyNarratedSection = () => {
    const newlyNarrated = useUserAudiobooksStore((state) => state.newlyNarrated)

    return (
        <section className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl text-whitetext sm:text-[32px]">Newly Narrated</h2>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        aria-label="Previous"
                        className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-dark-gray"
                    >
                        <ChevronLeft className="size-4 text-whitetext" />
                    </button>
                    <button
                        type="button"
                        aria-label="Next"
                        className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-dark-gray"
                    >
                        <ChevronRight className="size-4 text-whitetext" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {newlyNarrated.map((book) => (
                    <div key={book.id} className="flex flex-col gap-3 rounded-[16px] p-2">
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[6px] shadow-[0px_10px_20px_-5px_rgba(0,0,0,0.7)]">
                            <img alt={book.title} src={book.art} className="h-full w-full object-cover" />
                            {book.isNew && (
                                <span className="absolute top-2 right-2 rounded-2xl bg-primary px-2 py-1 text-xs text-whitetext">
                                    NEW
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="truncate text-xl font-semibold text-whitetext">{book.title}</span>
                            <span className="truncate text-sm text-light-gray">{book.author}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default NewlyNarratedSection
