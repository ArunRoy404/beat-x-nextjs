"use client"

import { Sparkles, Play, Pause } from "lucide-react"
import CommonGlassPanel from "@/components/shared/CommonGlassPanel"
import { useApprovedArtists } from "@/hooks/api/user/artists/useApprovedArtists"
import { usePlaySong } from "@/hooks/api/user/songs/usePlaySong"
import ArtistFollowSuggestion from "./ArtistFollowSuggestion"

const RecommendedColumn = ({ dailyDiscovery = [] }) => {
    const { data: approvedArtists } = useApprovedArtists()
    const { playSong, currentSongId, isPlaying } = usePlaySong()
    const artists = Array.isArray(approvedArtists) ? approvedArtists.slice(0, 4) : []
    const rawRadarItem = dailyDiscovery?.[0]
    const radarItem = rawRadarItem?.song || rawRadarItem
    const isRadarPlaying = currentSongId === (radarItem?._id || radarItem?.id) && isPlaying

    return (
        <section className="flex w-full flex-col gap-4 lg:w-88 lg:shrink-0">
            <h2 className="text-2xl font-switzer text-whitetext sm:text-[30px]">Recommended</h2>
            <CommonGlassPanel className="flex flex-col gap-6 overflow-hidden p-4">
                <div aria-hidden className="pointer-events-none absolute -top-px -right-px size-32 rounded-full bg-primary/20 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-px -left-px size-32 rounded-full bg-secondary/20 blur-3xl" />

                {artists?.length > 0 && (
                    <div className="relative flex flex-col gap-4">
                        {artists?.map((artist, idx) => (
                            <ArtistFollowSuggestion key={artist?._id || idx} artist={artist} />
                        ))}
                    </div>
                )}

                {radarItem ? (
                    <div className="relative flex flex-col gap-4 border-t border-white/5 pt-4">
                        <span className="text-xs text-light-gray">YOUR DAILY RADAR</span>
                        <div className="flex flex-col items-center gap-4 rounded-[16px] bg-background p-4">
                            <div className="flex size-16 items-center justify-center rounded-full bg-(image:--gradient-purple-lime)">
                                <Sparkles className="size-6 text-button-text" />
                            </div>
                            <div className="flex flex-col items-center gap-1 text-center">
                                <span className="text-lg font-semibold text-whitetext">{radarItem?.title}</span>
                                <span className="text-xs text-light-gray">
                                    {radarItem?.artist ? `Based on your recent listens • By ${radarItem?.artist}` : "Curated for you today"}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => playSong(radarItem)}
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-dark-accent py-2 text-sm font-semibold text-whitetext transition-all hover:bg-white/10 active:scale-95"
                            >
                                {isRadarPlaying ? <Pause className="size-4" /> : <Play className="size-4" fill="currentColor" />}
                                {isRadarPlaying ? "Pause" : "Start Listening"}
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Preserving UI design block per Rule 35: Waiting for backend daily discovery user history */
                    /*
                    <div className="relative flex flex-col gap-4 border-t border-white/5 pt-4">
                        <span className="text-xs text-light-gray">YOUR DAILY RADAR</span>
                        <div className="flex flex-col items-center gap-4 rounded-[16px] bg-background p-4">
                            <div className="flex size-16 items-center justify-center rounded-full bg-(image:--gradient-purple-lime)">
                                <Sparkles className="size-6 text-button-text" />
                            </div>
                            <div className="flex flex-col items-center gap-1 text-center">
                                <span className="text-lg font-semibold text-whitetext">Daily Radar</span>
                                <span className="text-xs text-light-gray">Based on your recent listens</span>
                            </div>
                            <button
                                type="button"
                                className="w-full cursor-pointer rounded-full bg-dark-accent py-2 text-sm font-semibold text-whitetext"
                            >
                                Start Listening
                            </button>
                        </div>
                    </div>
                    */
                    null
                )}
            </CommonGlassPanel>
        </section>
    )
}

export default RecommendedColumn
