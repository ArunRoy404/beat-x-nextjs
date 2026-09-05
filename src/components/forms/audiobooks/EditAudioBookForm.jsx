"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import AudioBookFormFields from "./AudioBookFormFields"
import { audioBookSchema } from "./audioBookSchema"
import { useUpdateAudioBook } from "@/hooks/api/admin/audiobooks/useUpdateAudioBook"
import { useUpdateAudioBookCover } from "@/hooks/api/admin/audiobooks/useUpdateAudioBookCover"

const getGenreId = (genre) => {
  if (!genre) return ""
  if (typeof genre === "string") return genre
  return genre._id || genre.id || ""
}

const EditAudioBookForm = ({ book, onSuccess, onCancel }) => {
  const [cover, setCover] = useState(book?.coverUrl || null)
  const [newCoverFile, setNewCoverFile] = useState(null)
  const [coverError, setCoverError] = useState("")

  const { mutateAsync: updateAudioBook, isPending: isUpdatingData } = useUpdateAudioBook()
  const { mutateAsync: updateCover, isPending: isUpdatingCover } = useUpdateAudioBookCover()

  const isSubmitting = isUpdatingData || isUpdatingCover

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
      title: book?.title || "",
      author: book?.author || "",
      narrator: book?.narrator || "",
      synopsis: book?.synopsis || "",
      language: book?.language || "",
      genre: getGenreId(book?.genre),
      status: book?.status || "active",
      isBestseller: Boolean(book?.isBestseller),
      isTrending: Boolean(book?.isTrending),
      isFeatured: Boolean(book?.isFeatured),
      bestsellerRank: book?.bestsellerRank ? String(book.bestsellerRank) : "",
      trendDirection: book?.trendDirection || "up",
      publishedAt: book?.publishedAt ? new Date(book.publishedAt) : new Date(),
    },
  })

  useEffect(() => {
    if (book) {
      reset({
        title: book?.title || "",
        author: book?.author || "",
        narrator: book?.narrator || "",
        synopsis: book?.synopsis || "",
        language: book?.language || "",
        genre: getGenreId(book?.genre),
        status: book?.status || "active",
        isBestseller: Boolean(book?.isBestseller),
        isTrending: Boolean(book?.isTrending),
        isFeatured: Boolean(book?.isFeatured),
        bestsellerRank: book?.bestsellerRank ? String(book.bestsellerRank) : "",
        trendDirection: book?.trendDirection || "up",
        publishedAt: book?.publishedAt ? new Date(book.publishedAt) : new Date(),
      })
      if (book?.coverUrl) {
        setCover(book.coverUrl)
      }
    }
  }, [book, reset])

  const handleCoverChange = (file) => {
    setNewCoverFile(file)
    setCover(file ? URL.createObjectURL(file) : null)
    setCoverError("")
  }

  const onSubmit = async (data) => {
    try {
      // 1. Update text metadata (PATCH /admin/audiobooks/:id)
      const payload = {
        title: data.title,
        author: data.author,
        narrator: data.narrator,
        synopsis: data.synopsis,
        language: data.language,
        genre: data.genre,
        status: data.status,
        isBestseller: data.isBestseller,
        isTrending: data.isTrending,
        isFeatured: data.isFeatured,
      }

      if (data.isBestseller && data.bestsellerRank) {
        payload.bestsellerRank = Number(data.bestsellerRank)
      }
      if (data.isTrending && data.trendDirection) {
        payload.trendDirection = data.trendDirection
      }

      await updateAudioBook({ id: book._id, data: payload })

      // 2. Update cover image if changed (PATCH /admin/audiobooks/:id/cover)
      if (newCoverFile) {
        await updateCover({ id: book._id, file: newCoverFile })
      }

      toast.success("Audiobook updated successfully!")
      onSuccess?.()
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to update audiobook.")
    }
  }

  return (
    <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
      <AudioBookFormFields
        register={register}
        control={control}
        errors={errors}
        cover={cover}
        onCoverChange={handleCoverChange}
        coverError={coverError}
        watch={watch}
      />

      <div className="flex items-center gap-4 mt-2 shrink-0">
        <DialogClose asChild className="flex-1 w-full">
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-full"
            size="lg"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </DialogClose>

        <Button
          type="submit"
          variant="gradient"
          className="flex-1"
          size="lg"
          isLoading={isSubmitting}
        >
          Save Changes
        </Button>
      </div>
    </CommonFormContainer>
  )
}

export default EditAudioBookForm
