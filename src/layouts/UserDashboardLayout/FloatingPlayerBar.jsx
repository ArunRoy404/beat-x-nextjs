"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, ListMusic, Maximize2, Mic2, Music, Repeat, Shuffle, SkipBack, SkipForward, Volume2, VolumeX, X } from "lucide-react"
import { cn } from "@/lib/utils"
import GradientPlayButton from "@/components/shared/GradientPlayButton"
import { useUserPlayerStore } from "@/zustandStore/user/userStore/userPlayerStore"
import { useVolumeStore } from "@/zustandStore/audio/useVolumeStore"
import { useToggleLikeSong } from "@/hooks/api/user/songs/useToggleLikeSong"
import { saveSongProgressRequest } from "@/services/user/songsServices"

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
    const { volume, isMuted, setVolume, toggleMute } = useVolumeStore()
    const { toggleLike } = useToggleLikeSong()
    const audioRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [repeat, setRepeat] = useState(false)

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
                const actions = ["play", "pause", "seekbackward", "seekforward", "seekto", "stop"]
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
    }, [src, handleClose, setStoreIsPlaying])

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

    useEffect(() => {
        if (audioRef.current) audioRef.current.loop = repeat
    }, [repeat])

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

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio) return
        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
            setStoreIsPlaying?.(false)
        } else {
            applyVolume()
            audio.play().then(() => {
                applyVolume()
                setIsPlaying(true)
                setStoreIsPlaying?.(true)
            }).catch(() => {})
        }
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
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : Math.max(0, Math.min(1, value))
        }
    }

    const progress = duration ? currentTime / duration : 0

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
            className="absolute bottom-6 left-1/2 z-20 flex w-[calc(100%-48px)] max-w-4xl items-center gap-6 rounded-full border border-border bg-(--player-bar-bg) px-6 py-3.5 shadow-(--now-playing-glow) backdrop-blur-md md:gap-12"
        >
            <audio
                ref={audioRef}
                src={src}
                preload="metadata"
                onPlay={() => {
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
                onEnded={() => {
                    setIsPlaying(false)
                    setStoreIsPlaying?.(false)
                    if (songId) {
                        saveSongProgressRequest({ id: songId, positionMs: Math.floor(duration * 1000), completed: true }).catch(() => {})
                    }
                }}
            />

            <div className="flex shrink-0 items-center gap-2">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-dark-accent">
                    {artwork ? (
                        <Image alt={title || "Track artwork"} src={artwork} fill sizes="40px" className="object-cover" />
                    ) : (
                        <div className="flex size-full items-center justify-center bg-white/10 text-light-gray">
                            <Music className="size-5 text-secondary" />
                        </div>
                    )}
                </div>
                <div className="hidden flex-col gap-1 sm:flex">
                    <div className="flex items-center gap-2">
                        <span className="whitespace-nowrap text-lg font-semibold text-whitetext">{title}</span>
                        <button
                            type="button"
                            onClick={() => {
                                if (songId) {
                                    toggleLike(songId)
                                } else {
                                    toggleLiked()
                                }
                            }}
                            aria-label={liked ? "Unlike" : "Like"}
                        >
                            <Heart className={cn("size-4 cursor-pointer transition-colors", liked ? "fill-red-error text-red-error" : "text-light-gray hover:text-whitetext")} />
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
                    <button type="button" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                        {isMuted || volume === 0 ? (
                            <VolumeX className="size-4 text-light-gray" />
                        ) : (
                            <Volume2 className="size-4 text-light-gray" />
                        )}
                    </button>
                    <div className="relative h-1 w-20">
                        <div className="absolute inset-0 overflow-hidden rounded-full bg-dark-gray">
                            <div className="h-full rounded-full bg-light-gray" style={{ width: `${(isMuted ? 0 : volume) * 100}%` }} />
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            aria-label="Volume"
                        />
                    </div>
                </div>
                <button type="button" className="text-light-gray" aria-label="Fullscreen">
                    <Maximize2 className="size-4" />
                </button>
                <button
                    type="button"
                    onClick={handleClose}
                    className="cursor-pointer rounded-full p-1 text-light-gray transition-colors hover:text-red-error"
                    aria-label="Close"
                    title="Close player"
                >
                    <X className="size-4" />
                </button>
            </div>
        </motion.div>
    )
}

export default FloatingPlayerBar
