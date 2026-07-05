"use client"

import React, { useState, useRef } from "react"
import { useForm, Controller, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import {
  Music,
  Image as ImageIcon,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  FileText,
  X,
  PlusCircle
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useAdminDashboardMusicStore } from "@/zustandStore/admin/adminStore/adminDashboardMusicStore"

// Schema definition using Zod
const uploadSongSchema = z.object({
  audioFile: z.any().refine((file) => file !== null, {
    message: "Audio file is required",
  }),
  coverImage: z.any().optional(),
  songTitle: z.string().min(1, "Song title is required"),
  artist: z.string().min(1, "Artist name is required"),
  album: z.string().optional(),
  genre: z.string().min(1, "Genre is required"),
  releaseDate: z.date({
    required_error: "Release date is required",
    invalid_type_error: "Release date is required",
  }),
  description: z.string().optional(),
  visibility: z.enum(["publish", "schedule", "draft"]),
  isExplicit: z.boolean(),
})

const UploadNewSongDialog = () => {
  const [open, setOpen] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const audioInputRef = useRef(null)
  const coverInputRef = useRef(null)

  const addSong = useAdminDashboardMusicStore((state) => state.addSong)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(uploadSongSchema),
    defaultValues: {
      audioFile: null,
      coverImage: null,
      songTitle: "",
      artist: "TAHSIN",
      album: "",
      genre: "",
      releaseDate: null,
      description: "",
      visibility: "publish",
      isExplicit: false,
    },
  })

  // Watch fields for display using useWatch hook
  const audioFile = useWatch({ control, name: "audioFile" })
  const coverImage = useWatch({ control, name: "coverImage" })
  const releaseDate = useWatch({ control, name: "releaseDate" })
  const visibility = useWatch({ control, name: "visibility" })
  const isExplicit = useWatch({ control, name: "isExplicit" })

  const handleAudioSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setValue("audioFile", file, { shouldValidate: true })
    }
  }

  const handleCoverSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setValue("coverImage", file, { shouldValidate: true })
    }
  }

  const onSubmit = (data) => {
    console.log("Submitted Song Data:", data)
    addSong(data)
    toast.success("Song uploaded successfully!")

    // Reset state & close
    reset()
    setOpen(false)
  }

  const onInvalid = (validationErrors) => {
    const errorKeys = Object.keys(validationErrors)
    if (errorKeys.length > 0) {
      toast.error(validationErrors[errorKeys[0]].message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-gradient-to-r from-secondary to-[#B1FE4D] text-button-text font-semibold hover:opacity-90 transition-opacity border-0 h-10 px-6 gap-2 cursor-pointer shadow-md">
          <PlusCircle className="w-5 h-5" /> Upload Song
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="bg-dark-accent/50 backdrop-blur-md border border-whitetext/10 rounded-[24px] p-0 max-h-[95vh] overflow-hidden sm:max-w-[672px] text-whitetext outline-none select-none flex flex-col"
      >
        {/* Custom Header */}
        <DialogHeader className="bg-dark-accent p-6 flex flex-row items-center justify-between border-b border-whitetext/5 shrink-0">
          <DialogTitle className="text-[24px] not-italic font-medium text-whitetext font-sans leading-none">
            Upload New Song
          </DialogTitle>
          <DialogClose className="text-light-whitetext hover:text-whitetext cursor-pointer transition-colors p-1.5 rounded-full hover:bg-white/5 border border-white/20 bg-transparent flex items-center justify-center">
            <X className="w-4 h-4" />
          </DialogClose>
        </DialogHeader>

        {/* Scrollable Form Container with 24px padding */}
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="flex-1 overflow-y-auto p-6 flex flex-col gap-[16px] text-left [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {/* Audio Dropzone */}
          <div
            onClick={() => audioInputRef.current?.click()}
            className="group flex flex-col items-center justify-center p-6 h-32 rounded-[16px] border border-dashed border-secondary/15 bg-secondary/15 hover:bg-secondary/20 cursor-pointer transition-all gap-2 shrink-0"
          >
            <input
              type="file"
              ref={audioInputRef}
              onChange={handleAudioSelect}
              accept="audio/*"
              className="hidden"
            />
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
              <Music className="w-5 h-5" />
            </div>
            {audioFile ? (
              <div className="text-center min-w-0 w-full px-4">
                <p className="text-whitetext text-sm font-medium truncate">
                  {audioFile.name}
                </p>
                <p className="text-light-whitetext text-xs mt-0.5">
                  {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-whitetext text-[14px] font-medium font-sans">Drop your audio file here</p>
                <p className="text-light-whitetext text-[11px] mt-0.5">MP3, WAV, FLAC · Max 200MB</p>
              </div>
            )}
          </div>

          {/* Cover Art Dropzone */}
          <div
            onClick={() => coverInputRef.current?.click()}
            className="group flex flex-col items-center justify-center p-4 h-24 rounded-[16px] border border-dashed border-primary/15 bg-primary/15 hover:bg-primary/20 cursor-pointer transition-all gap-2 shrink-0"
          >
            <input
              type="file"
              ref={coverInputRef}
              onChange={handleCoverSelect}
              accept="image/*"
              className="hidden"
            />
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <ImageIcon className="w-4 h-4" />
            </div>
            {coverImage ? (
              <div className="text-center min-w-0 w-full px-4">
                <p className="text-whitetext text-sm font-medium truncate">
                  {coverImage.name}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-light-whitetext text-[13px] font-sans">
                  Upload cover art · min 1000×1000px
                </p>
              </div>
            )}
          </div>

          {/* Song Title Input */}
          <div className="flex flex-col gap-1.5 shrink-0">
            <label className="text-primary text-[16px] not-italic font-normal font-sans">
              Song Title
            </label>
            <Input
              type="text"
              placeholder="Enter song title..."
              {...register("songTitle")}
              className="w-full h-[52px] rounded-full border border-light-gray/20 bg-light-gray/10 px-5 text-[14px] text-whitetext placeholder:text-light-gray placeholder:text-[14px] placeholder:font-normal placeholder:not-italic focus-visible:border-primary/50 focus-visible:ring-primary/20 outline-none"
            />
          </div>

          {/* Artist & Album inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] shrink-0">
            <div className="flex flex-col gap-1.5">
              <label className="text-primary text-[16px] not-italic font-normal font-sans">
                Artist
              </label>
              <Input
                type="text"
                placeholder="Artist name"
                {...register("artist")}
                className="w-full h-[52px] rounded-full border border-light-gray/20 bg-light-gray/10 px-5 text-[14px] text-whitetext placeholder:text-light-gray placeholder:text-[14px] placeholder:font-normal placeholder:not-italic focus-visible:border-primary/50 focus-visible:ring-primary/20 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-primary text-[16px] not-italic font-normal font-sans">
                Album
              </label>
              <Input
                type="text"
                placeholder="Album name (optional)"
                {...register("album")}
                className="w-full h-[52px] rounded-full border border-light-gray/20 bg-light-gray/10 px-5 text-[14px] text-whitetext placeholder:text-light-gray placeholder:text-[14px] placeholder:font-normal placeholder:not-italic focus-visible:border-primary/50 focus-visible:ring-primary/20 outline-none"
              />
            </div>
          </div>

          {/* Genre & Release Date picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] shrink-0">
            <div className="flex flex-col gap-1.5">
              <label className="text-primary text-[16px] not-italic font-normal font-sans">
                Genre
              </label>
              <Controller
                name="genre"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger size="custom" className="w-full h-[52px] rounded-full border border-light-gray/20 bg-light-gray/10 px-5 text-[14px] text-whitetext flex items-center justify-between cursor-pointer outline-none">
                      <SelectValue placeholder="Select genre" className="placeholder:text-light-gray" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-whitetext/10 rounded-[12px] text-whitetext max-h-[200px] overflow-y-auto">
                      <SelectItem value="Pop">Pop</SelectItem>
                      <SelectItem value="Hip Hop">Hip Hop</SelectItem>
                      <SelectItem value="Electronic">Electronic</SelectItem>
                      <SelectItem value="Rock">Rock</SelectItem>
                      <SelectItem value="Lofi">Lofi</SelectItem>
                      <SelectItem value="Jazz">Jazz</SelectItem>
                      <SelectItem value="R&B">R&B</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5 relative">
              <label className="text-primary text-[16px] not-italic font-normal font-sans">
                Release Date
              </label>
              <Controller
                name="releaseDate"
                control={control}
                render={({ field }) => (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="w-full h-[52px] flex items-center justify-between rounded-full border border-light-gray/20 bg-light-gray/10 px-5 text-[14px] text-left text-whitetext outline-none cursor-pointer"
                    >
                      <span className={field.value ? "text-whitetext" : "text-light-gray"}>
                        {field.value ? format(field.value, "PPP") : "Choose Date"}
                      </span>
                      <CalendarIcon className="w-5 h-5 text-light-gray" />
                    </button>

                    {showCalendar && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setShowCalendar(false)}
                        />
                        <div className="absolute bottom-full right-0 mb-2 sm:top-full sm:bottom-auto sm:mt-2 z-50 rounded-[16px] border border-whitetext/10 bg-background p-3 shadow-xl">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date)
                              setShowCalendar(false)
                            }}
                            className="rounded-[12px] bg-background text-whitetext"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          {/* Song Description */}
          <div className="flex flex-col gap-1.5 shrink-0">
            <label className="text-primary text-[16px] not-italic font-normal font-sans">
              Song Description
            </label>
            <Textarea
              placeholder="Type a short description..."
              {...register("description")}
              className="min-h-[100px] w-full rounded-[20px] border border-light-gray/20 bg-light-gray/10 p-5 text-[14px] text-whitetext placeholder:text-light-gray placeholder:text-[14px] placeholder:font-normal placeholder:not-italic resize-none outline-none focus-visible:border-primary/50 focus-visible:ring-primary/20"
            />
          </div>

          {/* Visibility Section */}
          <div className="flex flex-col gap-2 shrink-0">
            <label className="text-primary text-[16px] not-italic font-normal font-sans">
              Visibility
            </label>
            <Controller
              name="visibility"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => field.onChange("publish")}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1.5 py-4 px-3 rounded-[16px] border text-[12px] font-medium not-italic cursor-pointer transition-all text-center",
                      field.value === "publish"
                        ? "bg-secondary/15 border-secondary/15 text-secondary"
                        : "bg-light-gray/10 border-light-gray/20 text-light-gray hover:bg-light-gray/20"
                    )}
                  >
                    <CheckCircle2 className={cn("w-5 h-5 mb-0.5", field.value === "publish" ? "text-secondary" : "text-light-gray")} />
                    <span>Publish Now</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => field.onChange("schedule")}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1.5 py-4 px-3 rounded-[16px] border text-[12px] font-medium not-italic cursor-pointer transition-all text-center",
                      field.value === "schedule"
                        ? "bg-secondary/15 border-secondary/15 text-secondary"
                        : "bg-light-gray/10 border-light-gray/20 text-light-gray hover:bg-light-gray/20"
                    )}
                  >
                    <Clock className={cn("w-5 h-5 mb-0.5", field.value === "schedule" ? "text-secondary" : "text-light-gray")} />
                    <span>Schedule</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => field.onChange("draft")}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1.5 py-4 px-3 rounded-[16px] border text-[12px] font-medium not-italic cursor-pointer transition-all text-center",
                      field.value === "draft"
                        ? "bg-secondary/15 border-secondary/15 text-secondary"
                        : "bg-light-gray/10 border-light-gray/20 text-light-gray hover:bg-light-gray/20"
                    )}
                  >
                    <FileText className={cn("w-5 h-5 mb-0.5", field.value === "draft" ? "text-secondary" : "text-light-gray")} />
                    <span>Save as Draft</span>
                  </button>
                </div>
              )}
            />
          </div>

          {/* Explicit Content Toggle using Shadcn Switch */}
          <Controller
            name="isExplicit"
            control={control}
            render={({ field }) => (
              <div className="flex items-center justify-between py-2 border-t border-b border-whitetext/5 shrink-0">
                <span className="text-light-gray text-[16px] not-italic font-medium font-sans">
                  Explicit Content
                </span>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-checked:bg-secondary data-unchecked:bg-light-gray/20"
                />
              </div>
            )}
          />

          {/* Footer Actions */}
          <div className="flex items-center gap-4 mt-2 shrink-0">
            <DialogClose asChild className="flex-1 w-full">
              <button
                type="button"
                className="w-full h-[52px] flex items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/5 font-semibold text-[16px] cursor-pointer transition-colors bg-transparent"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              className="flex-1 h-[52px] flex items-center justify-center rounded-full bg-gradient-to-r from-secondary to-[#B1FE4D] text-button-text hover:opacity-90 font-semibold text-[16px] cursor-pointer transition-opacity border-0"
            >
              Upload Now
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UploadNewSongDialog
