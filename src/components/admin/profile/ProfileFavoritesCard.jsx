"use client"

import React from "react"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import { Music, Mic, Tag, Video, Heart } from "lucide-react"

const ProfileFavoritesCard = ({ profile }) => {
  const favoritesList = [
    {
      title: "Favorite Songs",
      count: profile?.favoriteSongs?.length ?? 0,
      icon: Music,
      color: "#CC97FF",
      bg: "rgba(204, 151, 255, 0.15)",
    },
    {
      title: "Favorite Artists",
      count: profile?.favoriteArtists?.length ?? 0,
      icon: Mic,
      color: "#3ADFFA",
      bg: "rgba(58, 223, 250, 0.15)",
    },
    {
      title: "Favorite Genres",
      count: profile?.favoriteGenres?.length ?? 0,
      icon: Tag,
      color: "#E5F9CF",
      bg: "rgba(229, 249, 207, 0.15)",
    },
    {
      title: "Favorite Videos",
      count: profile?.favoriteVideos?.length ?? 0,
      icon: Video,
      color: "#FFC864",
      bg: "rgba(255, 200, 100, 0.15)",
    },
    {
      title: "Liked Videos",
      count: profile?.likedVideos?.length ?? 0,
      icon: Heart,
      color: "#FF9999",
      bg: "rgba(255, 153, 153, 0.15)",
    },
  ]

  return (
    <CommonCard
      title="Saved Collections & Favorites"
      subtitle="Overview of user's favorited songs, artists, genres, and videos"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10 pt-2">
        {favoritesList.map((item, idx) => {
          const IconComp = item.icon
          return (
            <div
              key={idx}
              className="bg-[#141414] border border-border/50 rounded-[8px] p-4 flex flex-col items-center justify-center text-center gap-2 transition-all hover:border-secondary/40"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: item.bg, color: item.color }}
              >
                <IconComp className="w-5 h-5" />
              </div>
              <span className="text-whitetext text-xl font-bold">{item.count}</span>
              <span className="text-light-gray text-xs font-normal">{item.title}</span>
            </div>
          )
        })}
      </div>
    </CommonCard>
  )
}

export default ProfileFavoritesCard
