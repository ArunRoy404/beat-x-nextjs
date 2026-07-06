import React from "react"
import DashboardStatCard from "./DashboardStatCard"
import { cn } from "@/lib/utils";

const DashboardStats = ({ statsCards, className }) => {
    if (!Array.isArray(statsCards)) return null;

    return (
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
            {statsCards.map((card, index) => (
                <DashboardStatCard key={card?.id || index} card={card} />
            ))}
        </div>
    )
}

export default DashboardStats