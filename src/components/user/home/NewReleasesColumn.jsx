"use client"

import { useUserHomeStore } from "@/zustandStore/user/userStore/userHomeStore"
import ReleaseListItem from "./ReleaseListItem"

const NewReleasesColumn = () => {
    const newReleases = useUserHomeStore((state) => state.newReleases)

    return (
        <section className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl text-whitetext sm:text-[32px]">New Releases</h2>
                <button type="button" className="shrink-0 cursor-pointer text-sm text-secondary sm:text-base">
                    Explore More
                </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {newReleases.map((release) => (
                    <ReleaseListItem key={release.id} release={release} />
                ))}
            </div>
        </section>
    )
}

export default NewReleasesColumn
