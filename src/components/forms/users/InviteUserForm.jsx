"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import { useInviteUser } from "@/hooks/api/admin/users/useInviteUser"

const ROLE_OPTIONS = [
    { value: "admin", label: "Admin" },
    { value: "developer", label: "Developer" },
]

const inviteSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    role: z.enum(["admin", "developer"], { required_error: "Role is required" }),
})

const InviteUserForm = ({ onSuccess, onCancel }) => {
    const { mutate: inviteUser, isPending } = useInviteUser()

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(inviteSchema),
        defaultValues: {
            email: "",
            role: "admin",
        },
    })

    const onSubmit = (data) => {
        inviteUser(data, {
            onSuccess: () => {
                reset()
                onSuccess?.()
            },
        })
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            {/* Email Address */}
            <div className="flex flex-col gap-2 shrink-0">
                <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                    Email
                </label>
                <CommonInput
                    placeholder="staff@example.com"
                    className="rounded-full bg-white/[0.03] border-white/10"
                    {...register("email")}
                    error={errors.email?.message}
                />
            </div>

            {/* Role */}
            <Controller
                name="role"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        label="Role"
                        placeholder="Select role"
                        value={field.value}
                        onChange={field.onChange}
                        options={ROLE_OPTIONS}
                        error={errors.role?.message}
                    />
                )}
            />

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
                    isLoading={isPending}
                >
                    Send Invite
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default InviteUserForm
