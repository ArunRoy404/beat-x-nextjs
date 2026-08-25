import { useUserAudiobooksStore } from "@/zustandStore/user/userStore/userAudiobooksStore"

const GenreRefractionsPanel = () => {
    const genreRefractions = useUserAudiobooksStore((state) => state.genreRefractions)
    const { sciFi, mystery, fantasy } = genreRefractions

    return (
        <div className="flex w-full flex-1 flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl text-whitetext sm:text-[32px]">Genre Refractions</h2>
            </div>
            <div className="flex flex-1 flex-col gap-6">
                <div className="flex flex-1 gap-6">
                    {[sciFi, mystery].map((genre) => (
                        <div
                            key={genre.id}
                            className="relative flex flex-1 flex-col items-start justify-end overflow-hidden rounded-[16px] p-4"
                            style={{ backgroundImage: `url(${genre.art})`, backgroundSize: "cover", backgroundPosition: "center" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
                            <div className="relative flex flex-col gap-1">
                                <span className="text-2xl font-semibold text-whitetext">{genre.title}</span>
                                <span className="text-xs text-secondary">{genre.subtitle}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-[16px] p-4 text-center"
                    style={{ backgroundImage: `url(${fantasy.art})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
                    <div className="relative flex flex-col gap-1">
                        <span className="text-3xl font-semibold text-whitetext sm:text-5xl">{fantasy.title}</span>
                        <span className="text-xs font-black text-trending-badge-bg">{fantasy.subtitle}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GenreRefractionsPanel
