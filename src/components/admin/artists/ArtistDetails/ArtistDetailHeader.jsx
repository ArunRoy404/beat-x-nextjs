"use client"

import React, { useState } from "react"
import { ShieldCheck, X, Edit2, Check } from "lucide-react"
import { format } from "date-fns"
import { useUpdateArtistGenres } from "@/hooks/api/admin/artists/useUpdateArtistGenres"
import { toast } from "sonner"

const ArtistDetailHeader = ({ artist, onClose }) => {
  const verificationId = artist?._id || artist?.id
  const name =
    artist?.personalInfo?.stageName ||
    artist?.personalInfo?.fullName ||
    artist?.user?.name ||
    artist?.userId?.name ||
    artist?.name ||
    "Unknown Artist"

  const fullName = artist?.personalInfo?.fullName || artist?.fullName || name
  const email = artist?.user?.email || artist?.userId?.email || artist?.email || "-"
  const nationality = artist?.personalInfo?.nationality || artist?.nationality || "-"
  const status = artist?.status || "pending"
  const isVerified = status.toLowerCase() === "approved" || status.toLowerCase() === "verified"

  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AR"

  const currentGenres = Array.isArray(artist?.genres)
    ? artist.genres.map((g) => (typeof g === "string" ? g : g?.name || g?.slug)).filter(Boolean)
    : artist?.genre
    ? [typeof artist.genre === "string" ? artist.genre : artist.genre?.name || artist.genre?.slug]
    : ["pop"]

  const [isEditingGenres, setIsEditingGenres] = useState(false)
  const [genreInput, setGenreInput] = useState(currentGenres.join(", "))

  const updateGenresMutation = useUpdateArtistGenres()

  const handleSaveGenres = async () => {
    if (!verificationId) return
    const newGenres = genreInput
      .split(",")
      .map((g) => g.trim().toLowerCase())
      .filter(Boolean)

    if (newGenres.length === 0) {
      toast.error("Please enter at least one genre.")
      return
    }

    try {
      await updateGenresMutation.mutateAsync({
        id: verificationId,
        genres: newGenres,
      })
      toast.success("Genres updated successfully!")
      setIsEditingGenres(false)
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to update genres.")
    }
  }

  const joinedDate = artist?.createdAt ? format(new Date(artist.createdAt), "MMM d, yyyy") : "-"
  const appliedDate = artist?.submittedAt ? format(new Date(artist.submittedAt), "MMM d, yyyy") : "-"

  return (
    <div
      className="p-5 border-b border-white/5 flex items-start justify-between gap-4 shrink-0 relative"
      style={{ background: "var(--modal-header-bg)" }}
    >
      <div className="flex items-start gap-4 min-w-0 flex-1">
        {/* Profile Initials/Avatar Container */}
        <div
          className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-whitetext font-bold text-[20px] shrink-0"
          style={{ background: "rgba(58, 223, 250, 0.15)" }}
        >
          {initials}
        </div>

        {/* Metadata */}
        <div className="flex flex-col gap-1.5 min-w-0 pr-8 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-[20px] font-semibold text-whitetext not-italic leading-none">
              {name}
            </h2>
            {isVerified && (
              <div className="w-4 h-4 rounded-full bg-[#FFAE00] flex items-center justify-center text-[#0E0E0E] shrink-0">
                <ShieldCheck className="w-2.5 h-2.5 stroke-[3px]" />
              </div>
            )}
            {/* Status Badge */}
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-0.5 rounded-full border select-none capitalize ${
                isVerified
                  ? "bg-green-success/15 text-green-success border-green-success/20"
                  : status.toLowerCase() === "suspended"
                  ? "bg-red-error/15 text-red-error border-red-error/20"
                  : "bg-yellow-warning/15 text-yellow-warning border-yellow-warning/20"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
              {status}
            </span>
          </div>

          <p className="text-[13px] font-normal text-light-gray/80 leading-none">
            {fullName} · {nationality}
          </p>

          <p className="text-[12px] font-normal text-light-gray/60 leading-none mt-0.5">
            {email}
          </p>

          {/* Genre tags & edit mode */}
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            {isEditingGenres ? (
              <div className="flex items-center gap-2 w-full max-w-[320px]">
                <input
                  type="text"
                  value={genreInput}
                  onChange={(e) => setGenreInput(e.target.value)}
                  placeholder="e.g. pop, hip-hop, r&b"
                  className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-[12px] text-white focus:outline-none focus:border-secondary flex-1"
                />
                <button
                  type="button"
                  disabled={updateGenresMutation.isPending}
                  onClick={handleSaveGenres}
                  className="p-1 rounded-md bg-secondary/20 hover:bg-secondary/30 text-secondary transition-colors cursor-pointer"
                  title="Save genres"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3px]" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingGenres(false)}
                  className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-light-gray transition-colors cursor-pointer"
                  title="Cancel"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                {currentGenres.map((genre, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] uppercase border border-white/10 bg-white/5 text-light-gray/80 px-2 py-0.5 rounded-full select-none font-medium"
                  >
                    {genre}
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => setIsEditingGenres(true)}
                  className="inline-flex items-center gap-1 text-[10px] text-light-gray/60 hover:text-white transition-colors cursor-pointer ml-1"
                >
                  <Edit2 className="w-3 h-3" /> Edit Genres
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Close button and dates */}
      <div className="flex flex-col items-end justify-between min-h-[80px] text-right shrink-0">
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-light-gray hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex flex-col gap-1 text-[11px] text-light-gray/50 mt-auto">
          <span>Created <strong>{joinedDate}</strong></span>
          <span>Submitted <strong>{appliedDate}</strong></span>
        </div>
      </div>
    </div>
  )
}

export default ArtistDetailHeader


