"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const BackOrHomeButton = ({ className, children = "Go Back", ...props }) => {
    const router = useRouter()

    const handleClick = () => {
        if (window.history.length > 1) {
            router.back()
        } else {
            router.push("/")
        }
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className={cn(buttonVariants({ variant: "gradient" }), className)}
            {...props}
        >
            {children}
        </button>
    )
}

export default BackOrHomeButton
