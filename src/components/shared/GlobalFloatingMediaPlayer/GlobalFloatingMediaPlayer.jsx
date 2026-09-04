"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  Volume1,
  VolumeX,
  X,
  Minimize2,
  Maximize2,
  GripHorizontal,
  Music,
  Video,
} from "lucide-react";
import { useGlobalMediaPlayerStore } from "@/zustandStore/media/useGlobalMediaPlayerStore";
import { useVolumeStore } from "@/zustandStore/audio/useVolumeStore";

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const GlobalFloatingMediaPlayer = () => {
  const {
    isOpen,
    isMinimized,
    isPlaying,
    mediaType,
    src,
    title,
    artist,
    coverUrl,
    currentTime,
    duration,
    togglePlay,
    pauseMedia,
    setCurrentTime,
    setDuration,
    toggleMinimize,
    closePlayer,
  } = useGlobalMediaPlayerStore();

  const { volume, isMuted, setVolume, toggleMute } = useVolumeStore();

  const mediaRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
        });
    } else {
      el.pause();
    }
  }, [isPlaying, src, pauseMedia, applyVolume]);

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (mediaRef.current) {
      mediaRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleRewind = () => {
    if (!mediaRef.current) return;
    const newTime = Math.max(mediaRef.current.currentTime - 10, 0);
    mediaRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleForward = () => {
    if (!mediaRef.current) return;
    const totalDuration = duration || mediaRef.current.duration || 0;
    const newTime = Math.min(mediaRef.current.currentTime + 10, totalDuration);
    mediaRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (mediaRef.current) {
      mediaRef.current.volume = Math.max(0, Math.min(1, isMuted ? 0 : newVol));
    }
  };

  const toggleFullscreenVideo = () => {
    if (!mediaRef.current) return;
    if (!document.fullscreenElement) {
      mediaRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const renderVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="w-3.5 h-3.5 text-red-error" />;
    if (volume < 0.5) return <Volume1 className="w-3.5 h-3.5 text-light-gray" />;
    return <Volume2 className="w-3.5 h-3.5 text-light-gray" />;
  };

  const handleMediaLoaded = () => {
    applyVolume();
    if (mediaRef.current?.duration) {
      setDuration(mediaRef.current.duration);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && src && (
        /* Draggable Floating Container fixed at bottom right by default */
        <motion.div
          key="global-floating-media-player"
          drag
          dragMomentum={false}
          layout
          initial={{ opacity: 0, scale: 0.15, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.15, y: 30 }}
          transition={{
            type: "spring",
            stiffness: 360,
            damping: 24,
            mass: 0.75,
          }}
          className="fixed bottom-6 right-6 z-[999999] shadow-2xl rounded-[20px] bg-[#0E0E0E]/95 backdrop-blur-xl border border-white/15 text-whitetext overflow-hidden select-none cursor-default"
          style={{ touchAction: "none", transformOrigin: "bottom right" }}
        >
          {/* Hidden / Visible Media HTML5 Element */}
          {mediaType === "video" ? (
            <video
              ref={mediaRef}
              src={src}
              onTimeUpdate={() => mediaRef.current && setCurrentTime(mediaRef.current.currentTime)}
              onLoadedMetadata={handleMediaLoaded}
              onCanPlay={applyVolume}
              onPlay={applyVolume}
              onEnded={() => pauseMedia()}
              className={isMinimized ? "hidden" : "w-full h-44 object-cover bg-black"}
              playsInline
            />
          ) : (
            <audio
              ref={mediaRef}
              src={src}
              onTimeUpdate={() => mediaRef.current && setCurrentTime(mediaRef.current.currentTime)}
              onLoadedMetadata={handleMediaLoaded}
              onCanPlay={applyVolume}
              onPlay={applyVolume}
              onEnded={() => pauseMedia()}
              className="hidden"
            />
          )}

          {/* MINIMIZED VIEW */}
          {isMinimized ? (
            <motion.div
              key="minimized-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-3 p-2.5 px-3 w-72"
            >
              {/* Drag Handle */}
              <div className="cursor-grab active:cursor-grabbing text-white/40 hover:text-white/80 transition-colors">
                <GripHorizontal className="w-4 h-4" />
              </div>

              {/* Thumbnail */}
              <div className="relative w-8 h-8 rounded-[8px] overflow-hidden bg-white/10 shrink-0 border border-white/10">
                {coverUrl ? (
                  <Image src={coverUrl} alt={title} fill className="object-cover" sizes="32px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {mediaType === "video" ? <Video className="w-3.5 h-3.5 text-secondary" /> : <Music className="w-3.5 h-3.5 text-secondary" />}
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[12px] font-medium text-whitetext truncate">{title || "Playing..."}</span>
                <span className="text-[10px] text-light-gray truncate">{artist || formatTime(currentTime)}</span>
              </div>

              {/* Controls */}
              <button
                onClick={togglePlay}
                className="w-7 h-7 rounded-full bg-secondary text-black flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={toggleMinimize}
                className="text-light-gray hover:text-whitetext transition-colors p-1 cursor-pointer"
                title="Expand"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={closePlayer}
                className="text-light-gray hover:text-red-error transition-colors p-1 cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ) : (
            /* EXPANDED FULL FLOATING PLAYER VIEW */
            <motion.div
              key="expanded-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-80 sm:w-88 p-3.5 flex flex-col gap-3"
            >
              {/* Header Drag Bar & Quick Actions */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5 cursor-grab active:cursor-grabbing text-light-gray hover:text-whitetext transition-colors">
                  <GripHorizontal className="w-4 h-4 text-secondary" />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-light-gray flex items-center gap-1">
                    {mediaType === "video" ? <Video className="w-3 h-3 text-secondary" /> : <Music className="w-3 h-3 text-secondary" />}
                    {mediaType === "video" ? "Video Player" : "Audio Player"}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {mediaType === "video" && (
                    <button
                      onClick={toggleFullscreenVideo}
                      className="p-1 text-light-gray hover:text-whitetext hover:bg-white/10 rounded-[6px] transition-colors cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={toggleMinimize}
                    className="p-1 text-light-gray hover:text-whitetext hover:bg-white/10 rounded-[6px] transition-colors cursor-pointer"
                    title="Minimize"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={closePlayer}
                    className="p-1 text-light-gray hover:text-red-error hover:bg-white/10 rounded-[6px] transition-colors cursor-pointer"
                    title="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Audio Album Art / Poster (If audio mode) */}
              {mediaType === "audio" && (
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-2.5 rounded-[14px]">
                  <div className="relative w-12 h-12 rounded-[10px] overflow-hidden bg-black/40 shrink-0 border border-white/10">
                    {coverUrl ? (
                      <Image src={coverUrl} alt={title || "Cover"} fill className="object-cover" sizes="48px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music className="w-5 h-5 text-secondary animate-pulse" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[13px] font-semibold text-whitetext truncate">{title || "Audio Track"}</span>
                    <span className="text-[11px] text-light-gray truncate mt-0.5">{artist || "BeatX Media"}</span>
                  </div>
                </div>
              )}

              {/* Controls Row (Rewind -10s, Play/Pause, Forward +10s & Volume) */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3.5 mx-auto">
                  <button
                    onClick={handleRewind}
                    className="text-light-gray hover:text-secondary active:scale-90 transition-all p-1 cursor-pointer"
                    title="Rewind 10 seconds"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-secondary text-black flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all shadow-md shadow-secondary/20 cursor-pointer"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={handleForward}
                    className="text-light-gray hover:text-secondary active:scale-90 transition-all p-1 cursor-pointer"
                    title="Forward 10 seconds"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>

                {/* Volume Slider Option */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={toggleMute} className="p-1 hover:bg-white/10 rounded-full cursor-pointer" title={isMuted ? "Unmute" : "Mute"}>
                    {renderVolumeIcon()}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-14 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-secondary focus:outline-none"
                    title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                  />
                </div>
              </div>

              {/* Seek Bar & Progress */}
              <div className="w-full flex items-center gap-2 px-1">
                <span className="text-[10px] text-light-gray font-mono min-w-[28px] text-right">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-secondary focus:outline-none"
                />
                <span className="text-[10px] text-light-gray font-mono min-w-[28px] text-left">{formatTime(duration)}</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalFloatingMediaPlayer;
