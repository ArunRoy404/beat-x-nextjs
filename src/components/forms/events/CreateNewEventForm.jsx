"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { uploadEventSchema, uploadEventDefaultValues } from "@/zodSchema/UploadNewEventZodSchema"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { CheckCircle2, Clock, FileText } from "lucide-react"
import { toast } from "sonner"
import { useCreateEvent } from "@/hooks/api/admin/events/useCreateEvent"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonImageUpload from "@/components/shared/CommonInputs/CommonImageUpload/CommonImageUpload"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonCalender from "@/components/shared/CommonInputs/CommonInput/CommonCalender"
import CommonSelectCards from "@/components/shared/CommonInputs/CommonInput/CommonSelectCards"
import CommonInputContainer from "@/components/shared/CommonInputs/CommonInput/CommonInputContainer"

const VISIBILITY_OPTIONS = [
    { value: "publish", label: "Publish Now", icon: CheckCircle2 },
    { value: "schedule", label: "Schedule", icon: Clock },
    { value: "draft", label: "Save as Draft", icon: FileText },
]

const CreateNewEventForm = ({ onSuccess, onCancel }) => {
    const createEventMutation = useCreateEvent()

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(uploadEventSchema),
        defaultValues: uploadEventDefaultValues,
    })

    const onSubmit = async (data) => {
        const formData = new FormData()
        if (data.eventTitle) formData.append("title", data.eventTitle)
        if (data.venue) formData.append("venue", data.venue)
        if (data.city) formData.append("city", data.city)
        if (data.eventDate) {
            const d = data.eventDate instanceof Date ? data.eventDate : new Date(data.eventDate)
            formData.append("eventDate", !isNaN(d.getTime()) ? d.toISOString() : data.eventDate)
        }
        if (data.eventTime) formData.append("eventTime", data.eventTime)
        if (data.ticketPrice !== undefined && data.ticketPrice !== "") formData.append("ticketPrice", String(data.ticketPrice))
        if (data.totalTickets !== undefined && data.totalTickets !== "") formData.append("totalTickets", String(data.totalTickets))
        if (data.description) formData.append("description", data.description)

        const statusVal = data.status || (data.visibility === "publish" ? "active" : data.visibility || "active")
        formData.append("status", statusVal)
        if (data.ownerId) formData.append("ownerId", data.ownerId)

        if (data.coverImage && (data.coverImage instanceof File || data.coverImage instanceof Blob)) {
            formData.append("cover", data.coverImage)
        }

        try {
            await createEventMutation.mutateAsync(formData)
            toast.success("Event created successfully!")
            reset()
            onSuccess?.()
        } catch (err) {
            toast.error(err?.response?.data?.message || err?.message || "Failed to create event")
        }
    }

    const onInvalid = (validationErrors) => {
        const errorKeys = Object.keys(validationErrors)
        if (errorKeys.length > 0) {
            toast.error(validationErrors[errorKeys[0]].message)
        }
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit, onInvalid)}>
            {/* Cover Image Upload */}
            <Controller
                name="coverImage"
                control={control}
                render={({ field }) => (
                    <CommonImageUpload
                        value={field.value}
                        onChange={(file) => setValue("coverImage", file, { shouldValidate: true })}
                        error={errors.coverImage?.message}
                    />
                )}
            />

            {/* Event Title */}
            <CommonInput
                label="Event Title"
                placeholder="e.g. TAHSIN Live in Dhaka 2024"
                {...register("eventTitle")}
                error={errors.eventTitle?.message}
            />

            {/* Venue & City */}
            <CommonInputContainer>
                <CommonInput
                    label="Venue"
                    placeholder="Full venue name"
                    {...register("venue")}
                    error={errors.venue?.message}
                />

                <CommonInput
                    label="City"
                    placeholder="Dhaka"
                    {...register("city")}
                    error={errors.city?.message}
                />
            </CommonInputContainer>

            {/* Event Date & Time */}
            <CommonInputContainer>
                <Controller
                    name="eventDate"
                    control={control}
                    render={({ field }) => (
                        <CommonCalender
                            label="Event Date"
                            placeholder="Choose Date"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.eventDate?.message}
                        />
                    )}
                />

                <CommonInput
                    label="Event Time"
                    type="time"
                    {...register("eventTime")}
                    error={errors.eventTime?.message}
                />
            </CommonInputContainer>

            {/* Ticket Price & Total Tickets */}
            <CommonInputContainer>
                <CommonInput
                    label="Ticket Price (BDT)"
                    type="number"
                    placeholder="1000"
                    {...register("ticketPrice")}
                    error={errors.ticketPrice?.message}
                />

                <CommonInput
                    label="Total Tickets"
                    type="number"
                    placeholder="5000"
                    {...register("totalTickets")}
                    error={errors.totalTickets?.message}
                />
            </CommonInputContainer>

            {/* Description */}
            <CommonInput
                label="Description"
                type="textarea"
                placeholder="Episode description / show notes..."
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
                    disabled={createEventMutation.isPending}
                >
                    {createEventMutation.isPending ? "Creating..." : "Create Events"}
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default CreateNewEventForm
