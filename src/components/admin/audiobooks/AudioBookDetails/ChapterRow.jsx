"use client"

import React, { useState } from "react"
import { Play as PlayIcon, Pencil, Trash2, Check, X } from "lucide-react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { formatDurationMs } from "@/lib/format/formatDuration"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import { useUpdateChapter } from "@/hooks/api/admin/audiobooks/useUpdateChapter"
import { useDeleteChapter } from "@/hooks/api/admin/audiobooks/useDeleteChapter"
import { queryKeys } from "@/lib/reactQuery/queryKeys"

const ChapterRow = ({ audiobookId, chapter, index }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [confirmingDelete, setConfirmingDelete] = useState(false)
    const [title, setTitle] = useState(chapter.title || "")
    const [chapterNumber, setChapterNumber] = useState(chapter.chapterNumber ?? index + 1)

    const { mutate: updateChapter, isPending: isUpdating } = useUpdateChapter()
    const { mutate: deleteChapter, isPending: isDeleting } = useDeleteChapter()
    const queryClient = useQueryClient()

    const handleSave = () => {
        const formData = new FormData()
        formData.append("title", title)
        formData.append("chapterNumber", String(chapterNumber))

        updateChapter(
            { audiobookId, chapterId: chapter._id, formData },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: queryKeys.audiobooks.detail(audiobookId) })
                    toast.success("Chapter updated!")
                    setIsEditing(false)
                },
                onError: (error) => toast.error(error?.message || "Failed to update chapter."),
            }
        )
    }

    const handleDelete = () => {
        deleteChapter(
            { audiobookId, chapterId: chapter._id },
            {
                onSuccess: () => toast.success("Chapter deleted."),
                onError: (error) => toast.error(error?.message || "Failed to delete chapter."),
            }
        )
    }

    if (isEditing) {
        return (
            <div className="flex flex-col gap-2 p-4 rounded-[16px] border border-secondary/30 bg-[#20201F]">
                <div className="grid grid-cols-[80px_1fr] gap-2">
                    <CommonInput type="number" value={chapterNumber} onChange={(e) => setChapterNumber(e.target.value)} />
                    <CommonInput value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="flex items-center gap-2 justify-end">
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="text-light-gray text-xs px-3 py-1.5 rounded-full border border-white/10 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isUpdating}
                        className="text-secondary text-xs px-3 py-1.5 rounded-full border border-secondary/20 bg-secondary/10 cursor-pointer disabled:opacity-50"
                    >
                        {isUpdating ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex p-4 items-center gap-4 align-stretch rounded-[16px] border border-[#6B6B6B] bg-[#20201F]">
            <div className="w-8 h-8 rounded-full border border-[#ADAAAA] bg-[#20201F] flex items-center justify-center text-white shrink-0">
                <PlayIcon className="w-3.5 h-3.5 fill-white ml-0.5" />
            </div>

            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[#ADAAAA] text-[12px] font-semibold leading-none mb-1">
                    Chapter {chapter.chapterNumber ?? index + 1}
                </span>
                <span className="text-white text-[16px] font-semibold leading-normal truncate">
                    {chapter.title}
                </span>
                {chapter.transcodeStatus && !["ready", "done"].includes(chapter.transcodeStatus) && (
                    <span className="text-yellow-warning text-[11px] mt-0.5 capitalize">{chapter.transcodeStatus}</span>
                )}
            </div>

            <span className="text-[#ADAAAA] text-[12px] font-normal shrink-0 self-center">
                {formatDurationMs(chapter.durationMs)}
            </span>

            {confirmingDelete ? (
                <div className="flex items-center gap-1.5 shrink-0">
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        title="Confirm delete"
                        className="w-7 h-7 rounded-full flex items-center justify-center border border-red-error/20 bg-red-error/10 text-red-error cursor-pointer disabled:opacity-50"
                    >
                        <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setConfirmingDelete(false)}
                        title="Cancel"
                        className="w-7 h-7 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-light-gray cursor-pointer"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-1.5 shrink-0">
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        title="Edit chapter"
                        className="w-7 h-7 rounded-full flex items-center justify-center border border-secondary/20 bg-secondary/10 text-secondary cursor-pointer"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setConfirmingDelete(true)}
                        title="Delete chapter"
                        className="w-7 h-7 rounded-full flex items-center justify-center border border-red-error/20 bg-red-error/10 text-red-error cursor-pointer"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ChapterRow
