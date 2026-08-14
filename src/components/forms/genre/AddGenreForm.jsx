"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useAdminDashboardGenreStore } from "@/zustandStore/admin/adminStore/adminDashboardGenreStore"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"

const genreSchema = z.object({
    name: z.string().min(1, "Genre name is required"),
    type: z.string().min(1, "Content type is required"),
})

const AddGenreForm = ({ onSuccess, onCancel }) => {
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
            type: "Music",
        },
    })

    const onSubmit = (data) => {
        addGenre({
            name: data.name,
            type: data.type,
        })
        toast.success("Genre added successfully!")
        reset()
        onSuccess?.()
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

            {/* Content Type Selector */}
            <Controller
                name="type"
                control={control}
                render={({ field }) => {
                    const OPTIONS = [
                        { id: "Music", label: "Music", countText: "15 genres", color: "#3ADFFA" },
                        { id: "Podcast", label: "Podcast", countText: "9 genres", color: "#CC97FF" },
                        { id: "Audiobook", label: "Audiobook", countText: "6 genres", color: "#E5F97D" }
                    ]
                    return (
                        <div className="flex flex-col gap-2 shrink-0">
                            <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                                Content Type
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {OPTIONS.map((opt) => {
                                    const isSelected = field.value === opt.id
                                    return (
                                        <div
                                            key={opt.id}
                                            onClick={() => field.onChange(opt.id)}
                                            className={cn(
                                                "h-[52px] px-3 sm:px-4 rounded-[12px] border flex items-center justify-between cursor-pointer transition-all duration-200 select-none",
                                                isSelected
                                                    ? "bg-[#0E0E0E]"
                                                    : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04]"
                                            )}
                                            style={{
                                                borderColor: isSelected ? opt.color : "rgba(255, 255, 255, 0.1)",
                                            }}
                                        >
                                            <span
                                                className="text-[13px] sm:text-[14px] font-medium"
                                                style={{ color: opt.color }}
                                            >
                                                {opt.label}
                                            </span>
                                            <span
                                                className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-semibold whitespace-nowrap shrink-0"
                                                style={{
                                                    color: opt.color,
                                                    backgroundColor: `${opt.color}15`,
                                                    border: `1px solid ${opt.color}25`
                                                }}
                                            >
                                                {opt.countText}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                            {errors.type?.message && (
                                <span className="text-red-500 text-xs mt-1">
                                    {errors.type.message}
                                </span>
                            )}
                        </div>
                    )
                }}
            />

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
                >
                    Add Genre
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default AddGenreForm
