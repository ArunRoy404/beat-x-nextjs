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

/**
 * `variant="card"` is the mobile card layout: every action becomes an equal
 * width pill with a label, two per row, instead of the table's row of small
 * icon circles — far easier to hit accurately on a touch screen.
 */
const SongsTableActions = ({ status, song, className, variant = "table" }) => {
    const isCard = variant === "card"
    const pill = isCard
        ? "flex-1 basis-[calc(50%_-_0.25rem)] min-w-0 h-9 py-0! rounded-full px-3 text-[12px]"
        : ""
    const iconPill = isCard
        ? "flex-1 basis-[calc(50%_-_0.25rem)] min-w-0 h-9 py-0! rounded-full px-3 text-[12px] gap-1.5"
        : "rounded-full"

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
        <div
            className={cn(
                isCard
                    ? "flex w-full flex-wrap items-center gap-2"
                    : "flex items-center justify-end gap-2 pr-2",
                className
            )}
        >
            {/* Approve / Reject buttons for Pending submitted songs */}
            {isPendingSubmission && (
                <>
                    <Button
                        onClick={handleApprove}
                        disabled={isApprovePending}
                        variant="outline"
                        size="sm"
                        className={cn(
                            "text-green-success border border-green-success/20 bg-green-success/10 rounded-full px-3 text-[12px] h-8",
                            pill
                        )}
                    >
                        <CheckCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                        Approve
                    </Button>

                    <RejectSongDialog song={song}>
                        <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                                "text-red-error border border-red-error/20 bg-red-error/10 rounded-full px-3 text-[12px] h-8",
                                pill
                            )}
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
                    className={cn(
                        "text-yellow-warning border border-yellow-warning/20 bg-yellow-warning/10 rounded-full px-3! py-3!",
                        pill
                    )}
                >
                    Take Down
                </Button>
            )}

            {!isPendingSubmission && isArchived && (
                <Button
                    onClick={() => handleStatusChange(SONG_STATUS.ACTIVE)}
                    disabled={isStatusPending}
                    variant="outline"
                    className={cn(
                        "text-green-success border border-green-success/20 bg-green-success/10 rounded-full px-3! py-3!",
                        pill
                    )}
                >
                    Restore
                </Button>
            )}

            <SongDetailsDialog song={song}>
                <Button
                    title="View Details"
                    size={isCard ? "sm" : "icon"}
                    variant="outline"
                    className={cn("text-secondary border border-secondary/20 bg-secondary/10 cursor-pointer", iconPill)}
                >
                    <Eye className="w-3.5 h-3.5 shrink-0" />
                    {isCard && <span>View</span>}
                </Button>
            </SongDetailsDialog>

            <EditSongDialog song={song}>
                <Button
                    title="Edit Song"
                    size={isCard ? "sm" : "icon"}
                    variant="outline"
                    className={cn("text-secondary border border-secondary/20 bg-secondary/10 cursor-pointer", iconPill)}
                >
                    <SquarePen className="w-3.5 h-3.5 shrink-0" />
                    {isCard && <span>Edit</span>}
                </Button>
            </EditSongDialog>

            <DeleteSongDialog song={song}>
                <Button
                    title="Delete Song"
                    size={isCard ? "sm" : "icon"}
                    variant="outline"
                    className={cn("text-red-error border border-red-error/20 bg-red-error/10 cursor-pointer", iconPill)}
                >
                    <Trash2 className="w-4 h-4 shrink-0" />
                    {isCard && <span>Delete</span>}
                </Button>
            </DeleteSongDialog>
        </div>
    )
}

export default SongsTableActions
