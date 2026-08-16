"use client"

import React from "react"
import { Controller } from "react-hook-form"
import { Switch } from "@/components/ui/switch"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonCalender from "@/components/shared/CommonInputs/CommonInput/CommonCalender"
import CommonImageUpload from "@/components/shared/CommonInputs/CommonImageUpload/CommonImageUpload"
import { useGenres } from "@/hooks/api/admin/genre/useGenres"

const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "archived", label: "Archived" },
]

const TREND_DIRECTION_OPTIONS = [
  { value: "up", label: "Up" },
  { value: "down", label: "Down" },
]

const AudioBookFormFields = ({ register, control, errors, cover, onCoverChange, coverError, watch }) => {
  const { data: genres = [] } = useGenres()
  const genreOptions = genres.map((genre) => ({ value: genre._id, label: genre.name }))

  const isBestseller = watch("isBestseller")
  const isTrending = watch("isTrending")

  return (
    <>
      <CommonImageUpload value={cover} onChange={onCoverChange} error={coverError} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CommonInput label="Title" placeholder="e.g. Project Hail Mary" {...register("title")} error={errors.title?.message} />
        <CommonInput label="Author" placeholder="e.g. Andy Weir" {...register("author")} error={errors.author?.message} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CommonInput label="Narrator" placeholder="e.g. Ray Porter" {...register("narrator")} error={errors.narrator?.message} />
        <CommonInput label="Language" placeholder="e.g. English" {...register("language")} error={errors.language?.message} />
      </div>

      <CommonInput
        type="textarea"
        label="Synopsis"
        placeholder="What is this audiobook about?"
        {...register("synopsis")}
        error={errors.synopsis?.message}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Controller
          name="genre"
          control={control}
          render={({ field }) => (
            <CommonSelect
              label="Genre"
              value={field.value}
              onChange={field.onChange}
              placeholder="Select genre"
              options={genreOptions}
              error={errors.genre?.message}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <CommonSelect
              label="Status"
              value={field.value}
              onChange={field.onChange}
              placeholder="Select status"
              options={STATUS_OPTIONS}
              error={errors.status?.message}
            />
          )}
        />
      </div>

      <Controller
        name="publishedAt"
        control={control}
        render={({ field }) => (
          <CommonCalender
            label="Published Date"
            value={field.value}
            onChange={field.onChange}
            error={errors.publishedAt?.message}
          />
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-white/10 rounded-[16px] p-4">
        <Controller
          name="isBestseller"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between gap-3">
              <span className="text-whitetext text-[13px] font-medium">Bestseller</span>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </div>
          )}
        />
        <Controller
          name="isTrending"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between gap-3">
              <span className="text-whitetext text-[13px] font-medium">Trending</span>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </div>
          )}
        />
        <Controller
          name="isFeatured"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between gap-3">
              <span className="text-whitetext text-[13px] font-medium">Featured</span>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </div>
          )}
        />
      </div>

      {(isBestseller || isTrending) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isBestseller && (
            <CommonInput
              label="Bestseller Rank"
              type="number"
              placeholder="e.g. 1"
              {...register("bestsellerRank")}
              error={errors.bestsellerRank?.message}
            />
          )}
          {isTrending && (
            <Controller
              name="trendDirection"
              control={control}
              render={({ field }) => (
                <CommonSelect
                  label="Trend Direction"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select direction"
                  options={TREND_DIRECTION_OPTIONS}
                  error={errors.trendDirection?.message}
                />
              )}
            />
          )}
        </div>
      )}
    </>
  )
}

export default AudioBookFormFields
