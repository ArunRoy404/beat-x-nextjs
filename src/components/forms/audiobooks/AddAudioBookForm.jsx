"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import { useCreateAudioBook } from "@/hooks/api/admin/audiobooks/useCreateAudioBook"
import { audioBookSchema } from "./audioBookSchema"
import { buildAudioBookFormData } from "./buildAudioBookFormData"
import AudioBookFormFields from "./AudioBookFormFields"

const AddAudioBookForm = ({ onSuccess, onCancel }) => {
    const [cover, setCover] = useState(null)
    const [coverError, setCoverError] = useState("")

    const { mutate: createAudioBook, isPending } = useCreateAudioBook()

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(audioBookSchema),
        defaultValues: {
            title: "",
            author: "",
            narrator: "",
            synopsis: "",
            language: "",
            genre: "",
            status: "draft",
            isBestseller: false,
            isTrending: false,
            isFeatured: false,
            bestsellerRank: "",
            trendDirection: "",
            publishedAt: undefined,
        },
    })

    const onSubmit = (data) => {
        if (!(cover instanceof File)) {
            setCoverError("Cover image is required")
            return
        }
        setCoverError("")

        const formData = buildAudioBookFormData({ ...data, cover })

        createAudioBook(formData, {
            onSuccess: () => {
                toast.success("Audiobook created successfully!")
                reset()
                setCover(null)
                onSuccess?.()
            },
            onError: (error) => toast.error(error?.message || "Failed to create audiobook."),
        })
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            <AudioBookFormFields
                register={register}
                control={control}
                errors={errors}
                watch={watch}
                cover={cover}
                onCoverChange={setCover}
                coverError={coverError}
            />

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
                    isLoading={isPending}
                >
                    Add Audiobook
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default AddAudioBookForm
