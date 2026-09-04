"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput";
import { useRejectPodcast } from "@/hooks/api/admin/podcasts/useRejectPodcast";
import { toast } from "sonner";

const RejectPodcastDialog = ({ podcast, children }) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("Cover art does not meet guidelines.");
  const { mutate: rejectPodcast, isPending } = useRejectPodcast();

  const handleReject = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast.error("Please provide a rejection reason.");
      return;
    }

    rejectPodcast(
      { id: podcast._id, reason: reason.trim() },
      {
        onSuccess: () => {
          toast.success("Podcast submission rejected.");
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to reject podcast submission.");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-red-error/10 border border-red-error/25 flex items-center justify-center text-red-error shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
            <span className="text-[18px] font-semibold leading-none">Reject Podcast Submission</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleReject} className="flex flex-col gap-4 mt-2">
          <p className="text-sm text-light-gray">
            Are you sure you want to reject <span className="text-whitetext font-semibold">{podcast?.title || "this podcast"}</span>? Please provide a reason for the creator.
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
  );
};

export default RejectPodcastDialog;
