"use client"

import React from "react"
import { useForm, useWatch, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonCalender from "@/components/shared/CommonInputs/CommonInput/CommonCalender"
import CommonInputContainer from "@/components/shared/CommonInputs/CommonInput/CommonInputContainer"
import { useArtistProfileStore } from "@/zustandStore/artist/artistStore/artistProfileStore"

const profileSchema = z.object({
    stageName: z.string().min(1, "Stage name is required"),
    realFullName: z.string().min(1, "Real full name is required"),
    dateOfBirth: z.date({ required_error: "Date of birth is required", invalid_type_error: "Date of birth is required" }),
    gender: z.string().min(1, "Gender is required"),
    nationality: z.string().min(1, "Nationality is required"),
    primaryLanguage: z.string().min(1, "Primary language is required"),
    genres: z.array(z.string()).optional(),
    shortBio: z.string().optional(),
})

const ArtistInformationForm = () => {
    const artistProfile = useArtistProfileStore((state) => state.artistProfile)
    const genreOptions = useArtistProfileStore((state) => state.genreOptions)
    const genderOptions = useArtistProfileStore((state) => state.genderOptions)
    const languageOptions = useArtistProfileStore((state) => state.languageOptions)
    const updateArtistProfile = useArtistProfileStore((state) => state.updateArtistProfile)

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            stageName: artistProfile?.stageName || "",
            realFullName: artistProfile?.realFullName || "",
            dateOfBirth: artistProfile?.dateOfBirth ? new Date(artistProfile.dateOfBirth) : null,
            gender: artistProfile?.gender || "",
            nationality: artistProfile?.nationality || "",
            primaryLanguage: artistProfile?.primaryLanguage || "",
            genres: artistProfile?.selectedGenres || [],
            shortBio: artistProfile?.shortBio || "",
        },
    })

    const selectedGenres = useWatch({ control, name: "genres" }) || []

    const toggleGenre = (genre) => {
        const next = selectedGenres.includes(genre)
            ? selectedGenres.filter((g) => g !== genre)
            : [...selectedGenres, genre]
        setValue("genres", next, { shouldValidate: true })
    }

    const onSubmit = (data) => {
        updateArtistProfile({
            stageName: data.stageName,
            realFullName: data.realFullName,
            dateOfBirth: data.dateOfBirth.toISOString().split("T")[0],
            gender: data.gender,
            nationality: data.nationality,
            primaryLanguage: data.primaryLanguage,
            selectedGenres: data.genres,
            shortBio: data.shortBio,
        })
        toast.success("Profile updated successfully!")
    }

    const onInvalid = (validationErrors) => {
        const errorKeys = Object.keys(validationErrors)
        if (errorKeys.length > 0) {
            toast.error(validationErrors[errorKeys[0]].message)
        }
    }

    return (
        <CommonCard className="flex flex-col gap-5 w-full">
            <h3 className="text-whitetext text-[24px] font-semibold z-10 relative">
                Artist Information
            </h3>

            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-4 z-10 relative">
                {/* Stage Name & Real Full Name */}
                <CommonInputContainer>
                    <CommonInput
                        label="Stage Name"
                        placeholder="Your stage name"
                        {...register("stageName")}
                        error={errors.stageName?.message}
                    />
                    <CommonInput
                        label="Real Full Name"
                        placeholder="Your legal name"
                        {...register("realFullName")}
                        error={errors.realFullName?.message}
                    />
                </CommonInputContainer>

                {/* Date of Birth & Gender */}
                <CommonInputContainer>
                    <Controller
                        name="dateOfBirth"
                        control={control}
                        render={({ field }) => (
                            <CommonCalender
                                label="Date of Birth"
                                placeholder="Choose Date"
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
                                placeholder="Select gender"
                                value={field.value}
                                onChange={field.onChange}
                                options={genderOptions}
                                error={errors.gender?.message}
                            />
                        )}
                    />
                </CommonInputContainer>

                {/* Nationality & Primary Language */}
                <CommonInputContainer>
                    <CommonInput
                        label="Nationality"
                        placeholder="e.g. Bangladeshi"
                        {...register("nationality")}
                        error={errors.nationality?.message}
                    />
                    <Controller
                        name="primaryLanguage"
                        control={control}
                        render={({ field }) => (
                            <CommonSelect
                                label="Primary Language"
                                placeholder="Select language"
                                value={field.value}
                                onChange={field.onChange}
                                options={languageOptions}
                                error={errors.primaryLanguage?.message}
                            />
                        )}
                    />
                </CommonInputContainer>

                {/* Genres */}
                <div className="flex flex-col gap-2">
                    <label className="text-primary text-[16px] not-italic font-normal font-sans">
                        Genres (select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {genreOptions.map((genre) => {
                            const isSelected = selectedGenres.includes(genre)
                            return (
                                <button
                                    key={genre}
                                    type="button"
                                    onClick={() => toggleGenre(genre)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-full border text-[12px] font-medium cursor-pointer transition-all",
                                        isSelected
                                            ? "bg-secondary/15 border-secondary/30 text-secondary"
                                            : "bg-light-gray/10 border-light-gray/20 text-light-gray hover:bg-light-gray/20"
                                    )}
                                >
                                    {genre}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Short Bio */}
                <CommonInput
                    label="Short Bio"
                    type="textarea"
                    placeholder="Tell your fans about yourself..."
                    {...register("shortBio")}
                    error={errors.shortBio?.message}
                />

                {/* Save */}
                <div className="mt-2">
                    <Button type="submit" variant="gradient" size="lg">
                        Save Changes
                    </Button>
                </div>
            </form>
        </CommonCard>
    )
}

export default ArtistInformationForm
