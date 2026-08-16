"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useUpdateGenre } from "@/hooks/api/admin/genre/useUpdateGenre"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"

const genreSchema = z.object({
    name: z.string().min(1, "Genre name is required"),
})

const EditGenreForm = ({ genre, onSuccess, onCancel }) => {
    const { mutate: updateGenre, isPending } = useUpdateGenre()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(genreSchema),
        defaultValues: {
            name: genre?.name || "",
        },
    })

    // Update form when genre prop changes
    React.useEffect(() => {
        if (genre) {
            reset({ name: genre.name })
        }
    }, [genre, reset])

    const onSubmit = (data) => {
        updateGenre(
            { id: genre._id, name: data.name },
            {
                onSuccess: () => {
                    toast.success("Genre updated successfully!")
                    onSuccess?.()
                },
                onError: (error) => {
                    toast.error(error?.message || "Failed to update genre.")
                },
            }
        )
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
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
                    Save Changes
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default EditGenreForm
