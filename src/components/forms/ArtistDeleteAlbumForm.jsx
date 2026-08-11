"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Trash2, Lock } from "lucide-react"
import { toast } from "sonner"
import { useArtistAlbumsStore } from "@/zustandStore/artist/artistStore/artistAlbumsStore"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"

const deleteSchema = z.object({
    password: z.string().min(1, "Password is required"),
})

const ArtistDeleteAlbumForm = ({ album, onSuccess, onCancel }) => {
    const deleteAlbum = useArtistAlbumsStore((state) => state.deleteAlbum)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(deleteSchema),
        defaultValues: {
            password: "",
        },
    })

    const onSubmit = (data) => {
        if (data.password !== "admin") {
            toast.error("Incorrect password! (Use 'admin' to delete)")
            return
        }
        deleteAlbum(album.id)
        toast.success("Album deleted successfully!")
        reset()
        onSuccess?.()
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
                <p className="text-light-whitetext text-[14px] not-italic font-normal leading-[22px] font-sans">
                    You are about to permanently delete this Album. All related track metadata will be removed. This action cannot be undone.
                </p>
                <p className="text-light-whitetext text-[14px] not-italic font-normal leading-[22px] font-sans">
                    Enter the password to proceed.
                </p>
            </div>

            <CommonInput
                label="Password"
                type="password"
                placeholder="Enter deletion password"
                leftIcon={<Lock className="w-4 h-4 text-light-whitetext/40" />}
                {...register("password")}
                error={errors.password?.message}
            />

            {/* Dialog Footer Actions */}
            <div className="flex items-center gap-4 mt-2 shrink-0">
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full"
                    size="lg"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="flex-1 rounded-full bg-red-error hover:bg-red-error/90 text-white font-semibold flex items-center justify-center gap-2 border-0 cursor-pointer"
                    size="lg"
                >
                    <Trash2 className="w-4 h-4 shrink-0" /> Delete Album
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default ArtistDeleteAlbumForm
