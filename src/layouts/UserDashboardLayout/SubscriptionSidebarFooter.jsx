import Link from "next/link"
import { ChevronRight, Crown } from "lucide-react"

const SubscriptionSidebarFooter = () => {
    return (
        <Link
            href="/subscription"
            className="flex w-full shrink-0 items-center gap-2 rounded-[8px] bg-(image:--button-bg) px-4 py-2 transition-all duration-300 group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0"
        >
            <Crown className="size-6 shrink-0 text-button-text" />
            <span className="flex flex-1 flex-col overflow-hidden transition-all duration-300 group-data-[state=collapsed]:w-0 group-data-[state=collapsed]:opacity-0">
                <span className="truncate text-sm text-button-text">Subscription</span>
                <span className="truncate text-xs text-dark-gray">Manage your Plan</span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-button-text group-data-[state=collapsed]:hidden" />
        </Link>
    )
}

export default SubscriptionSidebarFooter
