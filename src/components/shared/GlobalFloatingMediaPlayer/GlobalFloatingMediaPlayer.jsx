"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  ListMusic,
  Maximize2,
  Mic2,
  Minimize2,
  Music,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Video,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import GradientPlayButton from "@/components/shared/GradientPlayButton";
import CommonCoverImage from "@/components/shared/CommonCoverImage/CommonCoverImage";
import PlayerSlider from "@/components/shared/MediaPlayerControls/PlayerSlider";
import { useGlobalMediaPlayerStore } from "@/zustandStore/media/useGlobalMediaPlayerStore";
import { useVolumeStore } from "@/zustandStore/audio/useVolumeStore";
import { useSongDetail } from "@/hooks/api/user/songs/useSongDetail";
import { useToggleLikeSong } from "@/hooks/api/user/songs/useToggleLikeSong";
import { useVideoDetail } from "@/hooks/api/user/videos/useVideoDetail";
import { useToggleLikeVideo } from "@/hooks/api/user/videos/useToggleLikeVideo";
import { resolveMediaUrl } from "@/lib/format/resolveMediaUrl";
import { canPlayNext, canPlayPrev } from "@/lib/player/playerUtils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const SEEK_SECONDS = 10;

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "00:00";
  const total = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const GlobalFloatingMediaPlayer = () => {
  const {
    isOpen,
    isPlaying,
    mediaType,
    id,
    liked,
    setLiked,
    toggleLiked,
    src: rawSrc,
    title,
    artist,
    coverUrl: rawCoverUrl,
    currentTime,
    duration,
    togglePlay,
    pauseMedia,
    resumeMedia,
    setCurrentTime,
    setDuration,
    closePlayer,
    queue,
    currentIndex,
    isShuffle,
    repeatMode,
    playNext,
    playPrev,
    isMinimized,
    toggleMinimize,
    toggleShuffle,
    toggleRepeatMode,
  } = useGlobalMediaPlayerStore();

  const src = resolveMediaUrl(rawSrc);
  const coverUrl = resolveMediaUrl(rawCoverUrl);

  const { volume, isMuted, setVolume, toggleMute } = useVolumeStore();

  const activeSongId = isOpen && id && mediaType === "audio" ? id : null;
  const activeVideoId = isOpen && id && mediaType === "video" ? id : null;

  const { data: songDetail } = useSongDetail(activeSongId);
  const { data: videoDetail } = useVideoDetail(activeVideoId);

  const { toggleLike: toggleSongLike, isPending: isSongLikePending } = useToggleLikeSong();
  const { toggleLikeVideo, isPending: isVideoLikePending } = useToggleLikeVideo();

  const isLikePending = mediaType === "video" ? isVideoLikePending : isSongLikePending;

  // Synchronize user-specific like status when detailed song data loads
  useEffect(() => {
    if (mediaType === "audio" && typeof songDetail?.isLiked === "boolean") {
      setLiked(songDetail.isLiked);
    }
  }, [mediaType, songDetail?.isLiked, setLiked]);

  // Synchronize user-specific like status when detailed video data loads
  useEffect(() => {
    if (mediaType === "video" && typeof videoDetail?.isLiked === "boolean") {
      setLiked(videoDetail.isLiked);
    }
  }, [mediaType, videoDetail?.isLiked, setLiked]);

  const handleToggleLike = useCallback(() => {
    if (!id) {
      toggleLiked();
      return;
    }
    if (mediaType === "video") {
      toggleLikeVideo(id);
    } else {
      toggleSongLike(id);
    }
  }, [id, mediaType, toggleLikeVideo, toggleSongLike, toggleLiked]);

  const mediaRef = useRef(null);

  const hasNext = useMemo(
    () => canPlayNext({ queue, currentIndex, isShuffle, repeatMode }),
    [queue, currentIndex, isShuffle, repeatMode]
  );
  const hasPrev = useMemo(
    () => canPlayPrev({ queue, currentIndex, isShuffle, repeatMode }),
    [queue, currentIndex, isShuffle, repeatMode]
  );

  // Volume has no room in the mobile bar, so it lives behind a tap-to-open
  // panel rather than being dropped from small screens entirely.
  const [mobileVolumeOpen, setMobileVolumeOpen] = useState(false);
  const mobileVolumeRef = useRef(null);

  useEffect(() => {
    if (!mobileVolumeOpen) return;
    const onPointerDown = (event) => {
      if (!mobileVolumeRef.current?.contains(event.target)) {
        setMobileVolumeOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [mobileVolumeOpen]);

  // Helper to reliably apply volume to the HTML5 media element
  const applyVolume = useCallback(() => {
    if (mediaRef.current) {
      const targetVol = isMuted ? 0 : volume;
      const safeVol = Math.max(0, Math.min(1, targetVol));
      mediaRef.current.volume = safeVol;
    }
  }, [isMuted, volume]);

  // Sync HTML5 media element volume when volume or isMuted state changes
  useEffect(() => {
    applyVolume();
  }, [applyVolume, src]);

  // Load duration if already available on element
  useEffect(() => {
    const el = mediaRef.current;
    if (el && Number.isFinite(el.duration) && el.duration > 0) {
      setDuration(el.duration);
    }
  }, [src, setDuration]);

  // Sync HTML5 media play/pause state with Zustand store
  useEffect(() => {
    const el = mediaRef.current;
    if (!el || !src) return;

    applyVolume();

    if (isPlaying) {
      el.play()
        .then(() => applyVolume())
        .catch((err) => {
          console.warn("Global media playback error:", err);
          pauseMedia();
          if (err?.name === "NotSupportedError") {
            toast.error("Media stream source is unavailable or still processing on backend.");
          } else {
            toast.error("Playback error. Please check media source.");
          }
        });
    } else {
      el.pause();
    }
  }, [isPlaying, src, pauseMedia, applyVolume]);

  const seekBy = useCallback((delta) => {
    const media = mediaRef.current;
    if (!media) return;
    const max = Number.isFinite(media.duration) ? media.duration : Infinity;
    const newTime = Math.min(Math.max(media.currentTime + delta, 0), max);
    media.currentTime = newTime;
    setCurrentTime(newTime);
  }, [setCurrentTime]);

  // Comprehensive player teardown: drops OS Media Session (SMTC) & fully unloads audio/video resource
  const handleClose = useCallback(() => {
    // 1. Immediately pause and unbind the active media element to stop all audio/video buffers
    if (mediaRef.current) {
      try {
        mediaRef.current.pause();
        mediaRef.current.currentTime = 0;
        mediaRef.current.removeAttribute("src");
        mediaRef.current.load();
      } catch (e) {}
    }

    // 2. Completely dismantle OS Media Session (Windows SMTC / Chrome Global Media Controls)
    if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
      try {
        navigator.mediaSession.metadata = null;
        navigator.mediaSession.playbackState = "none";
        const actions = ["play", "pause", "seekbackward", "seekforward", "seekto", "stop", "previoustrack", "nexttrack"];
        actions.forEach((act) => {
          try {
            navigator.mediaSession.setActionHandler(act, null);
          } catch (e) {}
        });
      } catch (e) {}
    }

    // 3. Restore document title
    if (typeof document !== "undefined") {
      document.title = "BeatX";
    }

    // 4. Update Zustand store
    closePlayer();
  }, [closePlayer]);

  // Synchronize OS Media Session Metadata (Windows SMTC / macOS / Mobile media controls)
  useEffect(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined" || !("mediaSession" in navigator)) return;

    if (!isOpen || !src) {
      try {
        navigator.mediaSession.metadata = null;
        navigator.mediaSession.playbackState = "none";
      } catch (e) {}
      if (typeof document !== "undefined") {
        document.title = "BeatX";
      }
      return;
    }

    // Build absolute URL for artwork so Chromium/Windows SMTC can fetch it reliably
    let absoluteCover = "";
    if (coverUrl) {
      if (coverUrl.startsWith("http://") || coverUrl.startsWith("https://") || coverUrl.startsWith("blob:") || coverUrl.startsWith("data:")) {
        absoluteCover = coverUrl;
      } else {
        absoluteCover = `${window.location.origin}${coverUrl.startsWith("/") ? "" : "/"}${coverUrl}`;
      }
    }

    const displayTitle = title || (mediaType === "video" ? "Video Stream" : "Audio Track");
    const displayArtist = artist || "BeatX";

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: displayTitle,
        artist: displayArtist,
        album: "BeatX",
        artwork: absoluteCover
          ? [
              { src: absoluteCover, sizes: "96x96", type: "image/png" },
              { src: absoluteCover, sizes: "128x128", type: "image/png" },
              { src: absoluteCover, sizes: "192x192", type: "image/png" },
              { src: absoluteCover, sizes: "256x256", type: "image/png" },
              { src: absoluteCover, sizes: "384x384", type: "image/png" },
              { src: absoluteCover, sizes: "512x512", type: "image/png" },
            ]
          : [],
      });
    } catch (e) {
      console.warn("Error setting MediaSession metadata:", e);
    }

    // Update document title for the browser tab
    if (typeof document !== "undefined") {
      document.title = isPlaying ? `▶ ${displayTitle} • ${displayArtist} | BeatX` : `${displayTitle} • ${displayArtist} | BeatX`;
    }
  }, [isOpen, src, title, artist, coverUrl, mediaType, isPlaying]);

  // Sync playbackState with OS media controls
  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;
    if (!isOpen || !src) {
      try {
        navigator.mediaSession.playbackState = "none";
      } catch (e) {}
      return;
    }
    try {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    } catch (e) {}
  }, [isPlaying, isOpen, src]);

  // Sync position state (progress bar in Windows SMTC)
  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;
    if (!("setPositionState" in navigator.mediaSession)) return;
    if (!isOpen || !src || !Number.isFinite(duration) || duration <= 0) return;

    try {
      navigator.mediaSession.setPositionState({
        duration: Math.max(duration, 0),
        playbackRate: 1,
        position: Math.min(Math.max(currentTime, 0), duration),
      });
    } catch (e) {}
  }, [currentTime, duration, isOpen, src]);

  // Register OS hardware / SMTC action handlers (play, pause, seek, stop, prev, next)
  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;
    if (!isOpen || !src) return;

    const handlers = [
      [
        "play",
        () => {
          resumeMedia();
          if (mediaRef.current) mediaRef.current.play().catch(() => {});
        },
      ],
      [
        "pause",
        () => {
          pauseMedia();
          if (mediaRef.current) mediaRef.current.pause();
        },
      ],
      [
        "seekbackward",
        (details) => {
          seekBy(-(details?.seekOffset || SEEK_SECONDS));
        },
      ],
      [
        "seekforward",
        (details) => {
          seekBy(details?.seekOffset || SEEK_SECONDS);
        },
      ],
      [
        "seekto",
        (details) => {
          if (details?.seekTime !== undefined && mediaRef.current) {
            mediaRef.current.currentTime = details.seekTime;
            setCurrentTime(details.seekTime);
          }
        },
      ],
      [
        "previoustrack",
        () => {
          if (hasPrev) playPrev();
        },
      ],
      [
        "nexttrack",
        () => {
          if (hasNext) playNext();
        },
      ],
      [
        "stop",
        () => {
          handleClose();
        },
      ],
    ];

    handlers.forEach(([action, handler]) => {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch (e) {}
    });

    return () => {
      handlers.forEach(([action]) => {
        try {
          navigator.mediaSession.setActionHandler(action, null);
        } catch (e) {}
      });
    };
  }, [isOpen, src, resumeMedia, pauseMedia, handleClose, setCurrentTime, seekBy, hasPrev, hasNext, playPrev, playNext]);

  const handleSeekChange = (e) => {
    const time = Number(e.target.value);
    if (mediaRef.current) {
      mediaRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  const handleVolumeChange = (e) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (mediaRef.current) {
      mediaRef.current.volume = Math.max(0, Math.min(1, isMuted ? 0 : value));
    }
  };

  const toggleFullscreenVideo = () => {
    if (!mediaRef.current) return;
    if (!document.fullscreenElement) {
      mediaRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const handleMediaLoaded = () => {
    applyVolume();
    if (mediaRef.current?.duration) {
      setDuration(mediaRef.current.duration);
    }
  };

  const progress = duration ? currentTime / duration : 0;

  return (
    <AnimatePresence mode="wait">
      {isOpen && src && (
        mediaType === "video" ? (
          /* DEDICATED SLEEK FLOATING VIDEO PLAYER */
          <motion.div
            key="global-floating-video-player"
            layout
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 24,
            }}
            className={cn(
              "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 rounded-xl border border-border/80 bg-(--player-bar-bg) shadow-2xl backdrop-blur-xl overflow-hidden select-none transition-all duration-300",
              isMinimized
                ? "flex items-center gap-2.5 p-2.5 w-[290px] sm:w-[330px]"
                : "flex flex-col w-[340px] sm:w-[410px] md:w-[450px]"
            )}
          >
            {/* 16:9 Video Canvas (expands in full mode, compact thumbnail in mini mode) */}
            <div
              className={cn(
                "relative bg-black group overflow-hidden transition-all duration-300",
                isMinimized
                  ? "aspect-video w-20 shrink-0 rounded-lg cursor-pointer"
                  : "aspect-video w-full"
              )}
              onClick={isMinimized ? toggleMinimize : undefined}
            >
              <video
                ref={mediaRef}
                src={src}
                poster={coverUrl}
                onLoadedMetadata={handleMediaLoaded}
                onTimeUpdate={() => {
                  if (mediaRef.current) setCurrentTime(mediaRef.current.currentTime);
                }}
                onCanPlay={applyVolume}
                onPlay={applyVolume}
                onEnded={() => {
                  if (repeatMode === "one") {
                    if (mediaRef.current) {
                      mediaRef.current.currentTime = 0;
                      mediaRef.current.play().catch(() => {});
                    }
                  } else if (hasNext || isShuffle) {
                    playNext();
                  } else {
                    pauseMedia();
                  }
                }}
                onError={() => {
                  pauseMedia();
                  toast.error("Video stream source failed to load.");
                }}
                className={cn(
                  "size-full object-cover bg-black",
                  !isMinimized && "cursor-pointer object-contain"
                )}
                onClick={!isMinimized ? togglePlay : undefined}
                playsInline
              />

              {/* In minimized mode: Mini expand overlay */}
              {isMinimized && (
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                  <ChevronUp className="size-3.5 text-white/90 drop-shadow" />
                </div>
              )}

              {/* In full mode: Top Hover Header Overlay */}
              {!isMinimized && (
                <div className="absolute top-0 inset-x-0 p-3 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-auto">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-black/60 border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-secondary backdrop-blur-sm shrink-0">
                      <Video className="size-3" />
                      Video
                    </span>
                    <span className="text-xs font-medium text-whitetext truncate drop-shadow-md">
                      {title || "Video Stream"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={toggleMinimize}
                      className="p-1.5 rounded-sm bg-black/50 text-white/80 hover:text-white hover:bg-black/80 backdrop-blur-sm transition-colors cursor-pointer"
                      title="Minimize player"
                    >
                      <ChevronDown className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={toggleFullscreenVideo}
                      className="p-1.5 rounded-sm bg-black/50 text-white/80 hover:text-white hover:bg-black/80 backdrop-blur-sm transition-colors cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize2 className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="p-1.5 rounded-sm bg-black/50 text-white/80 hover:text-red-error hover:bg-black/80 backdrop-blur-sm transition-colors cursor-pointer"
                      title="Close"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* In full mode: Center Play Indicator when Paused */}
              {!isMinimized && !isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/35 cursor-pointer z-10 transition-opacity"
                >
                  <div className="size-12 rounded-full bg-secondary/90 text-black flex items-center justify-center shadow-lg shadow-black/60 hover:scale-110 active:scale-95 transition-all">
                    <svg viewBox="0 0 14 18" className="w-4 h-4 text-black ml-0.5" fill="currentColor">
                      <path d="M1 1.6c0-.9 1-1.4 1.7-.9l10 7.4c.6.4.6 1.3 0 1.8l-10 7.4c-.7.5-1.7 0-1.7-.9V1.6Z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* In minimized mode: Mini Info & Actions */}
            {isMinimized && (
              <>
                <div
                  onClick={toggleMinimize}
                  className="flex min-w-0 flex-1 flex-col cursor-pointer"
                >
                  <span className="truncate text-xs font-semibold text-whitetext">{title || "Video Track"}</span>
                  <span className="truncate text-[10px] text-light-gray">{artist || "BeatX"}</span>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    disabled={isLikePending}
                    onClick={handleToggleLike}
                    className="p-1 rounded-full text-light-gray hover:text-whitetext transition-colors cursor-pointer disabled:opacity-50"
                    title={liked ? "Unlike video" : "Like video"}
                    aria-label={liked ? "Unlike video" : "Like video"}
                  >
                    <Heart
                      className={cn(
                        "size-3.5 transition-colors",
                        liked ? "fill-red-error text-red-error" : "text-light-gray hover:text-whitetext"
                      )}
                    />
                  </button>
                  <GradientPlayButton size="sm" playing={isPlaying} onClick={togglePlay} />
                  <button
                    type="button"
                    onClick={toggleMinimize}
                    className="p-1 rounded-full text-light-gray hover:text-whitetext transition-colors cursor-pointer"
                    title="Expand Video"
                    aria-label="Expand Video"
                  >
                    <ChevronUp className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="p-1 rounded-full text-light-gray hover:text-red-error transition-colors cursor-pointer"
                    title="Close"
                    aria-label="Close"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </>
            )}

            {/* In full mode: Scrub Bar & Control Deck */}
            {!isMinimized && (
              <>
                {/* Seamless Scrub / Seek Bar */}
                <div className="relative h-1.5 w-full bg-dark-gray/60 cursor-pointer">
                  <div
                    className="h-full bg-(image:--button-bg) transition-all"
                    style={{ width: `${progress * 100}%` }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeekChange}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    aria-label="Seek video"
                  />
                </div>

                {/* Control Deck */}
                <div className="px-4 py-3 flex items-center justify-between gap-2.5 bg-black/60 backdrop-blur-md">
                  {/* Left: Metadata & Like */}
                  <div className="flex items-center gap-1.5 min-w-0 max-w-[150px] sm:max-w-[190px]">
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-semibold text-whitetext truncate">{title || "Video Track"}</span>
                      <span className="text-[11px] text-light-gray truncate">
                        {artist || "BeatX"} &middot; <span className="font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
                      </span>
                    </div>
                    <button
                      type="button"
                      disabled={isLikePending}
                      onClick={handleToggleLike}
                      className="p-1 rounded-full text-light-gray hover:text-whitetext transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                      title={liked ? "Unlike video" : "Like video"}
                      aria-label={liked ? "Unlike video" : "Like video"}
                    >
                      <Heart
                        className={cn(
                          "size-3.5 sm:size-4 transition-colors",
                          liked ? "fill-red-error text-red-error" : "text-light-gray hover:text-whitetext"
                        )}
                      />
                    </button>
                  </div>

                  {/* Center: Playback Buttons with Shuffle, Prev, Play, Next, Repeat */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={toggleShuffle}
                      className={cn(
                        "p-1 cursor-pointer transition-colors",
                        isShuffle ? "text-secondary" : "text-light-gray hover:text-whitetext"
                      )}
                      title={isShuffle ? "Shuffle On" : "Shuffle Off"}
                      aria-label="Shuffle"
                    >
                      <Shuffle className="size-3.5 sm:size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={playPrev}
                      disabled={!hasPrev}
                      className={cn(
                        "transition-opacity p-1",
                        !hasPrev
                          ? "opacity-30 pointer-events-none cursor-not-allowed text-light-gray"
                          : "text-light-gray hover:text-whitetext cursor-pointer"
                      )}
                      title="Previous Video"
                    >
                      <SkipBack className="size-3.5 sm:size-4" fill="currentColor" />
                    </button>
                    <GradientPlayButton size="sm" playing={isPlaying} onClick={togglePlay} />
                    <button
                      type="button"
                      onClick={playNext}
                      disabled={!hasNext}
                      className={cn(
                        "transition-opacity p-1",
                        !hasNext
                          ? "opacity-30 pointer-events-none cursor-not-allowed text-light-gray"
                          : "text-light-gray hover:text-whitetext cursor-pointer"
                      )}
                      title="Next Video"
                    >
                      <SkipForward className="size-3.5 sm:size-4" fill="currentColor" />
                    </button>
                    <button
                      type="button"
                      onClick={toggleRepeatMode}
                      className={cn(
                        "p-1 cursor-pointer transition-colors",
                        repeatMode !== "off" ? "text-secondary" : "text-light-gray hover:text-whitetext"
                      )}
                      title={
                        repeatMode === "off"
                          ? "Repeat Off"
                          : repeatMode === "all"
                          ? "Repeat All"
                          : "Repeat One"
                      }
                      aria-label={`Repeat mode: ${repeatMode}`}
                    >
                      {repeatMode === "one" ? (
                        <Repeat1 className="size-3.5 sm:size-4" />
                      ) : (
                        <Repeat className="size-3.5 sm:size-4" />
                      )}
                    </button>
                  </div>

                  {/* Right: Volume, Fullscreen, Close */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <button
                        type="button"
                        onClick={toggleMute}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                        className="text-light-gray hover:text-whitetext transition-colors cursor-pointer"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="size-3.5 sm:size-4 text-light-gray" />
                        ) : (
                          <Volume2 className="size-3.5 sm:size-4 text-light-gray" />
                        )}
                      </button>
                      <div className="relative h-1 w-12 sm:w-16">
                        <div className="absolute inset-0 overflow-hidden rounded-full bg-dark-gray">
                          <div
                            className="h-full rounded-full bg-light-gray"
                            style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                          />
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
                    <button
                      type="button"
                      onClick={toggleFullscreenVideo}
                      className="text-light-gray hover:text-whitetext transition-colors p-1 cursor-pointer hidden sm:block"
                      title="Fullscreen"
                    >
                      <Maximize2 className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="text-light-gray hover:text-red-error transition-colors p-1 cursor-pointer"
                      title="Close"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          /* FLOATING AUDIO STREAM BAR (IDENTICAL TO USER STREAM BAR) */
          <motion.div
            key="global-floating-audio-bar"
            initial={{ y: 120, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 120, x: "-50%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 15,
            }}
            className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-16px)] max-w-4xl items-center justify-between gap-1.5 rounded-full border border-border bg-(--player-bar-bg) px-2.5 py-2 shadow-(--now-playing-glow) backdrop-blur-md sm:bottom-6 sm:w-[calc(100%-48px)] sm:gap-6 sm:px-6 sm:py-3.5 md:gap-12 relative overflow-hidden"
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
              ref={mediaRef}
              src={src}
              preload="metadata"
              onLoadedMetadata={handleMediaLoaded}
              onTimeUpdate={() => {
                if (mediaRef.current) setCurrentTime(mediaRef.current.currentTime);
              }}
              onCanPlay={applyVolume}
              onPlay={applyVolume}
              onEnded={() => {
                if (repeatMode === "one") {
                  if (mediaRef.current) {
                    mediaRef.current.currentTime = 0;
                    mediaRef.current.play().catch(() => {});
                  }
                } else if (hasNext || isShuffle) {
                  playNext();
                } else {
                  pauseMedia();
                }
              }}
              onError={() => {
                pauseMedia();
                toast.error("Audio stream source is unavailable or still processing.");
              }}
              className="hidden"
            />

            {/* Left: Thumbnail & Info + Like */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 min-w-0 max-w-[130px] xs:max-w-[170px] sm:max-w-[250px]">
              <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-dark-accent sm:size-10">
                <CommonCoverImage
                  src={coverUrl}
                  alt={title || "Track artwork"}
                  fallback={
                    <div className="flex size-full items-center justify-center bg-white/10 text-light-gray">
                      <Music className="size-4 sm:size-5 text-secondary" />
                    </div>
                  }
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate whitespace-nowrap text-xs font-semibold text-whitetext sm:text-base md:text-lg">
                  {title || "Audio Track"}
                </span>
                <span className="truncate text-[10px] text-light-gray sm:text-xs leading-tight">
                  {artist || "BeatX"}
                </span>
              </div>
              <button
                type="button"
                disabled={isLikePending}
                onClick={handleToggleLike}
                className="shrink-0 p-1 rounded-full text-light-gray hover:text-whitetext transition-colors cursor-pointer disabled:opacity-50"
                title={liked ? "Unlike audio" : "Like audio"}
                aria-label={liked ? "Unlike audio" : "Like audio"}
              >
                <Heart
                  className={cn(
                    "size-3.5 sm:size-4 transition-colors",
                    liked ? "fill-red-error text-red-error" : "text-light-gray hover:text-whitetext"
                  )}
                />
              </button>
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
                  disabled={!hasPrev}
                  className={cn(
                    "p-1 transition-opacity",
                    !hasPrev
                      ? "opacity-30 pointer-events-none cursor-not-allowed text-light-gray"
                      : "text-whitetext hover:text-secondary cursor-pointer"
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
                  disabled={!hasNext}
                  className={cn(
                    "p-1 transition-opacity",
                    !hasNext
                      ? "opacity-30 pointer-events-none cursor-not-allowed text-light-gray"
                      : "text-whitetext hover:text-secondary cursor-pointer"
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
                <span className="w-8 shrink-0 font-mono text-[10px] text-light-gray sm:w-9 sm:text-xs">
                  {formatTime(currentTime)}
                </span>
                <PlayerSlider
                  value={currentTime}
                  max={duration || 0}
                  step={0.1}
                  onChange={handleSeekChange}
                  ariaLabel="Seek"
                />
                <span className="w-8 shrink-0 text-right font-mono text-[10px] text-light-gray sm:w-9 sm:text-xs">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Right: Tools, Volume & Close */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-3">
              <div className="hidden shrink-0 items-center gap-4 lg:flex">
                <button
                  type="button"
                  className="text-light-gray hover:text-whitetext transition-colors cursor-pointer"
                  aria-label="Lyrics"
                >
                  <Mic2 className="size-4" />
                </button>
                <button
                  type="button"
                  className="text-light-gray hover:text-whitetext transition-colors cursor-pointer"
                  aria-label="Queue"
                >
                  <ListMusic className="size-4" />
                </button>
              </div>

              {/* Volume — inline from sm up, a vertical pop-up on mobile where
                  a horizontal slider would eat the whole row. */}
              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="cursor-pointer hover:text-whitetext transition-colors"
                >
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
                      ? "flex cursor-pointer items-center rounded-full bg-white/10 p-1.5 text-secondary transition-colors"
                      : "flex cursor-pointer items-center rounded-full p-1.5 text-light-gray transition-colors hover:text-whitetext"
                  }
                >
                  {isMuted || volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                </button>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="cursor-pointer rounded-full p-1.5 text-light-gray transition-colors hover:text-red-error sm:p-1"
                aria-label="Close"
                title="Close player"
              >
                <X className="size-4" />
              </button>
            </div>
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
};

export default GlobalFloatingMediaPlayer;

