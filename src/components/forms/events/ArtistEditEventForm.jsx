"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editEventSchema } from "@/zodSchema/UploadNewEventZodSchema"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { CheckCircle2, Clock, FileText } from "lucide-react"
import { toast } from "sonner"
import { useArtistEventsStore } from "@/zustandStore/artist/artistStore/artistEventsStore"
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

const ArtistEditEventForm = ({ event, onSuccess, onCancel }) => {
    const updateEvent = useArtistEventsStore((state) => state.updateEvent)

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(editEventSchema),
        defaultValues: {
            coverImage: event?.cover || null,
            eventTitle: event?.title || "",
            venue: event?.venue || "",
            city: event?.city || "",
            eventDate: event?.eventDate && event.eventDate !== "-" ? new Date(event.eventDate) : null,
            eventTime: event?.eventTime || "",
            ticketPrice: event?.ticketPrice ? String(event.ticketPrice) : "",
            totalTickets: event?.totalTickets ? String(event.totalTickets) : "",
            description: event?.description || "",
            visibility: event?.status === "Draft" ? "draft" : "publish",
        },
    })

    const onSubmit = (data) => {
        updateEvent(event.id, data)
        toast.success("Event updated successfully!")
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
                >
                    Submit for Review
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default ArtistEditEventForm
