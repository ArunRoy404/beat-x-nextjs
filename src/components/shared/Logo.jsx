import Image from "next/image"
import { cn } from "@/lib/utils"

const Logo = ({ variant = "default", className, ...props }) => {
    const isFav = variant === "fav"
    const src = isFav ? "/logo/logo_fav.png" : "/logo/logo.png"
    const width = isFav ? 54 : 162

    return (
        <Image
            src={src}
            alt="BeatX Logo"
            width={width}
            height={width}
            className={cn("object-contain max-w-full h-auto", className)}
            priority
            {...props}
        />
    )
}

export default Logo 