import { cn } from "@/lib/utils"

const sizeClasses = {
    sm: "size-10 p-[3px]",
    md: "size-12 p-1",
}

const GradientPlayButton = ({ size = "md", playing = false, className, iconClassName, onClick, type = "button", ...props }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            aria-label={playing ? "Pause" : "Play"}
            className={cn(
                "shrink-0 rounded-full bg-(image:--button-bg) drop-shadow-(--play-button-glow) flex items-center justify-center cursor-pointer",
                sizeClasses[size],
                className
            )}
            {...props}
        >
            <span className="flex size-full items-center justify-center rounded-full bg-background">
                {playing ? (
                    <svg
                        viewBox="0 0 14 18"
                        className={cn("w-3.5 h-4.5 text-button-text", iconClassName)}
                        fill="currentColor"
                    >
                        <rect x="1" y="1" width="4" height="16" rx="1" />
                        <rect x="9" y="1" width="4" height="16" rx="1" />
                    </svg>
                ) : (
                    <svg
                        viewBox="0 0 14 18"
                        className={cn("w-3.5 h-4.5 text-button-text", iconClassName)}
                        fill="currentColor"
                    >
                        <path d="M1 1.6c0-.9 1-1.4 1.7-.9l10 7.4c.6.4.6 1.3 0 1.8l-10 7.4c-.7.5-1.7 0-1.7-.9V1.6Z" />
                    </svg>
                )}
            </span>
        </button>
    )
}

export default GradientPlayButton
