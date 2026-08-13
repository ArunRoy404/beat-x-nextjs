"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addArtistSchema, addArtistDefaultValues } from "@/zodSchema/AddArtistZodSchema"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { toast } from "sonner"
import { useAdminDashboardArtistsStore } from "@/zustandStore/admin/adminStore/adminDashboardArtistsStore"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonInputContainer from "@/components/shared/CommonInputs/CommonInput/CommonInputContainer"

const NATIONALITIES = ["Bangladeshi", "American", "British", "Indian", "Canadian"]
const GENDERS = ["Male", "Female", "Other"]
const GENRES = ["POP", "Synthwave", "R&B", "Hip Hop", "Lofi", "Rock"]

const AddArtistForm = ({ onSuccess, onCancel }) => {
  const addArtist = useAdminDashboardArtistsStore((state) => state.addArtist)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addArtistSchema),
    defaultValues: addArtistDefaultValues,
  })

  const onSubmit = (data) => {
    console.log("Submitted Artist Data:", data)
    addArtist({
      name: data.stageName,
      fullName: data.fullName,
      email: data.email,
      nationality: data.nationality,
      gender: data.gender,
      genre: data.genre,
    })
    toast.success("Artist created successfully!")
    reset()
    onSuccess?.()
  }

  const onInvalid = (validationErrors) => {
    const errorKeys = Object.keys(validationErrors)
    if (errorKeys.length > 0) {
      toast.error(validationErrors[errorKeys[0]].message)
    }
  }

  return (
    <CommonFormContainer onSubmit={handleSubmit(onSubmit, onInvalid)}>
      {/* Full Name & Stage Name */}
      <CommonInputContainer>
        <CommonInput
          label="Full Name"
          placeholder="Artist full name"
          {...register("fullName")}
          error={errors.fullName?.message}
        />

        <CommonInput
          label="Stage Name"
          placeholder="Stage name"
          {...register("stageName")}
          error={errors.stageName?.message}
        />
      </CommonInputContainer>

      {/* Email & Nationality */}
      <CommonInputContainer>
        <CommonInput
          label="Email"
          placeholder="artist@example.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Controller
          name="nationality"
          control={control}
          render={({ field }) => (
            <CommonSelect
              label="Nationality"
              placeholder="Choose your nationality"
              value={field.value}
              onChange={field.onChange}
              options={NATIONALITIES}
              error={errors.nationality?.message}
            />
          )}
        />
      </CommonInputContainer>

      {/* Gender & Genre */}
      <CommonInputContainer>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <CommonSelect
              label="Gender"
              placeholder="Choose gender"
              value={field.value}
              onChange={field.onChange}
              options={GENDERS}
              error={errors.gender?.message}
            />
          )}
        />

        <Controller
          name="genre"
          control={control}
          render={({ field }) => (
            <CommonSelect
              label="Genre"
              placeholder="Choose Genre"
              value={field.value}
              onChange={field.onChange}
              options={GENRES}
              error={errors.genre?.message}
            />
          )}
        />
      </CommonInputContainer>

      {/* Footer Actions */}
      <div className="flex items-center gap-4 mt-4 shrink-0">
        <DialogClose asChild className="flex-1 w-full">
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-full h-[52px]!"
            size="lg"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          variant="gradient"
          className="flex-1 rounded-full h-[52px]! font-semibold"
          size="lg"
        >
          Create Artist
        </Button>
      </div>
    </CommonFormContainer>
  )
}

export default AddArtistForm
