"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye, Calendar, Sparkles, Mail, Shield, Play } from "lucide-react"
import CommonAvatar from "@/components/shared/CommonAvatar"

const UserDetailsDialog = ({ user, children }) => {
    const [open, setOpen] = useState(false)

    if (!user) return null

    const statusColors = {
        Active: "text-[#34C759] bg-[#34C759]/10 border border-[#34C759]/20",
        Rejected: "text-[#FF453A] bg-[#FF453A]/10 border border-[#FF453A]/20",
        Pending: "text-[#FFCC00] bg-[#FFCC00]/10 border border-[#FFCC00]/20"
    }

    const planColors = {
        Premium: "text-[#3ADFFA] bg-[#3ADFFA]/10 border border-[#3ADFFA]/20",
        Family: "text-[#CC97FF] bg-[#CC97FF]/10 border border-[#CC97FF]/20",
        Student: "text-[#E5F97D] bg-[#E5F97D]/10 border border-[#E5F97D]/20",
        Free: "text-white/40 bg-white/5 border border-white/10"
    }

    const statusClass = statusColors[user.status] || statusColors.Pending
    const planClass = planColors[user.plan] || planColors.Free

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[480px]">
                {/* Header */}
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary shrink-0">
                            <Eye className="w-5 h-5" />
                        </div>
                        <span className="text-[20px] font-semibold leading-none">User Account Details</span>
                    </DialogTitle>
                </DialogHeader>

                {/* Profile Detail Card */}
                <div className="flex flex-col items-center text-center gap-4 py-4 shrink-0">
                    <div className="relative">
                        <CommonAvatar
                            src={user.avatar || ""}
                            alt={user.name}
                            className="w-24 h-24 rounded-full border-2 border-[#A175FF]/30 shadow-[0_0_15px_rgba(161,117,255,0.2)]"
                        />
                        <span className={`absolute bottom-0 right-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusClass}`}>
                            {user.status}
                        </span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <h3 className="text-whitetext font-bold text-[22px] tracking-tight">{user.name}</h3>
                        <div className="flex items-center justify-center gap-1.5 text-light-whitetext/60 text-[14px]">
                            <Mail className="w-4 h-4" />
                            <span>{user.email}</span>
                        </div>
                    </div>
                </div>

                {/* Detail Metrics grid */}
                <div className="grid grid-cols-2 gap-3 shrink-0">
                    {/* Role */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-[12px] p-3 flex flex-col gap-1 text-left">
                        <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                            <Shield className="w-3 h-3 text-secondary" /> Role
                        </span>
                        <span className="text-whitetext font-semibold text-[15px]">
                            {user.role}
                        </span>
                    </div>

                    {/* Plan */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-[12px] p-3 flex flex-col gap-1 text-left">
                        <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#A175FF]" /> Subscription
                        </span>
                        <span className={`inline-self-start px-2 py-0.5 rounded-full text-[12px] font-medium leading-normal w-fit ${planClass}`}>
                            {user.plan}
                        </span>
                    </div>

                    {/* Streams */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-[12px] p-3 flex flex-col gap-1 text-left">
                        <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                            <Play className="w-3 h-3 text-green-success" /> Streams
                        </span>
                        <span className="text-whitetext font-semibold text-[15px]">
                            {(user.streams || 0).toLocaleString()} streams
                        </span>
                    </div>

                    {/* Joined */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-[12px] p-3 flex flex-col gap-1 text-left">
                        <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-yellow-warning" /> Joined Date
                        </span>
                        <span className="text-whitetext font-semibold text-[15px]">
                            {user.joined}
                        </span>
                    </div>
                </div>

                {/* Footer close */}
                <div className="flex justify-end mt-4 shrink-0">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full rounded-full h-[52px]!"
                            size="lg"
                            onClick={() => setOpen(false)}
                        >
                            Close Details
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserDetailsDialog
