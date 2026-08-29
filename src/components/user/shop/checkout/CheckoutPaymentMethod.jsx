"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useUserCheckoutStore } from "@/zustandStore/user/userStore/userCheckoutStore"
import { userCheckoutAssets } from "@/dummyData/user/userCheckoutAssets"

const CheckoutPaymentMethod = () => {
    const paymentMethods = useUserCheckoutStore((state) => state.checkoutPaymentMethods)
    const cardDefaults = useUserCheckoutStore((state) => state.checkoutCardDefaults)
    const [activeMethod, setActiveMethod] = useState(paymentMethods[0]?.id)

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex w-full items-center gap-2">
                <div className="flex w-8 items-center justify-center">
                    <span className="text-2xl font-black text-dark-gray">02</span>
                </div>
                <h2 className="flex-1 text-2xl font-black text-whitetext">Payment Method</h2>
            </div>

            <div className="flex w-full flex-wrap items-start gap-3 sm:gap-4">
                {paymentMethods.map((method) => (
                    <button
                        key={method.id}
                        type="button"
                        onClick={() => setActiveMethod(method.id)}
                        className={cn(
                            "flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] bg-background px-3.5 py-2 text-sm font-semibold text-whitetext transition-colors sm:px-4 sm:text-base",
                            activeMethod === method.id ? "border border-whitetext" : "border border-transparent"
                        )}
                    >
                        <Image src={method.icon} alt="" width={24} height={24} className="size-5 sm:size-6" />
                        {method.label}
                    </button>
                ))}
            </div>

            <div className="flex w-full flex-col gap-2">
                <label className="text-sm font-medium text-light-gray sm:text-base">Card Number</label>
                <div className="flex w-full items-center justify-between gap-2 rounded-[16px] border border-field-border-light px-4 py-3.5 sm:px-8 sm:py-4">
                    <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
                        <Image src={userCheckoutAssets.paymentIcons.visa} alt="Visa" width={44} height={14} className="h-3.5 w-11 shrink-0" />
                        <span className="flex-1 truncate text-sm text-whitetext sm:text-base">{cardDefaults.maskedNumber}</span>
                    </div>
                    <button type="button" aria-label="Edit card number" className="shrink-0 cursor-pointer">
                        <Image src={userCheckoutAssets.edit} alt="" width={24} height={24} className="size-6" />
                    </button>
                </div>
            </div>

            <div className="flex w-full flex-col items-start gap-4 sm:flex-row">
                <div className="flex w-full flex-1 flex-col gap-2">
                    <label className="text-sm font-medium text-light-gray sm:text-base">Expiry Date</label>
                    <div className="w-full rounded-[16px] border border-light-gray bg-background/40 p-3.5 sm:p-4">
                        <span className="text-sm text-light-gray sm:text-base">{cardDefaults.expiryDate}</span>
                    </div>
                </div>
                <div className="flex w-full flex-1 flex-col gap-2">
                    <label className="text-sm font-medium text-light-gray sm:text-base">CVV</label>
                    <div className="w-full rounded-[16px] border border-light-gray bg-background/40 p-3.5 sm:p-4">
                        <span className="text-sm text-light-gray sm:text-base">{cardDefaults.cvv}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPaymentMethod
