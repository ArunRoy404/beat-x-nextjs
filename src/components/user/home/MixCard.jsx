import CommonMediaCard from "@/components/shared/CommonMediaCard"

const MixCard = ({ mix }) => {
    return (
        <CommonMediaCard
            art={mix.art}
            title={mix.title}
            subtitle={mix.subtitle}
            className="flex-1 basis-40"
            imgClassName="h-40 sm:h-56 md:h-64"
        />
    )
}

export default MixCard
