import React from "react"
import { Play } from "lucide-react"

const PlayButton = ({ className = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-[56px] h-[56px] justify-center items-center shrink-0 rounded-full bg-secondary hover:bg-secondary/90 text-background shadow-[0_0_10px_0_rgba(204,151,255,0.20)] transition-all hover:scale-105 active:scale-95 border-none cursor-pointer ${className}`}
    >
      <Play className="w-5 h-5 fill-current text-[#004B56]" />
    </button>
  )
}

export default PlayButton
