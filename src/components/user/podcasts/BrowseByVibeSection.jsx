import { Grid2x2 } from "lucide-react"
import { useUserPodcastsStore } from "@/zustandStore/user/userStore/userPodcastsStore"

const BrowseByVibeSection = () => {
    const podcastVibes = useUserPodcastsStore((state) => state.podcastVibes)
    const [trueCrime, tech, comedy] = podcastVibes

    return (
        <section className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl text-whitetext sm:text-[32px]">Browse by Vibe</h2>
                    <p className="text-sm text-light-gray sm:text-base">Refracted through your interests</p>
                </div>
                <button type="button" className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">
                    Explore All Genres
                </button>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
                {[trueCrime, tech].map((vibe) => (
                    <div
                        key={vibe.id}
                        className="relative flex h-64 w-full flex-1 flex-col justify-end overflow-hidden rounded-[16px] p-4 sm:h-80 lg:h-[390px]"
                        style={{ backgroundImage: `url(${vibe.art})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
                        <div className="relative flex flex-col gap-1">
                            <span className="text-2xl font-semibold text-whitetext">{vibe.title}</span>
                            <span className="text-xs text-light-gray">{vibe.subtitle}</span>
                        </div>
                    </div>
                ))}
                <div className="flex w-full flex-1 flex-col gap-4">
                    <div className="flex h-32 w-full items-center justify-center rounded-[16px] bg-dark-accent sm:h-36 lg:h-[187px]">
                        <span className="text-2xl font-semibold text-whitetext">{comedy.title}</span>
                    </div>
                    <button
                        type="button"
                        className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-[16px] bg-dark-accent sm:h-36 lg:h-[187px]"
                    >
                        <Grid2x2 className="size-12 text-secondary" />
                        <span className="text-xs text-light-gray">SEE MORE</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default BrowseByVibeSection
