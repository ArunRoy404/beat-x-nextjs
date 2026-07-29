"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { CheckCircle2, Clock, FileText } from "lucide-react"
import { toast } from "sonner"
import { useAdminDashboardAudioBooksStore } from "@/zustandStore/admin/adminStore/adminDashboardAudioBooksStore"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonImageUpload from "@/components/shared/CommonInputs/CommonImageUpload/CommonImageUpload"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonSelectCards from "@/components/shared/CommonInputs/CommonInput/CommonSelectCards"
import CommonInputContainer from "@/components/shared/CommonInputs/CommonInput/CommonInputContainer"

const editAudioBookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    artist: z.string().min(1, "Author is required"),
    narrator: z.string().min(1, "Narrator is required"),
    category: z.string().min(1, "Genre is required"),
    language: z.string().min(1, "Language is required"),
    synopsis: z.string().min(1, "Synopsis is required"),
    coverImage: z.any().optional(),
    visibility: z.string().default("publish")
})

const GENRES = ["Biography", "Fiction", "Self-Help"]
const LANGUAGES = ["Bengali", "English", "Spanish"]

const VISIBILITY_OPTIONS = [
    { value: "publish", label: "Publish Now", icon: CheckCircle2 },
    { value: "schedule", label: "Schedule", icon: Clock },
    { value: "draft", label: "Save as Draft", icon: FileText },
]

const EditAudioBookForm = ({ book, onSuccess, onCancel }) => {
    const updateAudioBook = useAdminDashboardAudioBooksStore((state) => state.updateAudioBook)

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(editAudioBookSchema),
        defaultValues: {
            title: book?.title || "",
            artist: book?.artist || "",
            narrator: book?.narrator || "",
            category: book?.category || "",
            language: book?.language || "",
            synopsis: book?.synopsis || "",
            coverImage: book?.cover || null,
            visibility: book?.status === "Published" 
                ? "publish" 
                : book?.status === "Scheduled" 
                  ? "schedule" 
                  : "draft",
        },
    })

    const onSubmit = (data) => {
        const updatedStatus = data.visibility === "publish" 
            ? "Published" 
            : data.visibility === "schedule" 
              ? "Scheduled" 
              : "Draft"

        updateAudioBook(book.id, {
            title: data.title,
            artist: data.artist,
            narrator: data.narrator,
            category: data.category,
            language: data.language,
            synopsis: data.synopsis,
            status: updatedStatus,
            cover: typeof data.coverImage === "string" ? data.coverImage : "/audioBookImages/projectHill.png"
        })

        toast.success("Audiobook updated successfully!")
        onSuccess?.()
    }

    const onInvalid = (validationErrors) => {
        const errorKeys = Object.keys(validationErrors)
        if (errorKeys.length > 0) {
            toast.error(validationErrors[errorKeys[0]].message)
        }
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit, onInvalid)}>
            
            {/* Cover Upload and Inputs Side by Side */}
            <div className="flex flex-col sm:flex-row gap-5 items-stretch">
                
                {/* Left side Cover Upload */}
                <div className="w-36 h-36 sm:w-44 shrink-0 flex flex-col justify-between">
                    <Controller
                        name="coverImage"
                        control={control}
                        render={({ field }) => (
                            <CommonImageUpload
                                value={field.value}
                                onChange={(file) => setValue("coverImage", file, { shouldValidate: true })}
                                error={errors.coverImage?.message}
                                className="h-full min-h-[144px]"
                            />
                        )}
                    />
                </div>

                {/* Right side Text Inputs */}
                <div className="flex-1 w-full flex flex-col gap-3 justify-between">
                    <CommonInput
                        label="Audiobook Title *"
                        placeholder="Enter audiobook title..."
                        {...register("title")}
                        error={errors.title?.message}
                    />
                    <CommonInput
                        label="Author *"
                        placeholder="Enter author..."
                        {...register("artist")}
                        error={errors.artist?.message}
                    />
                    <CommonInput
                        label="Narrator *"
                        placeholder="Enter narrator..."
                        {...register("narrator")}
                        error={errors.narrator?.message}
                    />
                </div>
            </div>

            {/* Dropdowns Row */}
            <CommonInputContainer>
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <CommonSelect
                            label="Genre *"
                            placeholder="Choose Genre"
                            value={field.value}
                            onChange={field.onChange}
                            options={GENRES}
                            error={errors.category?.message}
                        />
                    )}
                />

                <Controller
                    name="language"
                    control={control}
                    render={({ field }) => (
                        <CommonSelect
                            label="Language *"
                            placeholder="Choose Language"
                            value={field.value}
                            onChange={field.onChange}
                            options={LANGUAGES}
                            error={errors.language?.message}
                        />
                    )}
                />
            </CommonInputContainer>

            {/* Synopsis TextArea */}
            <CommonInput
                label="Synopsis *"
                type="textarea"
                placeholder="Enter description..."
                {...register("synopsis")}
                error={errors.synopsis?.message}
                rows={4}
            />

            {/* Visibility Selector */}
            <Controller
                name="visibility"
                control={control}
                render={({ field }) => (
                    <CommonSelectCards
                        label="Visibility"
                        options={VISIBILITY_OPTIONS}
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />

            {/* Dialog Footer Actions */}
            <div className="flex items-center gap-4 mt-4 shrink-0">
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
                    className="flex-1 rounded-full bg-gradient-to-r from-secondary to-[#B1FE4D] text-button-text font-semibold hover:opacity-90 border-0"
                    size="lg"
                >
                    Update Audiobook
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default EditAudioBookForm
