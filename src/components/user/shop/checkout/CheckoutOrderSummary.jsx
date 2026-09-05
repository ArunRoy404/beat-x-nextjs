"use client"

import { useState } from "react"
import { Lock } from "lucide-react"
import { useUserCheckoutStore } from "@/zustandStore/user/userStore/userCheckoutStore"

const tagColorClasses = {
    secondary: "text-secondary",
    primary: "text-primary",
}

const CheckoutOrderSummary = ({ onConfirm }) => {
    const orderSummaryItems = useUserCheckoutStore((state) => state.orderSummaryItems)
    const totals = useUserCheckoutStore((state) => state.orderSummaryTotals)
    const [promoCode, setPromoCode] = useState("")

    return (
        <div className="relative flex w-full shrink-0 flex-col gap-6 overflow-hidden rounded-[24px] bg-dark-accent p-4 backdrop-blur-[12px] sm:p-6 lg:w-102.25">
            <div aria-hidden className="pointer-events-none absolute top-[117px] right-[73px] size-48 rounded-full bg-primary/20 blur-[50px]" />

            <h2 className="relative text-3xl font-black text-whitetext sm:text-4xl">Order Summary</h2>

            {orderSummaryItems.map((item) => (
                <div key={item.id} className="relative flex w-full items-center gap-4">
                    <div className="size-15 shrink-0 overflow-hidden rounded-[16px]">
                        <img src={item.thumbnail} alt={item.name} className="size-full object-cover" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="text-2xl font-semibold text-whitetext">{item.name}</span>
                        <span className={`text-xs ${tagColorClasses[item.tagColor] || "text-secondary"}`}>{item.tag}</span>
                        <span className="text-xs text-light-gray">Quantity: {item.quantity}</span>
                    </div>
                    <span className="shrink-0 text-base font-black text-secondary">${item.price.toFixed(2)}</span>
                </div>
            ))}

            <div className="relative flex w-full flex-col gap-4 border-t border-light-gray pt-8.25">
                <div className="flex flex-col gap-2 border-b border-light-gray pb-4">
                    <div className="flex items-center justify-between text-light-gray">
                        <span className="text-base">Sub-total</span>
                        <span className="text-xl">${totals.subTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-base text-light-gray">VAT (%)</span>
                        <span className="bg-(image:--button-bg) bg-clip-text text-xl text-transparent">
                            {totals.vat ? `$${totals.vat.toFixed(2)}` : "Free"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-light-gray">
                        <span className="text-base">Shipping Fee</span>
                        <span className="text-xl">${totals.shippingFee.toFixed(2)}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between text-whitetext">
                    <span className="text-2xl">Total</span>
                    <span className="text-2xl font-semibold">${totals.total.toFixed(2)}</span>
                </div>
            </div>

            <button
                type="button"
                onClick={onConfirm}
                className="relative w-full cursor-pointer rounded-[32px] bg-(image:--button-bg) px-8 py-4 text-base font-semibold text-button-text transition-transform active:scale-95"
            >
                Confirm Order
            </button>

            <div className="relative flex w-full items-center justify-center gap-2">
                <Lock className="size-4 text-light-gray" />
                <span className="text-xs text-light-gray">ENCRYPTED SECURE TRANSACTION</span>
            </div>

            <div className="relative flex w-full items-start gap-2">
                <div className="flex min-w-0 flex-1 items-center overflow-hidden rounded-full border border-light-gray p-3.5 sm:p-4">
                    <input
                        value={promoCode}
                        onChange={(event) => setPromoCode(event.target.value)}
                        placeholder="Enter promo code"
                        className="w-full min-w-0 bg-transparent text-sm text-light-gray outline-none placeholder:text-light-gray sm:text-base"
                    />
                </div>
                <button
                    type="button"
                    className="shrink-0 cursor-pointer rounded-[32px] bg-background px-5 py-3.5 text-sm font-semibold text-whitetext sm:px-8 sm:py-4 sm:text-base"
                >
                    Add
                </button>
            </div>
        </div>
    )
}

export default CheckoutOrderSummary
