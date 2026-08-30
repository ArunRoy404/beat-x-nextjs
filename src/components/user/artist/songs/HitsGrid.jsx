import HitCard from "@/components/user/artist/songs/HitCard"

const HitsGrid = ({ section }) => {
    return (
        <div className="flex w-full flex-col gap-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-whitetext sm:text-2xl">{section.title}</h3>
                <span className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">{section.viewAllLabel}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {section.items.map((hit) => (
                    <HitCard key={hit.id} hit={hit} />
                ))}
            </div>
        </div>
    )
}

export default HitsGrid
