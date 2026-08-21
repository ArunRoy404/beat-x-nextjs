"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Heart, ListMusic, Maximize2, Mic2, Repeat, Shuffle, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"
import GradientPlayButton from "@/components/shared/GradientPlayButton"
import { useUserPlayerStore } from "@/zustandStore/user/userStore/userPlayerStore"

const SEEK_SECONDS = 10

const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "00:00"
    const total = Math.max(0, Math.floor(seconds))
    const minutes = Math.floor(total / 60)
    const secs = total % 60
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
}

const FloatingPlayerBar = () => {
    const { title, artist, artwork, src, liked, toggleLiked } = useUserPlayerStore()
    const audioRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(0.7)
    const [muted, setMuted] = useState(false)
    const [repeat, setRepeat] = useState(false)

    useEffect(() => {
        // The audio element can finish loading metadata before this component's
        // onLoadedMetadata listener is attached (common for small/cached files),
        // which would otherwise leave duration stuck at 0 forever.
        const audio = audioRef.current
        if (audio && Number.isFinite(audio.duration) && audio.duration > 0) {
            setDuration(audio.duration)
        }
    }, [])

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume
    }, [volume])

    useEffect(() => {
        if (audioRef.current) audioRef.current.muted = muted
    }, [muted])

    useEffect(() => {
        if (audioRef.current) audioRef.current.loop = repeat
    }, [repeat])

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio) return
        if (isPlaying) audio.pause()
        else audio.play()
    }

    const seekBy = (delta) => {
        const audio = audioRef.current
        if (!audio) return
        const max = Number.isFinite(audio.duration) ? audio.duration : Infinity
        audio.currentTime = Math.min(Math.max(audio.currentTime + delta, 0), max)
    }

    const handleSeekChange = (e) => {
        const time = Number(e.target.value)
        if (audioRef.current) audioRef.current.currentTime = time
        setCurrentTime(time)
    }

    const handleVolumeChange = (e) => {
        const value = Number(e.target.value)
        setVolume(value)
        setMuted(value === 0)
    }

    const progress = duration ? currentTime / duration : 0

    return (
        <motion.div
            initial={{ y: 120, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 90,
                damping: 15,
                delay: 0.65 // Slides up shortly after other page items load
            }}
            className="absolute bottom-6 left-1/2 z-20 flex w-[calc(100%-48px)] max-w-4xl items-center gap-6 rounded-full border border-border bg-(--player-bar-bg) px-6 py-3.5 shadow-(--now-playing-glow) backdrop-blur-md md:gap-12"
        >
            <audio
                ref={audioRef}
                src={src}
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onEnded={() => setIsPlaying(false)}
            />

            <div className="flex shrink-0 items-center gap-2">
                <img alt={title} src={artwork} className="size-10 shrink-0 rounded-full object-cover" />
                <div className="hidden flex-col gap-1 sm:flex">
                    <div className="flex items-center gap-2">
                        <span className="whitespace-nowrap text-lg font-semibold text-whitetext">{title}</span>
                        <button type="button" onClick={toggleLiked} aria-label={liked ? "Unlike" : "Like"}>
                            <Heart className={cn("size-4", liked ? "fill-red-error text-red-error" : "text-light-gray")} />
                        </button>
                    </div>
                    <span className="text-xs text-light-gray">{artist}</span>
                </div>
            </div>

            <div className="flex flex-1 flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                    <button type="button" className="hidden text-light-gray sm:block" aria-label="Shuffle">
                        <Shuffle className="size-5" />
                    </button>
                    <button type="button" onClick={() => seekBy(-SEEK_SECONDS)} className="text-whitetext" aria-label="Rewind 10 seconds">
                        <SkipBack className="size-5" fill="currentColor" />
                    </button>
                    <GradientPlayButton size="md" playing={isPlaying} onClick={togglePlay} />
                    <button type="button" onClick={() => seekBy(SEEK_SECONDS)} className="text-whitetext" aria-label="Forward 10 seconds">
                        <SkipForward className="size-5" fill="currentColor" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setRepeat((prev) => !prev)}
                        className={repeat ? "text-secondary" : "text-light-gray"}
                        aria-label="Repeat"
                        aria-pressed={repeat}
                    >
                        <Repeat className="size-5" />
                    </button>
                </div>
                <div className="hidden w-full items-center gap-2 sm:flex">
                    <span className="w-9 shrink-0 text-xs text-light-gray">{formatTime(currentTime)}</span>
                    <div className="relative h-2 w-full flex-1">
                        <div className="absolute inset-0 overflow-hidden rounded-full bg-dark-gray">
                            <div className="h-full rounded-full bg-(image:--button-bg)" style={{ width: `${progress * 100}%` }} />
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={duration || 0}
                            step={0.1}
                            value={currentTime}
                            onChange={handleSeekChange}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            aria-label="Seek"
                        />
                    </div>
                    <span className="w-9 shrink-0 text-xs text-light-gray">{formatTime(duration)}</span>
                </div>
            </div>

            <div className="hidden shrink-0 items-center gap-4 lg:flex">
                <button type="button" className="text-light-gray" aria-label="Lyrics">
                    <Mic2 className="size-4" />
                </button>
                <button type="button" className="text-light-gray" aria-label="Queue">
                    <ListMusic className="size-4" />
                </button>
                <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setMuted((prev) => !prev)} aria-label={muted ? "Unmute" : "Mute"}>
                        {muted || volume === 0 ? (
                            <VolumeX className="size-4 text-light-gray" />
                        ) : (
                            <Volume2 className="size-4 text-light-gray" />
                        )}
                    </button>
                    <div className="relative h-1 w-20">
                        <div className="absolute inset-0 overflow-hidden rounded-full bg-dark-gray">
                            <div className="h-full rounded-full bg-light-gray" style={{ width: `${(muted ? 0 : volume) * 100}%` }} />
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={muted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            aria-label="Volume"
                        />
                    </div>
                </div>
                <button type="button" className="text-light-gray" aria-label="Fullscreen">
                    <Maximize2 className="size-4" />
                </button>
            </div>
        </motion.div>
    )
}

export default FloatingPlayerBar
