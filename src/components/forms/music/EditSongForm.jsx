"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import { useUpdateSong } from "@/hooks/api/admin/songs/useUpdateSong"
import { SONG_STATUS, normalizeSongStatus } from "@/lib/constants/songStatus"
import { songSchema } from "./adminSongSchema"
import { buildSongFormData } from "./buildSongFormData"
import AdminSongFormFields from "./AdminSongFormFields"

const getDefaultVisibility = (song) => {
    const status = normalizeSongStatus(song?.status)
    if (status === SONG_STATUS.ACTIVE) return "publish"
    if (status === SONG_STATUS.SCHEDULED) return "schedule"
    // A published song keeps the `scheduledAt` it was released with, so only
    // a still-unreleased draft counts as scheduled.
    if (status === SONG_STATUS.DRAFT && song?.scheduledAt) return "schedule"
    return "draft"
}

const getIdValue = (value) => {
    if (!value) return ""
    if (typeof value === "string") return value
    return value?._id || value?.id || ""
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
            genre: getIdValue(song?.genre),
            album: getIdValue(song?.album) || "none",
            explicit: song?.explicit || false,
            isFeatured: song?.isFeatured || false,
            isTrending: song?.isTrending || false,
            visibility: getDefaultVisibility(song),
            scheduledAt: song?.scheduledAt ? new Date(song.scheduledAt) : undefined,
        },
    })

    const onSubmit = (data) => {
        // Editing content shouldn't silently un-archive a taken-down song —
        // that's what the dedicated Restore action is for.
        const isArchived = normalizeSongStatus(song?.status) === SONG_STATUS.ARCHIVED

        const formData = buildSongFormData({
            ...data,
            ...(isArchived && { status: SONG_STATUS.ARCHIVED }),
            audio,
            cover,
        })

        updateSong(
            { id: song?._id, formData },
            {
                onSuccess: () => {
                    onSuccess?.()
                },
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
                showAdminFlags
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
