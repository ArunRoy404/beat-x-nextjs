"use client"

import React, { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editEventSchema } from "@/zodSchema/UploadNewEventZodSchema"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { CheckCircle2, Clock, FileText } from "lucide-react"
import { toast } from "sonner"
import { useUpdateEvent } from "@/hooks/api/admin/events/useUpdateEvent"
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

const EditEventForm = ({ event, onSuccess, onCancel }) => {
    const updateEventMutation = useUpdateEvent()

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(editEventSchema),
        defaultValues: {
            coverImage: event?.coverUrl || event?.cover || null,
            eventTitle: event?.title || "",
            venue: event?.venue || "",
            city: event?.city || "",
            eventDate: event?.eventDate && event.eventDate !== "-" ? new Date(event.eventDate) : null,
            eventTime: event?.eventTime || "",
            ticketPrice: event?.ticketPrice !== undefined ? String(event.ticketPrice) : "",
            totalTickets: event?.totalTickets !== undefined ? String(event.totalTickets) : "",
            description: event?.description || "",
            visibility: event?.status === "draft" || event?.status === "Draft" ? "draft" : "publish",
        },
    })

    useEffect(() => {
        if (event) {
            reset({
                coverImage: event?.coverUrl || event?.cover || null,
                eventTitle: event?.title || "",
                venue: event?.venue || "",
                city: event?.city || "",
                eventDate: event?.eventDate && event.eventDate !== "-" ? new Date(event.eventDate) : null,
                eventTime: event?.eventTime || "",
                ticketPrice: event?.ticketPrice !== undefined ? String(event.ticketPrice) : "",
                totalTickets: event?.totalTickets !== undefined ? String(event.totalTickets) : "",
                description: event?.description || "",
                visibility: event?.status === "draft" || event?.status === "Draft" ? "draft" : "publish",
            })
        }
    }, [event, reset])

    const onSubmit = async (data) => {
        const eventId = event?._id || event?.id
        if (!eventId) {
            toast.error("Invalid Event ID")
            return
        }

        const isNewFile = data.coverImage && (data.coverImage instanceof File || data.coverImage instanceof Blob)

        let payload
        const isoDate = data.eventDate
            ? (data.eventDate instanceof Date ? data.eventDate.toISOString() : new Date(data.eventDate).toISOString())
            : undefined

        const statusVal = data.status || (data.visibility === "publish" ? "active" : data.visibility || "active")

        if (isNewFile) {
            const formData = new FormData()
            if (data.eventTitle) formData.append("title", data.eventTitle)
            if (data.venue) formData.append("venue", data.venue)
            if (data.city) formData.append("city", data.city)
            if (isoDate) formData.append("eventDate", isoDate)
            if (data.eventTime) formData.append("eventTime", data.eventTime)
            if (data.ticketPrice !== undefined && data.ticketPrice !== "") formData.append("ticketPrice", String(data.ticketPrice))
            if (data.totalTickets !== undefined && data.totalTickets !== "") formData.append("totalTickets", String(data.totalTickets))
            if (data.description) formData.append("description", data.description)
            formData.append("status", statusVal)
            if (data.ownerId) formData.append("ownerId", data.ownerId)
            formData.append("cover", data.coverImage)

            payload = formData
        } else {
            payload = {
                title: data.eventTitle,
                venue: data.venue,
                city: data.city,
                eventDate: isoDate,
                eventTime: data.eventTime,
                ticketPrice: data.ticketPrice ? Number(data.ticketPrice) : 0,
                totalTickets: data.totalTickets ? Number(data.totalTickets) : 0,
                description: data.description,
                status: statusVal,
            }
            if (data.ownerId) payload.ownerId = data.ownerId
        }

        try {
            await updateEventMutation.mutateAsync({ eventId, data: payload })
            toast.success("Event updated successfully!")
            onSuccess?.()
        } catch (err) {
            toast.error(err?.response?.data?.message || err?.message || "Failed to update event")
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
                    disabled={updateEventMutation.isPending}
                >
                    {updateEventMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default EditEventForm
