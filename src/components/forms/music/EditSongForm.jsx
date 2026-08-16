"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import { useUpdateSong } from "@/hooks/api/admin/songs/useUpdateSong"
import { songSchema } from "./adminSongSchema"
import AdminSongFormFields from "./AdminSongFormFields"

const getDefaultVisibility = (song) => {
    if (song?.status === "active") return "publish"
    if (song?.status === "draft" && song?.scheduledAt) return "schedule"
    return "draft"
}

const EditSongForm = ({ song, onSuccess, onCancel }) => {
    const [audio, setAudio] = useState(song?.audioKey ? "Existing audio" : null)
    const [cover, setCover] = useState(song?.coverUrl || null)

    const { mutate: updateSong, isPending } = useUpdateSong()

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(songSchema),
        defaultValues: {
            title: song?.title || "",
            artist: song?.artist || "",
            genre: song?.genre?._id || (typeof song?.genre === "string" ? song.genre : ""),
            explicit: song?.explicit || false,
            isFeatured: song?.isFeatured || false,
            isTrending: song?.isTrending || false,
            trendDirection: song?.trendDirection || "",
            visibility: getDefaultVisibility(song),
            scheduledAt: song?.scheduledAt ? new Date(song.scheduledAt) : undefined,
        },
    })

    const onSubmit = (data) => {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("artist", data.artist)
        formData.append("genre", data.genre)
        formData.append("explicit", String(data.explicit))
        formData.append("isFeatured", String(data.isFeatured))
        formData.append("isTrending", String(data.isTrending))
        if (data.trendDirection) formData.append("trendDirection", data.trendDirection)

        // Editing content shouldn't silently un-archive a taken-down song —
        // that's what the dedicated Restore action is for.
        const status = song?.status === "archived" ? "archived" : (data.visibility === "publish" ? "active" : "draft")
        formData.append("status", status)
        if (data.visibility === "schedule" && data.scheduledAt) {
            formData.append("scheduledAt", data.scheduledAt.toISOString())
        }

        if (audio instanceof File) formData.append("audio", audio)
        if (cover instanceof File) formData.append("cover", cover)

        updateSong(
            { id: song._id, formData },
            {
                onSuccess: (result) => {
                    toast.success(result?.trackingId ? "Song updated — processing new audio now." : "Song updated successfully!")
                    onSuccess?.()
                },
                onError: (error) => toast.error(error?.message || "Failed to update song."),
            }
        )
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            <AdminSongFormFields
                register={register}
                control={control}
                errors={errors}
                watch={watch}
                audio={audio}
                onAudioChange={setAudio}
                cover={cover}
                onCoverChange={setCover}
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

export default EditSongForm
