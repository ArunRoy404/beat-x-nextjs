"use client"

import React from "react"
import { Controller } from "react-hook-form"
import { CheckCircle2, Clock, FileText } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonCalender from "@/components/shared/CommonInputs/CommonInput/CommonCalender"
import CommonInputContainer from "@/components/shared/CommonInputs/CommonInput/CommonInputContainer"
import CommonSelectCards from "@/components/shared/CommonInputs/CommonInput/CommonSelectCards"
import CommonAudioInput from "@/components/shared/CommonInputs/CommonAudioInput/CommonAudioInput"
import CommonImageUpload from "@/components/shared/CommonInputs/CommonImageUpload/CommonImageUpload"
import { useGenres } from "@/hooks/api/admin/genre/useGenres"

const VISIBILITY_OPTIONS = [
    { value: "publish", label: "Publish Now", icon: CheckCircle2 },
    { value: "schedule", label: "Schedule", icon: Clock },
    { value: "draft", label: "Save as Draft", icon: FileText },
]

const AdminSongFormFields = ({
    register,
    control,
    errors,
    watch,
    audio,
    onAudioChange,
    audioError,
    cover,
    onCoverChange,
    coverError,
}) => {
    const { data: genres = [] } = useGenres()
    const genreOptions = genres.map((genre) => ({ value: genre._id, label: genre.name }))

    const visibility = watch("visibility")

    return (
        <>
            <CommonAudioInput value={audio} onChange={onAudioChange} error={audioError} />
            <CommonImageUpload value={cover} onChange={onCoverChange} error={coverError} />

            <CommonInput
                label="Song Title"
                placeholder="Enter song title..."
                {...register("title")}
                error={errors.title?.message}
            />

            <CommonInputContainer>
                <CommonInput
                    label="Artist"
                    placeholder="Artist name"
                    {...register("artist")}
                    error={errors.artist?.message}
                />
                <Controller
                    name="genre"
                    control={control}
                    render={({ field }) => (
                        <CommonSelect
                            label="Genre"
                            placeholder="Select genre"
                            value={field.value}
                            onChange={field.onChange}
                            options={genreOptions}
                            error={errors.genre?.message}
                        />
                    )}
                />
            </CommonInputContainer>

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

            {visibility === "schedule" && (
                <Controller
                    name="scheduledAt"
                    control={control}
                    render={({ field }) => (
                        <CommonCalender
                            label="Scheduled Date"
                            placeholder="Choose Date"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.scheduledAt?.message}
                        />
                    )}
                />
            )}

            <Controller
                name="explicit"
                control={control}
                render={({ field }) => (
                    <div className="flex items-center justify-between py-2 border-t border-b border-white/5">
                        <span className="text-whitetext text-[13px] font-medium">Explicit Content</span>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </div>
                )}
            />
        </>
    )
}

export default AdminSongFormFields
