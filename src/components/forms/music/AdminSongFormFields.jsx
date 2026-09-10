"use client"

import React from "react"
import { Controller } from "react-hook-form"
import { CheckCircle2, Clock, FileText } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonCalender from "@/components/shared/CommonInputs/CommonInput/CommonCalender"
import CommonInputContainer from "@/components/shared/CommonInputs/CommonInput/CommonInputContainer"
import CommonSelectCards from "@/components/shared/CommonInputs/CommonInput/CommonSelectCards"
import CommonAudioInput from "@/components/shared/CommonInputs/CommonAudioInput/CommonAudioInput"
import CommonImageUpload from "@/components/shared/CommonInputs/CommonImageUpload/CommonImageUpload"
import { useGenres } from "@/hooks/api/admin/genre/useGenres"
import { useAlbums } from "@/hooks/api/admin/albums/useAlbums"
import { TAXONOMY_OPTIONS_PARAMS } from "@/lib/constants/taxonomyOptions"

const VISIBILITY_OPTIONS = [
    { value: "publish", label: "Publish Now", icon: CheckCircle2 },
    { value: "schedule", label: "Schedule", icon: Clock },
    { value: "draft", label: "Save as Draft", icon: FileText },
]

const AdminSongFormFields = ({
    register,
    control,
    errors,
    watch,
    audio,
    onAudioChange,
    audioError,
    cover,
    onCoverChange,
    coverError,
    // AdminUpdateSongDto only — the create endpoint has no such fields.
    showAdminFlags = false,
}) => {
    const genresQuery = useGenres(TAXONOMY_OPTIONS_PARAMS)
    const genresData = genresQuery?.data
    const genresList =
        genresData?.genre ??
        genresData?.genres ??
        genresData?.data ??
        (Array.isArray(genresData) ? genresData : [])

    const genreOptions = genresList.map((genre) => ({
        value: genre?._id || genre?.id,
        label: genre?.name || "Unnamed Genre",
    }))

    const albumsQuery = useAlbums(TAXONOMY_OPTIONS_PARAMS)
    const albumsData = albumsQuery?.data
    const albumsList =
        albumsData?.album ??
        albumsData?.albums ??
        albumsData?.data ??
        (Array.isArray(albumsData) ? albumsData : [])

    const albumOptions = [
        { value: "none", label: "No Album (Single)" },
        ...albumsList.map((album) => ({
            value: album?._id || album?.id,
            label: album?.title || album?.name || "Untitled Album",
        })),
    ]

    const visibility = watch("visibility")

    return (
        <>
            <CommonAudioInput value={audio} onChange={onAudioChange} error={audioError} />
            <CommonImageUpload value={cover} onChange={onCoverChange} error={coverError} />

            <CommonInput
                label="Song Title"
                placeholder="Enter song title..."
                {...register("title")}
                error={errors.title?.message}
            />

            <CommonInputContainer>
                <CommonInput
                    label="Artist"
                    placeholder="Artist name"
                    {...register("artist")}
                    error={errors.artist?.message}
                />
                <Controller
                    name="genre"
                    control={control}
                    render={({ field }) => (
                        <CommonSelect
                            label="Genre"
                            placeholder="Select genre"
                            value={field.value}
                            onChange={field.onChange}
                            options={genreOptions}
                            error={errors.genre?.message}
                        />
                    )}
                />
            </CommonInputContainer>

            <Controller
                name="album"
                control={control}
                render={({ field }) => (
                    <CommonSelect
                        label="Album"
                        placeholder="Select album"
                        value={field.value}
                        onChange={field.onChange}
                        options={albumOptions}
                        error={errors.album?.message}
                    />
                )}
            />

            <Controller
                name="visibility"
                control={control}
                render={({ field }) => (
                    <CommonSelectCards
                        label="Visibility"
                        value={field.value}
                        onChange={field.onChange}
                        options={VISIBILITY_OPTIONS}
                        error={errors.visibility?.message}
                    />
                )}
            />

            {visibility === "schedule" && (
                <Controller
                    name="scheduledAt"
                    control={control}
                    render={({ field }) => (
                        <CommonCalender
                            label="Scheduled Date"
                            placeholder="Choose Date"
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.scheduledAt?.message}
                        />
                    )}
                />
            )}

            <Controller
                name="explicit"
                control={control}
                render={({ field }) => (
                    <div className="flex items-center justify-between py-2 border-t border-b border-white/5">
                        <span className="text-whitetext text-[13px] font-medium">Explicit Content</span>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </div>
                )}
            />

            {showAdminFlags && (
                <>
                    <Controller
                        name="isFeatured"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-whitetext text-[13px] font-medium">Featured</span>
                                <Switch checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                            </div>
                        )}
                    />

                    <Controller
                        name="isTrending"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-whitetext text-[13px] font-medium">Trending</span>
                                <Switch checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                            </div>
                        )}
                    />
                </>
            )}
        </>
    )
}

export default AdminSongFormFields
