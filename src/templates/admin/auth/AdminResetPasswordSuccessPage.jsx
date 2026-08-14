"use client"

import React from "react"
import Link from "next/link"
import { Check, ArrowLeft } from "lucide-react"

const AdminResetPasswordSuccessPage = () => {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            {/* Ambient glow blobs */}
            <div className="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/3 -right-24 w-72 h-72 rounded-full bg-secondary/20 blur-[100px] pointer-events-none" />

            {/* Card */}
            <div className="relative z-10 flex flex-col items-center gap-4 px-10 py-10 rounded-[24px] border border-white/10 bg-[#0E0E0E] shadow-2xl">
                {/* Checkmark + decorative dots */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                    <span className="absolute top-1 left-3 w-2 h-2 rounded-full bg-green-success" />
                    <span className="absolute top-4 right-1 w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span className="absolute bottom-2 left-0 w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span className="absolute bottom-4 right-2 w-2 h-2 rounded-full bg-green-success" />
                    <span className="absolute top-0 right-8 w-1 h-1 rounded-full bg-green-success" />

                    <div className="w-20 h-20 rounded-full border-2 border-green-success flex items-center justify-center">
                        <Check className="w-9 h-9 text-green-success stroke-[2.5px]" />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-secondary text-[24px] font-semibold not-italic">
                        Congratulations!
                    </h1>
                    <p className="text-light-gray text-[14px] font-normal">
                        Your password has been reset successfully.
                    </p>
                </div>

                <Link
                    href="/admin/login"
                    className="mt-2 flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-whitetext text-[13px] font-medium hover:bg-white/5 transition-colors"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Login
                </Link>
            </div>
        </div>
    )
}

export default AdminResetPasswordSuccessPage
