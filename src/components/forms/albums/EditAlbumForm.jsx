"use client"

import React, { useState } from "react"
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
import { useUpdateAlbum } from "@/hooks/api/admin/albums/useUpdateAlbum"
import { useReplaceAlbumCover } from "@/hooks/api/admin/albums/useReplaceAlbumCover"
import { editAlbumSchema } from "./adminAlbumSchema"

const VISIBILITY_OPTIONS = [
    { value: "publish", label: "Publish Now", icon: CheckCircle2 },
    { value: "schedule", label: "Schedule", icon: Clock },
    { value: "draft", label: "Save as Draft", icon: FileText },
]

const getDefaultVisibility = (album) => {
    if (album?.status === "active") return "publish"
    if (album?.status === "scheduled") return "schedule"
    return "draft"
}

const EditAlbumForm = ({ album, onSuccess, onCancel }) => {
    const { data: genresData } = useGenres()
    const genresList = Array.isArray(genresData)
        ? genresData
        : (genresData?.genre || genresData?.genres || genresData?.data?.genre || genresData?.data || [])
    const genreOptions = genresList.map((genre) => ({ value: genre._id, label: genre.name }))

    const [cover, setCover] = useState(album?.coverUrl || null)

    const { mutateAsync: updateAlbum, isPending: isUpdating } = useUpdateAlbum()
    const { mutateAsync: replaceCover, isPending: isReplacingCover } = useReplaceAlbumCover()
    const isPending = isUpdating || isReplacingCover

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(editAlbumSchema),
        defaultValues: {
            coverImage: null,
            title: album?.title || "",
            artist: album?.artist || "",
            genre: album?.genre?._id || (typeof album?.genre === "string" ? album.genre : ""),
            explicit: album?.explicit || false,
            visibility: getDefaultVisibility(album),
            scheduledAt: album?.scheduledAt ? new Date(album.scheduledAt) : undefined,
            isFeatured: album?.isFeatured || false,
        },
    })

    const visibility = watch("visibility")

    const onSubmit = async (data) => {
        const body = {
            title: data.title,
            artist: data.artist,
            genre: data.genre,
            explicit: data.explicit,
            isFeatured: data.isFeatured,
        }

        // Editing shouldn't silently un-archive a taken-down album —
        // that's what the dedicated Restore action is for.
        body.status = album?.status === "archived" ? "archived" : (data.visibility === "publish" ? "active" : data.visibility === "schedule" ? "scheduled" : "draft")
        if (data.visibility === "schedule" && data.scheduledAt) {
            body.scheduledAt = data.scheduledAt.toISOString()
        }

        try {
            await updateAlbum({ id: album._id, body })

            if (cover instanceof File) {
                const coverFormData = new FormData()
                coverFormData.append("file", cover)
                await replaceCover({ id: album._id, formData: coverFormData })
            }

            toast.success("Album updated successfully!")
            onSuccess?.()
        } catch (error) {
            toast.error(error?.message || "Failed to update album.")
        }
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            {/* Cover Art Dropzone */}
            <CommonImageUpload
                value={cover}
                onChange={setCover}
                title="Upload cover art"
                subtitle="JPEG / PNG / WebP · Max 5MB"
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
                    <div className="flex items-center justify-between py-2 border-t border-white/5">
                        <span className="text-whitetext text-[13px] font-medium">Explicit Content</span>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </div>
                )}
            />

            {/* Featured Toggle */}
            <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                    <div className="flex items-center justify-between py-2 border-t border-b border-white/5">
                        <span className="text-whitetext text-[13px] font-medium">Featured</span>
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
                    Save Changes
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default EditAlbumForm
