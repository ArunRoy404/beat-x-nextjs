const VideoDescriptionBox = ({ video }) => {
    return (
        <div className="flex w-full flex-col gap-4 rounded-[16px] bg-dark-accent p-4">
            <p className="text-base font-semibold text-whitetext">{video.descriptionTitle ?? video.title}</p>
            <p className="text-sm whitespace-pre-line text-light-gray">{video.description}</p>
            {video.hashtags?.length > 0 && (
                <div className="flex flex-wrap gap-4">
                    {video.hashtags.map((hashtag) => (
                        <span
                            key={hashtag}
                            className="cursor-pointer rounded-full bg-tag-chip-bg px-3 py-1 text-xs text-light-gray"
                        >
                            {hashtag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}

export default VideoDescriptionBox
