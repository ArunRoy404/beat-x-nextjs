"use client"

import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
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
import { Plus, Tag } from "lucide-react"
import { toast } from "sonner"
import { useAdminDashboardGenreStore } from "@/zustandStore/admin/adminStore/adminDashboardGenreStore"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"

const genreSchema = z.object({
    name: z.string().min(1, "Genre name is required"),
    type: z.string().min(1, "Content type is required"),
})

const AddGenreDialog = () => {
    const [open, setOpen] = useState(false)
    const addGenre = useAdminDashboardGenreStore((state) => state.addGenre)

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(genreSchema),
        defaultValues: {
            name: "",
            type: "",
        },
    })

    const onSubmit = (data) => {
        addGenre({
            name: data.name,
            type: data.type,
        })
        toast.success("Genre added successfully!")
        reset()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) reset(); }}>
            <DialogTrigger asChild>
                <Button className='py-4!'>
                    <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
                    Add Genre
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[12px] bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary shrink-0">
                            <Tag className="w-5 h-5" />
                        </div>
                        <span className="text-[20px] font-semibold leading-none">Add New Genre</span>
                    </DialogTitle>
                </DialogHeader>

                <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
                    <CommonInput
                        label="Genre Name"
                        placeholder="Enter genre name"
                        className="rounded-[16px]!"
                        {...register("name")}
                        error={errors.name?.message}
                    />

                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <CommonSelect
                                label="Content Type"
                                placeholder="Select content type"
                                className="rounded-[16px]!"
                                value={field.value}
                                onChange={field.onChange}
                                options={["Music", "Podcast", "Audiobook"]}
                                error={errors.type?.message}
                            />
                        )}
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
                            className="flex-1 rounded-full bg-secondary hover:bg-secondary/90 text-black font-semibold flex items-center justify-center gap-2 border-0"
                            size="lg"
                        >
                            Create
                        </Button>
                    </div>
                </CommonFormContainer>
            </DialogContent>
        </Dialog>
    )
}

export default AddGenreDialog
