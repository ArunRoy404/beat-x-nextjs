"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Upload, X, CheckCircle2, Clock, FileText, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonSelectCards from "@/components/shared/CommonInputs/CommonInput/CommonSelectCards"
import { Switch } from "@/components/ui/switch"
import { useVideoDetail } from "@/hooks/api/admin/videos/useVideoDetail"
import { useUpdateVideo } from "@/hooks/api/admin/videos/useUpdateVideo"
import { useUpdateVideoCover } from "@/hooks/api/admin/videos/useUpdateVideoCover"
import { useGenres } from "@/hooks/api/admin/genre/useGenres"

const VISIBILITY_OPTIONS = [
  { value: "active", label: "Active / Published", icon: CheckCircle2 },
  { value: "draft", label: "Save as Draft", icon: FileText },
  { value: "archived", label: "Archived", icon: Clock },
]

const EditVideoDialog = ({ video: summary, children }) => {
  const [open, setOpen] = useState(false)
  const { data: detail } = useVideoDetail(open ? summary?._id : undefined)
  const video = detail || summary

  const imageInputRef = useRef(null)

  const { mutateAsync: updateVideo, isPending: isUpdatingData } = useUpdateVideo()
  const { mutateAsync: updateCover, isPending: isUpdatingCover } = useUpdateVideoCover()
  const isPending = isUpdatingData || isUpdatingCover

  const genresQuery = useGenres()
  const genresData = genresQuery?.data
  const genresList =
    genresData?.genre ??
    genresData?.genres ??
    genresData?.data ??
    (Array.isArray(genresData) ? genresData : [])

  const genreOptions = genresList.map((g) => ({
    value: g?._id || g?.id,
    label: g?.name || "Unnamed Genre",
  }))

  const [newCoverFile, setNewCoverFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState(video?.coverUrl || video?.cover || null)
  const [videoTitle, setVideoTitle] = useState("")
  const [genre, setGenre] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("active")
  const [isFeatured, setIsFeatured] = useState(false)
  const [isTrending, setIsTrending] = useState(false)

  useEffect(() => {
    if (video && open) {
      setVideoTitle(video.title || "")
      setGenre(video.genre?._id || video.genre?.id || (typeof video.genre === "string" ? video.genre : ""))
      setDescription(video.description || video.synopsis || "")
      setStatus((video.status || "active").toLowerCase())
      setIsFeatured(Boolean(video.isFeatured))
      setIsTrending(Boolean(video.isTrending))
      setCoverPreview(video.coverUrl || video.cover || null)
      setNewCoverFile(null)
    }
  }, [video, open])

  const handleSaveChanges = async () => {
    if (!videoTitle.trim()) {
      toast.error("Video Title is required")
      return
    }

    try {
      const body = {
        title: videoTitle.trim(),
        description: description.trim(),
        genre: genre || undefined,
        status,
        isFeatured,
        isTrending,
      }

      await updateVideo({ id: video._id, body })

      if (newCoverFile) {
        await updateCover({ id: video._id, file: newCoverFile })
      }

      toast.success("Video changes saved successfully!")
      setOpen(false)
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update video.")
    }
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewCoverFile(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent showCloseButton={false} className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto scrollbar-thin p-0 border-white/10 bg-[#1A1A19] flex flex-col">
        {/* Header */}
        <DialogHeader className="p-6 border-b border-white/5 flex items-center justify-between">
          <DialogTitle className="text-[20px] font-semibold text-white font-sans">
            Edit Video
          </DialogTitle>
          <DialogClose asChild>
            <button className="w-7 h-7 rounded-full border border-white/10 bg-white/5 text-light-gray flex items-center justify-center cursor-pointer transition-colors active:scale-95">
              <X className="w-3.5 h-3.5" />
            </button>
          </DialogClose>
        </DialogHeader>

        {/* Scrollable Body Content */}
        <div className="p-5 flex flex-col gap-4 overflow-y-auto flex-1 scrollbar-thin">
          
          {/* Custom Thumbnail Image Dropzone */}
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-[12px] text-dark-gray font-semibold uppercase tracking-wider">Thumbnail Image</span>
            <div
              onClick={() => imageInputRef.current?.click()}
              className="group flex flex-col items-center justify-center p-4 h-32 rounded-[16px] border border-dashed border-secondary/15 bg-secondary/5 hover:bg-secondary/10 cursor-pointer transition-all gap-2 relative w-full"
            >
              <input
                type="file"
                ref={imageInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              {coverPreview ? (
                <div className="relative flex flex-col items-center gap-1">
                  <div className="relative w-[120px] h-[64px] rounded-[8px] overflow-hidden border border-white/10">
                    <img
                      src={coverPreview}
                      alt="Thumbnail Preview"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <p className="text-whitetext text-xs font-medium font-sans">
                    Upload thumbnail
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Video Title */}
          <CommonInput
            label="Video Title *"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            placeholder="e.g. Nishithe Asha — Official Music Video"
          />

          {/* Genre */}
          <CommonSelect
            label="Genre"
            value={genre}
            onChange={(val) => setGenre(val)}
            options={genreOptions}
            placeholder="Choose genre"
          />

          {/* Description */}
          <CommonInput
            label="Description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Video description..."
            rows={3}
          />

          {/* Status */}
          <CommonSelectCards
            label="Status"
            value={status}
            onChange={(val) => setStatus(val)}
            options={VISIBILITY_OPTIONS}
          />

          {/* Feature & Trending Toggles */}
          <div className="flex items-center justify-between py-2 border-t border-white/5">
            <span className="text-light-gray text-[14px] font-medium">Featured Video</span>
            <Switch
              checked={isFeatured}
              onCheckedChange={setIsFeatured}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-b border-white/5">
            <span className="text-light-gray text-[14px] font-medium">Trending Video</span>
            <Switch
              checked={isTrending}
              onCheckedChange={setIsTrending}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/5 bg-[#1A1A19] flex items-center gap-4 mt-auto">
          <DialogClose asChild className="flex-1 w-full">
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-full"
              size="lg"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="gradient"
            className="flex-1"
            size="lg"
            onClick={handleSaveChanges}
            isLoading={isPending}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditVideoDialog
