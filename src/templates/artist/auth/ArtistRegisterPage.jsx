"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { UserRound, Mail, Phone, Lock } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import ArtistAuthLayout from "@/components/shared/AuthLayout/ArtistAuthLayout"
import AuthSocialProof from "@/components/shared/AuthLayout/AuthSocialProof"
import AuthSocialLogins from "@/components/shared/AuthLayout/AuthSocialLogins"
import { useArtistAuthWizardStore } from "@/zustandStore/artist/artistAuthWizardStore"

const registerSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    phone: z.string().min(1, "Phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the Terms of Service and Privacy Policy"),
})

const inputClassName = "rounded-[16px] bg-dark-accent border-transparent"
const labelClassName = "text-[14px]"

const ArtistRegisterPage = () => {
    const router = useRouter()
    const setEmail = useArtistAuthWizardStore((state) => state.setEmail)

    const {
        register: registerField,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: { fullName: "", email: "", phone: "", password: "", agreeToTerms: false },
    })

    const onSubmit = ({ email }) => {
        setEmail(email)
        router.push(`/artist/otp-verification?email=${encodeURIComponent(email)}`)
    }

    const onInvalid = (validationErrors) => {
        const errorKeys = Object.keys(validationErrors)
        if (errorKeys.length > 0) {
            toast.error(validationErrors[errorKeys[0]].message)
        }
    }

    return (
        <ArtistAuthLayout
            stepLabel="Step 1 of 3 — Sign Up"
            progressPercent={8}
            title="Create Artist Account"
            description="Join BeatX as a verified artist"
            sidePanel={
                <AuthSocialProof
                    heading={
                        <div className="flex flex-col items-center gap-2">
                            <h2 className="text-whitetext text-[24px] font-black">
                                Create Your <span className="text-primary">Artist Account</span>
                            </h2>
                            <p className="text-light-gray text-[16px]">Join BEATX Studio and take your music career to the next level.</p>
                        </div>
                    }
                />
            }
        >
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex w-full flex-col gap-4">
                <CommonInput
                    label="Full Name"
                    labelClassName={labelClassName}
                    placeholder="Your legal full name"
                    leftIcon={<UserRound className="w-5 h-5" />}
                    className={inputClassName}
                    {...registerField("fullName")}
                    error={errors.fullName?.message}
                />

                <div className="flex flex-col gap-4 sm:flex-row">
                    <CommonInput
                        label="Email"
                        labelClassName={labelClassName}
                        type="email"
                        placeholder="artist@example.com"
                        leftIcon={<Mail className="w-5 h-5" />}
                        className={inputClassName}
                        containerClassName="flex-1"
                        {...registerField("email")}
                        error={errors.email?.message}
                    />
                    <CommonInput
                        label="Phone"
                        labelClassName={labelClassName}
                        type="tel"
                        placeholder="+880-17XX-XXXXXX"
                        leftIcon={<Phone className="w-5 h-5" />}
                        className={inputClassName}
                        containerClassName="flex-1"
                        {...registerField("phone")}
                        error={errors.phone?.message}
                    />
                </div>

                <CommonInput
                    label="PASSWORD"
                    labelClassName={labelClassName}
                    type="password"
                    placeholder="Min. 8 characters"
                    leftIcon={<Lock className="w-5 h-5" />}
                    className={inputClassName}
                    {...registerField("password")}
                    error={errors.password?.message}
                />

                <Controller
                    name="agreeToTerms"
                    control={control}
                    render={({ field }) => (
                        <label className="flex cursor-pointer items-start gap-2 select-none">
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
                            <span className="text-light-gray text-[14px]">
                                By signing up you agree to BeatX&apos;s{" "}
                                <span className="text-secondary">Terms of Service</span> and{" "}
                                <span className="text-secondary">Privacy Policy.</span>
                            </span>
                        </label>
                    )}
                />

                <Button type="submit" variant="gradient" size="lg" className="w-full">
                    Create Artist Account
                </Button>

                <AuthSocialLogins />

                <p className="text-center text-light-gray text-[16px] w-full">
                    Already Have an Account?{" "}
                    <Link href="/artist/login" className="text-primary font-semibold hover:underline">
                        Log in
                    </Link>
                </p>
            </form>
        </ArtistAuthLayout>
    )
}

export default ArtistRegisterPage
