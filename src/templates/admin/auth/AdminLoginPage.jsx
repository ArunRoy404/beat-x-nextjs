"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, Lock } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import AuthLayout from "@/components/shared/AuthLayout/AuthLayout"

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
})

const AdminLoginPage = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    const onSubmit = () => {
        toast.success("Logged in successfully!")
        router.push("/admin/dashboard")
    }

    const onInvalid = (validationErrors) => {
        const errorKeys = Object.keys(validationErrors)
        if (errorKeys.length > 0) {
            toast.error(validationErrors[errorKeys[0]].message)
        }
    }

    return (
        <AuthLayout title={<>Welcome Back to BEAT<span className="text-secondary">X</span></>}>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-4 w-full">
                <CommonInput
                    label="Email Address"
                    type="email"
                    placeholder="name@email.com"
                    leftIcon={<Mail className="w-4 h-4" />}
                    {...register("email")}
                    error={errors.email?.message}
                />

                <CommonInput
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    leftIcon={<Lock className="w-4 h-4" />}
                    {...register("password")}
                    error={errors.password?.message}
                />

                <div className="flex items-center justify-between">
                    <Controller
                        name="rememberMe"
                        control={control}
                        render={({ field }) => (
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                <span className="text-light-gray text-[13px] font-normal">Remember me</span>
                            </label>
                        )}
                    />
                    <Link href="/admin/forgot-password" className="text-secondary text-[13px] font-medium hover:underline">
                        Forgot Password?
                    </Link>
                </div>

                <Button type="submit" variant="gradient" size="lg" className="w-full mt-2">
                    Login on your Account
                </Button>
            </form>
        </AuthLayout>
    )
}

export default AdminLoginPage
