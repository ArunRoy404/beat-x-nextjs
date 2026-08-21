import { ArrowRight, Calendar, MapPin } from "lucide-react"
import { useUserTicketsStore } from "@/zustandStore/user/userStore/userTicketsStore"

const TicketsHeroSection = () => {
    const ticketsHero = useUserTicketsStore((state) => state.ticketsHero)
    const ticketPromos = useUserTicketsStore((state) => state.ticketPromos)

    return (
        <div className="flex w-full flex-col gap-6 lg:flex-row">
            <div
                className="relative flex min-h-[360px] w-full flex-1 flex-col justify-end overflow-hidden rounded-[16px] border border-white/10 p-6 sm:p-10"
                style={{ backgroundImage: `url(${ticketsHero.artwork})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
                <div className="flex flex-col gap-4">
                    <span className="w-fit rounded-full bg-trending-badge-bg px-3 py-1 text-xs text-trending-badge-text">
                        {ticketsHero.badge}
                    </span>
                    <h1 className="text-3xl leading-tight font-semibold whitespace-pre-line text-whitetext sm:text-5xl">
                        {ticketsHero.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6">
                        <span className="flex items-center gap-1 text-sm font-semibold text-secondary sm:text-base">
                            <MapPin className="size-5" />
                            {ticketsHero.location}
                        </span>
                        <span className="flex items-center gap-1 text-sm font-semibold text-light-gray sm:text-base">
                            <Calendar className="size-5" />
                            {ticketsHero.dates}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            type="button"
                            className="flex cursor-pointer items-center gap-2 rounded-[32px] bg-secondary px-6 py-3 text-sm font-semibold text-button-text transition-transform active:scale-95 sm:px-8 sm:py-4 sm:text-base"
                        >
                            GET TICKETS
                            <ArrowRight className="size-5" />
                        </button>
                        <button
                            type="button"
                            className="cursor-pointer rounded-full border border-white/10 bg-(--glass-panel-bg) px-6 py-3 text-sm font-semibold text-whitetext backdrop-blur-md transition-transform active:scale-95 sm:px-8 sm:py-4 sm:text-base"
                        >
                            WATCH TEASER
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-col gap-6 lg:w-93">
                {ticketPromos.map((promo, index) => (
                    <div
                        key={promo.id}
                        className="relative flex min-h-40 w-full flex-1 flex-col justify-end overflow-hidden rounded-[16px] border border-dark-gray p-4"
                        style={{ backgroundImage: `url(${promo.art})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="relative flex flex-col gap-2">
                            <span
                                className={
                                    index === 0
                                        ? "w-fit rounded-full bg-trending-badge-bg/5 px-2 py-1 text-xs text-trending-badge-bg"
                                        : "w-fit rounded-full bg-secondary/5 px-2 py-1 text-xs text-secondary"
                                }
                            >
                                {promo.tag}
                            </span>
                            <span className="text-xl font-semibold whitespace-pre-line text-whitetext sm:text-2xl">
                                {promo.title}
                            </span>
                            <button
                                type="button"
                                className={
                                    index === 0
                                        ? "flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-trending-badge-bg"
                                        : "flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-secondary"
                                }
                            >
                                {promo.cta}
                                <ArrowRight className="size-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TicketsHeroSection
