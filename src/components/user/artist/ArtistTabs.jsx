import { cn } from "@/lib/utils"
import { ARTIST_PROFILE_TABS } from "@/zustandStore/user/userStore/userArtistProfileStore"

const ArtistTabs = ({ activeTab, onChange }) => {
    return (
        <div className="flex w-full items-center gap-4 overflow-x-auto px-2 sm:px-4">
            {ARTIST_PROFILE_TABS.map((tab) => (
                <button
                    key={tab}
                    type="button"
                    onClick={() => onChange(tab)}
                    className={cn(
                        "shrink-0 cursor-pointer border-b px-2 pb-2 text-lg font-semibold whitespace-nowrap sm:text-2xl",
                        activeTab === tab ? "border-secondary text-whitetext" : "border-transparent text-light-gray"
                    )}
                >
                    Artist {tab}
                </button>
            ))}
        </div>
    )
}

export default ArtistTabs
