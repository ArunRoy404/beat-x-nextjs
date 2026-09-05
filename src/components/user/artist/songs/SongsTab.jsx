import BestSongsList from "@/components/user/artist/songs/BestSongsList"
import HitsGrid from "@/components/user/artist/songs/HitsGrid"
import TourDatesList from "@/components/user/artist/songs/TourDatesList"
import PeopleAlsoLikeList from "@/components/user/artist/PeopleAlsoLikeList"

const SongsTab = ({ artist }) => {
    return (
        <div className="flex w-full flex-col gap-8">
            <BestSongsList section={artist.songsTab.bestSongs} />
            <HitsGrid section={artist.songsTab.hits} />
            <div className="flex w-full flex-col gap-8 lg:flex-row">
                <div className="flex-1">
                    <TourDatesList section={artist.songsTab.tourDates} />
                </div>
                <div className="w-full lg:w-100 lg:shrink-0">
                    <PeopleAlsoLikeList people={artist.peopleAlsoLike} />
                </div>
            </div>
        </div>
    )
}

export default SongsTab
