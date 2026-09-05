"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Play, Pause, Music, RotateCcw, RotateCw, Volume2, Volume1, VolumeX } from "lucide-react";
import CommonInfoBox from "@/components/shared/CommonInfoBox/CommonInfoBox";
import { formatDurationMs } from "@/lib/format/formatDuration";
import { useVolumeStore } from "@/zustandStore/audio/useVolumeStore";
import { useGlobalMediaPlayerStore } from "@/zustandStore/media/useGlobalMediaPlayerStore";

import { getSongAudioUrl, getSongCoverUrl } from "@/lib/format/resolveMediaUrl";
import { toast } from "sonner";

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const SongDetailContent = ({ song }) => {
  // Global Zustand media player store
  const {
    id: activeId,
    isPlaying: isGlobalPlaying,
    currentTime: globalCurrentTime,
    duration: globalDuration,
    playMedia,
    togglePlay: toggleGlobalPlay,
    seekTo,
  } = useGlobalMediaPlayerStore();

  // Global Zustand volume store persisted in localStorage
  const { volume, isMuted, setVolume, toggleMute } = useVolumeStore();

  const audioSrc = getSongAudioUrl(song);
  const coverUrl = getSongCoverUrl(song);

  const isThisSongActive = activeId === (song?._id || audioSrc);
  const isPlaying = isThisSongActive && isGlobalPlaying;
  const currentTime = isThisSongActive ? globalCurrentTime : 0;
  const duration = isThisSongActive ? globalDuration : (song?.durationMs ? song.durationMs / 1000 : 0);

  const togglePlay = () => {
    if (!audioSrc) {
      toast.error("Audio stream is currently unavailable or still processing.");
      return;
    }
    if (isThisSongActive) {
      toggleGlobalPlay();
    } else {
      playMedia({
        id: song?._id || audioSrc,
        mediaType: "audio",
        src: audioSrc,
        title: song?.title || "Audio Stream",
        artist: song?.artist || "BeatX Media",
        coverUrl: coverUrl,
        durationMs: song?.durationMs || 0,
      });
    }
  };

  const handleRewind = () => {
    if (!isThisSongActive) return;
    seekTo(Math.max(currentTime - 10, 0));
  };

  const handleForward = () => {
    if (!isThisSongActive) return;
    seekTo(Math.min(currentTime + 10, duration));
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (isThisSongActive) {
      seekTo(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
  };

  const renderVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="w-4 h-4 text-red-error" />;
    if (volume < 0.5) return <Volume1 className="w-4 h-4 text-light-gray" />;
    return <Volume2 className="w-4 h-4 text-light-gray" />;
  };

  return (
    /* Scrollable Body Content */
    <div className="p-3 sm:p-4 flex flex-col gap-4 sm:gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
      {/* Top 2-Column Grid: Song/Audio Box + Thumbnail Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Song / Audio Track Player Box */}
        <div className="border border-white/10 bg-white/5 rounded-[16px] p-3 sm:p-4 flex flex-col justify-between min-h-[200px]">
          <span className="text-[11px] sm:text-[12px] text-dark-gray font-normal mb-2 uppercase tracking-wider">
            Song
          </span>

          <div className="border border-dashed border-secondary/30 bg-secondary/5 rounded-[16px] p-3 flex flex-col items-center justify-center text-center flex-1 relative overflow-hidden gap-2.5">
            {/* Icon & Track Info */}
            <div className="flex flex-col items-center gap-0.5">
              <Music className={`w-5 h-5 text-secondary ${isPlaying ? "animate-pulse" : ""}`} />
              <span className="text-[12px] sm:text-[13px] font-medium text-whitetext truncate max-w-[180px] sm:max-w-[220px]">
                Audio file {song?.title ? `(${song.title})` : ""}
              </span>
              <span className="text-[10px] sm:text-[11px] text-light-gray font-mono">
                {song?.transcodeStatus === "ready" ? "HLS Master Stream" : "Audio Track"} ·{" "}
                {formatDurationMs(song?.durationMs)}
              </span>
            </div>

            {/* Media Control Buttons & Volume */}
            <div className="flex items-center justify-between w-full px-1 sm:px-2 gap-2">
              {/* Media Controls (Rewind, Play/Pause, Forward) */}
              <div className="flex items-center gap-3 sm:gap-4 mx-auto">
                <button
                  type="button"
                  onClick={handleRewind}
                  disabled={!audioSrc || !isThisSongActive}
                  className="text-light-gray hover:text-secondary active:scale-90 transition-all disabled:opacity-30 cursor-pointer p-1"
                  title="Rewind 10 seconds"
                >
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  disabled={!audioSrc}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-secondary text-black flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 cursor-pointer shadow-md shadow-secondary/20"
                  title={isPlaying ? "Pause" : "Play globally"}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleForward}
                  disabled={!audioSrc || !isThisSongActive}
                  className="text-light-gray hover:text-secondary active:scale-90 transition-all disabled:opacity-30 cursor-pointer p-1"
                  title="Forward 10 seconds"
                >
                  <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Volume Option (Bound to Zustand Store) */}
              <div className="flex items-center gap-1.5 group relative shrink-0">
                <button
                  type="button"
                  onClick={toggleMute}
                  disabled={!audioSrc}
                  className="p-1 hover:bg-white/10 rounded-full transition-all disabled:opacity-30 cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {renderVolumeIcon()}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  disabled={!audioSrc}
                  className="w-12 sm:w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-secondary focus:outline-none"
                  title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                />
              </div>
            </div>

            {/* Audio Progress Bar & Time */}
            <div className="w-full flex items-center gap-2 px-1 sm:px-2 mt-0.5">
              <span className="text-[10px] text-light-gray font-mono min-w-[28px] text-right">
                {formatTime(currentTime)}
              </span>

              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  disabled={!audioSrc || !isThisSongActive}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-secondary focus:outline-none"
                />
              </div>

              <span className="text-[10px] text-light-gray font-mono min-w-[28px] text-left">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail Box */}
        <div className="border border-white/10 bg-white/5 rounded-[16px] p-3 sm:p-4 flex flex-col justify-between min-h-[200px]">
          <span className="text-[11px] sm:text-[12px] text-dark-gray font-normal mb-2 uppercase tracking-wider">
            Thumbnail
          </span>
          <div className="relative w-full h-[130px] sm:h-[135px] rounded-[16px] overflow-hidden border border-white/10 bg-black/40">
            {song?.coverUrl ? (
              <Image
                src={song.coverUrl}
                alt={song?.title || "Cover Thumbnail"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-[16px]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-dark-gray text-xs">
                No Cover Image
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <CommonInfoBox label="Artist" value={song?.artist} />
        <CommonInfoBox label="Album" value={song?.album?.name || song?.album} />
        <CommonInfoBox label="Genre" value={song?.genre?.name} />
        <CommonInfoBox label="Duration" value={formatDurationMs(song?.durationMs)} />
        <CommonInfoBox
          label="Release Date"
          value={song?.publishedAt ? format(new Date(song.publishedAt), "MMM d, yyyy") : "-"}
        />
        <CommonInfoBox label="Total Streams" value={song?.playCount ?? 0} />
        <CommonInfoBox label="Weekly Streams" value={song?.playCountWeek ?? 0} />
        <CommonInfoBox label="Likes" value={song?.likeCount ?? 0} />
        <CommonInfoBox label="Explicit" value={song?.explicit ? "Yes" : "No"} />
        <CommonInfoBox
          label="Trending"
          value={song?.isTrending ? `Yes (${song?.trendDirection || "stable"})` : "No"}
        />
        <CommonInfoBox label="Featured" value={song?.isFeatured ? "Yes" : "No"} />
        <CommonInfoBox label="Owner ID" value={song?.ownerId || "-"} />
        <CommonInfoBox
          label="Reviewed At"
          value={song?.reviewedAt ? format(new Date(song.reviewedAt), "MMM d, yyyy") : "-"}
        />
      </div>
    </div>
  );
};

export default SongDetailContent;
