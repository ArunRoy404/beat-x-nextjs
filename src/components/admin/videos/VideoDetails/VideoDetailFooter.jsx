"use client"

import React, { useState } from "react"
import { Trash2, AlertTriangle, CheckCircle, XCircle, RefreshCw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import DeleteVideoDialog from "@/components/dialogs/admin/videos/DeleteVideoDialog"
import { useApproveVideo } from "@/hooks/api/admin/videos/useApproveVideo"
import { useRejectVideo } from "@/hooks/api/admin/videos/useRejectVideo"
import { useUpdateVideo } from "@/hooks/api/admin/videos/useUpdateVideo"
import { toast } from "sonner"

const REJECTION_REASONS = [
    { value: "Identity Music unclear or unreadable", label: "Identity Music unclear or unreadable" },
    { value: "Potential Copyright Infringement", label: "Potential Copyright Infringement" },
    { value: "Low video quality or resolution", label: "Low video quality or resolution" },
    { value: "Inappropriate or offensive content", label: "Inappropriate or offensive content" },
    { value: "Metadata or cover image incorrect", label: "Metadata or cover image incorrect" },
]

const VideoDetailFooter = ({ video }) => {
    const [isRejecting, setIsRejecting] = useState(false)
    const [rejectionReason, setRejectionReason] = useState(REJECTION_REASONS[0].value)
    const [additionalNote, setAdditionalNote] = useState("")

    const { mutate: approveVideo, isPending: isApprovePending } = useApproveVideo()
    const { mutate: rejectVideo, isPending: isRejectPending } = useRejectVideo()
    const { mutate: updateVideo, isPending: isUpdatePending } = useUpdateVideo()

    const statusKey = (video?.status || "").toLowerCase()
    const isDraft = statusKey === "draft" || statusKey === "pending" || video?.submittedStatus === "pending"
    const isActive = statusKey === "active" || statusKey === "published"
    const isArchived = statusKey === "archived"

    const handleApprove = () => {
        if (!video?._id) return
        approveVideo(
            { id: video._id },
            {
                onSuccess: () => toast.success("Video submission approved!"),
                onError: (err) => toast.error(err?.message || "Failed to approve video."),
            }
        )
    }

    const handleConfirmReject = () => {
        if (!video?._id) return
        const reasonText = additionalNote.trim()
            ? `${rejectionReason} - ${additionalNote.trim()}`
            : rejectionReason

        rejectVideo(
            { id: video._id, reason: reasonText },
            {
                onSuccess: () => {
                    toast.success("Video submission rejected!")
                    setIsRejecting(false)
                },
                onError: (err) => toast.error(err?.message || "Failed to reject video."),
            }
        )
    }

    const handleStatusChange = (nextStatus) => {
        if (!video?._id) return
        updateVideo(
            { id: video._id, body: { status: nextStatus } },
            {
                onSuccess: () => toast.success(nextStatus === "archived" ? "Video taken down." : "Video restored."),
                onError: (err) => toast.error(err?.message || "Failed to update video status."),
            }
        )
    }

    if (isRejecting) {
        return (
            <div className="p-4 border-t border-white/5 mt-auto shrink-0 bg-card flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center gap-2 text-red-error">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="text-[14px] font-semibold tracking-wide">Reject Application</span>
                </div>

                {/* Rejection Reason Dropdown */}
                <div className="flex flex-col gap-2">
                    <span className="text-[12px] text-dark-gray font-semibold tracking-wide">Rejection Reason</span>
                    <CommonSelect
                        value={rejectionReason}
                        onChange={setRejectionReason}
                        options={REJECTION_REASONS}
                    />
                </div>

                {/* Additional Note to Artist */}
                <div className="flex flex-col gap-2">
                    <span className="text-[12px] text-dark-gray font-semibold tracking-wide">Additional note to artist</span>
                    <CommonInput
                        type="textarea"
                        placeholder="Explain what the artist need to fix...."
                        value={additionalNote}
                        onChange={(e) => setAdditionalNote(e.target.value)}
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Button
                        onClick={handleConfirmReject}
                        isLoading={isRejectPending}
                        className="bg-red-error hover:bg-red-error/90 text-whitetext font-semibold rounded-[10px] px-4 h-10 flex items-center gap-2 border-0 cursor-pointer transition-all active:scale-95"
                    >
                        <XCircle className="w-4 h-4 stroke-[2px]" />
                        Confirm Rejection
                    </Button>
                    <Button
                        type="button"
                        onClick={() => setIsRejecting(false)}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-light-gray font-medium rounded-[10px] px-6 h-10 flex items-center justify-center cursor-pointer transition-all active:scale-95"
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 border-t border-white/5 mt-auto shrink-0 bg-card">
            <div className="flex items-center justify-between w-full flex-wrap gap-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                    {/* Approve / Reject buttons strictly for Draft videos */}
                    {isDraft && (
                        <>
                            <Button
                                onClick={handleApprove}
                                isLoading={isApprovePending}
                                variant="outline"
                                className="text-green-success border border-green-success/20 bg-green-success/10 hover:bg-green-success/20 font-medium rounded-[10px] px-4 h-10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Approve
                            </Button>

                            <Button
                                onClick={() => setIsRejecting(true)}
                                variant="outline"
                                className="text-red-error border border-red-error/20 bg-red-error/10 hover:bg-red-error/20 font-medium rounded-[10px] px-4 h-10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                            >
                                <XCircle className="w-4 h-4" />
                                Reject
                            </Button>
                        </>
                    )}

                    {/* Take Down button for Active/Published videos */}
                    {!isDraft && isActive && (
                        <Button
                            onClick={() => handleStatusChange("archived")}
                            isLoading={isUpdatePending}
                            variant="outline"
                            className="bg-yellow-warning/10 hover:bg-yellow-warning/20 border border-yellow-warning/20 text-yellow-warning font-medium rounded-[10px] px-4 h-10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                        >
                            <AlertTriangle className="w-4 h-4" />
                            Take Down
                        </Button>
                    )}

                    {/* Restore button for Archived videos */}
                    {!isDraft && isArchived && (
                        <Button
                            onClick={() => handleStatusChange("active")}
                            isLoading={isUpdatePending}
                            variant="outline"
                            className="bg-green-success/10 hover:bg-green-success/20 border border-green-success/20 text-green-success font-medium rounded-[10px] px-4 h-10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Restore
                        </Button>
                    )}

                    {/* Delete trigger */}
                    <DeleteVideoDialog video={video}>
                        <Button
                            className="bg-red-error/10 hover:bg-red-error/20 border border-red-error/20 text-red-error font-medium rounded-[10px] px-4 h-10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 border-none"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Video
                        </Button>
                    </DeleteVideoDialog>
                </div>

                <DialogClose asChild>
                    <Button
                        variant="outline"
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-light-gray font-medium rounded-[10px] px-6 h-10 flex items-center justify-center cursor-pointer transition-all active:scale-95 ml-auto"
                    >
                        Close
                    </Button>
                </DialogClose>
            </div>
        </div>
    )
}

export default VideoDetailFooter


