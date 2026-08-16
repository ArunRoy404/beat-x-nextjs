"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { usePodcastDetail } from "@/hooks/api/admin/podcasts/usePodcastDetail"
import PodcastDetailHeader from "@/components/admin/podcasts/PodcastsDetails/PodcastDetailHeader"
import PodcastDetailsTabs from "@/components/admin/podcasts/PodcastsDetails/PodcastDetailsTabs"
import PodcastDetailFooter from "@/components/admin/podcasts/PodcastsDetails/PodcastDetailFooter"

const PodcastDetailsDialog = ({ podcast: summary, children }) => {
    const [open, setOpen] = useState(false)
    const { data: detail, isLoading } = usePodcastDetail(open ? summary?._id : undefined)
    const podcast = detail ? { ...detail.podcast, episodes: detail.episodes } : summary

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[672px] p-0 overflow-hidden flex flex-col max-h-[95vh]">
                {/* Screen reader only title for accessibility compliance */}
                <DialogTitle className="sr-only">
                    Podcast Details - {podcast?.title || "Unknown"}
                </DialogTitle>

                {isLoading && !detail ? (
                    <div className="flex items-center justify-center py-24">
                        <Spinner className="size-6 text-secondary" />
                    </div>
                ) : (
                    <>
                        {/* Common Header */}
                        <PodcastDetailHeader podcast={podcast} />

                        {/* Switchable Tabs between Details, Reviews & Analytics */}
                        <PodcastDetailsTabs podcast={podcast} />

                        {/* Footer with Delete and Close buttons */}
                        <PodcastDetailFooter podcast={podcast} />
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default PodcastDetailsDialog
