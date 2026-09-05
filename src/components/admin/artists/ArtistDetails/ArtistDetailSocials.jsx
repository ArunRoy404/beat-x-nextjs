"use client"

import React from "react"
import { useUpdateArtistSocialChecklist } from "@/hooks/api/admin/artists/useUpdateArtistSocialChecklist"
import { toast } from "sonner"

const InternetIcon = () => (
  <div className="flex w-[26.25px] h-[26.25px] justify-center items-center shrink-0 bg-white/5 rounded-full">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <g clipPath="url(#clip0_1389_155085)">
        <path d="M11.7797 8.20312H9.29688C9.00679 8.20312 8.7286 8.31836 8.52348 8.52348C8.31836 8.7286 8.20312 9.00679 8.20312 9.29688V11.7797" stroke="white" strokeWidth="1.09375" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.82812 1.82617V2.73398C3.82812 3.16911 4.00098 3.5864 4.30865 3.89408C4.61633 4.20176 5.03363 4.37461 5.46875 4.37461C5.75883 4.37461 6.03703 4.48984 6.24215 4.69496C6.44727 4.90008 6.5625 5.17828 6.5625 5.46836C6.5625 6.06992 7.05469 6.56211 7.65625 6.56211C7.94633 6.56211 8.22453 6.44688 8.42965 6.24176C8.63477 6.03664 8.75 5.75844 8.75 5.46836C8.75 4.8668 9.24219 4.37461 9.84375 4.37461H11.5773" stroke="white" strokeWidth="1.09375" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.01562 12.0039V9.84375C6.01562 9.55367 5.90039 9.27547 5.69527 9.07035C5.49015 8.86523 5.21196 8.75 4.92187 8.75C4.63179 8.75 4.35359 8.63477 4.14848 8.42965C3.94336 8.22453 3.82812 7.94633 3.82812 7.65625V7.10938C3.82812 6.81929 3.71289 6.5411 3.50777 6.33598C3.30266 6.13086 3.02446 6.01562 2.73438 6.01562H1.12109" stroke="white" strokeWidth="1.09375" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5625 12.0312C9.58281 12.0312 12.0312 9.58281 12.0312 6.5625C12.0312 3.54219 9.58281 1.09375 6.5625 1.09375C3.54219 1.09375 1.09375 3.54219 1.09375 6.5625C1.09375 9.58281 3.54219 12.0312 6.5625 12.0312Z" stroke="white" strokeWidth="1.09375" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_1389_155085">
          <rect width="13.125" height="13.125" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  </div>
)

const SocialRow = ({ platform, link, isOptional = false, isChecked, onToggle, isPending }) => {
  const isLinked = link && link !== "Not provided"

  return (
    <div
      className="flex items-center justify-between p-4 gap-2 rounded-[16px] border border-[#ADAAAA]/10 bg-[#20201F]/20 backdrop-blur-md w-full"
    >
      <div className="flex items-center gap-3">
        <InternetIcon />
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[#6B6B6B] text-[13px] font-semibold font-sans leading-none">{platform}</span>
          <span className="text-[#ADAAAA] text-[11px] font-normal font-sans truncate">{link}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 select-none">
        {onToggle && (
          <button
            type="button"
            disabled={isPending}
            onClick={onToggle}
            className={`text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
              isChecked
                ? "bg-green-success/20 text-green-success border-green-success/30"
                : "bg-white/5 text-light-gray/60 border-white/10 hover:bg-white/10"
            }`}
          >
            {isChecked ? "Verified ✓" : "Verify"}
          </button>
        )}
        {isLinked ? (
          <span className="inline-flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-full border bg-green-success/15 text-green-success border-green-success/20">
            ✓ Linked
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-full border bg-white/5 text-light-gray/60 border-white/10">
            {isOptional ? "Optional" : "Required"}
          </span>
        )}
      </div>
    </div>
  )
}

const ArtistDetailSocials = ({ artist }) => {
  const verificationId = artist?._id || artist?.id
  const socials = artist?.socialLinks || {}
  const checklist = artist?.socialLinksChecklist || {}

  const updateSocialChecklistMutation = useUpdateArtistSocialChecklist()

  const currentSocialChecklist = {
    facebook: checklist.facebook ?? Boolean(socials.facebook),
    instagram: checklist.instagram ?? Boolean(socials.instagram),
    twitter: checklist.twitter ?? Boolean(socials.twitter),
    youtube: checklist.youtube ?? Boolean(socials.youtube),
  }

  const handleToggleSocial = async (platformKey) => {
    if (!verificationId) return
    const updatedData = {
      ...currentSocialChecklist,
      [platformKey]: !currentSocialChecklist[platformKey],
    }
    try {
      await updateSocialChecklistMutation.mutateAsync({
        id: verificationId,
        data: updatedData,
      })
      toast.success("Social links checklist updated.")
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to update social checklist.")
    }
  }

  return (
    <div className="p-4 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
      {/* Required Social Profiles */}
      <div className="flex flex-col gap-3">
        <h3 className="text-whitetext text-[18px] font-semibold font-sans leading-none">
          Required Social Profiles
        </h3>
        <div className="flex flex-col gap-3">
          <SocialRow
            platform="Facebook *"
            link={socials.facebook || "Not provided"}
            isChecked={currentSocialChecklist.facebook}
            onToggle={() => handleToggleSocial("facebook")}
            isPending={updateSocialChecklistMutation.isPending}
          />
          <SocialRow
            platform="Instagram *"
            link={socials.instagram || "Not provided"}
            isChecked={currentSocialChecklist.instagram}
            onToggle={() => handleToggleSocial("instagram")}
            isPending={updateSocialChecklistMutation.isPending}
          />
          <SocialRow
            platform="X (Twitter) *"
            link={socials.twitter || "Not provided"}
            isChecked={currentSocialChecklist.twitter}
            onToggle={() => handleToggleSocial("twitter")}
            isPending={updateSocialChecklistMutation.isPending}
          />
          <SocialRow
            platform="YouTube *"
            link={socials.youtube || "Not provided"}
            isChecked={currentSocialChecklist.youtube}
            onToggle={() => handleToggleSocial("youtube")}
            isPending={updateSocialChecklistMutation.isPending}
          />
        </div>
      </div>

      {/* Optional Social Profiles */}
      <div className="flex flex-col gap-3">
        <h3 className="text-whitetext text-[18px] font-semibold font-sans leading-none">
          Optional Social Profiles
        </h3>
        <div className="flex flex-col gap-3">
          <SocialRow platform="TikTok" link={socials.tiktok || "Not provided"} isOptional />
          <SocialRow platform="Official Website" link={socials.officialWebsite || "Not provided"} isOptional />
        </div>
      </div>

      {/* Music Platform Links */}
      <div className="flex flex-col gap-3">
        <h3 className="text-whitetext text-[18px] font-semibold font-sans leading-none">
          Music Platform Links
        </h3>
        <div className="flex flex-col gap-3">
          <SocialRow platform="Spotify" link={socials.spotify || "Not provided"} />
          <SocialRow platform="Apple Music" link={socials.appleMusic || "Not provided"} />
          <SocialRow platform="YouTube Music" link={socials.youtubeMusic || "Not provided"} />
          <SocialRow platform="SoundCloud" link={socials.soundcloud || "Not provided"} isOptional />
        </div>
      </div>
    </div>
  )
}

export default ArtistDetailSocials


