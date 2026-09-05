import Image from "next/image"
import { cn } from "@/lib/utils"

const CATEGORY_TONE_CLASSNAMES = {
    secondary: "text-secondary",
    primary: "text-primary",
    green: "text-green-success",
    neutral: "text-light-gray",
}

const NotificationRow = ({ notification }) => {
    const { category, categoryTone, timestamp, message, messageParts, thumbnail, unread } = notification

    return (
        <div className="relative flex w-full items-start gap-4 rounded-[8px] border border-dark-gray bg-background/60 px-4 py-2 backdrop-blur-[2.5px]">
            <div
                className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-(--auth-wide-outer-border)"
                style={thumbnail.type === "icon" ? { background: thumbnail.bg } : undefined}
            >
                {thumbnail.type === "image" ? (
                    <Image src={thumbnail.src} alt="" width={48} height={48} className="size-full object-cover" />
                ) : (
                    <Image src={thumbnail.src} alt="" width={20} height={20} />
                )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2 py-2">
                <div className="flex w-full items-center justify-between gap-2 text-sm whitespace-nowrap">
                    {categoryTone === "gradient" ? (
                        <span className="bg-gradient-to-l from-secondary to-[#b1fe4d] bg-clip-text text-transparent">{category}</span>
                    ) : (
                        <span className={CATEGORY_TONE_CLASSNAMES[categoryTone]}>{category}</span>
                    )}
                    <span className="text-light-gray">{timestamp}</span>
                </div>

                <p className="w-full text-base text-whitetext">
                    {messageParts
                        ? messageParts.map((part, index) => (
                              <span key={index} className={cn(part.className)}>
                                  {part.text}
                              </span>
                          ))
                        : message}
                </p>
            </div>

            {unread && (
                <span className="absolute top-1.75 right-1.75 size-2 rounded-full bg-secondary shadow-[0px_0px_8px_0px_#00dce5]" />
            )}
        </div>
    )
}

export default NotificationRow
