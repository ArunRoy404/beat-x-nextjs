import { cn } from "@/lib/utils"

const PeopleAlsoLikeList = ({ people }) => {
    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-whitetext sm:text-2xl">People also like</h3>
                <span className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">Explore All</span>
            </div>
            <div className="flex flex-col gap-4">
                {people.map((person) => (
                    <div key={person.id} className="flex w-full items-center gap-4">
                        <img
                            alt={person.name}
                            src={person.avatar}
                            className="size-15 shrink-0 rounded-full object-cover"
                        />
                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                            <span className="truncate text-lg font-semibold text-whitetext sm:text-2xl">{person.name}</span>
                            <span className="text-sm text-light-gray">{person.role}</span>
                        </div>
                        <button
                            type="button"
                            className={cn(
                                "shrink-0 rounded-[32px] border px-5 py-3 text-sm font-semibold whitespace-nowrap sm:px-8 sm:py-4 sm:text-base",
                                person.isFollowing
                                    ? "border-background bg-light-gray text-background"
                                    : "border-secondary bg-secondary text-button-text"
                            )}
                        >
                            {person.isFollowing ? "Followed" : "Follow"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PeopleAlsoLikeList
