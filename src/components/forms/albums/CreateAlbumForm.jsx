"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { CheckCircle2, Clock, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DialogClose } from "@/components/ui/dialog"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonImageUpload from "@/components/shared/CommonInputs/CommonImageUpload/CommonImageUpload"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonCalender from "@/components/shared/CommonInputs/CommonInput/CommonCalender"
import CommonSelectCards from "@/components/shared/CommonInputs/CommonInput/CommonSelectCards"
import CommonInputContainer from "@/components/shared/CommonInputs/CommonInput/CommonInputContainer"
import { useGenres } from "@/hooks/api/admin/genre/useGenres"
import { useCreateAlbum } from "@/hooks/api/admin/albums/useCreateAlbum"
import { createAlbumSchema } from "./adminAlbumSchema"

const VISIBILITY_OPTIONS = [
    { value: "publish", label: "Publish Now", icon: CheckCircle2 },
    { value: "schedule", label: "Schedule", icon: Clock },
    { value: "draft", label: "Save as Draft", icon: FileText },
]

const CreateAlbumForm = ({ onSuccess, onCancel }) => {
    const { data: genresData } = useGenres()
    const genresList = Array.isArray(genresData)
        ? genresData
        : (genresData?.genre || genresData?.genres || genresData?.data?.genre || genresData?.data || [])
    const genreOptions = genresList.map((genre) => ({ value: genre._id, label: genre.name }))

    const { mutate: createAlbum, isPending } = useCreateAlbum()

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createAlbumSchema),
        defaultValues: {
            coverImage: null,
            title: "",
            artist: "",
            genre: "",
            explicit: false,
            visibility: "publish",
            scheduledAt: undefined,
        },
    })

    const visibility = watch("visibility")

    const onSubmit = (data) => {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("artist", data.artist)
        formData.append("genre", data.genre)
        formData.append("explicit", String(data.explicit))

        const status = data.visibility === "publish" ? "active" : data.visibility === "schedule" ? "scheduled" : "draft"
        formData.append("status", status)
        if (data.visibility === "schedule" && data.scheduledAt) {
            formData.append("scheduledAt", data.scheduledAt.toISOString())
        }

        if (data.coverImage instanceof File) formData.append("cover", data.coverImage)

        createAlbum(formData, {
            onSuccess: () => {
                toast.success("Album created successfully!")
                reset()
                onSuccess?.()
            },
            onError: (error) => toast.error(error?.message || "Failed to create album."),
        })
    }

    const onInvalid = (validationErrors) => {
        const errorKeys = Object.keys(validationErrors)
        if (errorKeys.length > 0) {
            toast.error(validationErrors[errorKeys[0]].message)
        }
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit, onInvalid)}>
            {/* Cover Art Dropzone */}
            <Controller
                name="coverImage"
                control={control}
                render={({ field }) => (
                    <CommonImageUpload
                        value={field.value}
                        onChange={(file) => setValue("coverImage", file, { shouldValidate: true })}
                        error={errors.coverImage?.message}
                        title="Upload cover art"
                        subtitle="JPEG / PNG / WebP · Max 5MB"
                    />
                )}
            />

            {/* Album Title */}
            <CommonInput
                label="Album Title"
                placeholder="e.g. Cyber-Neon Dreams"
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

            {/* Explicit Content Toggle */}
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
                    isLoading={isPending}
                >
                    Create Album
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default CreateAlbumForm
