"use client"

import CommonMediaCard from "@/components/shared/CommonMediaCard"
import { usePlaySong } from "@/hooks/api/user/songs/usePlaySong"

const MixCard = ({ mix }) => {
    const { playSong } = usePlaySong()
    const song = mix?.song || mix

    return (
        <CommonMediaCard
            art={song?.coverUrl || song?.art || song?.artwork}
            title={song?.title}
            subtitle={song?.artist || song?.subtitle}
            className="w-full flex-1 cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            imgClassName="h-40 sm:h-56 md:h-64"
            onClick={() => playSong(song)}
        />
    )
}

export default MixCard

