"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, ListMusic, Music, Disc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyPlaylists } from "@/hooks/api/user/playlists";
import {
  PlaylistHeroBanner,
  PlaylistCard,
  CreatePlaylistDialog,
  EditPlaylistDialog,
  DeletePlaylistDialog,
  PlaylistDetailModal,
} from "@/components/user/playlist";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function UserPlaylistPage() {
  const { data: playlistsData, isLoading } = useMyPlaylists({ page: 1, limit: 50 });

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedDetailPlaylist, setSelectedDetailPlaylist] = useState(null);
  const [selectedEditPlaylist, setSelectedEditPlaylist] = useState(null);
  const [selectedDeletePlaylist, setSelectedDeletePlaylist] = useState(null);

  const rawPlaylists =
    (Array.isArray(playlistsData?.data) ? playlistsData.data : null) ??
    (Array.isArray(playlistsData?.playlists) ? playlistsData.playlists : null) ??
    (Array.isArray(playlistsData) ? playlistsData : []);

  const playlists = Array.isArray(rawPlaylists) ? rawPlaylists : [];

  const filteredPlaylists = playlists.filter((pl) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const title = (pl?.title || pl?.name || "").toLowerCase();
    return title.includes(q);
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-8 py-6"
    >
      {/* Hero Banner */}
      <motion.div variants={itemVariants}>
        <PlaylistHeroBanner
          totalCount={playlists.length}
          onCreateClick={() => setIsCreateOpen(true)}
        />
      </motion.div>

      {/* Filter and Search Bar */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-light-gray" />
          <Input
            type="text"
            placeholder="Search within your playlists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 pl-10 rounded-xl border-white/10 bg-dark-accent/60 text-whitetext placeholder:text-light-gray/60 focus-visible:border-secondary focus-visible:ring-1 focus-visible:ring-secondary backdrop-blur-md"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-light-gray">
            Showing <strong className="text-whitetext">{filteredPlaylists.length}</strong> of{" "}
            {playlists.length}
          </span>
        </div>
      </motion.div>

      {/* Playlist Grid */}
      <motion.div variants={itemVariants}>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 rounded-[20px] border border-white/5 bg-dark-accent/30 p-4"
              >
                <Skeleton className="aspect-square w-full rounded-[16px] bg-white/5" />
                <Skeleton className="h-4 w-3/4 rounded-md bg-white/5" />
                <Skeleton className="h-3 w-1/2 rounded-md bg-white/5" />
              </div>
            ))}
          </div>
        ) : filteredPlaylists.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredPlaylists.map((playlist) => {
              const playlistId = playlist?._id || playlist?.id;
              return (
                <PlaylistCard
                  key={playlistId}
                  playlist={playlist}
                  onViewDetails={(pl) => setSelectedDetailPlaylist(pl)}
                  onEdit={(pl) => setSelectedEditPlaylist(pl)}
                  onDelete={(pl) => setSelectedDeletePlaylist(pl)}
                />
              );
            })}
          </div>
        ) : searchQuery.trim() ? (
          /* Search Empty State */
          <div className="flex w-full flex-col items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-dark-accent/20 py-16 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-light-gray">
              <Search className="size-6 text-light-gray" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-whitetext">
              No playlists matched your search
            </h3>
            <p className="mt-1 text-xs text-light-gray max-w-sm">
              We couldn't find any playlists with "{searchQuery}". Try a different keyword or clear
              your search.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSearchQuery("")}
              className="mt-4 h-9 px-4 rounded-xl border-white/20 text-whitetext hover:bg-white/10 cursor-pointer"
            >
              Clear Search
            </Button>
          </div>
        ) : (
          /* Global Empty State */
          <div className="flex w-full flex-col items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-dark-accent/20 py-16 text-center">
            <div className="flex size-16 items-center justify-center rounded-3xl bg-secondary/10 border border-secondary/20 text-secondary shadow-lg shadow-secondary/10">
              <ListMusic className="size-8 stroke-[1.8]" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-whitetext">
              Your playlist collection is empty
            </h3>
            <p className="mt-1.5 max-w-md text-sm text-light-gray leading-relaxed">
              Playlists are the best way to group your favorite songs, moods, and musical moments.
              Start your first collection right now.
            </p>
            <Button
              type="button"
              variant="gradient"
              onClick={() => setIsCreateOpen(true)}
              className="mt-6 h-10 px-6 rounded-xl font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Plus className="size-4 stroke-[2.5]" />
              <span>Create Your First Playlist</span>
            </Button>
          </div>
        )}
      </motion.div>

      {/* Dialog Modals */}
      <CreatePlaylistDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />

      <EditPlaylistDialog
        playlist={selectedEditPlaylist}
        open={Boolean(selectedEditPlaylist)}
        onOpenChange={(open) => {
          if (!open) setSelectedEditPlaylist(null);
        }}
      />

      <DeletePlaylistDialog
        playlist={selectedDeletePlaylist}
        open={Boolean(selectedDeletePlaylist)}
        onOpenChange={(open) => {
          if (!open) setSelectedDeletePlaylist(null);
        }}
      />

      <PlaylistDetailModal
        playlist={selectedDetailPlaylist}
        open={Boolean(selectedDetailPlaylist)}
        onOpenChange={(open) => {
          if (!open) setSelectedDetailPlaylist(null);
        }}
      />
    </motion.div>
  );
}
