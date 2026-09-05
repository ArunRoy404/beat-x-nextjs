import React from "react"
import { cn } from "@/lib/utils"

const WizardStepDots = ({ steps, activeIndex }) => {
    return (
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-2.5">
                {steps.map((step, index) => (
                    <React.Fragment key={step}>
                        {index > 0 && (
                            <span
                                className={cn("h-0.5 w-6 shrink-0", index - 1 >= activeIndex && "bg-light-gray")}
                                style={index - 1 < activeIndex ? { background: "var(--button-bg)" } : undefined}
                            />
                        )}
                        <span
                            className={cn("size-3 shrink-0 rounded-full", index === activeIndex && "bg-secondary", index > activeIndex && "bg-light-gray")}
                            style={index < activeIndex ? { background: "var(--button-bg)" } : undefined}
                        />
                    </React.Fragment>
                ))}
            </div>

            <span className="pl-2 text-light-gray text-[14px] font-normal whitespace-nowrap">{steps[activeIndex]}</span>
        </div>
    )
}

export default WizardStepDots
