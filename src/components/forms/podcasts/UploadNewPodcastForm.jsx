"use client"

import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2, Clock, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonImageUpload from "@/components/shared/CommonInputs/CommonImageUpload/CommonImageUpload"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonCalender from "@/components/shared/CommonInputs/CommonInput/CommonCalender"
import CommonSelectCards from "@/components/shared/CommonInputs/CommonInput/CommonSelectCards"
import { useCreatePodcast } from "@/hooks/api/admin/podcasts/useCreatePodcast"
import { useCategories } from "@/hooks/api/admin/categories/useCategories"
import { TAXONOMY_OPTIONS_PARAMS } from "@/lib/constants/taxonomyOptions"
import { podcastCreateSchema } from "./adminPodcastSchema"
import { buildPodcastFormData } from "./buildPodcastFormData"

const VISIBILITY_OPTIONS = [
    { value: "publish", label: "Publish Now", icon: CheckCircle2 },
    { value: "schedule", label: "Schedule", icon: Clock },
    { value: "draft", label: "Save as Draft", icon: FileText },
]

const UploadNewPodcastForm = ({ onSuccess, onCancel }) => {
    const [cover, setCover] = useState(null)
    const [coverError, setCoverError] = useState("")

    const { mutate: createPodcast, isPending } = useCreatePodcast()

    const categoriesQuery = useCategories(TAXONOMY_OPTIONS_PARAMS)
    const categoriesList = categoriesQuery?.data?.data ?? []
    const categoryOptions = categoriesList.map((category) => ({
        value: category?._id,
        label: category?.name || "Unnamed Category",
    }))

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(podcastCreateSchema),
        defaultValues: {
            title: "",
            description: "",
            language: "English",
            category: "",
            visibility: "publish",
            scheduledAt: undefined,
        },
    })

    const visibility = watch("visibility")

    const onSubmit = (data) => {
        if (!(cover instanceof File)) {
            setCoverError("Cover image is required")
            return
        }
        setCoverError("")

        const formData = buildPodcastFormData({ ...data, cover })

        createPodcast(formData, {
            onSuccess: () => {
                reset()
                setCover(null)
                onSuccess?.()
            },
        })
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            <CommonImageUpload
                value={cover}
                onChange={setCover}
                error={coverError}
            />

            <CommonInput
                label="Podcast Title"
                placeholder="Enter podcast title..."
                {...register("title")}
                error={errors.title?.message}
            />

            <CommonInput
                label="Description"
                type="textarea"
                placeholder="Podcast description..."
                {...register("description")}
                error={errors.description?.message}
            />

            <CommonInput
                label="Language"
                placeholder="e.g. English"
                {...register("language")}
                error={errors.language?.message}
            />

            <Controller
                name="category"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        label="Category"
                        placeholder="Select category"
                        value={field.value}
                        onChange={field.onChange}
                        options={categoryOptions}
                        error={errors.category?.message}
                    />
                )}
            />

            <Controller
                name="visibility"
                control={control}
                render={({ field }) => (
                    <CommonSelectCards
                        label="Visibility"
                        value={field.value}
                        onChange={field.onChange}
                        options={VISIBILITY_OPTIONS}
                        error={errors.visibility?.message}
                    />
                )}
            />

            {visibility === "schedule" && (
                <Controller
                    name="scheduledAt"
                    control={control}
                    render={({ field }) => (
                        <CommonCalender
                            label="Scheduled Date"
                            placeholder="Choose Date"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.scheduledAt?.message}
                        />
                    )}
                />
            )}

            {/* Footer Actions */}
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
                    variant="gradient"
                    className="flex-1"
                    size="lg"
                    isLoading={isPending}
                >
                    Create Podcast
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default UploadNewPodcastForm
