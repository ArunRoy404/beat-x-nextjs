"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useAdminDashboardAlbumsStore } from "@/zustandStore/admin/adminStore/adminDashboardAlbumsStore"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"

const albumSchema = z.object({
    name: z.string().min(1, "Album Name is required"),
    artist: z.string().min(1, "Artist Name is required"),
    genre: z.string().min(1, "Genre is required"),
    status: z.string().min(1, "Status is required"),
    description: z.string().optional(),
})

const CreateAlbumForm = ({ onSuccess, onCancel }) => {
    const addAlbum = useAdminDashboardAlbumsStore((state) => state.addAlbum)

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(albumSchema),
        defaultValues: {
            name: "",
            artist: "",
            genre: "",
            status: "Under Review",
            description: "",
        },
    })

    const onSubmit = (data) => {
        addAlbum({
            name: data.name,
            artist: data.artist,
            genre: data.genre,
            status: data.status,
            description: data.description,
        })
        toast.success("Album created successfully!")
        reset()
        onSuccess?.()
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            {/* Album Name */}
            <div className="flex flex-col gap-2 shrink-0">
                <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                    Album Name
                </label>
                <CommonInput
                    placeholder="e.g. Asha"
                    className="rounded-full bg-white/[0.03] border-white/10"
                    {...register("name")}
                    error={errors.name?.message}
                />
            </div>

            {/* Artist Name */}
            <div className="flex flex-col gap-2 shrink-0">
                <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                    Artist Name
                </label>
                <CommonInput
                    placeholder="e.g. Tahsin"
                    className="rounded-full bg-white/[0.03] border-white/10"
                    {...register("artist")}
                    error={errors.artist?.message}
                />
            </div>

            {/* Genre & Status row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
                {/* Genre */}
                <div className="flex flex-col gap-2 shrink-0">
                    <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                        Genre
                    </label>
                    <Controller
                        name="genre"
                        control={control}
                        render={({ field }) => (
                            <CommonSelect
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Select Genre"
                                options={["Pop", "Hip Hop", "Electronic", "Rock", "R&B", "Jazz"]}
                                error={errors.genre?.message}
                            />
                        )}
                    />
                </div>

                {/* Status */}
                <div className="flex flex-col gap-2 shrink-0">
                    <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                        Status
                    </label>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <CommonSelect
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Select Status"
                                options={["Published", "Under Review", "Scheduled", "Rejected"]}
                                error={errors.status?.message}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2 shrink-0">
                <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                    Description
                </label>
                <textarea
                    placeholder="Album description..."
                    rows={3}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-[12px] p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-secondary/50 placeholder-white/20 resize-none font-sans"
                    {...register("description")}
                />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center gap-4 mt-6 shrink-0">
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
                    className="flex-1 h-[52px]! rounded-full font-semibold"
                    size="lg"
                >
                    Create Album
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default CreateAlbumForm
