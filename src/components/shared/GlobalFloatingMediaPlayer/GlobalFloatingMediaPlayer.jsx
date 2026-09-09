"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ListMusic,
  Maximize2,
  Mic2,
  Music,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Video,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import GradientPlayButton from "@/components/shared/GradientPlayButton";
import { useGlobalMediaPlayerStore } from "@/zustandStore/media/useGlobalMediaPlayerStore";
import { useVolumeStore } from "@/zustandStore/audio/useVolumeStore";
import { resolveMediaUrl } from "@/lib/format/resolveMediaUrl";
import { toast } from "sonner";

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
    src: rawSrc,
    title,
    artist,
    coverUrl: rawCoverUrl,
    currentTime,
    duration,
    togglePlay,
    pauseMedia,
    setCurrentTime,
    setDuration,
    closePlayer,
  } = useGlobalMediaPlayerStore();

  const src = resolveMediaUrl(rawSrc);
  const coverUrl = resolveMediaUrl(rawCoverUrl);

  const { volume, isMuted, setVolume, toggleMute } = useVolumeStore();

  const mediaRef = useRef(null);
  const [repeat, setRepeat] = useState(false);

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

  // Sync loop/repeat
  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.loop = repeat;
    }
  }, [repeat]);

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

  const seekBy = (delta) => {
    const media = mediaRef.current;
    if (!media) return;
    const max = Number.isFinite(media.duration) ? media.duration : Infinity;
    const newTime = Math.min(Math.max(media.currentTime + delta, 0), max);
    media.currentTime = newTime;
    setCurrentTime(newTime);
  };

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
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 22,
            }}
            className="fixed bottom-6 right-6 z-[999999] w-[340px] sm:w-[410px] md:w-[450px] rounded-xl border border-border bg-(--player-bar-bg) shadow-2xl backdrop-blur-xl overflow-hidden select-none"
          >
            {/* 16:9 Video Canvas */}
            <div className="relative aspect-video w-full bg-black group overflow-hidden">
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
                onEnded={() => pauseMedia()}
                onError={() => {
                  pauseMedia();
                  toast.error("Video stream source failed to load.");
                }}
                className="size-full object-contain bg-black cursor-pointer"
                onClick={togglePlay}
                playsInline
              />

              {/* Top Hover Header Overlay */}
              <div className="absolute top-0 inset-x-0 p-3 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-auto">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-secondary backdrop-blur-sm shrink-0">
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
                    onClick={toggleFullscreenVideo}
                    className="p-1.5 rounded-md bg-black/50 text-white/80 hover:text-white hover:bg-black/80 backdrop-blur-sm transition-colors cursor-pointer"
                    title="Fullscreen"
                  >
                    <Maximize2 className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={closePlayer}
                    className="p-1.5 rounded-md bg-black/50 text-white/80 hover:text-red-error hover:bg-black/80 backdrop-blur-sm transition-colors cursor-pointer"
                    title="Close"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Center Play Indicator when Paused */}
              {!isPlaying && (
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

            {/* Compact Control Deck */}
            <div className="px-4 py-3 flex items-center justify-between gap-3 bg-black/60 backdrop-blur-md">
              {/* Left: Metadata */}
              <div className="flex flex-col min-w-0 max-w-[150px] sm:max-w-[180px]">
                <span className="text-xs font-semibold text-whitetext truncate">{title || "Video Track"}</span>
                <span className="text-[11px] text-light-gray truncate">
                  {artist || "BeatX"} &middot; <span className="font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
                </span>
              </div>

              {/* Center: Playback Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => seekBy(-SEEK_SECONDS)}
                  className="text-light-gray hover:text-whitetext transition-colors p-1 cursor-pointer"
                  title="Rewind 10s"
                >
                  <SkipBack className="size-4" fill="currentColor" />
                </button>
                <GradientPlayButton size="sm" playing={isPlaying} onClick={togglePlay} />
                <button
                  type="button"
                  onClick={() => seekBy(SEEK_SECONDS)}
                  className="text-light-gray hover:text-whitetext transition-colors p-1 cursor-pointer"
                  title="Forward 10s"
                >
                  <SkipForward className="size-4" fill="currentColor" />
                </button>
              </div>

              {/* Right: Volume & Actions */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="text-light-gray hover:text-whitetext transition-colors cursor-pointer"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="size-4 text-light-gray" />
                    ) : (
                      <Volume2 className="size-4 text-light-gray" />
                    )}
                  </button>
                  <div className="relative h-1 w-14 sm:w-16">
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
                  onClick={closePlayer}
                  className="text-light-gray hover:text-red-error transition-colors p-1 cursor-pointer"
                  title="Close"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
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
            className="fixed bottom-6 left-1/2 z-[999999] flex w-[calc(100%-48px)] max-w-4xl items-center gap-6 rounded-full border border-border bg-(--player-bar-bg) px-6 py-3.5 shadow-(--now-playing-glow) backdrop-blur-md md:gap-12"
          >
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
              onEnded={() => pauseMedia()}
              onError={() => {
                pauseMedia();
                toast.error("Audio stream source is unavailable or still processing.");
              }}
              className="hidden"
            />

            {/* Left: Thumbnail & Info */}
            <div className="flex shrink-0 items-center gap-2">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-dark-accent">
                {coverUrl ? (
                  <Image
                    alt={title || "Track artwork"}
                    src={coverUrl}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-white/10 text-light-gray">
                    <Music className="size-5 text-secondary" />
                  </div>
                )}
              </div>
              <div className="hidden flex-col gap-1 sm:flex min-w-0 max-w-[180px]">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap text-lg font-semibold text-whitetext truncate">
                    {title || "Audio Track"}
                  </span>
                </div>
                <span className="text-xs text-light-gray truncate">{artist || "BeatX"}</span>
              </div>
            </div>

            {/* Center: Playback Controls & Seekbar */}
            <div className="flex flex-1 flex-col items-center gap-2">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="hidden text-light-gray sm:block hover:text-whitetext transition-colors cursor-pointer"
                  aria-label="Shuffle"
                >
                  <Shuffle className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => seekBy(-SEEK_SECONDS)}
                  className="text-whitetext hover:text-secondary transition-colors cursor-pointer"
                  aria-label="Rewind 10 seconds"
                >
                  <SkipBack className="size-5" fill="currentColor" />
                </button>
                <GradientPlayButton size="md" playing={isPlaying} onClick={togglePlay} />
                <button
                  type="button"
                  onClick={() => seekBy(SEEK_SECONDS)}
                  className="text-whitetext hover:text-secondary transition-colors cursor-pointer"
                  aria-label="Forward 10 seconds"
                >
                  <SkipForward className="size-5" fill="currentColor" />
                </button>
                <button
                  type="button"
                  onClick={() => setRepeat((prev) => !prev)}
                  className={repeat ? "text-secondary cursor-pointer" : "text-light-gray hover:text-whitetext transition-colors cursor-pointer"}
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
                    <div
                      className="h-full rounded-full bg-(image:--button-bg)"
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
                    aria-label="Seek"
                  />
                </div>
                <span className="w-9 shrink-0 text-xs text-light-gray">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right: Tools, Volume & Close */}
            <div className="flex shrink-0 items-center gap-3">
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
                <div className="flex items-center gap-2">
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
                  <div className="relative h-1 w-20">
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
              </div>

              <button
                type="button"
                onClick={closePlayer}
                className="text-light-gray hover:text-red-error transition-colors p-1 cursor-pointer"
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

