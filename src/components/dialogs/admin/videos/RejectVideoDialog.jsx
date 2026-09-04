"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import { useRejectVideo } from "@/hooks/api/admin/videos/useRejectVideo"
import { toast } from "sonner"

const RejectVideoDialog = ({ video, children }) => {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("Video content does not meet platform guidelines.")
  const { mutate: rejectVideo, isPending } = useRejectVideo()

  const handleReject = (e) => {
    e.preventDefault()
    if (!reason.trim()) {
      toast.error("Please provide a rejection reason.")
      return
    }

    rejectVideo(
      { id: video?._id, reason: reason.trim() },
      {
        onSuccess: () => {
          toast.success("Video submission rejected successfully.")
          setOpen(false)
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to reject video submission.")
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-red-error/10 border border-red-error/25 flex items-center justify-center text-red-error shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
            <span className="text-[18px] font-semibold leading-none">Reject Video Submission</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleReject} className="flex flex-col gap-4 mt-2">
          <p className="text-sm text-light-gray">
            Are you sure you want to reject <span className="text-whitetext font-semibold">{video?.title || "this video"}</span>? Please provide a reason for the creator.
          </p>

          <CommonInput
            label="Rejection Reason"
            placeholder="Enter reason for rejection..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <div className="flex items-center gap-3 mt-3">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1 rounded-full">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="outline"
              className="flex-1 text-red-error border-red-error/20 bg-red-error/10 hover:bg-red-error/20 rounded-full"
              isLoading={isPending}
            >
              Confirm Reject
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RejectVideoDialog
