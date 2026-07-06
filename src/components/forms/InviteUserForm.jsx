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
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    role: z.string().min(1, "Role is required"),
    plan: z.string().min(1, "Plan is required"),
    status: z.string().min(1, "Status is required"),
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
            name: "",
            email: "",
            role: "User",
            plan: "Premium",
            status: "Active",
        },
    })

    const onSubmit = (data) => {
        addUser({
            name: data.name,
            email: data.email,
            role: data.role,
            plan: data.plan,
            status: data.status,
        })
        toast.success("User invited successfully!")
        reset()
        onSuccess?.()
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            {/* User Name */}
            <div className="flex flex-col gap-2 shrink-0">
                <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                    Full Name
                </label>
                <CommonInput
                    placeholder="e.g. John Doe"
                    className="rounded-full bg-white/[0.03] border-white/10"
                    {...register("name")}
                    error={errors.name?.message}
                />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 shrink-0">
                <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                    Email Address
                </label>
                <CommonInput
                    placeholder="e.g. john@example.com"
                    className="rounded-full bg-white/[0.03] border-white/10"
                    {...register("email")}
                    error={errors.email?.message}
                />
            </div>

            {/* Role, Plan, Status in a row/grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                                placeholder="Select role"
                                options={["User", "Admin"]}
                                error={errors.role?.message}
                            />
                        )}
                    />
                </div>

                {/* Plan */}
                <div className="flex flex-col gap-2 shrink-0">
                    <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                        Plan
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

                {/* Status */}
                <div className="flex flex-col gap-2 shrink-0">
                    <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                        Status
                    </label>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <CommonSelect
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Select status"
                                options={["Active", "Pending"]}
                                error={errors.status?.message}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center gap-4 mt-4 shrink-0">
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
                    className="flex-1 h-[52px]!"
                    size="lg"
                >
                    Invite User
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default InviteUserForm
