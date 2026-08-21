"use client"

import { Sparkles } from "lucide-react"
import CommonGlassPanel from "@/components/shared/CommonGlassPanel"
import { useUserLibraryStore } from "@/zustandStore/user/userStore/userLibraryStore"

const DiscoveryPrismCard = () => {
    const discoveryPrism = useUserLibraryStore((state) => state.discoveryPrism)

    return (
        <CommonGlassPanel className="relative flex w-full flex-1 flex-col justify-center gap-4 overflow-hidden border-primary/15 bg-primary/10 p-4.25">
            <div aria-hidden className="pointer-events-none absolute top-1/2 -right-8 size-62 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
            <Sparkles className="relative size-8 text-primary" />
            <div className="relative flex flex-col gap-4">
                <span className="text-[32px] text-whitetext">{discoveryPrism.title}</span>
                <span className="text-sm text-light-gray">{discoveryPrism.subtitle}</span>
            </div>
        </CommonGlassPanel>
    )
}

export default DiscoveryPrismCard
