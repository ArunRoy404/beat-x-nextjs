"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import { useCreateSong } from "@/hooks/api/admin/songs/useCreateSong"
import { songSchema } from "./adminSongSchema"
import { buildSongFormData } from "./buildSongFormData"
import AdminSongFormFields from "./AdminSongFormFields"

const UploadNewSongForm = ({ onSuccess, onCancel }) => {
    const [audio, setAudio] = useState(null)
    const [audioError, setAudioError] = useState("")
    const [cover, setCover] = useState(null)
    const [coverError, setCoverError] = useState("")

    const { mutate: createSong, isPending } = useCreateSong()

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(songSchema),
        defaultValues: {
            title: "",
            artist: "",
            genre: "",
            explicit: false,
            visibility: "publish",
            scheduledAt: undefined,
        },
    })

    const onSubmit = (data) => {
        let hasError = false
        if (!(audio instanceof File)) {
            setAudioError("Audio file is required")
            hasError = true
        } else {
            setAudioError("")
        }
        if (!(cover instanceof File)) {
            setCoverError("Cover image is required")
            hasError = true
        } else {
            setCoverError("")
        }
        if (hasError) return

        const formData = buildSongFormData({ ...data, audio, cover })

        createSong(formData, {
            onSuccess: () => {
                toast.success("Song uploaded — processing audio now.")
                reset()
                setAudio(null)
                setCover(null)
                onSuccess?.()
            },
            onError: (error) => toast.error(error?.message || "Failed to upload song."),
        })
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
                audioError={audioError}
                cover={cover}
                onCoverChange={setCover}
                coverError={coverError}
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
                    Upload Now
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default UploadNewSongForm
