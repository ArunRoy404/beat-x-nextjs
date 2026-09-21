"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { X, CheckCircle2, Clock, FileText, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonSelectCards from "@/components/shared/CommonInputs/CommonInput/CommonSelectCards"
import { Switch } from "@/components/ui/switch"
import { useVideoDetail } from "@/hooks/api/admin/videos/useVideoDetail"
import { useUpdateVideo } from "@/hooks/api/admin/videos/useUpdateVideo"
import { useGenres } from "@/hooks/api/admin/genre/useGenres"
import { TAXONOMY_OPTIONS_PARAMS } from "@/lib/constants/taxonomyOptions"
import { VIDEO_STATUS, normalizeVideoStatus } from "@/lib/constants/videoStatus"

const VISIBILITY_OPTIONS = [
  { value: VIDEO_STATUS.ACTIVE, label: "Active / Published", icon: CheckCircle2 },
  { value: VIDEO_STATUS.DRAFT, label: "Save as Draft", icon: FileText },
  { value: VIDEO_STATUS.ARCHIVED, label: "Archived", icon: Clock },
]

/**
 * Field state is initialized directly from `video` via lazy useState
 * initializers (no effect) — this component is remounted with a fresh key
 * every time the dialog opens, which is how React resets local state from
 * props instead of syncing it in an effect.
 */
const VideoEditFormFields = ({ video, genreOptions, onSave, onCancel, isPending }) => {
  const [videoTitle, setVideoTitle] = useState(video?.title || "")
  const [genre, setGenre] = useState(
    video?.genre?._id || video?.genre?.id || (typeof video?.genre === "string" ? video.genre : "")
  )
  const [description, setDescription] = useState(video?.description || video?.synopsis || "")
  const [status, setStatus] = useState(normalizeVideoStatus(video?.status) || VIDEO_STATUS.ACTIVE)
  const [isFeatured, setIsFeatured] = useState(Boolean(video?.isFeatured))
  const [isTrending, setIsTrending] = useState(Boolean(video?.isTrending))

  // Cover replacement isn't supported by the backend — PATCH /admin/videos/:id
  // is JSON-only and can't replace the cover/video file, so this preview is
  // read-only. Do not add an upload control here without a real endpoint.
  const coverPreview = video?.coverUrl || video?.cover || null

  const handleThumbnailClick = () => {
    toast.info("Replacing a video's cover image isn't supported by the API yet.")
  }

  const handleSaveChanges = () => {
    if (!videoTitle.trim()) {
      toast.error("Video Title is required")
      return
    }

    onSave({
      title: videoTitle.trim(),
      description: description.trim(),
      genre: genre || undefined,
      status,
      isFeatured,
      isTrending,
    })
  }

  return (
    <>
      {/* Scrollable Body Content */}
      <div className="p-5 flex flex-col gap-4 overflow-y-auto flex-1 scrollbar-thin">

        {/* Thumbnail Image — read-only preview. The update endpoint is
            JSON-only and cannot replace the cover file, so there is
            nothing to upload here yet; clicking explains why. */}
        <div className="flex flex-col gap-1.5 w-full">
          <span className="text-[12px] text-dark-gray font-semibold uppercase tracking-wider">Thumbnail Image</span>
          <div
            onClick={handleThumbnailClick}
            title="Cover replacement isn't supported by the API yet"
            className="group flex flex-col items-center justify-center p-4 h-32 rounded-[16px] border border-dashed border-white/10 bg-white/[0.02] cursor-not-allowed transition-all gap-2 relative w-full"
          >
            {coverPreview ? (
              <div className="relative flex flex-col items-center gap-1">
                <div className="relative w-[120px] h-[64px] rounded-[8px] overflow-hidden border border-white/10">
                  <img
                    src={coverPreview}
                    alt="Thumbnail Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-light-whitetext text-[11px] mt-0.5 font-sans">
                  Cover replacement not yet supported
                </span>
              </div>
            ) : (
              <div className="text-center flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-light-gray">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <p className="text-whitetext text-xs font-medium font-sans">
                  No thumbnail
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
            onClick={onCancel}
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
    </>
  )
}

const EditVideoDialog = ({ video: summary, children }) => {
  const [open, setOpen] = useState(false)
  const { data: detail } = useVideoDetail(open ? summary?._id : undefined)
  const video = detail || summary

  const { mutateAsync: updateVideo, isPending } = useUpdateVideo()

  const genresQuery = useGenres(TAXONOMY_OPTIONS_PARAMS)
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

  const handleSave = async (body) => {
    try {
      await updateVideo({ id: video?._id, body })
      setOpen(false)
    } catch {
      // Handled by hook
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

        {open && (
          <VideoEditFormFields
            key={video?._id}
            video={video}
            genreOptions={genreOptions}
            onSave={handleSave}
            onCancel={() => setOpen(false)}
            isPending={isPending}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default EditVideoDialog
