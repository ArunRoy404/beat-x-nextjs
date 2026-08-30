"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonCalender from "@/components/shared/CommonInputs/CommonInput/CommonCalender"
import GenreChipSelect from "@/components/shared/CommonInputs/GenreChipSelect/GenreChipSelect"
import ArtistAuthLayout from "@/components/shared/AuthLayout/ArtistAuthLayout"
import WizardStepDots from "@/components/shared/AuthLayout/WizardStepDots"
import { useArtistAuthWizardStore } from "@/zustandStore/artist/artistAuthWizardStore"

const GENRE_OPTIONS = ["Pop", "Rock", "Hip-Hop", "Folk", "Jazz", "Classical", "EDM", "Religious", "Country", "Others"]
const GENDER_OPTIONS = ["Male", "Female", "Non-binary", "Prefer not to say"]
const LANGUAGE_OPTIONS = ["Bangla", "English", "Hindi", "Urdu", "Arabic", "Other"]

const VERIFICATION_STEPS = ["Personal Info", "Identity Docs", "Social Links", "Media Assets"]

const inputClassName = "rounded-[16px] bg-dark-accent border-transparent"
const labelClassName = "text-[14px]"

const personalInfoSchema = z.object({
    realFullName: z.string().min(1, "Real full name is required"),
    stageName: z.string().min(1, "Stage name is required"),
    dateOfBirth: z.date({ required_error: "Date of birth is required" }),
    gender: z.string().min(1, "Please choose a gender"),
    nationality: z.string().min(1, "Nationality is required"),
    genres: z.array(z.string()).min(1, "Select at least one genre"),
    primaryLanguage: z.string().min(1, "Please choose a primary language"),
    shortBio: z.string().min(1, "Short bio is required"),
})

const ArtistPersonalInfoPage = () => {
    const router = useRouter()
    const personalInfo = useArtistAuthWizardStore((state) => state.personalInfo)
    const setPersonalInfo = useArtistAuthWizardStore((state) => state.setPersonalInfo)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: personalInfo,
    })

    const onSubmit = (data) => {
        setPersonalInfo(data)
        router.push("/artist/verification/identity-docs")
    }

    const onInvalid = (validationErrors) => {
        const errorKeys = Object.keys(validationErrors)
        if (errorKeys.length > 0) {
            toast.error(validationErrors[errorKeys[0]].message)
        }
    }

    return (
        <ArtistAuthLayout
            backHref="/artist/otp-verification"
            stepLabel="Step 3 of 3 — Personal Info"
            progressPercent={100}
            title="Artist Verification — Personal Info"
            description="Complete your KYC verification"
            cardClassName="max-w-146"
        >
            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex w-full flex-col gap-6">
                <div className="flex w-full flex-col gap-4">
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <CommonInput
                            label="Real Full Name"
                            labelClassName={labelClassName}
                            placeholder="Legal name as on ID"
                            className={inputClassName}
                            containerClassName="flex-1"
                            {...register("realFullName")}
                            error={errors.realFullName?.message}
                        />
                        <CommonInput
                            label="Stage Name"
                            labelClassName={labelClassName}
                            placeholder="Artist / stage name"
                            className={inputClassName}
                            containerClassName="flex-1"
                            {...register("stageName")}
                            error={errors.stageName?.message}
                        />
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            render={({ field }) => (
                                <CommonCalender
                                    label="Date of Birth"
                                    labelClassName={labelClassName}
                                    className={inputClassName}
                                    containerClassName="flex-1"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.dateOfBirth?.message}
                                />
                            )}
                        />
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <CommonSelect
                                    label="Gender"
                                    labelClassName={labelClassName}
                                    placeholder="Choose gender"
                                    options={GENDER_OPTIONS}
                                    className={inputClassName}
                                    containerClassName="flex-1"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.gender?.message}
                                />
                            )}
                        />
                    </div>

                    <CommonInput
                        label="Nationality"
                        labelClassName={labelClassName}
                        placeholder="e.g. Bangladeshi"
                        className={inputClassName}
                        {...register("nationality")}
                        error={errors.nationality?.message}
                    />

                    <Controller
                        name="genres"
                        control={control}
                        render={({ field }) => (
                            <GenreChipSelect
                                label="Genres (select all that apply)"
                                options={GENRE_OPTIONS}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />

                    <Controller
                        name="primaryLanguage"
                        control={control}
                        render={({ field }) => (
                            <CommonSelect
                                label="Primary Language"
                                labelClassName={labelClassName}
                                placeholder="Choose language"
                                options={LANGUAGE_OPTIONS}
                                className={inputClassName}
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.primaryLanguage?.message}
                            />
                        )}
                    />

                    <CommonInput
                        label="Short Bio"
                        labelClassName={labelClassName}
                        type="textarea"
                        placeholder="Brief artist description (displayed publicly)..."
                        className={inputClassName}
                        {...register("shortBio")}
                        error={errors.shortBio?.message}
                    />
                </div>

                <div className="flex w-full items-center gap-4">
                    <Button type="submit" variant="gradient" size="lg" className="flex-1">
                        Continue
                    </Button>
                    <Button type="button" variant="outline" size="lg" className="rounded-full border-light-gray bg-white/10 px-8 text-light-gray backdrop-blur-[10px] hover:bg-white/15" onClick={() => router.push("/artist/otp-verification")}>
                        Back
                    </Button>
                </div>

                <WizardStepDots steps={VERIFICATION_STEPS} activeIndex={0} />
            </form>
        </ArtistAuthLayout>
    )
}

export default ArtistPersonalInfoPage
