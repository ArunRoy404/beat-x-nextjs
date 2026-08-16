"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useCreateGenre } from "@/hooks/api/admin/genre/useCreateGenre"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"

const genreSchema = z.object({
    name: z.string().min(1, "Genre name is required"),
})

const AddGenreForm = ({ onSuccess, onCancel }) => {
    const { mutate: createGenre, isPending } = useCreateGenre()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(genreSchema),
        defaultValues: {
            name: "",
        },
    })

    const onSubmit = (data) => {
        createGenre(
            { name: data.name },
            {
                onSuccess: () => {
                    toast.success("Genre added successfully!")
                    reset()
                    onSuccess?.()
                },
                onError: (error) => {
                    toast.error(error?.message || "Failed to add genre.")
                },
            }
        )
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            {/* Info banner */}
            <div className="border border-dashed border-[#A175FF]/30 bg-[#A175FF]/5 rounded-[12px] p-4 text-center shrink-0">
                <p className="text-[#A175FF] text-[12px] font-normal leading-[18px]">
                    New genres appear in all relevant upload forms across the platform immediately after saving.
                </p>
            </div>

            {/* Genre Name Input */}
            <div className="flex flex-col gap-2 shrink-0">
                <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                    Genre Name
                </label>
                <CommonInput
                    placeholder="e.g. POP"
                    className="rounded-full bg-white/[0.03] border-white/10"
                    {...register("name")}
                    error={errors.name?.message}
                />
            </div>

            {/* Dialog Footer Actions */}
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
                    type="submit"
                    variant="gradient"
                    className="flex-1 h-[52px]!"
                    size="lg"
                    isLoading={isPending}
                >
                    Add Genre
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default AddGenreForm
