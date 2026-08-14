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

const requestPayoutSchema = z.object({
    amount: z.string().min(1, "Amount is required"),
    method: z.string().min(1, "Method is required"),
})

const ArtistRequestPayoutForm = ({ onSuccess, onCancel }) => {
    const balance = useArtistPayoutStore((state) => state.payoutBalance)
    const methods = useArtistPayoutStore((state) => state.payoutMethods)
    const requestPayout = useArtistPayoutStore((state) => state.requestPayout)

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(requestPayoutSchema),
        defaultValues: {
            amount: "",
            method: methods[0]?.provider || "",
        },
    })

    const onSubmit = (data) => {
        const amount = Number(data.amount)

        if (amount < balance.minWithdrawal) {
            toast.error(`Minimum withdrawal is ৳${balance.minWithdrawal}`)
            return
        }
        if (amount > balance.available) {
            toast.error("Amount exceeds available balance")
            return
        }

        requestPayout(data)
        toast.success("Payout requested successfully!")
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
            {/* Available Balance Preview */}
            <div
                className="flex flex-col items-center justify-center gap-1.5 p-5 rounded-[16px] border text-center"
                style={{ background: "var(--payout-balance-bg)", borderColor: "var(--payout-balance-border)" }}
            >
                <span className="text-light-gray text-[12px] font-normal not-italic">
                    Available Balance
                </span>
                <span className="text-green-success text-[32px] font-black not-italic leading-none">
                    ৳{balance.available.toLocaleString()}
                </span>
            </div>

            {/* Amount */}
            <CommonInput
                label="Amount (BDT)"
                type="number"
                placeholder="e.g. 5000"
                {...register("amount")}
                error={errors.amount?.message}
            />

            {/* Method */}
            <Controller
                name="method"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        label="Method"
                        placeholder="Select method"
                        value={field.value}
                        onChange={field.onChange}
                        options={methods.map((m) => ({ value: m.provider, label: m.provider }))}
                        error={errors.method?.message}
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
                    Request Payout
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default ArtistRequestPayoutForm
