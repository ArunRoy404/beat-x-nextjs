"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useAdminDashboardUsersStore } from "@/zustandStore/admin/adminStore/adminDashboardUsersStore"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"

const inviteSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    role: z.string().min(1, "Role is required"),
    plan: z.string().min(1, "Plan is required"),
})

const InviteUserForm = ({ onSuccess, onCancel }) => {
    const addUser = useAdminDashboardUsersStore((state) => state.addUser)

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
            role: "",
            plan: "",
        },
    })

    const onSubmit = (data) => {
        // Generate a readable name from the email
        const emailPrefix = data.email.split("@")[0]
        const generatedName = emailPrefix
            .split(/[-._]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")

        addUser({
            name: generatedName,
            email: data.email,
            role: data.role,
            plan: data.plan,
            status: "Active",
        })
        toast.success("User invited successfully!")
        reset()
        onSuccess?.()
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
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

            {/* Role & Initial Plan Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
                {/* Role */}
                <div className="flex flex-col gap-2 shrink-0">
                    <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                        Role
                    </label>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <CommonSelect
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Select Role"
                                options={["User", "Admin"]}
                                error={errors.role?.message}
                            />
                        )}
                    />
                </div>

                {/* Plan */}
                <div className="flex flex-col gap-2 shrink-0">
                    <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                        Initial Plan
                    </label>
                    <Controller
                        name="plan"
                        control={control}
                        render={({ field }) => (
                            <CommonSelect
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Select plan"
                                options={["Free", "Premium", "Family", "Student"]}
                                error={errors.plan?.message}
                            />
                        )}
                    />
                </div>
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
