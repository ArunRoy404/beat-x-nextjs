"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"

const inviteSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
})

const InviteUserForm = ({ onCancel }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(inviteSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    })

    // No invite/create endpoint exists yet — wire this to a real mutation once one does.
    const onSubmit = () => {
        toast.warning("Inviting users isn't connected to an API yet.")
        reset()
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="flex flex-col gap-2 shrink-0">
                <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                    Name
                </label>
                <CommonInput
                    placeholder="Full name"
                    className="rounded-full bg-white/[0.03] border-white/10"
                    {...register("name")}
                    error={errors.name?.message}
                />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2 shrink-0">
                <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                    Email
                </label>
                <CommonInput
                    placeholder="artist@example.com"
                    className="rounded-full bg-white/[0.03] border-white/10"
                    {...register("email")}
                    error={errors.email?.message}
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
                    Invite User
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default InviteUserForm
