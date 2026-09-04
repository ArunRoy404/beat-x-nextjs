"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import CommonInfoBox from "@/components/shared/CommonInfoBox/CommonInfoBox";
import { formatDurationMs } from "@/lib/format/formatDuration";

const SongDetailContent = ({ song }) => {
  return (
    /* Scrollable Body Content */
    <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
      <div className="grid grid-cols-2 gap-4">
        {/* Thumbnail Box (Full Width) */}
        <div className="col-span-2 border border-white/10 bg-white/5 rounded-[16px] p-4 flex flex-col justify-between">
          <span className="text-[12px] text-dark-gray font-normal mb-2 uppercase tracking-wider">Thumbnail</span>
          <div className="relative w-full h-36 rounded-[16px] overflow-hidden border border-white/10 bg-white/5">
            {song?.coverUrl && (
              <Image
                src={song.coverUrl}
                alt="Cover Thumbnail"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-[16px]"
              />
            )}
          </div>
        </div>

        {/* Info rows */}
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
        <CommonInfoBox label="Transcode Status" value={song?.transcodeStatus || "-"} />
      </div>
    </div>
  );
};

export default SongDetailContent;
