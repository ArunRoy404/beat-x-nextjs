import React from "react"

const BARS = [
    { height: 10, color: "#3ADFFA" },
    { height: 22, color: "#CC97FF" },
    { height: 14, color: "#3ADFFA" },
    { height: 26, color: "#FFAE00" },
    { height: 16, color: "#CC97FF" },
]

const SonicFrequencyWidget = () => {
    return (
        <div className="absolute bottom-6 left-6 z-10 flex flex-col items-center gap-1.5 px-4 py-3 rounded-[16px] border border-white/10 bg-black/40 backdrop-blur-sm select-none">
            <div className="flex items-end gap-1 h-[26px]">
                {BARS.map((bar, index) => (
                    <span
                        key={index}
                        className="w-[3px] rounded-full"
                        style={{ height: `${bar.height}px`, backgroundColor: bar.color }}
                    />
                ))}
            </div>
            <span className="text-white/50 text-[9px] font-medium tracking-wider whitespace-nowrap">
                SONIC FREQUENCY 44.1KHZ
            </span>
        </div>
    )
}

export default SonicFrequencyWidget
