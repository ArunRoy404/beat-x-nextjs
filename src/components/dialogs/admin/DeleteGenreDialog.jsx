"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2, Lock } from "lucide-react"
import { toast } from "sonner"
import { useAdminDashboardGenreStore } from "@/zustandStore/admin/adminStore/adminDashboardGenreStore"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"

const deleteSchema = z.object({
    password: z.string().min(1, "Password is required"),
})

const DeleteGenreDialog = ({ genre, children }) => {
    const [open, setOpen] = useState(false)
    const deleteGenre = useAdminDashboardGenreStore((state) => state.deleteGenre)

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
        deleteGenre(genre.id)
        toast.success("Genre deleted successfully!")
        setOpen(false)
        reset()
    }

    return (
        <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) reset(); }}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[12px] bg-red-error/10 border border-red-error/25 flex items-center justify-center text-red-error shrink-0">
                            <Trash2 className="w-5 h-5" />
                        </div>
                        <span className="text-[20px] font-semibold leading-none">Confirm Deletion</span>
                    </DialogTitle>
                </DialogHeader>

                <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <p className="text-light-whitetext text-[14px] not-italic font-normal leading-[22px] font-sans">
                            You are about to permanently delete the genre <strong className="text-whitetext">"{genre?.name}"</strong>. This action cannot be undone.
                        </p>
                        <p className="text-light-whitetext text-[14px] not-italic font-normal leading-[22px] font-sans">
                            Enter the password to proceed.
                        </p>
                    </div>

                    <CommonInput
                        label="Password"
                        type="password"
                        placeholder="Enter deletion password"
                        className="rounded-[16px]!"
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
                                onClick={() => setOpen(false)}
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
            </DialogContent>
        </Dialog>
    )
}

export default DeleteGenreDialog
