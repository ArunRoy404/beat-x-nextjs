"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMyPlaylists } from "@/hooks/api/user/playlists";
import {
  PlaylistHeroBanner,
  PlaylistSearchFilter,
  PlaylistGrid,
} from "@/components/user/playlist";
import {
  CreatePlaylistDialog,
  EditPlaylistDialog,
  DeletePlaylistDialog,
  PlaylistDetailsDialog,
} from "@/components/dialogs/user/playlist";

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
    (Array.isArray(playlistsData?.data?.data) ? playlistsData.data.data : null) ??
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
      <motion.div variants={itemVariants}>
        <PlaylistSearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filteredCount={filteredPlaylists.length}
          totalCount={playlists.length}
        />
      </motion.div>

      {/* Playlist Grid */}
      <motion.div variants={itemVariants}>
        <PlaylistGrid
          playlists={filteredPlaylists}
          isLoading={isLoading}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery("")}
          onCreateClick={() => setIsCreateOpen(true)}
          onViewDetails={(pl) => setSelectedDetailPlaylist(pl)}
          onEdit={(pl) => setSelectedEditPlaylist(pl)}
          onDelete={(pl) => setSelectedDeletePlaylist(pl)}
        />
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

      <PlaylistDetailsDialog
        playlist={selectedDetailPlaylist}
        open={Boolean(selectedDetailPlaylist)}
        onOpenChange={(open) => {
          if (!open) setSelectedDetailPlaylist(null);
        }}
      />
    </motion.div>
  );
}
