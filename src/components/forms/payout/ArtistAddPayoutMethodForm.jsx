"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { toast } from "sonner"
import { useArtistPayoutStore } from "@/zustandStore/artist/artistStore/artistPayoutStore"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"

const PROVIDERS = ["Bkash", "Nagad", "Rocket", "Upay"]

const addMethodSchema = z.object({
    provider: z.string().min(1, "Provider is required"),
    number: z.string().min(1, "Mobile/Account number is required"),
    accountName: z.string().min(1, "Account name is required"),
})

const ArtistAddPayoutMethodForm = ({ onSuccess, onCancel }) => {
    const addPayoutMethod = useArtistPayoutStore((state) => state.addPayoutMethod)

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(addMethodSchema),
        defaultValues: {
            provider: "Bkash",
            number: "",
            accountName: "",
        },
    })

    const onSubmit = (data) => {
        addPayoutMethod(data)
        toast.success("Payout method added successfully!")
        reset()
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
            {/* Provider */}
            <Controller
                name="provider"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        label="Provider"
                        placeholder="Select provider"
                        value={field.value}
                        onChange={field.onChange}
                        options={PROVIDERS}
                        error={errors.provider?.message}
                    />
                )}
            />

            {/* Mobile / Account Number */}
            <CommonInput
                label="Mobile Number / Account Number"
                placeholder="017**********"
                {...register("number")}
                error={errors.number?.message}
            />

            {/* Account Name */}
            <CommonInput
                label="Account Name"
                placeholder="As registered with provider"
                {...register("accountName")}
                error={errors.accountName?.message}
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
                    Add Method
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default ArtistAddPayoutMethodForm
