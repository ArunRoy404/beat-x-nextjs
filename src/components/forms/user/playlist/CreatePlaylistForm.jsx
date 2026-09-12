"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput";
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer";
import CommonFormActions from "@/components/shared/CommonFormActions";
import { playlistSchema } from "@/zodSchema/UserPlaylistZodSchema";
import { useCreatePlaylist } from "@/hooks/api/user/playlists";

const inputClassName = "rounded-full bg-white/[0.03] border-white/10";

const CreatePlaylistForm = ({ onSuccess, onCancel }) => {
  const { mutate: createPlaylist, isPending } = useCreatePlaylist();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(playlistSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (data) => {
    createPlaylist(
      { title: data.title },
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
        placeholder="e.g., Midnight Vibes, Workout Focus..."
        error={errors.title?.message}
        className={inputClassName}
        autoFocus
        {...register("title")}
      />

      <CommonFormActions
        onCancel={onCancel}
        submitLabel="Create Playlist"
        isPending={isPending}
      />
    </CommonFormContainer>
  );
};

export default CreatePlaylistForm;
