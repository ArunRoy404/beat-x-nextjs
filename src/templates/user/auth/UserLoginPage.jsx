"use client"

import React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, Lock } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import AuthLayout from "@/components/shared/AuthLayout/AuthLayout"
import AuthSocialProof from "@/components/shared/AuthLayout/AuthSocialProof"
import AuthSocialLogins from "@/components/shared/AuthLayout/AuthSocialLogins"
import { useLogin } from "@/hooks/api/auth/useLogin"
import { getSafeCallbackUrl } from "@/lib/auth/getSafeCallbackUrl"

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
})

const UserLoginPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { mutate: login, isPending } = useLogin()

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

    const onSubmit = ({ email, password }) => {
        login(
            { email, password },
            {
                onSuccess: () => {
                    toast.success("Logged in successfully!")
                    router.push(getSafeCallbackUrl(searchParams.get("callbackUrl"), "/"))
                    router.refresh()
                },
                onError: (error) => {
                    toast.error(error.message || "Invalid email or password")
                },
            }
        )
    }

    const onInvalid = (validationErrors) => {
        const errorKeys = Object.keys(validationErrors)
        if (errorKeys.length > 0) {
            toast.error(validationErrors[errorKeys[0]].message)
        }
    }

    return (
        <AuthLayout
            title={
                <>
                    Welcome Back to <span className="font-semibold">BEAT</span>
                    <span className="font-semibold text-secondary">X</span>
                </>
            }
            titleClassName="text-light-gray text-[20px] font-normal"
            sidePanel={<AuthSocialProof />}
            gapClassName="gap-6"
        >
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-4 w-full">
                <CommonInput
                    label="Email"
                    type="email"
                    placeholder="artist@example.com"
                    leftIcon={<Mail className="w-6 h-6" />}
                    className="rounded-[16px] bg-dark-accent border-transparent"
                    {...register("email")}
                    error={errors.email?.message}
                />

                <CommonInput
                    label="PASSWORD"
                    type="password"
                    placeholder="Min. 8 characters"
                    leftIcon={<Lock className="w-6 h-6" />}
                    className="rounded-[16px] bg-dark-accent border-transparent"
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
                    <Link href="/forgot-password" className="text-secondary text-[13px] font-medium hover:underline">
                        Forgot Password?
                    </Link>
                </div>

                <Button type="submit" variant="gradient" size="lg" className="w-full mt-2" isLoading={isPending}>
                    Login
                </Button>

                <AuthSocialLogins />

                <p className="text-center text-light-gray text-[13px] font-normal">
                    New to BeatX?{" "}
                    <Link href="/register" className="text-primary font-semibold hover:underline">
                        Register Now
                    </Link>
                </p>
            </form>
        </AuthLayout>
    )
}

export default UserLoginPage
