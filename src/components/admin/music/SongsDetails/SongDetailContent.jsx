"use client";

import React, { useRef, useEffect } from "react";
import { format } from "date-fns";
import { Music, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import CommonInfoBox from "@/components/shared/CommonInfoBox/CommonInfoBox";
import CommonCoverImage from "@/components/shared/CommonCoverImage/CommonCoverImage";
import GradientPlayButton from "@/components/shared/GradientPlayButton";
import PlayerSlider from "@/components/shared/MediaPlayerControls/PlayerSlider";
import { formatDurationMs } from "@/lib/format/formatDuration";
import { SONG_STATUS_LABELS, normalizeSongStatus } from "@/lib/constants/songStatus";
import { useVolumeStore } from "@/zustandStore/audio/useVolumeStore";
import { useGlobalMediaPlayerStore } from "@/zustandStore/media/useGlobalMediaPlayerStore";

import { getSongAudioUrl, getSongCoverUrl } from "@/lib/format/resolveMediaUrl";
import { toast } from "sonner";

/**
 * `album`, `ownerId` and `reviewedBy` are Mongo refs: sometimes populated
 * objects, sometimes bare ObjectIds. Either way they must be reduced to a
 * string — rendering the object itself throws "Objects are not valid as a
 * React child".
 */
const refToText = (ref, ...fields) => {
  if (!ref) return "";
  if (typeof ref === "string") return ref;
  if (typeof ref === "object") {
    for (const field of fields) {
      if (ref?.[field]) return ref[field];
    }
    return ref?._id || "";
  }
  return "";
};

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return isNaN(date.getTime()) ? "" : format(date, "MMM d, yyyy");
};

// Mirrors the floating stream bar's mm:ss so the two players read identically.
const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "00:00";
  const total = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
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

          <div className="flex flex-1 flex-col justify-center gap-3 rounded-[16px] border border-border bg-(--player-bar-bg) p-3 backdrop-blur-md sm:p-4">
            {/* Track identity — mirrors the floating bar's left block */}
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-dark-accent">
                <CommonCoverImage
                  src={coverUrl}
                  alt={song?.title || "Track artwork"}
                  fallback={
                    <div className="flex size-full items-center justify-center bg-white/10">
                      <Music className={`size-5 text-secondary ${isPlaying ? "animate-pulse" : ""}`} />
                    </div>
                  }
                />
              </div>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate text-sm font-semibold text-whitetext">
                  {song?.title || "Audio Track"}
                </span>
                <span className="truncate text-[11px] text-light-gray">
                  {song?.transcodeStatus === "ready" ? "HLS Master Stream" : "Audio Track"} &middot;{" "}
                  {formatDurationMs(song?.durationMs)}
                </span>
              </div>
            </div>

            {/* Seek */}
            <div className="flex w-full items-center gap-2">
              <span className="w-9 shrink-0 font-mono text-[11px] text-light-gray">
                {formatTime(currentTime)}
              </span>
              <PlayerSlider
                value={currentTime}
                max={duration || 0}
                step={0.1}
                onChange={handleSeek}
                disabled={!audioSrc || !isThisSongActive}
                ariaLabel="Seek"
              />
              <span className="w-9 shrink-0 text-right font-mono text-[11px] text-light-gray">
                {formatTime(duration)}
              </span>
            </div>

            {/* Transport + volume */}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  onClick={handleRewind}
                  disabled={!audioSrc || !isThisSongActive}
                  className="cursor-pointer text-whitetext transition-colors hover:text-secondary disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Rewind 10 seconds"
                  title="Rewind 10 seconds"
                >
                  <SkipBack className="size-5" fill="currentColor" />
                </button>

                <GradientPlayButton
                  size="sm"
                  playing={isPlaying}
                  onClick={togglePlay}
                  disabled={!audioSrc}
                  className="disabled:cursor-not-allowed disabled:opacity-40"
                />

                <button
                  type="button"
                  onClick={handleForward}
                  disabled={!audioSrc || !isThisSongActive}
                  className="cursor-pointer text-whitetext transition-colors hover:text-secondary disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Forward 10 seconds"
                  title="Forward 10 seconds"
                >
                  <SkipForward className="size-5" fill="currentColor" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  disabled={!audioSrc}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="cursor-pointer transition-colors hover:text-whitetext disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="size-4 text-light-gray" />
                  ) : (
                    <Volume2 className="size-4 text-light-gray" />
                  )}
                </button>
                <div className="w-24 sm:w-20">
                  <PlayerSlider
                    variant="volume"
                    value={isMuted ? 0 : volume}
                    max={1}
                    step={0.01}
                    onChange={handleVolumeChange}
                    disabled={!audioSrc}
                    ariaLabel="Volume"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Box */}
        <div className="border border-white/10 bg-white/5 rounded-[16px] p-3 sm:p-4 flex flex-col justify-between min-h-[200px]">
          <span className="text-[11px] sm:text-[12px] text-dark-gray font-normal mb-2 uppercase tracking-wider">
            Thumbnail
          </span>
          <div className="relative w-full h-[130px] sm:h-[135px] rounded-[16px] overflow-hidden border border-white/10 bg-black/40">
            <CommonCoverImage
              src={coverUrl}
              alt={song?.title || "Cover Thumbnail"}
              className="rounded-[16px]"
              fallback={
                <div className="w-full h-full flex items-center justify-center text-dark-gray text-xs">
                  No Cover Image
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <CommonInfoBox label="Artist" value={song?.artist} />
        <CommonInfoBox label="Album" value={refToText(song?.album, "title", "name")} />
        <CommonInfoBox label="Genre" value={song?.genre?.name} />
        <CommonInfoBox label="Duration" value={formatDurationMs(song?.durationMs)} />
        <CommonInfoBox label="Release Date" value={formatDate(song?.publishedAt)} />
        <CommonInfoBox label="Scheduled For" value={formatDate(song?.scheduledAt)} />
        <CommonInfoBox label="Total Streams" value={song?.playCount ?? 0} />
        <CommonInfoBox label="Weekly Streams" value={song?.playCountWeek ?? 0} />
        <CommonInfoBox label="Likes" value={song?.likeCount ?? 0} />
        <CommonInfoBox label="Explicit" value={song?.explicit ? "Yes" : "No"} />
        <CommonInfoBox
          label="Trending"
          value={song?.isTrending ? (song?.trendDirection ? `Yes (${song.trendDirection})` : "Yes") : "No"}
        />
        <CommonInfoBox label="Featured" value={song?.isFeatured ? "Yes" : "No"} />
        <CommonInfoBox label="Owner" value={refToText(song?.ownerId, "name", "email")} />
      </div>

      {/* Moderation / review trail — populated once a song goes through the
          artist submission queue (approve/reject). */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <CommonInfoBox
          label="Submitted Status"
          value={SONG_STATUS_LABELS[normalizeSongStatus(song?.submittedStatus)] || ""}
        />
        <CommonInfoBox label="Submitted At" value={formatDate(song?.submittedAt)} />
        <CommonInfoBox label="Reviewed By" value={refToText(song?.reviewedBy, "name", "email")} />
        <CommonInfoBox label="Reviewed At" value={formatDate(song?.reviewedAt)} />
        <CommonInfoBox label="Rejection Reason" value={song?.rejectionReason} />
        <CommonInfoBox label="Transcode Status" value={song?.transcodeStatus} />
      </div>
    </div>
  );
};

export default SongDetailContent;
