"use client"

import { useUserSubscriptionStore } from "@/zustandStore/user/userStore/userSubscriptionStore"

const SubscriptionInquiries = () => {
    const faqs = useUserSubscriptionStore((state) => state.subscriptionFaqs)
    const brandFooter = useUserSubscriptionStore((state) => state.subscriptionBrandFooter)

    return (
        <div className="flex w-full flex-col items-start gap-6 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-col gap-6">
                <h2 className="text-3xl font-black text-whitetext sm:text-4xl">Subscription Inquiries</h2>
                <div className="flex w-full flex-col gap-6">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="flex w-full flex-col gap-2">
                            <h3 className="text-xl font-semibold text-whitetext sm:text-2xl">{faq.question}</h3>
                            <p className="text-sm text-light-gray sm:text-base">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-6 lg:items-end lg:text-right lg:whitespace-nowrap">
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-semibold text-primary sm:text-[32px]">{brandFooter.name}</span>
                    <span className="text-sm text-light-gray sm:text-base">{brandFooter.tagline}</span>
                </div>
                <div className="flex items-start justify-start gap-6 text-sm text-light-gray sm:text-base lg:justify-end">
                    {brandFooter.links.map((link) => (
                        <span key={link}>{link}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SubscriptionInquiries
