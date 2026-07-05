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

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
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

  // Watch fields for display
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
    toast.success("Song uploaded successfully!")

    // Reset state & close
    reset()
    setOpen(false)
  }

  const onInvalid = (validationErrors) => {
    // Toast the first validation error message
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
        className="bg-background border border-whitetext/10 rounded-[24px] p-6 max-h-[90vh] overflow-hidden sm:max-w-[672px] text-whitetext outline-none select-none flex flex-col"
      >
        {/* Custom Header */}
        <DialogHeader className="flex flex-row items-center justify-between border-b border-whitetext/5 pb-4 mb-4 shrink-0">
          <DialogTitle className="text-xl font-semibold text-whitetext font-sans">
            Upload New Song
          </DialogTitle>
          <DialogClose className="text-light-whitetext hover:text-whitetext cursor-pointer transition-colors p-1 rounded-full hover:bg-white/5 border-0 bg-transparent flex items-center justify-center">
            <X className="w-5 h-5" />
          </DialogClose>
        </DialogHeader>

        {/* Scrollable Form Container */}
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 text-left [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {/* Audio Dropzone */}
          <div
            onClick={() => audioInputRef.current?.click()}
            className="group flex flex-col items-center justify-center p-6 h-32 rounded-[16px] border border-dashed border-secondary/30 bg-secondary/[0.02] hover:bg-secondary/[0.05] cursor-pointer transition-all gap-2 shrink-0"
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
                <p className="text-whitetext text-[14px] font-medium">Drop your audio file here</p>
                <p className="text-light-whitetext text-[11px] mt-0.5">MP3, WAV, FLAC · Max 200MB</p>
              </div>
            )}
          </div>

          {/* Cover Art Dropzone */}
          <div
            onClick={() => coverInputRef.current?.click()}
            className="group flex flex-col items-center justify-center p-4 h-24 rounded-[16px] border border-dashed border-primary/30 bg-primary/[0.02] hover:bg-primary/[0.05] cursor-pointer transition-all gap-2 shrink-0"
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
                <p className="text-light-whitetext text-[13px]">
                  Upload cover art · min 1000×1000px
                </p>
              </div>
            )}
          </div>

          {/* Song Title Input */}
          <div className="flex flex-col gap-1.5 shrink-0">
            <label className="text-[12px] font-normal uppercase text-primary/80 tracking-wider">
              Song Title
            </label>
            <Input
              type="text"
              placeholder="Enter song title..."
              {...register("songTitle")}
              className="h-10 rounded-full border border-whitetext/10 bg-[#0E0E0E] px-4 py-2 text-sm text-whitetext placeholder:text-light-whitetext focus-visible:border-primary/50 focus-visible:ring-primary/20"
            />
          </div>

          {/* Artist & Album inputs */}
          <div className="grid grid-cols-2 gap-4 shrink-0">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-normal uppercase text-primary/80 tracking-wider">
                Artist
              </label>
              <Input
                type="text"
                placeholder="Artist name"
                {...register("artist")}
                className="h-10 rounded-full border border-whitetext/10 bg-[#0E0E0E] px-4 py-2 text-sm text-whitetext placeholder:text-light-whitetext focus-visible:border-primary/50 focus-visible:ring-primary/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-normal uppercase text-primary/80 tracking-wider">
                Album
              </label>
              <Input
                type="text"
                placeholder="Album name (optional)"
                {...register("album")}
                className="h-10 rounded-full border border-whitetext/10 bg-[#0E0E0E] px-4 py-2 text-sm text-whitetext placeholder:text-light-whitetext focus-visible:border-primary/50 focus-visible:ring-primary/20"
              />
            </div>
          </div>

          {/* Genre & Release Date picker */}
          <div className="grid grid-cols-2 gap-4 shrink-0">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-normal uppercase text-primary/80 tracking-wider">
                Genre
              </label>
              <Controller
                name="genre"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-10 w-full rounded-full border border-whitetext/10 bg-[#0E0E0E] px-4 py-2 text-sm text-whitetext flex items-center justify-between cursor-pointer">
                      <SelectValue placeholder="Select genre" />
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
              <label className="text-[12px] font-normal uppercase text-primary/80 tracking-wider">
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
                      className="h-10 w-full flex items-center justify-between rounded-full border border-whitetext/10 bg-[#0E0E0E] px-4 py-2 text-sm text-left text-whitetext outline-none cursor-pointer"
                    >
                      <span className={field.value ? "text-whitetext" : "text-light-whitetext"}>
                        {field.value ? format(field.value, "PPP") : "Choose Date"}
                      </span>
                      <CalendarIcon className="w-4 h-4 text-light-whitetext" />
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
                            className="rounded-[12px] bg-background"
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
            <label className="text-[12px] font-normal uppercase text-primary/80 tracking-wider">
              Song Description
            </label>
            <Textarea
              placeholder="Type a short description..."
              {...register("description")}
              className="min-h-[70px] rounded-[20px] border border-whitetext/10 bg-[#0E0E0E] px-4 py-3 text-sm text-whitetext placeholder:text-light-whitetext resize-none"
            />
          </div>

          {/* Visibility Section */}
          <div className="flex flex-col gap-2 shrink-0">
            <label className="text-[12px] font-normal uppercase text-primary/80 tracking-wider">
              Visibility
            </label>
            <Controller
              name="visibility"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => field.onChange("publish")}
                    className={cn(
                      "flex flex-col sm:flex-row items-center justify-center gap-1.5 p-3 rounded-[12px] border text-[11px] font-medium cursor-pointer transition-all",
                      field.value === "publish"
                        ? "bg-secondary/10 border-secondary/40 text-whitetext"
                        : "bg-white/[0.02] border-whitetext/5 text-light-whitetext hover:bg-white/[0.04]"
                    )}
                  >
                    <CheckCircle2 className={cn("w-3.5 h-3.5", field.value === "publish" ? "text-secondary" : "text-light-whitetext")} />
                    <span>Publish Now</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => field.onChange("schedule")}
                    className={cn(
                      "flex flex-col sm:flex-row items-center justify-center gap-1.5 p-3 rounded-[12px] border text-[11px] font-medium cursor-pointer transition-all",
                      field.value === "schedule"
                        ? "bg-secondary/10 border-secondary/40 text-whitetext"
                        : "bg-white/[0.02] border-whitetext/5 text-light-whitetext hover:bg-white/[0.04]"
                    )}
                  >
                    <Clock className={cn("w-3.5 h-3.5", field.value === "schedule" ? "text-secondary" : "text-light-whitetext")} />
                    <span>Schedule</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => field.onChange("draft")}
                    className={cn(
                      "flex flex-col sm:flex-row items-center justify-center gap-1.5 p-3 rounded-[12px] border text-[11px] font-medium cursor-pointer transition-all",
                      field.value === "draft"
                        ? "bg-secondary/10 border-secondary/40 text-whitetext"
                        : "bg-white/[0.02] border-whitetext/5 text-light-whitetext hover:bg-white/[0.04]"
                    )}
                  >
                    <FileText className={cn("w-3.5 h-3.5", field.value === "draft" ? "text-secondary" : "text-light-whitetext")} />
                    <span>Save as Draft</span>
                  </button>
                </div>
              )}
            />
          </div>

          {/* Explicit Content Toggle */}
          <Controller
            name="isExplicit"
            control={control}
            render={({ field }) => (
              <div className="flex items-center justify-between py-1 border-t border-b border-whitetext/5 shrink-0">
                <span className="text-[14px] text-whitetext font-medium">Explicit Content</span>
                <button
                  type="button"
                  onClick={() => field.onChange(!field.value)}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none",
                    field.value ? "bg-secondary" : "bg-white/10"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-whitetext shadow ring-0 transition duration-200 ease-in-out",
                      field.value ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            )}
          />

          {/* Footer Actions */}
          <div className="flex items-center gap-4 mt-2 shrink-0">
            <DialogClose asChild>
              <button
                type="button"
                className="flex-1 py-3 rounded-full border border-whitetext/10 text-whitetext hover:bg-white/5 font-semibold text-sm cursor-pointer transition-colors text-center bg-transparent"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              className="flex-1 py-3 rounded-full bg-gradient-to-r from-secondary to-[#B1FE4D] text-button-text hover:opacity-90 font-semibold text-sm cursor-pointer transition-opacity text-center border-0"
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
