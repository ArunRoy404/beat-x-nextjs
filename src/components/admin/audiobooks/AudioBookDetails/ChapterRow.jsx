"use client"

import React, { useState } from "react"
import { Play as PlayIcon, Pause as PauseIcon, Pencil, Trash2, Check, X } from "lucide-react"
import { toast } from "sonner"
import { formatDurationMs } from "@/lib/format/formatDuration"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import { useUpdateChapter } from "@/hooks/api/admin/audiobooks/useUpdateChapter"
import { useDeleteChapter } from "@/hooks/api/admin/audiobooks/useDeleteChapter"
import { useGlobalMediaPlayerStore } from "@/zustandStore/media/useGlobalMediaPlayerStore"
import { getSongAudioUrl, resolveMediaUrl } from "@/lib/format/resolveMediaUrl"

const ChapterRow = ({ audiobookId, book, chapter, index }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [confirmingDelete, setConfirmingDelete] = useState(false)
    const [title, setTitle] = useState(chapter.title || "")
    const [newAudioFile, setNewAudioFile] = useState(null)

    const { mutate: updateChapter, isPending: isUpdating } = useUpdateChapter()
    const { mutate: deleteChapter, isPending: isDeleting } = useDeleteChapter()

    const {
        id: activeId,
        isPlaying: isGlobalPlaying,
        playMedia,
        togglePlay: toggleGlobalPlay,
    } = useGlobalMediaPlayerStore()

    const audioSrc = getSongAudioUrl(chapter) || (chapter?.hlsMasterUrl ? resolveMediaUrl(chapter.hlsMasterUrl) : "")
    const isThisChapterActive = activeId === (chapter?._id || audioSrc)
    const isPlaying = isThisChapterActive && isGlobalPlaying

    const handlePlayChapter = () => {
        if (!audioSrc) {
            toast.error("Chapter audio stream is currently unavailable or still processing.")
            return
        }

        if (isThisChapterActive) {
            toggleGlobalPlay()
        } else {
            playMedia({
                id: chapter?._id || audioSrc,
                mediaType: "audio",
                src: audioSrc,
                title: chapter?.title ? `Ch. ${chapter.chapterNumber || index + 1}: ${chapter.title}` : "Audiobook Chapter",
                artist: book?.title || "Audiobook",
                coverUrl: book?.coverUrl,
                durationMs: chapter?.durationMs || 0,
            })
        }
    }

    const handleSave = () => {
        if (!title.trim()) {
            toast.error("Chapter title cannot be empty.")
            return
        }

        const formData = new FormData()
        formData.append("title", title.trim())
        if (newAudioFile) {
            formData.append("audio", newAudioFile)
        }

        updateChapter(
            { audiobookId, chapterId: chapter._id, formData },
            {
                onSuccess: () => {
                    toast.success("Chapter updated successfully!")
                    setIsEditing(false)
                    setNewAudioFile(null)
                },
                onError: (error) => toast.error(error?.response?.data?.message || error?.message || "Failed to update chapter."),
            }
        )
    }

    const handleDelete = () => {
        deleteChapter(
            { audiobookId, chapterId: chapter._id },
            {
                onSuccess: () => toast.success("Chapter deleted successfully."),
                onError: (error) => toast.error(error?.response?.data?.message || error?.message || "Failed to delete chapter."),
            }
        )
    }

    if (isEditing) {
        return (
            <div className="flex flex-col gap-3 p-4 rounded-[16px] border border-secondary/30 bg-[#20201F]">
                <div className="flex flex-col gap-2">
                    <label className="text-[12px] text-light-gray font-medium">Chapter Title</label>
                    <CommonInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Chapter 1: The Beginning" />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-light-gray font-medium">Replace Audio (Optional)</label>
                    <input
                        type="file"
                        accept="audio/mp3,audio/mp4,audio/aac,audio/ogg,audio/wav,audio/*"
                        onChange={(e) => setNewAudioFile(e.target.files?.[0] || null)}
                        className="text-xs text-light-gray file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20 cursor-pointer"
                    />
                    {newAudioFile && (
                        <span className="text-[11px] text-secondary font-mono">Selected: {newAudioFile.name}</span>
                    )}
                </div>

                <div className="flex items-center gap-2 justify-end mt-1">
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(false)
                            setNewAudioFile(null)
                            setTitle(chapter.title || "")
                        }}
                        className="text-light-gray text-xs px-3.5 py-1.5 rounded-full border border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isUpdating}
                        className="text-black bg-secondary hover:bg-secondary/90 font-medium text-xs px-4 py-1.5 rounded-full cursor-pointer disabled:opacity-50 transition-colors"
                    >
                        {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex p-4 items-center gap-4 align-stretch rounded-[16px] border border-white/10 bg-[#20201F] hover:border-secondary/30 transition-all">
            <button
                type="button"
                onClick={handlePlayChapter}
                disabled={!audioSrc}
                className="w-9 h-9 rounded-full bg-secondary text-black flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 cursor-pointer shadow-md shadow-secondary/20"
                title={isPlaying ? "Pause Chapter" : "Play Chapter"}
            >
                {isPlaying ? (
                    <PauseIcon className="w-4 h-4 fill-current" />
                ) : (
                    <PlayIcon className="w-4 h-4 fill-current ml-0.5" />
                )}
            </button>

            <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[#ADAAAA] text-[12px] font-semibold leading-none mb-1">
                    Chapter {chapter.chapterNumber ?? index + 1}
                </span>
                <span className="text-white text-[16px] font-semibold leading-normal truncate">
                    {chapter.title}
                </span>
                {chapter.transcodeStatus && !["ready", "done"].includes(chapter.transcodeStatus) && (
                    <span className="text-yellow-warning text-[11px] mt-0.5 capitalize">Status: {chapter.transcodeStatus}</span>
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
                        className="w-7 h-7 rounded-full flex items-center justify-center border border-red-error/20 bg-red-error/10 text-red-error hover:bg-red-error/20 cursor-pointer disabled:opacity-50"
                    >
                        <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setConfirmingDelete(false)}
                        title="Cancel"
                        className="w-7 h-7 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-light-gray hover:bg-white/10 cursor-pointer"
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
                        className="w-7 h-7 rounded-full flex items-center justify-center border border-secondary/20 bg-secondary/10 text-secondary hover:bg-secondary/20 cursor-pointer"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setConfirmingDelete(true)}
                        title="Delete chapter"
                        className="w-7 h-7 rounded-full flex items-center justify-center border border-red-error/20 bg-red-error/10 text-red-error hover:bg-red-error/20 cursor-pointer"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ChapterRow
