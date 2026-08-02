"use client"

import React, { useState, useEffect } from "react"
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
import CommonImageUpload from "@/components/shared/CommonInputs/CommonImageUpload/CommonImageUpload"
import CommonAudioInput from "@/components/shared/CommonInputs/CommonAudioInput/CommonAudioInput"
import { Switch } from "@/components/ui/switch"
import { useAdminDashboardVideosStore } from "@/zustandStore/admin/adminStore/adminDashboardVideosStore"

const ARTISTS = ["Iqbal Hasan", "Tashrif Khan", "Fahim Islam", "Aura Borealis", "Nabila", "Kazi Shuvo"]
const GENRES = ["Pop", "Folk", "Hip Hop", "Rock", "Lofi", "Biography"]

const VISIBILITY_OPTIONS = [
  { value: "publish", label: "Publish Now", icon: CheckCircle2 },
  { value: "schedule", label: "Schedule", icon: Clock },
  { value: "draft", label: "Save as Draft", icon: FileText },
]

const EditVideoDialog = ({ video, children }) => {
  const [open, setOpen] = useState(false)
  const updateVideo = useAdminDashboardVideosStore((state) => state.updateVideo)

  // Form states
  const [videoFile, setVideoFile] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const [videoTitle, setVideoTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [genre, setGenre] = useState("")
  const [description, setDescription] = useState("")
  const [visibility, setVisibility] = useState("publish")
  const [isPremium, setIsPremium] = useState(false)

  // Sync initial values on open
  useEffect(() => {
    if (video && open) {
      setVideoTitle(video.title || "")
      setArtist(video.artist || "")
      setGenre(video.genre || "")
      setDescription(video.synopsis || "")
      setIsPremium(video.isPremium || false)
      setCoverImage(video.cover || null)
      setVideoFile(video.videoFile || "video.mp4") // Mock string reference to avoid empty check
      setVisibility(
        video.status === "Published"
          ? "publish"
          : video.status === "Scheduled"
            ? "schedule"
            : "draft"
      )
    }
  }, [video, open])

  const handleSaveChanges = () => {
    if (!videoTitle.trim()) {
      toast.error("Video Title is required")
      return
    }
    if (!genre) {
      toast.error("Please choose a genre")
      return
    }

    // Call store action
    updateVideo(video.id, {
      videoFile,
      coverImage,
      videoTitle,
      artist,
      genre,
      description,
      visibility,
      isPremium
    })

    toast.success("Video changes saved successfully!")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto scrollbar-thin p-0 border-white/10 bg-[#1A1A19] flex flex-col">
        {/* Header */}
        <DialogHeader className="p-4 border-b border-white/5 flex items-center justify-between">
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
          
          {/* Two column layout for upload zones in Image 5 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Video File Dropzone */}
            <div className="flex flex-col gap-1.5 w-full">
              <span className="text-[12px] text-dark-gray font-semibold uppercase tracking-wider">Video File *</span>
              <CommonAudioInput
                value={videoFile}
                onChange={(file) => setVideoFile(file)}
                accept="video/*"
                className="bg-secondary/[0.03] border-secondary/20 hover:bg-secondary/[0.06] text-secondary h-28"
              />
            </div>

            {/* Thumbnail Image Dropzone */}
            <div className="flex flex-col gap-1.5 w-full">
              <span className="text-[12px] text-dark-gray font-semibold uppercase tracking-wider">Thumbnail Image *</span>
              <CommonImageUpload
                value={coverImage}
                onChange={(file) => setCoverImage(file)}
                className="bg-secondary/[0.03] border-secondary/20 hover:bg-secondary/[0.06] h-28 min-h-0"
              />
            </div>
          </div>

          {/* Video Title */}
          <CommonInput
            label="Video Title *"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            placeholder="e.g. Nishithe Asha — Official Music Video"
          />

          {/* Artist & Genre */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <CommonSelect
              label="Artist"
              value={artist}
              onChange={(val) => setArtist(val)}
              options={ARTISTS}
              placeholder="Chose Artist"
            />
            <CommonSelect
              label="Genre *"
              value={genre}
              onChange={(val) => setGenre(val)}
              options={GENRES}
              placeholder="Choose genre"
            />
          </div>

          {/* Description */}
          <CommonInput
            label="Description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Episode description / show notes..."
            rows={3}
          />

          {/* Visibility */}
          <CommonSelectCards
            label="Visibility"
            value={visibility}
            onChange={(val) => setVisibility(val)}
            options={VISIBILITY_OPTIONS}
          />

          {/* Feature as Premium Video */}
          <div className="flex items-center justify-between py-2 border-t border-b border-white/5 shrink-0">
            <span className="text-light-gray text-[16px] not-italic font-medium font-sans">
              Feature as Premium Video
            </span>
            <Switch
              checked={isPremium}
              onCheckedChange={setIsPremium}
              className="data-checked:bg-secondary data-unchecked:bg-light-gray/20"
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
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditVideoDialog
