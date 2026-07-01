import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const CardAction = ({ children, href, className, onClick, ...props }) => {
  const baseClass = "px-3 py-1 rounded-[6px] bg-[#1E245766] backdrop-blur-[2.5px] text-xs text-secondary font-medium cursor-pointer hover:bg-[#1E2457aa] transition-colors inline-block text-center select-none"

  if (href) {
    return (
      <Link href={href} className={cn(baseClass, className)} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <div onClick={onClick} className={cn(baseClass, className)} {...props}>
      {children}
    </div>
  )
}

export default CardAction
