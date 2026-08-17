"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { CheckCircle2, Clock, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DialogClose } from "@/components/ui/dialog"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonCalender from "@/components/shared/CommonInputs/CommonInput/CommonCalender"
import CommonSelectCards from "@/components/shared/CommonInputs/CommonInput/CommonSelectCards"
import { useUpdatePodcast } from "@/hooks/api/admin/podcasts/useUpdatePodcast"
import { podcastModerationSchema } from "./adminPodcastSchema"

const VISIBILITY_OPTIONS = [
    { value: "publish", label: "Publish Now", icon: CheckCircle2 },
    { value: "schedule", label: "Schedule", icon: Clock },
    { value: "draft", label: "Save as Draft", icon: FileText },
]

const TREND_DIRECTION_OPTIONS = [
    { value: "up", label: "Up" },
    { value: "down", label: "Down" },
    { value: "stable", label: "Stable" },
]

const getDefaultVisibility = (podcast) => {
    if (podcast?.status === "active") return "publish"
    if (podcast?.status === "scheduled") return "schedule"
    return "draft"
}

const EditPodcastForm = ({ podcast, onSuccess, onCancel }) => {
    const { mutate: updatePodcast, isPending } = useUpdatePodcast()

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(podcastModerationSchema),
        defaultValues: {
            description: podcast?.description || "",
            visibility: getDefaultVisibility(podcast),
            scheduledAt: podcast?.scheduledAt ? new Date(podcast.scheduledAt) : undefined,
            isFeatured: podcast?.isFeatured || false,
            isTrending: podcast?.isTrending || false,
            trendDirection: podcast?.trendDirection || "stable",
        },
    })

    const visibility = watch("visibility")
    const isTrending = watch("isTrending")

    const onSubmit = (data) => {
        const body = {
            description: data.description,
            isFeatured: data.isFeatured,
            isTrending: data.isTrending,
            trendDirection: data.trendDirection,
        }

        // Editing shouldn't silently un-archive a taken-down podcast —
        // that's what the dedicated Restore action is for.
        body.status = podcast?.status === "archived" ? "archived" : (data.visibility === "publish" ? "active" : "draft")
        if (data.visibility === "schedule" && data.scheduledAt) {
            body.scheduledAt = data.scheduledAt.toISOString()
        }

        updatePodcast(
            { id: podcast._id, body },
            {
                onSuccess: () => {
                    toast.success("Podcast updated successfully!")
                    onSuccess?.()
                },
                onError: (error) => toast.error(error?.message || "Failed to update podcast."),
            }
        )
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            {/* Description */}
            <CommonInput
                label="Description"
                type="textarea"
                placeholder="Podcast description..."
                {...register("description")}
                error={errors.description?.message}
            />

            {/* Visibility Options */}
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

            {/* Featured Toggle */}
            <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                    <div className="flex items-center justify-between py-2 border-t border-white/5">
                        <span className="text-whitetext text-[13px] font-medium">Featured</span>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </div>
                )}
            />

            {/* Trending Toggle */}
            <Controller
                name="isTrending"
                control={control}
                render={({ field }) => (
                    <div className="flex items-center justify-between py-2 border-t border-b border-white/5">
                        <span className="text-whitetext text-[13px] font-medium">Trending</span>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </div>
                )}
            />

            {isTrending && (
                <Controller
                    name="trendDirection"
                    control={control}
                    render={({ field }) => (
                        <CommonSelect
                            label="Trend Direction"
                            value={field.value}
                            onChange={field.onChange}
                            options={TREND_DIRECTION_OPTIONS}
                            error={errors.trendDirection?.message}
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
                    Save Changes
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default EditPodcastForm
