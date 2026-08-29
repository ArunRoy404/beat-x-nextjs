"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import CheckoutShippingForm from "@/components/user/shop/checkout/CheckoutShippingForm"
import CheckoutPaymentMethod from "@/components/user/shop/checkout/CheckoutPaymentMethod"
import CheckoutOrderSummary from "@/components/user/shop/checkout/CheckoutOrderSummary"
import CheckoutSuccessModal from "@/components/user/shop/checkout/CheckoutSuccessModal"

const UserCheckoutPage = () => {
    const router = useRouter()
    const [showSuccess, setShowSuccess] = useState(false)

    return (
        <div className="flex w-full flex-col gap-6 py-6">
            <div className="flex flex-col items-start gap-2">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex cursor-pointer items-center gap-2"
                >
                    <span className="flex size-10 items-center justify-center rounded-full border border-light-gray">
                        <ArrowLeft className="size-5 text-whitetext" />
                    </span>
                    <span className="text-base text-light-gray">Return to Library</span>
                </button>
                <h1 className="text-3xl font-black text-whitetext sm:text-4xl lg:text-[40px]">Secure Checkout</h1>
                <p className="text-sm text-light-gray sm:text-base">Complete your transaction to unlock your high-fidelity soundscape.</p>
            </div>

            <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:gap-12">
                <div className="flex w-full flex-1 flex-col gap-6">
                    <CheckoutShippingForm />
                    <CheckoutPaymentMethod />
                </div>

                <CheckoutOrderSummary onConfirm={() => setShowSuccess(true)} />
            </div>

            <CheckoutSuccessModal
                open={showSuccess}
                onOpenChange={setShowSuccess}
                onGoBackToShop={() => {
                    setShowSuccess(false)
                    router.push("/shop")
                }}
            />
        </div>
    )
}

export default UserCheckoutPage
