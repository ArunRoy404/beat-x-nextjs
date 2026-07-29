"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import UploadNewPodcastForm from "@/components/forms/UploadNewPodcastForm"

const UploadNewPodcastDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient">
          <PlusCircle className="mr-2 h-4 w-4" /> Upload Podcasts
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto scrollbar-thin">
        {/* Custom Header */}
        <DialogHeader>
          <DialogTitle>
            Upload New Podcast
          </DialogTitle>
        </DialogHeader>

        {/* New Modular Form */}
        <UploadNewPodcastForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default UploadNewPodcastDialog
