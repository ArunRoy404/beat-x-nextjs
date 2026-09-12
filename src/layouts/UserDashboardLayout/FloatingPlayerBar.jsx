"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ListMusic, Maximize2, Mic2, Music, Repeat, Repeat1, Shuffle, SkipBack, SkipForward, Volume2, VolumeX, X } from "lucide-react"
import { cn } from "@/lib/utils"
import GradientPlayButton from "@/components/shared/GradientPlayButton"
import PlayerSlider from "@/components/shared/MediaPlayerControls/PlayerSlider"
import { useUserPlayerStore } from "@/zustandStore/user/userStore/userPlayerStore"
import { useVolumeStore } from "@/zustandStore/audio/useVolumeStore"
import { useGlobalMediaPlayerStore } from "@/zustandStore/media/useGlobalMediaPlayerStore"
import { useToggleLikeSong } from "@/hooks/api/user/songs/useToggleLikeSong"
import { usePlaySong } from "@/hooks/api/user/songs/usePlaySong"
import { saveSongProgressRequest } from "@/services/user/songsServices"
import { resolveMediaUrl } from "@/lib/format/resolveMediaUrl"
import { toast } from "sonner"

const SEEK_SECONDS = 10

const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "00:00"
    const total = Math.max(0, Math.floor(seconds))
    const minutes = Math.floor(total / 60)
    const secs = total % 60
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
}

const FloatingPlayerBar = () => {
    const { title, artist, artwork, src, liked, toggleLiked, songId, isPlaying: storeIsPlaying, setIsPlaying: setStoreIsPlaying, closeTrack } = useUserPlayerStore()
    const {
        playNext,
        playPrev,
        toggleShuffle,
        toggleRepeatMode,
        hasNext,
        hasPrev,
        isShuffle,
        repeatMode,
        isPending: isTrackChanging,
    } = usePlaySong()
    const { volume, isMuted, setVolume, toggleMute } = useVolumeStore()
    const { toggleLike } = useToggleLikeSong()
    const audioRef = useRef(null)

    const isGlobalOpen = useGlobalMediaPlayerStore((state) => state.isOpen)
    const globalMediaType = useGlobalMediaPlayerStore((state) => state.mediaType)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const [mobileVolumeOpen, setMobileVolumeOpen] = useState(false)
    const mobileVolumeRef = useRef(null)

    useEffect(() => {
        if (!mobileVolumeOpen) return
        const onPointerDown = (event) => {
            if (!mobileVolumeRef.current?.contains(event.target)) {
                setMobileVolumeOpen(false)
            }
        }
        document.addEventListener("pointerdown", onPointerDown)
        return () => document.removeEventListener("pointerdown", onPointerDown)
    }, [mobileVolumeOpen])

    // Complete player teardown
    const handleClose = useCallback(() => {
        if (audioRef.current) {
            try {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
                audioRef.current.removeAttribute("src")
                audioRef.current.load()
            } catch (e) {}
        }
        if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
            try {
                navigator.mediaSession.metadata = null
                navigator.mediaSession.playbackState = "none"
                const actions = ["play", "pause", "seekbackward", "seekforward", "seekto", "stop", "previoustrack", "nexttrack"]
                actions.forEach((act) => {
                    try {
                        navigator.mediaSession.setActionHandler(act, null)
                    } catch (e) {}
                })
            } catch (e) {}
        }
        if (typeof document !== "undefined") {
            document.title = "BeatX"
        }
        setIsPlaying(false)
        setStoreIsPlaying?.(false)
        closeTrack?.()
    }, [closeTrack, setStoreIsPlaying])

    // Synchronize OS Media Session (Windows SMTC / macOS Now Playing)
    useEffect(() => {
        if (typeof window === "undefined" || typeof navigator === "undefined" || !("mediaSession" in navigator)) return
        if (!src) {
            try {
                navigator.mediaSession.metadata = null
                navigator.mediaSession.playbackState = "none"
            } catch (e) {}
            if (typeof document !== "undefined") {
                document.title = "BeatX"
            }
            return
        }

        let absoluteArtwork = ""
        if (artwork) {
            if (artwork.startsWith("http://") || artwork.startsWith("https://") || artwork.startsWith("blob:") || artwork.startsWith("data:")) {
                absoluteArtwork = artwork
            } else {
                absoluteArtwork = `${window.location.origin}${artwork.startsWith("/") ? "" : "/"}${artwork}`
            }
        }

        const displayTitle = title || "Song Track"
        const displayArtist = artist || "BeatX"

        try {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: displayTitle,
                artist: displayArtist,
                album: "BeatX",
                artwork: absoluteArtwork
                    ? [
                          { src: absoluteArtwork, sizes: "96x96", type: "image/png" },
                          { src: absoluteArtwork, sizes: "128x128", type: "image/png" },
                          { src: absoluteArtwork, sizes: "192x192", type: "image/png" },
                          { src: absoluteArtwork, sizes: "256x256", type: "image/png" },
                          { src: absoluteArtwork, sizes: "384x384", type: "image/png" },
                          { src: absoluteArtwork, sizes: "512x512", type: "image/png" },
                      ]
                    : [],
            })
        } catch (e) {}

        if (typeof document !== "undefined") {
            document.title = isPlaying ? `▶ ${displayTitle} • ${displayArtist} | BeatX` : `${displayTitle} • ${displayArtist} | BeatX`
        }
    }, [src, title, artist, artwork, isPlaying])

    // Sync playbackState
    useEffect(() => {
        if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return
        if (!src) {
            try {
                navigator.mediaSession.playbackState = "none"
            } catch (e) {}
            return
        }
        try {
            navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused"
        } catch (e) {}
    }, [isPlaying, src])

    // Sync position state with OS media controls
    useEffect(() => {
        if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return
        if (!("setPositionState" in navigator.mediaSession)) return
        if (!src || !Number.isFinite(duration) || duration <= 0) return

        try {
            navigator.mediaSession.setPositionState({
                duration: Math.max(duration, 0),
                playbackRate: 1,
                position: Math.min(Math.max(currentTime, 0), duration),
            })
        } catch (e) {}
    }, [currentTime, duration, src])

    const seekBy = useCallback((delta) => {
        const audio = audioRef.current
        if (!audio) return
        const max = Number.isFinite(audio.duration) ? audio.duration : Infinity
        audio.currentTime = Math.min(Math.max(audio.currentTime + delta, 0), max)
    }, [])

    // Register OS Media Session action handlers
    useEffect(() => {
        if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return
        if (!src) return

        const handlers = [
            ["play", () => {
                if (audioRef.current) {
                    audioRef.current.play().then(() => {
                        setIsPlaying(true)
                        setStoreIsPlaying?.(true)
                    }).catch(() => {})
                }
            }],
            ["pause", () => {
                if (audioRef.current) {
                    audioRef.current.pause()
                    setIsPlaying(false)
                    setStoreIsPlaying?.(false)
                }
            }],
            ["seekbackward", () => seekBy(-SEEK_SECONDS)],
            ["seekforward", () => seekBy(SEEK_SECONDS)],
            ["previoustrack", () => {
                if (hasPrev && !isTrackChanging) playPrev()
            }],
            ["nexttrack", () => {
                if (hasNext && !isTrackChanging) playNext()
            }],
            ["stop", () => handleClose()],
        ]

        handlers.forEach(([action, handler]) => {
            try {
                navigator.mediaSession.setActionHandler(action, handler)
            } catch (e) {}
        })

        return () => {
            handlers.forEach(([action]) => {
                try {
                    navigator.mediaSession.setActionHandler(action, null)
                } catch (e) {}
            })
        }
    }, [src, handleClose, setStoreIsPlaying, hasPrev, hasNext, isTrackChanging, playPrev, playNext, seekBy])

    useEffect(() => {
        // The audio element can finish loading metadata before this component's
        // onLoadedMetadata listener is attached (common for small/cached files),
        // which would otherwise leave duration stuck at 0 forever.
        const audio = audioRef.current
        if (audio && Number.isFinite(audio.duration) && audio.duration > 0) {
            setDuration(audio.duration)
        }
    }, [])

    // Helper to reliably enforce volume to the HTML5 audio element
    const applyVolume = useCallback(() => {
        if (audioRef.current) {
            const target = isMuted ? 0 : Math.max(0, Math.min(1, Number(volume ?? 0.8)))
            audioRef.current.volume = target
        }
    }, [isMuted, volume])

    // Always re-apply volume when volume, mute state, or track src changes
    useEffect(() => {
        applyVolume()
    }, [applyVolume, src])

    // Auto-play when a new track/src is selected
    useEffect(() => {
        const audio = audioRef.current
        if (src && audio) {
            applyVolume()
            audio.play().then(() => {
                applyVolume()
                setIsPlaying(true)
                setStoreIsPlaying?.(true)
            }).catch(() => {
                setIsPlaying(false)
                setStoreIsPlaying?.(false)
            })
        }
    }, [src, setStoreIsPlaying, applyVolume])

    // Sync play state from store if changed externally
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        if (storeIsPlaying && audio.paused) {
            applyVolume()
            audio.play().then(() => applyVolume()).catch(() => {})
        } else if (!storeIsPlaying && !audio.paused) {
            audio.pause()
        }
    }, [storeIsPlaying, applyVolume])

    const resolvedSrc = resolveMediaUrl(src)

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio) return
        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
            setStoreIsPlaying?.(false)
        } else {
            try {
                useGlobalMediaPlayerStore.getState().pauseMedia()
            } catch (e) {}
            applyVolume()
            audio.play().then(() => {
                applyVolume()
                setIsPlaying(true)
                setStoreIsPlaying?.(true)
            }).catch(() => {})
        }
    }

    const handleSeekChange = (e) => {
        const time = Number(e.target.value)
        if (audioRef.current) audioRef.current.currentTime = time
        setCurrentTime(time)
    }

    const handleVolumeChange = (e) => {
        const value = Number(e.target.value)
        setVolume(value)
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : Math.max(0, Math.min(1, value))
        }
    }

    const progress = duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0

    if (!src && !title) return null

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
            className={cn(
                "fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-16px)] max-w-4xl items-center justify-between gap-1.5 rounded-full border border-border bg-(--player-bar-bg) px-2.5 py-2 shadow-(--now-playing-glow) backdrop-blur-md sm:bottom-6 sm:w-[calc(100%-48px)] sm:gap-6 sm:px-6 sm:py-3.5 md:gap-12 relative overflow-hidden",
                isGlobalOpen && globalMediaType === "video" && "hidden sm:flex"
            )}
        >
            {/* Mobile Top Edge Seek & Progress Bar (Runs seamlessly along the top border without taking row space) */}
            <div className="absolute top-0 inset-x-6 h-2 sm:hidden z-10 flex items-start cursor-pointer">
                <div className="relative w-full h-[2px] overflow-hidden rounded-t-full bg-white/10">
                    <div
                        className="h-full rounded-full bg-(image:--button-bg) transition-all duration-150"
                        style={{ width: `${progress * 100}%` }}
                    />
                </div>
                <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeekChange}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    aria-label="Seek track"
                />
            </div>

            <audio
                ref={audioRef}
                src={resolvedSrc}
                preload="metadata"
                onPlay={() => {
                    try {
                        useGlobalMediaPlayerStore.getState().pauseMedia()
                    } catch (e) {}
                    applyVolume()
                    setIsPlaying(true)
                    setStoreIsPlaying?.(true)
                }}
                onCanPlay={applyVolume}
                onLoadedMetadata={(e) => {
                    applyVolume()
                    setDuration(e.currentTarget.duration)
                }}
                onPause={() => {
                    setIsPlaying(false)
                    setStoreIsPlaying?.(false)
                }}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onError={() => {
                    setIsPlaying(false)
                    setStoreIsPlaying?.(false)
                    toast.error("Audio stream source is unavailable or still processing.")
                }}
                onEnded={() => {
                    setIsPlaying(false)
                    setStoreIsPlaying?.(false)
                    if (songId) {
                        saveSongProgressRequest({ id: songId, positionMs: Math.floor(duration * 1000), completed: true }).catch(() => {})
                    }

                    if (repeatMode === "one") {
                        if (audioRef.current) {
                            audioRef.current.currentTime = 0
                            audioRef.current.play().then(() => {
                                setIsPlaying(true)
                                setStoreIsPlaying?.(true)
                            }).catch(() => {})
                        }
                    } else if (hasNext || isShuffle) {
                        playNext()
                    }
                }}
            />

            {/* Left: Artwork + Title/Artist + Like */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 min-w-0 max-w-[110px] xs:max-w-[145px] sm:max-w-[220px]">
                <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-dark-accent sm:size-10">
                    {artwork ? (
                        <Image alt={title || "Track artwork"} src={artwork} fill sizes="40px" className="object-cover" />
                    ) : (
                        <div className="flex size-full items-center justify-center bg-white/10 text-light-gray">
                            <Music className="size-4 sm:size-5 text-secondary" />
                        </div>
                    )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-center gap-1">
                        <span className="truncate whitespace-nowrap text-xs font-semibold text-whitetext sm:text-base md:text-lg">
                            {title}
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                if (songId) {
                                    toggleLike(songId)
                                } else {
                                    toggleLiked()
                                }
                            }}
                            className="shrink-0 p-0.5"
                            aria-label={liked ? "Unlike" : "Like"}
                        >
                            <Heart className={cn("size-3 sm:size-4 cursor-pointer transition-colors", liked ? "fill-red-error text-red-error" : "text-light-gray hover:text-whitetext")} />
                        </button>
                    </div>
                    <span className="truncate text-[10px] text-light-gray sm:text-xs leading-tight">
                        {artist}
                    </span>
                </div>
            </div>

            {/* Center: Playback Controls (Single Row on mobile) & Desktop Seekbar */}
            <div className="flex min-w-0 flex-1 items-center justify-center gap-1 xs:gap-1.5 sm:flex-col sm:gap-2">
                <div className="flex shrink-0 items-center gap-1.5 xs:gap-2 sm:gap-4">
                    {/* Shuffle toggle button - VISIBLE ON MOBILE */}
                    <button
                        type="button"
                        onClick={toggleShuffle}
                        className={cn(
                            "cursor-pointer p-1 transition-colors",
                            isShuffle ? "text-secondary" : "text-light-gray hover:text-whitetext"
                        )}
                        aria-label="Shuffle"
                        aria-pressed={isShuffle}
                        title={isShuffle ? "Shuffle On" : "Shuffle Off"}
                    >
                        <Shuffle className="size-3.5 sm:size-5" />
                    </button>

                    {/* Previous Track button - VISIBLE ON MOBILE */}
                    <button
                        type="button"
                        onClick={playPrev}
                        disabled={!hasPrev || isTrackChanging}
                        className={cn(
                            "p-1 transition-opacity",
                            !hasPrev || isTrackChanging
                                ? "cursor-not-allowed opacity-30 text-light-gray pointer-events-none"
                                : "cursor-pointer text-whitetext hover:text-secondary"
                        )}
                        aria-label="Previous track"
                        title="Previous track"
                    >
                        <SkipBack className="size-4 sm:size-5" fill="currentColor" />
                    </button>

                    {/* Play / Pause button */}
                    <GradientPlayButton size="sm" playing={isPlaying} onClick={togglePlay} className="sm:hidden" />
                    <GradientPlayButton size="md" playing={isPlaying} onClick={togglePlay} className="hidden sm:inline-flex" />

                    {/* Next Track button - VISIBLE ON MOBILE */}
                    <button
                        type="button"
                        onClick={playNext}
                        disabled={!hasNext || isTrackChanging}
                        className={cn(
                            "p-1 transition-opacity",
                            !hasNext || isTrackChanging
                                ? "cursor-not-allowed opacity-30 text-light-gray pointer-events-none"
                                : "cursor-pointer text-whitetext hover:text-secondary"
                        )}
                        aria-label="Next track"
                        title="Next track"
                    >
                        <SkipForward className="size-4 sm:size-5" fill="currentColor" />
                    </button>

                    {/* Repeat toggle button - VISIBLE ON MOBILE */}
                    <button
                        type="button"
                        onClick={toggleRepeatMode}
                        className={cn(
                            "cursor-pointer p-1 transition-colors",
                            repeatMode !== "off" ? "text-secondary" : "text-light-gray hover:text-whitetext"
                        )}
                        aria-label={`Repeat mode: ${repeatMode}`}
                        aria-pressed={repeatMode !== "off"}
                        title={
                            repeatMode === "off"
                                ? "Repeat Off"
                                : repeatMode === "all"
                                ? "Repeat All"
                                : "Repeat One"
                        }
                    >
                        {repeatMode === "one" ? (
                            <Repeat1 className="size-3.5 sm:size-5" />
                        ) : (
                            <Repeat className="size-3.5 sm:size-5" />
                        )}
                    </button>
                </div>

                {/* Desktop Seekbar with Timestamps (only takes 2nd line on desktop) */}
                <div className="hidden w-full items-center gap-2 sm:flex">
                    <span className="w-9 shrink-0 font-mono text-xs text-light-gray">{formatTime(currentTime)}</span>
                    <PlayerSlider
                        value={currentTime}
                        max={duration || 0}
                        step={0.1}
                        onChange={handleSeekChange}
                        ariaLabel="Seek"
                    />
                    <span className="w-9 shrink-0 text-right font-mono text-xs text-light-gray">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Right: Tools & Close */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-3">
                <div className="hidden shrink-0 items-center gap-4 lg:flex">
                    <button type="button" className="text-light-gray hover:text-whitetext transition-colors cursor-pointer" aria-label="Lyrics">
                        <Mic2 className="size-4" />
                    </button>
                    <button type="button" className="text-light-gray hover:text-whitetext transition-colors cursor-pointer" aria-label="Queue">
                        <ListMusic className="size-4" />
                    </button>
                </div>

                {/* Desktop Inline Volume */}
                <div className="hidden items-center gap-2 sm:flex">
                    <button type="button" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"} className="cursor-pointer hover:text-whitetext transition-colors">
                        {isMuted || volume === 0 ? (
                            <VolumeX className="size-4 text-light-gray" />
                        ) : (
                            <Volume2 className="size-4 text-light-gray" />
                        )}
                    </button>
                    <div className="w-16 lg:w-20">
                        <PlayerSlider
                            variant="volume"
                            value={isMuted ? 0 : volume}
                            max={1}
                            step={0.01}
                            onChange={handleVolumeChange}
                            ariaLabel="Volume"
                        />
                    </div>
                </div>

                {/* Mobile Volume Popover */}
                <div ref={mobileVolumeRef} className="relative sm:hidden">
                    <AnimatePresence>
                        {mobileVolumeOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.94 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.94 }}
                                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                                className="absolute bottom-full left-1/2 z-10 mb-3 flex -translate-x-1/2 flex-col items-center gap-2.5 rounded-2xl border border-border bg-(--player-bar-bg) px-2.5 py-3 shadow-(--now-playing-glow) backdrop-blur-xl"
                            >
                                <span className="font-mono text-[10px] tabular-nums text-light-gray">
                                    {Math.round((isMuted ? 0 : volume) * 100)}
                                </span>
                                <PlayerSlider
                                    variant="volume"
                                    vertical
                                    length="h-24"
                                    value={isMuted ? 0 : volume}
                                    max={1}
                                    step={0.01}
                                    onChange={handleVolumeChange}
                                    ariaLabel="Volume"
                                />
                                <button
                                    type="button"
                                    onClick={toggleMute}
                                    aria-label={isMuted ? "Unmute" : "Mute"}
                                    className="cursor-pointer text-light-gray transition-colors hover:text-whitetext"
                                >
                                    {isMuted || volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="button"
                        onClick={() => setMobileVolumeOpen((prev) => !prev)}
                        aria-label="Volume"
                        aria-expanded={mobileVolumeOpen}
                        className={
                            mobileVolumeOpen
                                ? "flex cursor-pointer items-center rounded-full bg-white/10 p-1 text-secondary transition-colors"
                                : "flex cursor-pointer items-center rounded-full p-1 text-light-gray transition-colors hover:text-whitetext"
                        }
                    >
                        {isMuted || volume === 0 ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
                    </button>
                </div>

                <button type="button" className="hidden text-light-gray hover:text-whitetext transition-colors cursor-pointer lg:block" aria-label="Fullscreen">
                    <Maximize2 className="size-4" />
                </button>
                <button
                    type="button"
                    onClick={handleClose}
                    className="cursor-pointer rounded-full p-1 text-light-gray transition-colors hover:text-red-error"
                    aria-label="Close"
                    title="Close player"
                >
                    <X className="size-3.5 sm:size-4" />
                </button>
            </div>
        </motion.div>
    )
}

export default FloatingPlayerBar
