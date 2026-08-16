"use client"

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonAudioInput from "@/components/shared/CommonInputs/CommonAudioInput/CommonAudioInput"
import { useCreateChapter } from "@/hooks/api/admin/audiobooks/useCreateChapter"
import { useUploadProgress } from "@/hooks/api/admin/audiobooks/useUploadProgress"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

const chapterSchema = z.object({
    chapterNumber: z.string().min(1, "Chapter number is required"),
    title: z.string().min(1, "Title is required"),
})

const AddChapterForm = ({ audiobookId, onDone, onCancel }) => {
    const [audio, setAudio] = useState(null)
    const [audioError, setAudioError] = useState("")
    const [trackingId, setTrackingId] = useState(null)

    const { mutate: createChapter, isPending } = useCreateChapter()
    const progress = useUploadProgress(trackingId)
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(chapterSchema),
        defaultValues: { chapterNumber: "", title: "" },
    })

    useEffect(() => {
        if (progress.status === "done") {
            queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.detail(audiobookId) })
            toast.success("Chapter uploaded successfully!")
            reset()
            setAudio(null)
            setTrackingId(null)
            onDone?.()
        } else if (progress.status === "failed" || progress.status === "aborted") {
            toast.error("Chapter upload failed.")
            setTrackingId(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress.status])

    const onSubmit = (data) => {
        if (!(audio instanceof File)) {
            setAudioError("Chapter audio file is required")
            return
        }
        setAudioError("")

        const formData = new FormData()
        formData.append("audio", audio)
        formData.append("chapterNumber", data.chapterNumber)
        formData.append("title", data.title)

        createChapter(
            { audiobookId, formData },
            {
                onSuccess: (result) => setTrackingId(result?.trackingId),
                onError: (error) => toast.error(error?.message || "Failed to start chapter upload."),
            }
        )
    }

    const isUploading = Boolean(trackingId) && progress.status === "uploading"

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 border border-secondary/20 bg-white/5 rounded-[16px] p-4">
            <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-3">
                <CommonInput
                    type="number"
                    placeholder="No."
                    {...register("chapterNumber")}
                    error={errors.chapterNumber?.message}
                    disabled={isUploading}
                />
                <CommonInput
                    placeholder="Chapter title"
                    {...register("title")}
                    error={errors.title?.message}
                    disabled={isUploading}
                />
            </div>

            <CommonAudioInput value={audio} onChange={setAudio} error={audioError} />

            {trackingId && (
                <div className="flex flex-col gap-1.5">
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-secondary rounded-full transition-all duration-300"
                            style={{ width: `${progress.percent}%` }}
                        />
                    </div>
                    <span className="text-light-gray text-[11px] capitalize">
                        {progress.status === "uploading" ? `Uploading & processing… ${progress.percent}%` : progress.status}
                    </span>
                </div>
            )}

            <div className="flex items-center gap-3 mt-1">
                <Button type="button" variant="outline" size="sm" onClick={onCancel} disabled={isUploading}>
                    Cancel
                </Button>
                <Button type="submit" variant="gradient" size="sm" isLoading={isPending || isUploading}>
                    Upload Chapter
                </Button>
            </div>
        </form>
    )
}

export default AddChapterForm
