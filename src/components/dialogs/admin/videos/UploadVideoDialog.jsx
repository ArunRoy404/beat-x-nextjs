"use client"

import React, { useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Upload, X, CheckCircle2, Clock, FileText, Image as ImageIcon, Video as VideoIcon } from "lucide-react"
import { toast } from "sonner"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonSelectCards from "@/components/shared/CommonInputs/CommonInput/CommonSelectCards"
import { Switch } from "@/components/ui/switch"
import { useCreateVideo } from "@/hooks/api/admin/videos/useCreateVideo"
import { useGenres } from "@/hooks/api/admin/genre/useGenres"

const VISIBILITY_OPTIONS = [
  { value: "active", label: "Publish Now", icon: CheckCircle2 },
  { value: "draft", label: "Save as Draft", icon: FileText },
]

const UploadVideoDialog = ({ children }) => {
  const [open, setOpen] = useState(false)
  const { mutate: createVideo, isPending } = useCreateVideo()

  const videoInputRef = useRef(null)
  const imageInputRef = useRef(null)

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

  const [videoFile, setVideoFile] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const [videoTitle, setVideoTitle] = useState("")
  const [genre, setGenre] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("active")
  const [isFeatured, setIsFeatured] = useState(false)

  const handleReset = () => {
    setVideoFile(null)
    setCoverImage(null)
    setVideoTitle("")
    setGenre("")
    setDescription("")
    setStatus("active")
    setIsFeatured(false)
  }

  const handleUpload = () => {
    if (!videoFile) {
      toast.error("Please select a video file")
      return
    }
    if (!coverImage) {
      toast.error("Please upload a thumbnail image")
      return
    }
    if (!videoTitle.trim()) {
      toast.error("Video Title is required")
      return
    }

    const formData = new FormData()
    formData.append("title", videoTitle.trim())
    formData.append("video", videoFile)
    formData.append("cover", coverImage)
    if (genre) formData.append("genre", genre)
    if (description) formData.append("description", description.trim())
    formData.append("status", status)
    formData.append("isFeatured", String(isFeatured))

    createVideo(formData, {
      onSuccess: () => {
        toast.success("Video uploaded successfully! Processing video now.")
        handleReset()
        setOpen(false)
      },
      onError: (error) => toast.error(error?.response?.data?.message || error?.message || "Failed to upload video."),
    })
  }

  const handleVideoSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) setVideoFile(file)
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) setCoverImage(file)
  }

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val)
      if (!val) handleReset()
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent showCloseButton={false} className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto scrollbar-thin p-0 border-white/10 bg-[#1A1A19] flex flex-col">
        {/* Header */}
        <DialogHeader className="p-6 border-b border-white/5 flex items-center justify-between">
          <DialogTitle className="text-[20px] font-semibold text-white font-sans">
            Upload New Video
          </DialogTitle>
          <DialogClose asChild>
            <button className="w-7 h-7 rounded-full border border-white/10 bg-white/5 text-light-gray flex items-center justify-center cursor-pointer transition-colors active:scale-95">
              <X className="w-3.5 h-3.5" />
            </button>
          </DialogClose>
        </DialogHeader>

        {/* Scrollable Body Content */}
        <div className="p-5 flex flex-col gap-5 overflow-y-auto flex-1 scrollbar-thin">
          
          {/* Custom Video Dropzone */}
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-[12px] text-dark-gray font-semibold uppercase tracking-wider">Video File *</span>
            <div
              onClick={() => videoInputRef.current?.click()}
              className="group flex flex-col items-center justify-center p-6 h-32 rounded-[16px] border border-dashed border-secondary/15 bg-secondary/5 hover:bg-secondary/10 cursor-pointer transition-all gap-2 relative"
            >
              <input
                type="file"
                ref={videoInputRef}
                onChange={handleVideoSelect}
                accept="video/*"
                className="hidden"
              />
              {videoFile ? (
                <div className="text-center min-w-0 w-full px-4 flex flex-col items-center gap-1">
                  <p className="text-whitetext text-sm font-medium truncate">
                    {videoFile.name}
                  </p>
                  <p className="text-light-whitetext text-xs">
                    {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <span className="mt-1 px-3 py-1 rounded-full bg-secondary/20 hover:bg-secondary/30 text-secondary text-[11px] font-medium transition-colors">
                    Replace File
                  </span>
                </div>
              ) : (
                <div className="text-center flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                    <VideoIcon className="w-4 h-4" />
                  </div>
                  <p className="text-whitetext text-[14px] font-medium font-sans">
                    Drop video file here
                  </p>
                  <p className="text-light-whitetext text-[11px] mt-0.5 font-sans">
                    MP4 / MOV / AVI &middot; Max 2GB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Custom Thumbnail Image Dropzone */}
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-[12px] text-dark-gray font-semibold uppercase tracking-wider">Thumbnail Image *</span>
            <div
              onClick={() => imageInputRef.current?.click()}
              className="group flex flex-col items-center justify-center p-4 min-h-[140px] rounded-[16px] border border-dashed border-secondary/15 bg-secondary/5 hover:bg-secondary/10 cursor-pointer transition-all gap-2 relative w-full"
            >
              <input
                type="file"
                ref={imageInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              {coverImage ? (
                <div className="relative flex flex-col items-center gap-2">
                  <div className="relative w-[120px] h-[72px] rounded-[12px] overflow-hidden border border-whitetext/10">
                    <img
                      src={URL.createObjectURL(coverImage)}
                      alt="Thumbnail Preview"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-dark-accent">
                        <Upload className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  <span className="text-light-whitetext text-[13px] font-sans">
                    {coverImage.name}
                  </span>
                </div>
              ) : (
                <div className="text-center flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <p className="text-whitetext text-[14px] font-medium font-sans">
                    Upload thumbnail image
                  </p>
                  <p className="text-light-whitetext text-[11px] font-sans">
                    min 1920&times;1080px
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

          {/* Feature Video */}
          <div className="flex items-center justify-between py-2 border-t border-b border-white/5 shrink-0">
            <span className="text-light-gray text-[14px] not-italic font-medium font-sans">
              Feature Video
            </span>
            <Switch
              checked={isFeatured}
              onCheckedChange={setIsFeatured}
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
            onClick={handleUpload}
            isLoading={isPending}
          >
            Upload Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UploadVideoDialog
