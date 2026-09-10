import React from "react"
import { Eye, Trash2, SquarePen, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import EditSongDialog from "@/components/dialogs/admin/music/EditSongDialog"
import DeleteSongDialog from "@/components/dialogs/admin/music/DeleteSongDialog"
import SongDetailsDialog from "@/components/dialogs/admin/music/SongDetailsDialog"
import RejectSongDialog from "@/components/dialogs/admin/music/RejectSongDialog"
import { useUpdateSongStatus } from "@/hooks/api/admin/songs/useUpdateSongStatus"
import { useApproveSong } from "@/hooks/api/admin/songs/useApproveSong"
import { SONG_STATUS, isSongAwaitingReview, normalizeSongStatus } from "@/lib/constants/songStatus"

const SongsTableActions = ({ status, song, className }) => {
    const { mutate: updateSongStatus, isPending: isStatusPending } = useUpdateSongStatus()
    const { mutate: approveSong, isPending: isApprovePending } = useApproveSong()

    const currentStatus = normalizeSongStatus(status || song?.status)
    const isPendingSubmission = isSongAwaitingReview({ ...song, status: status ?? song?.status })

    const isLive = currentStatus === SONG_STATUS.ACTIVE
    const isArchived = currentStatus === SONG_STATUS.ARCHIVED

    const handleApprove = () => {
        approveSong({ id: song?._id })
    }

    const handleStatusChange = (nextStatus) => {
        updateSongStatus({ id: song?._id, status: nextStatus })
    }

    return (
        <div className={cn("flex items-center justify-end gap-2 pr-2", className)}>
            {/* Approve / Reject buttons for Pending submitted songs */}
            {isPendingSubmission && (
                <>
                    <Button
                        onClick={handleApprove}
                        disabled={isApprovePending}
                        variant="outline"
                        size="sm"
                        className="text-green-success border border-green-success/20 bg-green-success/10 rounded-full px-3 text-[12px] h-8"
                    >
                        <CheckCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                        Approve
                    </Button>

                    <RejectSongDialog song={song}>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full px-3 text-[12px] h-8"
                        >
                            <XCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                            Reject
                        </Button>
                    </RejectSongDialog>
                </>
            )}

            {!isPendingSubmission && isLive && (
                <Button
                    onClick={() => handleStatusChange(SONG_STATUS.ARCHIVED)}
                    disabled={isStatusPending}
                    variant="outline"
                    className="text-yellow-warning border border-yellow-warning/20 bg-yellow-warning/10 rounded-full px-3! py-3!"
                >
                    Take Down
                </Button>
            )}

            {!isPendingSubmission && isArchived && (
                <Button
                    onClick={() => handleStatusChange(SONG_STATUS.ACTIVE)}
                    disabled={isStatusPending}
                    variant="outline"
                    className="text-green-success border border-green-success/20 bg-green-success/10 rounded-full px-3! py-3!"
                >
                    Restore
                </Button>
            )}

            <SongDetailsDialog song={song}>
                <Button
                    title="View Details"
                    size="icon"
                    variant="outline"
                    className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                >
                    <Eye className="w-3.5 h-3.5 shrink-0" />
                </Button>
            </SongDetailsDialog>

            <EditSongDialog song={song}>
                <Button
                    title="Edit Song"
                    size="icon"
                    variant="outline"
                    className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full cursor-pointer"
                >
                    <SquarePen className="w-3.5 h-3.5 shrink-0" />
                </Button>
            </EditSongDialog>

            <DeleteSongDialog song={song}>
                <Button
                    title="Delete Song"
                    size="icon"
                    variant="outline"
                    className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full cursor-pointer"
                >
                    <Trash2 className="w-4 h-4 shrink-0" />
                </Button>
            </DeleteSongDialog>
        </div>
    )
}

export default SongsTableActions
