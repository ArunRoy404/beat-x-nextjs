import Image from "next/image"
import { Check, Pause, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

const DownloadRow = ({ item }) => {
    const isDownloading = item.status === "downloading"

    return (
        <div className="flex w-full flex-col items-start gap-4 rounded-[12px] border border-slate-700/50 bg-slate-800/40 p-4.5 backdrop-blur-[10px] sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-[8px]">
                    <Image src={item.art} alt={item.title} fill sizes="48px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-base font-black text-whitetext">{item.title}</span>
                    <span className="truncate text-base text-light-gray">{item.artist} • {item.type}</span>
                </div>
            </div>

            <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end sm:gap-8">
                <span
                    className={cn(
                        "shrink-0 rounded-[4px] border px-2.25 py-1 text-xs font-black",
                        item.formatTone === "secondary" ? "border-secondary/40 text-secondary" : "border-dark-gray text-whitetext"
                    )}
                >
                    {item.format}
                </span>

                <span className="shrink-0 text-base text-whitetext">{item.size}</span>

                <div className="flex shrink-0 items-center gap-4">
                    {isDownloading ? (
                        <>
                            <div className="h-1 w-24 overflow-hidden rounded-full bg-dark-accent">
                                <div className="h-full rounded-full bg-secondary shadow-[0px_0px_12px_0px_rgba(0,220,229,0.5)]" style={{ width: `${item.progress}%` }} />
                            </div>
                            <Pause className="size-5 text-secondary" fill="currentColor" />
                        </>
                    ) : (
                        <>
                            <Check className="size-5 rounded-full bg-secondary/20 p-1 text-secondary" />
                            <button type="button" aria-label="More options" className="cursor-pointer text-light-gray hover:text-whitetext">
                                <MoreVertical className="size-4" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DownloadRow
