"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useDeleteAlbum } from "@/hooks/api/admin/albums/useDeleteAlbum"

const DeleteAlbumForm = ({ album, onSuccess, onCancel }) => {
    const { mutate: deleteAlbum, isPending } = useDeleteAlbum()

    const handleDelete = () => {
        deleteAlbum(
            { id: album._id },
            {
                onSuccess: () => {
                    toast.success("Album deleted successfully!")
                    onSuccess?.()
                },
                onError: (error) => toast.error(error?.message || "Failed to delete album."),
            }
        )
    }

    return (
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 text-left">
            <p className="text-light-whitetext text-[14px] not-italic font-normal leading-[22px] font-sans">
                You are about to permanently delete <span className="text-whitetext font-semibold">{album?.title}</span>. Songs referencing this album will be detached, not deleted. This action cannot be undone.
            </p>

            <div className="flex items-center gap-4 mt-2 shrink-0">
                <DialogClose asChild className="flex-1 w-full">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full rounded-full"
                        size="lg"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </DialogClose>
                <Button
                    type="button"
                    className="flex-1 rounded-full bg-red-error hover:bg-red-error/90 text-white flex items-center justify-center gap-2 border-0"
                    size="lg"
                    onClick={handleDelete}
                    isLoading={isPending}
                >
                    <Trash2 className="w-4 h-4" /> Delete
                </Button>
            </div>
        </div>
    )
}

export default DeleteAlbumForm
