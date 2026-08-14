"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Trash2, Lock } from "lucide-react"
import { toast } from "sonner"
import { useAdminDashboardMusicStore } from "@/zustandStore/admin/adminStore/adminDashboardMusicStore"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"

const deleteSchema = z.object({
    password: z.string().min(1, "Password is required"),
})

const DeleteSongForm = ({ song, onSuccess, onCancel }) => {
    const deleteSong = useAdminDashboardMusicStore((state) => state.deleteSong)

    const {
        register,
        handleSubmit,
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
        deleteSong(song.id)
        toast.success("Song deleted successfully!")
        onSuccess?.()
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
                <p className="text-light-whitetext text-[14px] not-italic font-normal leading-[22px] font-sans">
                    You are about to permanently delete this Song. This action cannot be undone.
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
                    type="submit"
                    className="flex-1 rounded-full bg-red-error hover:bg-red-error/90 text-white flex items-center justify-center gap-2 border-0"
                    size="lg"
                >
                    <Trash2 className="w-4 h-4" /> Delete
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default DeleteSongForm
