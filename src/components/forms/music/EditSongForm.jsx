"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editSongSchema } from "@/zodSchema/UploadNewSongZodSchema"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DialogClose } from "@/components/ui/dialog"
import { CheckCircle2, Clock, FileText } from "lucide-react"
import { toast } from "sonner"
import { useAdminDashboardMusicStore } from "@/zustandStore/admin/adminStore/adminDashboardMusicStore"

import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonAudioInput from "@/components/shared/CommonInputs/CommonAudioInput/CommonAudioInput"
import CommonImageUpload from "@/components/shared/CommonInputs/CommonImageUpload/CommonImageUpload"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonCalender from "@/components/shared/CommonInputs/CommonInput/CommonCalender"
import CommonSelectCards from "@/components/shared/CommonInputs/CommonInput/CommonSelectCards"
import CommonInputContainer from "@/components/shared/CommonInputs/CommonInput/CommonInputContainer"

const GENRES = ["Pop", "Hip Hop", "Electronic", "Rock", "Lofi", "Jazz", "R&B"]

const VISIBILITY_OPTIONS = [
    { value: "publish", label: "Publish Now", icon: CheckCircle2 },
    { value: "schedule", label: "Schedule", icon: Clock },
    { value: "draft", label: "Save as Draft", icon: FileText },
]

const EditSongForm = ({ song, onSuccess, onCancel }) => {
    const updateSong = useAdminDashboardMusicStore((state) => state.updateSong)

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(editSongSchema),
        defaultValues: {
            audioFile: song?.audio || "Audio file",
            coverImage: song?.cover || null,
            songTitle: song?.title || "",
            artist: song?.artist || "TAHSIN",
            album: song?.album || "",
            genre: song?.genre || "",
            releaseDate: song?.released && song.released !== "-" ? new Date(song.released) : null,
            description: song?.description || "",
            visibility: song?.status === "Published" 
                ? "publish" 
                : song?.status === "Scheduled" 
                  ? "schedule" 
                  : "draft",
            isExplicit: song?.isExplicit || false,
        },
    })

    const onSubmit = (data) => {
        console.log("Updated Song Data:", data)
        updateSong(song.id, data)
        toast.success("Song updated successfully!")
        onSuccess?.()
    }

    const onInvalid = (validationErrors) => {
        const errorKeys = Object.keys(validationErrors)
        if (errorKeys.length > 0) {
            toast.error(validationErrors[errorKeys[0]].message)
        }
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit, onInvalid)}>
            {/* Audio Dropzone */}
            <Controller
                name="audioFile"
                control={control}
                render={({ field }) => (
                    <CommonAudioInput
                        value={field.value}
                        onChange={(file) => setValue("audioFile", file, { shouldValidate: true })}
                        error={errors.audioFile?.message}
                    />
                )}
            />

            {/* Cover Art Dropzone */}
            <Controller
                name="coverImage"
                control={control}
                render={({ field }) => (
                    <CommonImageUpload
                        value={field.value}
                        onChange={(file) => setValue("coverImage", file, { shouldValidate: true })}
                        error={errors.coverImage?.message}
                    />
                )}
            />

            {/* Song Title Input */}
            <CommonInput
                label="Song Title"
                placeholder="Enter song title..."
                {...register("songTitle")}
                error={errors.songTitle?.message}
            />

            {/* Artist & Album inputs */}
            <CommonInputContainer>
                <CommonInput
                    label="Artist"
                    placeholder="Artist name"
                    {...register("artist")}
                    error={errors.artist?.message}
                />

                <CommonInput
                    label="Album"
                    placeholder="Album name (optional)"
                    {...register("album")}
                    error={errors.album?.message}
                />
            </CommonInputContainer>

            {/* Genre & Release Date picker */}
            <CommonInputContainer>
                <Controller
                    name="genre"
                    control={control}
                    render={({ field }) => (
                        <CommonSelect
                            label="Genre"
                            placeholder="Select genre"
                            value={field.value}
                            onChange={field.onChange}
                            options={GENRES}
                            error={errors.genre?.message}
                        />
                    )}
                />

                <Controller
                    name="releaseDate"
                    control={control}
                    render={({ field }) => (
                        <CommonCalender
                            label="Release Date"
                            placeholder="Choose Date"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.releaseDate?.message}
                        />
                    )}
                />
            </CommonInputContainer>

            {/* Song Description */}
            <CommonInput
                label="Song Description"
                type="textarea"
                placeholder="Type a short description..."
                {...register("description")}
                error={errors.description?.message}
            />

            {/* Visibility Section */}
            <Controller
                name="visibility"
                control={control}
                render={({ field }) => (
                    <CommonSelectCards
                        label="Visibility"
                        value={field.value}
                        onChange={field.onChange}
                        options={VISIBILITY_OPTIONS}
                        error={errors.visibility?.message}
                    />
                )}
            />

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

            {/* Footer Actions - ONLY Cancel and Save Changes */}
            <div className="flex items-center gap-4 mt-2 shrink-0">
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
                    type="submit"
                    variant="gradient"
                    className="flex-1"
                    size="lg"
                >
                    Save Changes
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default EditSongForm
