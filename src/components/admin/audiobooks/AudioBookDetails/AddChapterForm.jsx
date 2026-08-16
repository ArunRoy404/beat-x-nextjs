"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
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
                    toast.success("Chapter uploaded — processing audio now.")
                    reset()
                    setAudio(null)
                    onDone?.()
                },
                onError: (error) => toast.error(error?.message || "Failed to upload chapter."),
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

            <CommonAudioInput value={audio} onChange={setAudio} error={audioError} />

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
