import { Disc3, Music, Users, Video } from "lucide-react"
import CommonGlassPanel from "@/components/shared/CommonGlassPanel"
import ProfileSectionHeader from "./ProfileSectionHeader"
import ProfileFavoritesGroup from "./ProfileFavoritesGroup"

const ProfileFavoritesSection = ({ profile }) => {
    return (
        <CommonGlassPanel className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-5">
            <ProfileSectionHeader
                title="Your Favorites"
                description="What you've saved across BeatX."
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <ProfileFavoritesGroup
                    icon={<Disc3 className="size-4" />}
                    title="Genres"
                    items={profile?.favoriteGenres}
                />
                <ProfileFavoritesGroup
                    icon={<Users className="size-4" />}
                    title="Artists"
                    items={profile?.favoriteArtists}
                />
                <ProfileFavoritesGroup
                    icon={<Music className="size-4" />}
                    title="Songs"
                    items={profile?.favoriteSongs}
                />
                <ProfileFavoritesGroup
                    icon={<Video className="size-4" />}
                    title="Videos"
                    items={profile?.favoriteVideos}
                />
            </div>
        </CommonGlassPanel>
    )
}

export default ProfileFavoritesSection
