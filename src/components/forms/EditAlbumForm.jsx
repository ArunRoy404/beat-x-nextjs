"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { CheckCircle, Clock, FileText } from "lucide-react"
import { toast } from "sonner"
import { useAdminDashboardAlbumsStore } from "@/zustandStore/admin/adminStore/adminDashboardAlbumsStore"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonImageUpload from "@/components/shared/CommonInputs/CommonImageUpload/CommonImageUpload"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonSelectCards from "@/components/shared/CommonInputs/CommonInput/CommonSelectCards"

const GENRES = ["Pop", "Hip Hop", "Electronic", "Rock", "Lofi", "Jazz", "R&B"]

const VISIBILITY_OPTIONS = [
    { value: "publish", label: "Publish Now", icon: CheckCircle },
    { value: "schedule", label: "Schedule", icon: Clock },
    { value: "draft", label: "Save as Draft", icon: FileText },
]

const albumSchema = z.object({
    coverImage: z.any().optional(),
    name: z.string().min(1, "Album Title is required"),
    genre: z.string().min(1, "Genre is required"),
    description: z.string().optional(),
    visibility: z.enum(["publish", "schedule", "draft"]),
})

const EditAlbumForm = ({ album, onSuccess, onCancel }) => {
    const updateAlbum = useAdminDashboardAlbumsStore((state) => state.updateAlbum)

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(albumSchema),
        defaultValues: {
            coverImage: album?.avatar || null,
            name: album?.name || "",
            genre: album?.genre || "",
            description: album?.description || "",
            visibility: album?.status === "Published"
                ? "publish"
                : album?.status === "Scheduled"
                  ? "schedule"
                  : "draft",
        },
    })

    const onSubmit = (data) => {
        const statusMap = {
            publish: "Published",
            schedule: "Scheduled",
            draft: "Under Review"
        }

        updateAlbum({
            ...album,
            name: data.name,
            genre: data.genre,
            status: statusMap[data.visibility] || album.status,
            description: data.description,
            // Update cover if new image file was selected
            avatar: data.coverImage instanceof File ? URL.createObjectURL(data.coverImage) : data.coverImage
        })
        toast.success("Album details updated successfully!")
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

            {/* Album Title */}
            <CommonInput
                label="Album Title"
                placeholder="e.g. Asha"
                {...register("name")}
                error={errors.name?.message}
            />

            {/* Genre */}
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

            {/* Description */}
            <CommonInput
                label="Description"
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
                    Save Changes
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default EditAlbumForm
