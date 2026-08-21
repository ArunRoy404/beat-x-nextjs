import { Sparkles } from "lucide-react"
import { useUserTicketsStore } from "@/zustandStore/user/userStore/userTicketsStore"

const VirtualDimensionsBanner = () => {
    const virtualDimensions = useUserTicketsStore((state) => state.virtualDimensions)

    return (
        <div className="relative flex w-full flex-col gap-6 overflow-hidden rounded-[32px] border border-white/10 bg-(--glass-panel-bg) p-6 backdrop-blur-md sm:p-10 lg:flex-row">
            <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-secondary/10 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative flex min-w-0 flex-1 flex-col gap-4">
                <span className="flex items-center gap-2 text-sm font-black text-secondary">
                    <Sparkles className="size-5" />
                    {virtualDimensions.eyebrow}
                </span>
                <h2 className="text-3xl leading-tight font-semibold text-whitetext sm:text-5xl">
                    <span className="block">{virtualDimensions.titleLine1}</span>
                    <span>
                        {virtualDimensions.titleLine2Prefix}
                        <span className="text-primary">{virtualDimensions.titleLine2Highlight}</span>
                    </span>
                </h2>
                <p className="max-w-md text-sm text-light-gray sm:text-base">{virtualDimensions.description}</p>
                <div className="flex items-center gap-6">
                    {virtualDimensions.stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-1">
                            <span className="text-2xl font-black text-whitetext">{stat.value}</span>
                            <span className="text-xs text-light-gray">{stat.label}</span>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    className="w-fit cursor-pointer rounded-[32px] bg-primary px-8 py-4 text-sm font-semibold text-button-text transition-transform active:scale-95"
                >
                    {virtualDimensions.cta}
                </button>
            </div>

            <div className="relative h-64 w-full shrink-0 overflow-hidden rounded-[16px] lg:h-auto lg:w-131">
                <img alt="" src={virtualDimensions.artwork} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-white/20" />
            </div>
        </div>
    )
}

export default VirtualDimensionsBanner
