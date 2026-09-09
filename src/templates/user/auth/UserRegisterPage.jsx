"use client"

import React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { SquareUser, Mail, Lock } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import AuthLayout from "@/components/shared/AuthLayout/AuthLayout"
import AuthSocialProof from "@/components/shared/AuthLayout/AuthSocialProof"
import AuthSocialLogins from "@/components/shared/AuthLayout/AuthSocialLogins"
import { useRegister } from "@/hooks/api/auth/useRegister"

// --- SONIC PREFERENCES (kept for future integration) -------------------------
// POST /auth/register accepts only { name, email, password, role }. Favourite
// genres are a separate, session-gated call (PATCH /users/me/genres, minimum 3
// genre ids) and the chip list itself should come from GET /genre. Restore the
// imports below together with the commented-out field further down once that
// endpoint is wired into this flow.
// import { Controller } from "react-hook-form"
// import FilterPills from "@/components/shared/FilterPills"
// import { useUserRegisterStore } from "@/zustandStore/user/userStore/userRegisterStore"
// -----------------------------------------------------------------------------

const registerSchema = z.object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    // sonicPreferences: z.array(z.string()),
})

const inputClassName = "h-14 rounded-full bg-dark-accent border-transparent text-[16px] placeholder:text-[16px]"

const UserRegisterPage = () => {
    const { mutate: registerAccount, isPending } = useRegister()
    // const sonicPreferences = useUserRegisterStore((state) => state.sonicPreferences)

    const {
        register: registerField,
        handleSubmit,
        // control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            // sonicPreferences: [],
        },
    })

    const onSubmit = ({ name, email, password }) => {
        registerAccount({ name, email, password, role: "user" })
    }

    const onInvalid = (validationErrors) => {
        const errorKeys = Object.keys(validationErrors)
        if (errorKeys.length > 0) {
            toast.error(validationErrors[errorKeys[0]].message)
        }
    }

    return (
        <AuthLayout
            showLogo={false}
            sidePanel={
                <AuthSocialProof
                    heading={
                        <div className="flex flex-col items-center gap-6">
                            <h2 className="text-light-gray text-[24px] font-semibold">
                                Welcome Back to BEAT
                                <span
                                    className="bg-clip-text text-[32px] text-transparent"
                                    style={{
                                        backgroundImage: "var(--beatx-x-gradient)",
                                        WebkitBackgroundClip: "text",
                                    }}
                                >
                                    X
                                </span>
                            </h2>

                            <h1 className="text-whitetext text-[32px] font-semibold sm:text-[40px]">
                                Join the <span className="text-secondary">Refraction</span>
                            </h1>

                            <p className="max-w-96 text-light-gray text-[16px] font-normal">
                                Experience sound like never before. Access exclusive tracks, premium audiobooks, and live
                                virtual tickets.
                            </p>
                        </div>
                    }
                />
            }
        >
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex w-full flex-col gap-6">
                <CommonInput
                    label="Full Name"
                    placeholder="Name"
                    leftIcon={<SquareUser className="h-6 w-6" />}
                    className={inputClassName}
                    {...registerField("name")}
                    error={errors.name?.message}
                />

                <CommonInput
                    label="EMAIL ADDRESS"
                    type="email"
                    placeholder="name@email.com"
                    leftIcon={<Mail className="h-6 w-6" />}
                    className={inputClassName}
                    {...registerField("email")}
                    error={errors.email?.message}
                />

                <CommonInput
                    label="CREATE PASSWORD"
                    type="password"
                    placeholder="••••••••"
                    leftIcon={<Lock className="h-6 w-6" />}
                    className={inputClassName}
                    {...registerField("password")}
                    error={errors.password?.message}
                />

                {/* SONIC PREFERENCES — no field on POST /auth/register yet. Kept
                    verbatim for when PATCH /users/me/genres joins this flow.
                <Controller
                    name="sonicPreferences"
                    control={control}
                    render={({ field }) => (
                        <div className="flex w-full flex-col gap-2">
                            <span className="text-primary text-[16px] font-normal">SONIC PREFERENCES</span>
                            <FilterPills
                                multiple
                                filters={sonicPreferences}
                                activeFilters={field.value}
                                onChange={(preference) =>
                                    field.onChange(
                                        field.value?.includes(preference)
                                            ? field.value.filter((item) => item !== preference)
                                            : [...(field.value ?? []), preference]
                                    )
                                }
                            />
                        </div>
                    )}
                />
                */}

                <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="h-14 w-full rounded-[32px] text-[16px]"
                    isLoading={isPending}
                >
                    Sign up Account
                </Button>

                <div className="mt-4 flex w-full flex-col gap-6">
                    <AuthSocialLogins label="OR CONNECT WITH" />

                    <p className="text-center text-light-gray text-[16px] font-semibold">
                        Already Have an Account?{" "}
                        <Link href="/login" className="text-primary hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    )
}

export default UserRegisterPage
