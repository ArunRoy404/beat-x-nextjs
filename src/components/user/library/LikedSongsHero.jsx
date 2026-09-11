"use client"

import { Heart, Play, Pause } from "lucide-react"
import { useUserLibraryStore } from "@/zustandStore/user/userStore/userLibraryStore"
import { useLikedSongs } from "@/hooks/api/user/songs/useLikedSongs"
import { usePlaySong } from "@/hooks/api/user/songs/usePlaySong"

const LikedSongsHero = () => {
    const { data: likedData } = useLikedSongs()
    const { playSong, currentSongId, isPlaying, isPending } = usePlaySong()
    const storeHero = useUserLibraryStore((state) => state.likedSongsHero)

    const likedList =
        likedData?.songs ??
        likedData?.data ??
        (Array.isArray(likedData) ? likedData : [])

    const totalSongs = likedData?.total ?? likedList.length
    const firstSong = likedList[0]
    const isFirstPlaying = currentSongId === (firstSong?._id || firstSong?.id) && isPlaying

    const handlePlayAll = () => {
        if (firstSong) {
            playSong(firstSong)
        }
    }

    const handleShuffle = () => {
        if (likedList.length > 0) {
            const randomSong = likedList[Math.floor(Math.random() * likedList.length)]
            playSong(randomSong)
        }
    }

    const badgeText = totalSongs > 0 ? `${totalSongs} TRACKS SAVED` : (storeHero?.badge || "COLLECTION")
    const descriptionText = totalSongs > 0
        ? `${totalSongs} liked ${totalSongs === 1 ? "track" : "tracks"} saved to your private collection.`
        : (storeHero?.description || "All your favorite tracks in one place.")

    return (
        <div className="relative flex h-85 flex-1 flex-col justify-between overflow-hidden rounded-[16px] border border-(--glass-panel-border) bg-(image:--liked-hero-gradient) p-10">
            <Heart className="pointer-events-none absolute -top-1 right-0 size-62 text-secondary/[0.08]" fill="currentColor" />
            <span className="w-fit rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1 text-xs text-secondary font-medium tracking-wide">
                {badgeText}
            </span>
            <h1 className="text-6xl font-semibold text-whitetext lg:text-[72px]">{storeHero?.title || "Liked Songs"}</h1>
            <p className="max-w-lg text-base text-light-gray">{descriptionText}</p>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    disabled={isPending || likedList.length === 0}
                    onClick={handlePlayAll}
                    aria-label={isFirstPlaying ? "Pause" : "Play liked songs"}
                    className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-secondary shadow-[0px_10px_15px_-3px_rgba(58,223,250,0.2),0px_4px_6px_-4px_rgba(58,223,250,0.2)] transition-transform active:scale-95 disabled:opacity-50"
                >
                    {isFirstPlaying ? (
                        <Pause className="size-5 text-button-text" fill="currentColor" />
                    ) : (
                        <Play className="size-5 text-button-text" fill="currentColor" />
                    )}
                </button>
                <button
                    type="button"
                    disabled={likedList.length === 0}
                    onClick={handleShuffle}
                    className="flex h-14 cursor-pointer items-center justify-center rounded-full border border-(--glass-panel-border) bg-(--glass-panel-bg) px-8 text-base font-semibold text-whitetext backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95 disabled:opacity-50"
                >
                    Shuffle All
                </button>
            </div>
        </div>
    )
}

export default LikedSongsHero

