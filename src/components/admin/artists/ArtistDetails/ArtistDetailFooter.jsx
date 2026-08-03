import React from "react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { useAdminDashboardArtistsStore } from "@/zustandStore/admin/adminStore/adminDashboardArtistsStore"
import { toast } from "sonner"

const ArtistDetailFooter = ({ artist, onClose }) => {
  const updateArtist = useAdminDashboardArtistsStore((state) => state.updateArtist)
  const isSuspended = artist?.status === "Suspended"

  const handleToggleStatus = () => {
    if (isSuspended) {
      updateArtist({
        ...artist,
        status: "Verified",
        isVerified: true
      })
      toast.success("Artist reactivated successfully!")
    } else {
      updateArtist({
        ...artist,
        status: "Suspended",
        isVerified: false
      })
      toast.warning("Artist suspended!")
    }
  }

  return (
    <div className="p-4 border-t border-white/5 bg-[#1A1A19] flex items-center justify-between gap-4 shrink-0">
      {/* Left side label */}
      <div className="flex flex-col">
        {isSuspended ? (
          <span className="text-red-error text-[12px] font-sans font-semibold tracking-wide">
            Status: Suspended Artist
          </span>
        ) : (
          <span
            className="text-[#ADAAAA] font-normal leading-[15px] font-sans select-none"
            style={{ fontFamily: "Space Grotesk", fontSize: "11.25px" }}
          >
            Verified by Nadia Islam on 2023-03-18
          </span>
        )}
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-3 shrink-0">
        {isSuspended ? (
          <Button
            type="button"
            className="rounded-full bg-green-success hover:bg-green-success/90 text-white font-semibold px-4 h-9 cursor-pointer select-none border-0"
            onClick={handleToggleStatus}
          >
            Reactivate Artist
          </Button>
        ) : (
          <Button
            type="button"
            className="rounded-full bg-red-error hover:bg-red-error/90 text-white font-semibold px-4 h-9 cursor-pointer select-none border-0"
            onClick={handleToggleStatus}
          >
            Suspend Artist
          </Button>
        )}

        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="rounded-full px-5 h-9 cursor-pointer hover:bg-white/5 transition-all text-whitetext border-white/10"
            onClick={onClose}
          >
            Close
          </Button>
        </DialogClose>
      </div>
    </div>
  )
}

export default ArtistDetailFooter
