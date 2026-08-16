"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useDeleteGenre } from "@/hooks/api/admin/genre/useDeleteGenre"

const DeleteGenreForm = ({ genre, onSuccess, onCancel }) => {
    const { mutate: deleteGenre, isPending } = useDeleteGenre()

    const handleDelete = () => {
        deleteGenre(
            { id: genre._id },
            {
                onSuccess: () => {
                    toast.success("Genre deleted successfully!")
                    onSuccess?.()
                },
                onError: (error) => {
                    toast.error(error?.message || "Failed to delete genre.")
                },
            }
        )
    }

    return (
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 text-left">
            <p className="text-light-whitetext text-[14px] not-italic font-normal leading-[22px] font-sans">
                You are about to permanently delete <span className="text-whitetext font-semibold">{genre?.name}</span>. This action cannot be undone.
            </p>

            {/* Footer Actions */}
            <div className="flex items-center gap-4 mt-4 shrink-0">
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full h-[52px]!"
                    size="lg"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    className="flex-1 rounded-full bg-red-error hover:bg-red-error/90 text-white font-semibold h-[52px]! flex items-center justify-center gap-2 border-0 cursor-pointer"
                    size="lg"
                    onClick={handleDelete}
                    isLoading={isPending}
                >
                    <Trash2 className="w-4 h-4 shrink-0" /> Delete Genre
                </Button>
            </div>
        </div>
    )
}

export default DeleteGenreForm
