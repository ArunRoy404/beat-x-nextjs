import { create } from "zustand"
import {
  videosStatsCards,
  videosList
} from "@/dummyData/admin/adminData/adminDashboardVideosData"

export const useAdminDashboardVideosStore = create((set) => ({
  videosStatsCards: videosStatsCards,
  videosList: videosList,
  addVideo: (newVideo) => set((state) => {
    const newId = state.videosList.length > 0 ? Math.max(...state.videosList.map(v => v.id)) + 1 : 1
    const coverUrl = newVideo.coverImage && typeof newVideo.coverImage === "object"
      ? URL.createObjectURL(newVideo.coverImage)
      : newVideo.coverImage || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600"

    const videoItem = {
      id: newId,
      title: newVideo.videoTitle || "Untitled Video",
      artist: newVideo.artist || "Unknown Artist",
      duration: "3:45", // Mock duration
      streams: "0",
      likes: "0",
      dislikes: "0",
      genre: newVideo.genre || "General",
      status: newVideo.visibility === "publish"
        ? "Published"
        : newVideo.visibility === "schedule"
          ? "Scheduled"
          : "Draft",
      cover: coverUrl,
      isPremium: newVideo.isPremium || false,
      released: newVideo.releaseDate
        ? (newVideo.releaseDate instanceof Date ? newVideo.releaseDate.toISOString().split('T')[0] : newVideo.releaseDate)
        : new Date().toISOString().split('T')[0],
      synopsis: newVideo.description || "",
      resolution: "1080p"
    }

    return {
      videosList: [videoItem, ...state.videosList],
      videosStatsCards: state.videosStatsCards.map(c => {
        if (c.id === 1) { // Total Videos
          return { ...c, value: (parseInt(c.value) + 1).toString() }
        }
        if (c.id === 3 && videoItem.status === "Published") { // Published
          return { ...c, value: (parseInt(c.value) + 1).toString() }
        }
        if (c.id === 4 && videoItem.status === "Draft") { // Draft
          return { ...c, value: (parseInt(c.value) + 1).toString() }
        }
        return c
      })
    }
  }),
  updateVideo: (id, updatedFields) => set((state) => {
    const updatedList = state.videosList.map((video) => {
      if (video.id === id) {
        const coverUrl = updatedFields.coverImage && typeof updatedFields.coverImage === "object"
          ? URL.createObjectURL(updatedFields.coverImage)
          : updatedFields.coverImage || video.cover

        return {
          ...video,
          title: updatedFields.videoTitle || video.title,
          artist: updatedFields.artist || video.artist,
          genre: updatedFields.genre || video.genre,
          status: updatedFields.visibility === "publish"
            ? "Published"
            : updatedFields.visibility === "schedule"
              ? "Scheduled"
              : updatedFields.visibility === "draft"
                ? "Draft"
                : (updatedFields.status || video.status),
          cover: coverUrl,
          isPremium: updatedFields.isPremium !== undefined ? updatedFields.isPremium : video.isPremium,
          released: updatedFields.releaseDate
            ? (updatedFields.releaseDate instanceof Date ? updatedFields.releaseDate.toISOString().split('T')[0] : updatedFields.releaseDate)
            : video.released,
          synopsis: updatedFields.description !== undefined ? updatedFields.description : video.synopsis
        }
      }
      return video
    })

    // Recalculate stats cards based on updatedList
    const total = updatedList.length
    const publishedCount = updatedList.filter(v => v.status === "Published").length
    const draftCount = updatedList.filter(v => v.status === "Draft").length

    return {
      videosList: updatedList,
      videosStatsCards: state.videosStatsCards.map(c => {
        if (c.id === 1) return { ...c, value: total.toString() }
        if (c.id === 3) return { ...c, value: publishedCount.toString() }
        if (c.id === 4) return { ...c, value: draftCount.toString() }
        return c
      })
    }
  }),
  deleteVideo: (id) => set((state) => {
    const deletedVideo = state.videosList.find(v => v.id === id)
    const updatedList = state.videosList.filter((video) => video.id !== id)
    const total = updatedList.length
    const publishedCount = updatedList.filter(v => v.status === "Published").length
    const draftCount = updatedList.filter(v => v.status === "Draft").length

    return {
      videosList: updatedList,
      videosStatsCards: state.videosStatsCards.map(c => {
        if (c.id === 1) return { ...c, value: total.toString() }
        if (c.id === 3) return { ...c, value: publishedCount.toString() }
        if (c.id === 4) return { ...c, value: draftCount.toString() }
        return c
      })
    }
  })
}))
