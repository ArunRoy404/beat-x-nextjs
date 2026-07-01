import React from "react"
import DashboardStatCard from "./DashboardStatCard"

const DashboardStats = ({ statsCards }) => {
    if (!Array.isArray(statsCards)) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((card, index) => (
                <DashboardStatCard key={card?.id || index} card={card} />
            ))}
        </div>
    )
}

export default DashboardStats