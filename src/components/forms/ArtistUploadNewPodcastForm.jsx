"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { uploadPodcastSchema, uploadPodcastDefaultValues } from "@/zodSchema/UploadNewPodcastZodSchema"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DialogClose } from "@/components/ui/dialog"
import { CheckCircle2, Clock, FileText } from "lucide-react"
import { toast } from "sonner"
import { useArtistPodcastsStore } from "@/zustandStore/artist/artistStore/artistPodcastsStore"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonAudioInput from "@/components/shared/CommonInputs/CommonAudioInput/CommonAudioInput"
import CommonImageUpload from "@/components/shared/CommonInputs/CommonImageUpload/CommonImageUpload"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonCalender from "@/components/shared/CommonInputs/CommonInput/CommonCalender"
import CommonSelectCards from "@/components/shared/CommonInputs/CommonInput/CommonSelectCards"
import CommonInputContainer from "@/components/shared/CommonInputs/CommonInput/CommonInputContainer"

const HOSTS = ["TAHSIN", "Arif Hossain", "Jishan", "Fahim", "Nabila"]
const CATEGORIES = ["Technology", "Business", "Health", "History", "Entertainment", "R&B", "POP"]

const VISIBILITY_OPTIONS = [
    { value: "publish", label: "Publish Now", icon: CheckCircle2 },
    { value: "schedule", label: "Schedule", icon: Clock },
    { value: "draft", label: "Save as Draft", icon: FileText },
]

const ArtistUploadNewPodcastForm = ({ onSuccess, onCancel }) => {
    const addPodcast = useArtistPodcastsStore((state) => state.addPodcast)

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(uploadPodcastSchema),
        defaultValues: { ...uploadPodcastDefaultValues, artist: "TAHSIN" },
    })

    const onSubmit = (data) => {
        addPodcast(data)
        toast.success("Episode uploaded successfully!")
        reset()
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
            {/* Audio File Upload */}
            <Controller
                name="audioFile"
                control={control}
                render={({ field }) => (
                    <CommonAudioInput
                        value={field.value}
                        onChange={(file) => setValue("audioFile", file, { shouldValidate: true })}
                        error={errors.audioFile?.message}
                        title="Drop your audio file here"
                        subtitle="MP3, WAV · Max 500MB"
                    />
                )}
            />

            {/* Cover Art Upload */}
            <Controller
                name="coverImage"
                control={control}
                render={({ field }) => (
                    <CommonImageUpload
                        value={field.value}
                        onChange={(file) => setValue("coverImage", file, { shouldValidate: true })}
                        error={errors.coverImage?.message}
                        title="Upload cover art"
                        subtitle="Upload cover art · min 1400×1400px"
                    />
                )}
            />

            {/* Episode Title */}
            <CommonInput
                label="Episode Title"
                placeholder="Enter episode title..."
                {...register("episodeTitle")}
                error={errors.episodeTitle?.message}
            />

            {/* Artist / Host Select */}
            <Controller
                name="artist"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        label="Artist/Host"
                        placeholder="Choose Host"
                        value={field.value}
                        onChange={field.onChange}
                        options={HOSTS}
                        error={errors.artist?.message}
                    />
                )}
            />

            {/* Series Name & Category */}
            <CommonInputContainer>
                <CommonInput
                    label="Series Name"
                    placeholder="e.g. Tech Weekly BD"
                    {...register("seriesName")}
                    error={errors.seriesName?.message}
                />

                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <CommonSelect
                            label="Category"
                            placeholder="Select category"
                            value={field.value}
                            onChange={field.onChange}
                            options={CATEGORIES}
                            error={errors.category?.message}
                        />
                    )}
                />
            </CommonInputContainer>

            {/* Season & Episode # */}
            <CommonInputContainer>
                <CommonInput
                    label="Season"
                    placeholder="e.g. 1"
                    {...register("season")}
                    error={errors.season?.message}
                />

                <CommonInput
                    label="Episode #"
                    placeholder="e.g. 14"
                    {...register("episodeNumber")}
                    error={errors.episodeNumber?.message}
                />
            </CommonInputContainer>

            {/* Release Date */}
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

            {/* Description */}
            <CommonInput
                label="Description"
                type="textarea"
                placeholder="Episode description / show notes..."
                {...register("description")}
                error={errors.description?.message}
            />

            {/* Visibility Options */}
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

            {/* Explicit Content Toggle */}
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
                    Submit for Review
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default ArtistUploadNewPodcastForm
