"use client"

import { useState } from "react"
import { useUserCheckoutStore } from "@/zustandStore/user/userStore/userCheckoutStore"

const CheckoutField = ({ label, value, onChange }) => (
    <div className="flex w-full flex-1 flex-col gap-2">
        <label className="text-sm font-medium text-light-gray sm:text-base">{label}</label>
        <div className="w-full rounded-[16px] border border-light-gray bg-background/40 p-3.5 sm:p-4">
            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full bg-transparent text-sm text-light-gray outline-none sm:text-base"
            />
        </div>
    </div>
)

const CheckoutShippingForm = () => {
    const defaults = useUserCheckoutStore((state) => state.checkoutShippingDefaults)
    const [fields, setFields] = useState(defaults)

    const updateField = (key) => (value) => setFields((prev) => ({ ...prev, [key]: value }))

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex w-full items-center gap-2">
                <div className="flex w-8 items-center justify-center">
                    <span className="text-2xl font-black text-dark-gray">01</span>
                </div>
                <h2 className="flex-1 text-2xl font-black text-whitetext">SHIPPING DETAILS</h2>
            </div>

            <div className="flex w-full flex-col items-start gap-4 sm:flex-row">
                <CheckoutField label="First Name" value={fields.firstName} onChange={updateField("firstName")} />
                <CheckoutField label="Last Name" value={fields.lastName} onChange={updateField("lastName")} />
            </div>

            <CheckoutField label="Shipping Address" value={fields.address} onChange={updateField("address")} />

            <div className="flex w-full flex-col items-start gap-4 sm:flex-row">
                <CheckoutField label="City" value={fields.city} onChange={updateField("city")} />
                <CheckoutField label="Postal Code" value={fields.postalCode} onChange={updateField("postalCode")} />
            </div>
        </div>
    )
}

export default CheckoutShippingForm
