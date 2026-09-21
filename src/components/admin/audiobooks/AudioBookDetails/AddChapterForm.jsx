"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonAudioInput from "@/components/shared/CommonInputs/CommonAudioInput/CommonAudioInput"
import { useCreateChapter } from "@/hooks/api/admin/audiobooks/useCreateChapter"

const chapterSchema = z.object({
    title: z.string().min(1, "Title is required"),
})

const AddChapterForm = ({ audiobookId, onDone, onCancel }) => {
    const [audio, setAudio] = useState(null)
    const [audioError, setAudioError] = useState("")

    const { mutate: createChapter, isPending } = useCreateChapter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(chapterSchema),
        defaultValues: { title: "" },
    })

    const onSubmit = (data) => {
        if (!(audio instanceof File)) {
            setAudioError("Chapter audio file is required")
            return
        }
        setAudioError("")

        const formData = new FormData()
        formData.append("audio", audio)
        formData.append("title", data.title)

        createChapter(
            { audiobookId, formData },
            {
                onSuccess: () => {
                    reset()
                    setAudio(null)
                    onDone?.()
                },
            }
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 border border-secondary/20 bg-white/5 rounded-[16px] p-4">
            <CommonInput
                placeholder="Chapter title"
                {...register("title")}
                error={errors.title?.message}
                disabled={isPending}
            />

            {/* mp3/mp4/aac/ogg are confirmed working today; wav/flac are
                intended to be supported too but currently fail on the
                backend (confirmed via a direct 400 "Unsupported file type"
                for audio/x-flac) — left open here pending that backend fix
                rather than blocking the formats we intend to support. */}
            <CommonAudioInput
                value={audio}
                onChange={setAudio}
                error={audioError}
                accept="audio/mpeg,audio/mp4,audio/aac,audio/ogg,audio/wav,audio/flac,audio/x-flac"
                subtitle="MP3, MP4, AAC, OGG, WAV, FLAC · Max 2GB"
            />

            <div className="flex items-center gap-3 mt-1">
                <Button type="button" variant="outline" size="sm" onClick={onCancel} disabled={isPending}>
                    Cancel
                </Button>
                <Button type="submit" variant="gradient" size="sm" isLoading={isPending}>
                    Upload Chapter
                </Button>
            </div>
        </form>
    )
}

export default AddChapterForm
