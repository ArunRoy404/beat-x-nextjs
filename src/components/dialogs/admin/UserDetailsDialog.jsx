"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Calendar, Headphones, Music, Package, Ticket, Pencil, Trash2 } from "lucide-react"
import CommonAvatar from "@/components/shared/CommonAvatar"
import CommonCard from "@/components/shared/CommonCard/CommonCard"

const UserDetailsDialog = ({ user, children }) => {
    const [open, setOpen] = useState(false)

    if (!user) return null

    const statusColors = {
        Active: "text-[#34C759] border-[#34C759]/25 bg-[#34C759]/10",
        Rejected: "text-[#FF453A] border-[#FF453A]/25 bg-[#FF453A]/10",
        Pending: "text-[#FFCC00] border-[#FFCC00]/25 bg-[#FFCC00]/10"
    }

    const planColors = {
        Premium: "text-[#3ADFFA] border-[#3ADFFA]/25 bg-[#3ADFFA]/10",
        Family: "text-[#CC97FF] border-[#CC97FF]/25 bg-[#CC97FF]/10",
        Student: "text-[#E5F97D] border-[#E5F97D]/25 bg-[#E5F97D]/10",
        Free: "text-white/40 border-white/10 bg-white/5"
    }

    const statusClass = statusColors[user.status] || statusColors.Pending
    const planClass = planColors[user.plan] || planColors.Free

    // Get initials for avatar fallback
    const getInitials = (name) => {
        if (!name) return "US"
        return name
            .split(" ")
            .map((n) => n[0])
            .join("") 
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[800px]">
                {/* Custom Header */}
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>

                {/* Content body with padding */}
                <div className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[75vh]">
                    {/* User Info Block */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
                        {/* Left details info */}
                        <div className="flex items-center gap-4">
                            {user.avatar ? (
                                <CommonAvatar
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full border border-white/10"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-[#3E1F1F] text-[#FF453A] border border-[#FF453A]/25 flex items-center justify-center font-bold text-base shrink-0">
                                    {getInitials(user.name)}
                                </div>
                            )}

                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center flex-wrap gap-2.5">
                                    <span className="text-whitetext text-[18px] font-bold tracking-tight">
                                        {user.name.toUpperCase()}
                                    </span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${planClass}`}>
                                        {user.plan}
                                    </span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${statusClass}`}>
                                        {user.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-light-gray/40 text-[12px] font-medium">
                                    <span className="flex items-center gap-1">
                                        <Mail className="w-3.5 h-3.5 shrink-0" />
                                        {user.email}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                                        {user.location || "Bangladesh"}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                                        Joined : {user.joined}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right action buttons */}
                        <div className="flex items-center gap-2 mt-2 md:mt-0 shrink-0">
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg h-9 border-white/10 bg-white/5 text-whitetext hover:bg-white/10 gap-1.5 px-3 font-semibold text-xs cursor-pointer"
                            >
                                <Pencil className="w-3.5 h-3.5" /> Edit
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg h-9 border-red-error/20 bg-[#FF453A]/10 text-[#FF453A] hover:bg-[#FF453A]/20 gap-1.5 px-3 font-semibold text-xs cursor-pointer border-0"
                            >
                                Suspend Artist
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg h-9 border-red-error/20 bg-[#FF453A]/10 text-[#FF453A] hover:bg-[#FF453A]/20 gap-1.5 px-3 font-semibold text-xs cursor-pointer border-0"
                            >
                                <Trash2 className="w-3.5 h-3.5" /> Delete
                            </Button>
                        </div>
                    </div>

                    {/* 4 Stat Cards grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Streams Card */}
                        <CommonCard className="flex flex-col items-center text-center justify-center gap-2 rounded-[16px]! p-5 bg-[#20201F99]!">
                            <div className="relative z-10 w-12 h-12 rounded-full bg-[#3ADFFA]/15 border border-[#3ADFFA]/20 text-[#3ADFFA] flex items-center justify-center shrink-0">
                                <Headphones className="w-5 h-5" />
                            </div>
                            <span className="relative z-10 text-whitetext font-bold text-[24px] leading-tight">
                                {(user.streams || 0).toLocaleString()}
                            </span>
                            <span className="relative z-10 text-light-gray/40 text-[12px] font-medium uppercase tracking-wider">
                                Streams
                            </span>
                        </CommonCard>

                        {/* Playlist Card */}
                        <CommonCard className="flex flex-col items-center text-center justify-center gap-2 rounded-[16px]! p-5 bg-[#20201F99]!">
                            <div className="relative z-10 w-12 h-12 rounded-full bg-[#E5F97D]/15 border border-[#E5F97D]/20 text-[#E5F97D] flex items-center justify-center shrink-0">
                                <Music className="w-5 h-5" />
                            </div>
                            <span className="relative z-10 text-whitetext font-bold text-[24px] leading-tight">
                                {user.playlists || 18}
                            </span>
                            <span className="relative z-10 text-light-gray/40 text-[12px] font-medium uppercase tracking-wider">
                                Playlist
                            </span>
                        </CommonCard>

                        {/* Orders Card */}
                        <CommonCard className="flex flex-col items-center text-center justify-center gap-2 rounded-[16px]! p-5 bg-[#20201F99]!">
                            <div className="relative z-10 w-12 h-12 rounded-full bg-[#CC97FF]/15 border border-[#CC97FF]/20 text-[#CC97FF] flex items-center justify-center shrink-0">
                                <Package className="w-5 h-5" />
                            </div>
                            <span className="relative z-10 text-whitetext font-bold text-[24px] leading-tight">
                                {user.orders || 18}
                            </span>
                            <span className="relative z-10 text-light-gray/40 text-[12px] font-medium uppercase tracking-wider">
                                Orders
                            </span>
                        </CommonCard>

                        {/* Tickets Card */}
                        <CommonCard className="flex flex-col items-center text-center justify-center gap-2 rounded-[16px]! p-5 bg-[#20201F99]!">
                            <div className="relative z-10 w-12 h-12 rounded-full bg-[#34C759]/15 border border-[#34C759]/20 text-[#34C759] flex items-center justify-center shrink-0">
                                <Ticket className="w-5 h-5" />
                            </div>
                            <span className="relative z-10 text-whitetext font-bold text-[24px] leading-tight">
                                {user.tickets || 18}
                            </span>
                            <span className="relative z-10 text-light-gray/40 text-[12px] font-medium uppercase tracking-wider">
                                Tickets
                            </span>
                        </CommonCard>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserDetailsDialog
