import ActiveSeriesGrid from "@/components/user/artist/podcast/ActiveSeriesGrid"
import RecentEpisodesList from "@/components/user/artist/podcast/RecentEpisodesList"
import PeopleAlsoLikeList from "@/components/user/artist/PeopleAlsoLikeList"

const PodcastTab = ({ artist }) => {
    return (
        <div className="flex w-full flex-col gap-8">
            <ActiveSeriesGrid section={artist.podcastTab.activeSeries} />
            <div className="flex w-full flex-col gap-8 lg:flex-row">
                <div className="flex-1">
                    <RecentEpisodesList section={artist.podcastTab.recentEpisodes} />
                </div>
                <div className="w-full lg:w-100 lg:shrink-0">
                    <PeopleAlsoLikeList people={artist.peopleAlsoLike} />
                </div>
            </div>
        </div>
    )
}

export default PodcastTab
