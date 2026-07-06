"use client"

import React from "react"
import { Trash2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { useAdminDashboardAlbumsStore } from "@/zustandStore/admin/adminStore/adminDashboardAlbumsStore"
import { toast } from "sonner"

const AlbumDetailFooter = ({ album, onClose }) => {
    const deleteAlbum = useAdminDashboardAlbumsStore((state) => state.deleteAlbum)
    const updateAlbum = useAdminDashboardAlbumsStore((state) => state.updateAlbum)

    const handleDeleteAlbumClick = () => {
        deleteAlbum(album.id)
        toast.success("Album deleted successfully")
        onClose?.()
    }

    const handleTogglePublish = () => {
        const isPublished = album.status === "Published"
        const nextStatus = isPublished ? "Under Review" : "Published"
        updateAlbum({ ...album, status: nextStatus })
        toast.success(isPublished ? "Album unpublished successfully" : "Album published successfully")
    }

    return (
        <div className="p-4 border-t border-white/5 mt-auto shrink-0 bg-card">
            <div className="flex items-center justify-between w-full flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        onClick={handleDeleteAlbumClick}
                        className="bg-red-error/10 hover:bg-red-error/20 border border-red-error/20 text-red-error font-medium rounded-[10px] px-4 h-10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete Album
                    </Button>
                    <Button
                        type="button"
                        onClick={handleTogglePublish}
                        className={`font-medium rounded-[10px] px-4 h-10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 border ${
                            album?.status === "Published"
                                ? "bg-yellow-warning/10 hover:bg-yellow-warning/20 border-yellow-warning/20 text-yellow-warning"
                                : "bg-green-success/10 hover:bg-green-success/20 border-green-success/20 text-green-success"
                        }`}
                    >
                        <AlertTriangle className="w-4 h-4" />
                        {album?.status === "Published" ? "Unpublish" : "Publish"}
                    </Button>
                </div>

                <DialogClose asChild>
                    <Button
                        variant="outline"
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-light-gray font-medium rounded-[10px] px-6 h-10 flex items-center justify-center cursor-pointer transition-all active:scale-95"
                    >
                        Close
                    </Button>
                </DialogClose>
            </div>
        </div>
    )
}

export default AlbumDetailFooter
