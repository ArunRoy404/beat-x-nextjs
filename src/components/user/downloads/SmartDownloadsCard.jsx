import { ArrowRight, Sparkles } from "lucide-react"

const SmartDownloadsCard = ({ smartDownloads }) => {
    const { title, description, ctaLabel } = smartDownloads

    return (
        <div className="flex w-full flex-col items-start gap-4 rounded-[16px] border border-dark-gray bg-dark-accent p-6 lg:w-98 lg:shrink-0">
            <span className="flex size-12 items-center justify-center rounded-[12px] bg-primary/20 text-primary">
                <Sparkles className="size-5.5" />
            </span>
            <h3 className="text-2xl font-semibold text-light-whitetext">{title}</h3>
            <p className="text-sm text-light-gray">{description}</p>
            <button type="button" className="flex cursor-pointer items-center gap-2 text-base text-secondary hover:underline">
                {ctaLabel}
                <ArrowRight className="size-4" />
            </button>
        </div>
    )
}

export default SmartDownloadsCard
