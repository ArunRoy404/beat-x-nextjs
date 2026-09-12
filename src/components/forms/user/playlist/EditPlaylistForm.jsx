"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput";
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer";
import CommonFormActions from "@/components/shared/CommonFormActions";
import { playlistSchema } from "@/zodSchema/UserPlaylistZodSchema";
import { useUpdatePlaylist } from "@/hooks/api/user/playlists";

const inputClassName = "rounded-full bg-white/[0.03] border-white/10";

const EditPlaylistForm = ({ playlist, onSuccess, onCancel }) => {
  const playlistId = playlist?._id || playlist?.id;
  const { mutate: updatePlaylist, isPending } = useUpdatePlaylist();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(playlistSchema),
    defaultValues: {
      title: playlist?.title || playlist?.name || "",
    },
  });

  const onSubmit = (data) => {
    if (!playlistId) return;
    updatePlaylist(
      { id: playlistId, title: data.title },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      }
    );
  };

  return (
    <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
      <CommonInput
        label="Playlist Name"
        placeholder="Enter playlist name"
        error={errors.title?.message}
        className={inputClassName}
        autoFocus
        {...register("title")}
      />

      <CommonFormActions
        onCancel={onCancel}
        submitLabel="Save Changes"
        isPending={isPending}
      />
    </CommonFormContainer>
  );
};

export default EditPlaylistForm;
