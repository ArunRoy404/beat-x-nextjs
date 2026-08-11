import React from "react"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import CommonTableStatus from "@/components/shared/CommonTable/CommonTableStatus"

const TopTracksTable = ({ data = [], viewAllHref = "/artist/dashboard/music" }) => {
    return (
        <CommonCard
            title="Top Tracks"
            subtitle="Your best performing tracks"
            link={{ text: "View All", href: viewAllHref }}
            className="flex flex-col gap-4 h-[380px] w-full"
        >
            <div className="flex-1 overflow-y-auto z-10 relative custom-scrollbar">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-left text-dark-gray text-[11px] uppercase tracking-wider">
                            <th className="font-normal pb-3 pr-2">#</th>
                            <th className="font-normal pb-3 pr-2">Episode</th>
                            <th className="font-normal pb-3 pr-2 hidden sm:table-cell">Series</th>
                            <th className="font-normal pb-3 pr-2">Listeners</th>
                            <th className="font-normal pb-3 pr-2">Revenue</th>
                            <th className="font-normal pb-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((track, index) => (
                            <tr key={track.id} className="border-t border-white/[0.05]">
                                <td className="py-3 pr-2 text-light-gray text-[13px]">
                                    {String(index + 1).padStart(2, "0")}
                                </td>
                                <td className="py-3 pr-2 text-whitetext text-[13px] font-medium">
                                    {track.title}
                                </td>
                                <td className="py-3 pr-2 text-light-gray text-[13px] hidden sm:table-cell">
                                    {track.series}
                                </td>
                                <td className="py-3 pr-2 text-light-gray text-[13px]">
                                    {track.listeners}
                                </td>
                                <td className="py-3 pr-2 text-green-success text-[13px] font-medium">
                                    ৳{track.revenue}
                                </td>
                                <td className="py-3">
                                    <CommonTableStatus status={track.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CommonCard>
    )
}

export default TopTracksTable
