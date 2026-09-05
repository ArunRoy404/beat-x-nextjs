"use client"

import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { userCheckoutAssets } from "@/dummyData/user/userCheckoutAssets"

const CheckoutSuccessModal = ({ open, onOpenChange, onGoBackToShop }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="w-full max-w-85.75 gap-6 rounded-[40px] border border-dark-gray bg-background p-6 shadow-[0px_0px_10px_0px_rgba(204,151,255,0.12)] sm:rounded-[48px] sm:p-6.25"
            >
                <DialogTitle className="sr-only">Order confirmed</DialogTitle>
                <div className="flex w-full flex-col items-center gap-4">
                    <Image src={userCheckoutAssets.successCheck} alt="" width={179} height={178} className="h-36 w-36.25 sm:h-44.5 sm:w-44.75" />
                    <div className="flex w-full flex-col items-center gap-2">
                        <span className="text-3xl font-medium text-secondary sm:text-4xl">Congratulations!</span>
                        <span className="text-center text-sm text-light-gray sm:text-base">Your Order has been placed</span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onGoBackToShop}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[32px] border border-light-gray py-2 text-base font-semibold text-whitetext"
                >
                    <ArrowLeft className="size-6" />
                    Go Back to Shop
                </button>
            </DialogContent>
        </Dialog>
    )
}

export default CheckoutSuccessModal
