"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useUserTicketsStore } from "@/zustandStore/user/userStore/userTicketsStore"

const SonicHubsSection = () => {
    const sonicHubCities = useUserTicketsStore((state) => state.sonicHubCities)
    const sonicHubs = useUserTicketsStore((state) => state.sonicHubs)
    const [activeCity, setActiveCity] = useState(sonicHubCities[0])

    return (
        <section className="flex w-full flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl text-whitetext sm:text-[32px]">Sonic Hubs</h2>
                <div className="flex items-center gap-2">
                    {sonicHubCities.map((city) => (
                        <button
                            key={city}
                            type="button"
                            onClick={() => setActiveCity(city)}
                            className={cn(
                                "shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm whitespace-nowrap",
                                activeCity === city ? "bg-secondary text-button-text" : "bg-dark-accent text-light-gray"
                            )}
                        >
                            {city}
                        </button>
                    ))}
                </div>
            </div>
            <p className="text-sm text-light-gray sm:text-base">Explore trending concert destinations across the globe</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {sonicHubs.map((hub) => (
                    <div key={hub.id} className="flex flex-col gap-3">
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[6px] shadow-[0px_10px_20px_-5px_rgba(0,0,0,0.7)]">
                            <img alt={hub.name} src={hub.art} className="h-full w-full object-cover" />
                            <span className="absolute top-2 right-2 rounded-2xl bg-trending-badge-bg px-2 py-1 text-xs text-trending-badge-text">
                                {hub.events}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="truncate text-lg font-semibold text-whitetext">{hub.name}</span>
                            <span className="truncate text-sm text-light-gray">{hub.city}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default SonicHubsSection
