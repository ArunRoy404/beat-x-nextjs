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
import { Mail, Calendar, Coins, Music, Mic2, Video, ShieldAlert, ShieldX, ShieldCheck, Trash2 } from "lucide-react"
import { format } from "date-fns"
import CommonAvatar from "@/components/shared/CommonAvatar"
import CommonCard from "@/components/shared/CommonCard/CommonCard"
import UserStatusBadge from "@/components/shared/UserStatusBadge/UserStatusBadge"
import DeleteUserDialog from "@/components/dialogs/admin/users/DeleteUserDialog"
import { useSuspendUser } from "@/hooks/api/admin/users/useSuspendUser"
import { useBanUser } from "@/hooks/api/admin/users/useBanUser"
import { useReactivateUser } from "@/hooks/api/admin/users/useReactivateUser"

const UserDetailsDialog = ({ user, children }) => {
    const [open, setOpen] = useState(false)

    const suspendMutation = useSuspendUser()
    const banMutation = useBanUser()
    const reactivateMutation = useReactivateUser()

    if (!user) return null

    const userId = user._id || user.id
    const isActive = user.status === "active"
    const isPending = suspendMutation.isPending || banMutation.isPending || reactivateMutation.isPending

    const handleSuspend = () => {
        suspendMutation.mutate({ id: userId, reason: "Policy violation or administrative action." })
    }

    const handleBan = () => {
        banMutation.mutate({ id: userId, reason: "Repeated policy violations." })
    }

    const handleReactivate = () => {
        reactivateMutation.mutate({ id: userId })
    }

    const verifiedClass = user.isVerified
        ? "text-[#34C759] border-[#34C759]/25 bg-[#34C759]/10"
        : "text-[#FFCC00] border-[#FFCC00]/25 bg-[#FFCC00]/10"

    const providerLabel = user.provider
        ? user.provider.charAt(0).toUpperCase() + user.provider.slice(1)
        : "-"

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
                            {user?.avatar ? (
                                <CommonAvatar
                                    src={user?.avatar}
                                    alt={user?.name || "User"}
                                    className="w-12 h-12 rounded-full border border-white/10"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-[#3E1F1F] text-[#FF453A] border border-[#FF453A]/25 flex items-center justify-center font-bold text-base shrink-0">
                                    {getInitials(user?.name)}
                                </div>
                            )}

                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center flex-wrap gap-2.5">
                                    <span className="text-whitetext text-[18px] font-bold tracking-tight">
                                        {(user?.name || "-").toUpperCase()}
                                    </span>
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border text-light-gray border-white/10 bg-white/5">
                                        {providerLabel}
                                    </span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${verifiedClass}`}>
                                        {user?.isVerified ? "Verified" : "Unverified"}
                                    </span>
                                    <UserStatusBadge status={user?.status} className="text-[11px]" />
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-light-gray/40 text-[12px] font-medium">
                                    <span className="flex items-center gap-1">
                                        <Mail className="w-3.5 h-3.5 shrink-0" />
                                        {user?.email || "-"}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                                        Joined : {user?.createdAt ? format(new Date(user.createdAt), "MMM d, yyyy") : "-"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right action buttons */}
                        <div className="flex items-center gap-2 mt-2 md:mt-0 shrink-0">
                            {isActive ? (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={isPending}
                                        onClick={handleSuspend}
                                        className="rounded-lg h-9 border-yellow-warning/20 bg-yellow-warning/10 text-yellow-warning hover:bg-yellow-warning/20 gap-1.5 px-3 font-semibold text-xs cursor-pointer border-0 disabled:opacity-50"
                                    >
                                        <ShieldAlert className="w-3.5 h-3.5" />
                                        {suspendMutation.isPending ? "Suspending..." : "Suspend"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={isPending}
                                        onClick={handleBan}
                                        className="rounded-lg h-9 border-red-error/20 bg-[#FF453A]/10 text-[#FF453A] hover:bg-[#FF453A]/20 gap-1.5 px-3 font-semibold text-xs cursor-pointer border-0 disabled:opacity-50"
                                    >
                                        <ShieldX className="w-3.5 h-3.5" />
                                        {banMutation.isPending ? "Banning..." : "Ban"}
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={isPending}
                                    onClick={handleReactivate}
                                    className="rounded-lg h-9 border-green-success/20 bg-green-success/10 text-green-success hover:bg-green-success/20 gap-1.5 px-3 font-semibold text-xs cursor-pointer border-0 disabled:opacity-50"
                                >
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    {reactivateMutation.isPending ? "Reactivating..." : "Reactivate"}
                                </Button>
                            )}
                            <DeleteUserDialog user={user} onDeleted={() => setOpen(false)}>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-lg h-9 border-red-error/20 bg-[#FF453A]/10 text-[#FF453A] hover:bg-[#FF453A]/20 gap-1.5 px-3 font-semibold text-xs cursor-pointer border-0"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Delete
                                </Button>
                            </DeleteUserDialog>
                        </div>
                    </div>

                    {/* 4 Stat Cards grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Coin Balance Card */}
                        <CommonCard className="flex flex-col items-center text-center justify-center gap-2 rounded-[16px]! p-5 bg-[#20201F99]!">
                            <div className="relative z-10 w-12 h-12 rounded-full bg-[#E5F97D]/15 border border-[#E5F97D]/20 text-[#E5F97D] flex items-center justify-center shrink-0">
                                <Coins className="w-5 h-5" />
                            </div>
                            <span className="relative z-10 text-whitetext font-bold text-[24px] leading-tight">
                                {(user?.coinBalance || 0).toLocaleString()}
                            </span>
                            <span className="relative z-10 text-light-gray/40 text-[12px] font-medium uppercase tracking-wider">
                                Coin Balance
                            </span>
                        </CommonCard>

                        {/* Favorite Songs Card */}
                        <CommonCard className="flex flex-col items-center text-center justify-center gap-2 rounded-[16px]! p-5 bg-[#20201F99]!">
                            <div className="relative z-10 w-12 h-12 rounded-full bg-[#3ADFFA]/15 border border-[#3ADFFA]/20 text-[#3ADFFA] flex items-center justify-center shrink-0">
                                <Music className="w-5 h-5" />
                            </div>
                            <span className="relative z-10 text-whitetext font-bold text-[24px] leading-tight">
                                {(user?.favoriteSongs || []).length}
                            </span>
                            <span className="relative z-10 text-light-gray/40 text-[12px] font-medium uppercase tracking-wider">
                                Favorite Songs
                            </span>
                        </CommonCard>

                        {/* Favorite Artists Card */}
                        <CommonCard className="flex flex-col items-center text-center justify-center gap-2 rounded-[16px]! p-5 bg-[#20201F99]!">
                            <div className="relative z-10 w-12 h-12 rounded-full bg-[#CC97FF]/15 border border-[#CC97FF]/20 text-[#CC97FF] flex items-center justify-center shrink-0">
                                <Mic2 className="w-5 h-5" />
                            </div>
                            <span className="relative z-10 text-whitetext font-bold text-[24px] leading-tight">
                                {(user?.favoriteArtists || []).length}
                            </span>
                            <span className="relative z-10 text-light-gray/40 text-[12px] font-medium uppercase tracking-wider">
                                Favorite Artists
                            </span>
                        </CommonCard>

                        {/* Liked Videos Card */}
                        <CommonCard className="flex flex-col items-center text-center justify-center gap-2 rounded-[16px]! p-5 bg-[#20201F99]!">
                            <div className="relative z-10 w-12 h-12 rounded-full bg-[#34C759]/15 border border-[#34C759]/20 text-[#34C759] flex items-center justify-center shrink-0">
                                <Video className="w-5 h-5" />
                            </div>
                            <span className="relative z-10 text-whitetext font-bold text-[24px] leading-tight">
                                {(user?.likedVideos || []).length}
                            </span>
                            <span className="relative z-10 text-light-gray/40 text-[12px] font-medium uppercase tracking-wider">
                                Liked Videos
                            </span>
                        </CommonCard>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserDetailsDialog
