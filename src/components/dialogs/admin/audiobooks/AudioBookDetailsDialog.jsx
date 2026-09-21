"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { useAudioBookDetail } from "@/hooks/api/admin/audiobooks/useAudioBookDetail"
import AudioBookDetailHeader from "@/components/admin/audiobooks/AudioBookDetails/AudioBookDetailHeader"
import AudioBookDetailsTabs from "@/components/admin/audiobooks/AudioBookDetails/AudioBookDetailsTabs"
import AudioBookDetailFooter from "@/components/admin/audiobooks/AudioBookDetails/AudioBookDetailFooter"

const AudioBookDetailsDialog = ({ book: summary, children }) => {
    const [open, setOpen] = useState(false)
    // GET /audiobooks/:id returns { book, chapters, userProgress } — not the
    // book flattened with chapters inline, so pull each piece out here.
    // `chapters` itself is a paginated object ({ data, total, page, limit }),
    // not a bare array — the Postman example showed a bare array, but the
    // real server doesn't match it (confirmed via live response), so reading
    // `detail?.chapters || []` used to pass the whole object through and
    // crash every downstream `[...chapters]`/`chapters.map(...)` call.
    const { data: detail, isLoading } = useAudioBookDetail(open ? summary?._id : undefined)
    const book = detail?.book || summary
    const chapters = Array.isArray(detail?.chapters)
        ? detail.chapters
        : (detail?.chapters?.data ?? [])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[95vh]">
                {/* Screen reader only title for accessibility compliance */}
                <DialogTitle className="sr-only">
                    Audiobook Details - {book?.title || "Unknown"}
                </DialogTitle>

                {isLoading && !detail ? (
                    <div className="flex items-center justify-center py-24">
                        <Spinner className="size-6 text-secondary" />
                    </div>
                ) : (
                    <>
                        <AudioBookDetailHeader book={book} chapters={chapters} />
                        <AudioBookDetailsTabs book={book} chapters={chapters} />
                        <AudioBookDetailFooter book={book} />
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default AudioBookDetailsDialog
