"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Sidebar,
    SidebarContent,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip"
import Logo from "@/components/shared/Logo"
import * as Icons from "@/icons/DashboardIcons"

const CommonDashboardSidebar = ({ data, title, ...props }) => {
    const pathname = usePathname()
    const { state } = useSidebar()
    const isCollapsed = state === "collapsed"

    // Fallback to empty array if no data passed
    const navGroups = data || []

    return (
        <TooltipProvider delayDuration={0}>
            <Sidebar
                collapsible="icon"
                className="custom-dashboard-sidebar border-r border-border z-100"
                {...props}
            >
                <div
                    className={cn(
                        "flex flex-col h-full bg-dark-accent/95 backdrop-blur-md transition-all duration-300",
                        isCollapsed ? "px-1 py-4" : "px-[12px] py-[20px]"
                    )}
                    style={{
                        backgroundImage: "url('/bg-images/sidebar_bg.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Header Section */}
                    <div className="flex flex-col items-center justify-center pb-2 transition-all duration-300">
                        {/* Morphing Logo Container */}
                        <div className="relative w-full flex items-center justify-center transition-all duration-300 h-10">
                            {/* Default Logo */}
                            <div className="transition-all duration-300 ease-in-out opacity-100 scale-100 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:scale-75 group-data-[state=collapsed]:w-0 group-data-[state=collapsed]:h-0 overflow-hidden w-[162px]">
                                <Logo variant="default" />
                            </div>
                            {/* Favicon Logo */}
                            <div className="absolute transition-all duration-300 ease-in-out opacity-0 scale-75 w-0 h-0 overflow-hidden group-data-[state=collapsed]:relative group-data-[state=collapsed]:opacity-100 group-data-[state=collapsed]:scale-100 group-data-[state=collapsed]:w-8 group-data-[state=collapsed]:h-8 flex items-center justify-center">
                                <Logo variant="fav" className="max-h-8 max-w-8" />
                            </div>
                        </div>

                        {/* Subtitle Section */}
                        <div className="w-full flex flex-col items-center transition-all duration-300 ease-in-out origin-top opacity-100 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:max-h-0 group-data-[state=collapsed]:mt-0 overflow-hidden mt-2">
                            <span className="text-secondary text-[16px] not-italic font-medium uppercase tracking-wider whitespace-nowrap">
                                {title || "ADMIN CONTROL"}
                            </span>
                            <div className="w-full border-b border-secondary my-2.5 opacity-40" />
                        </div>
                    </div>

                    {/* Navigation Section */}
                    <SidebarContent className="flex-1 py-1 no-scrollbar">
                        {navGroups.map((group, groupIdx) => (
                            <div key={groupIdx} className="mb-3 last:mb-0 transition-all duration-300">
                                {/* Category label */}
                                {group.category && (
                                    <span className="px-[16px] pt-2 pb-1 block text-light-gray text-[12px] not-italic font-normal uppercase tracking-wider opacity-60 transition-all duration-300 ease-in-out whitespace-nowrap origin-left group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:max-h-0 group-data-[state=collapsed]:py-0 overflow-hidden">
                                        {group.category}
                                    </span>
                                )}

                                <div className="flex flex-col gap-0.5 transition-all duration-300">
                                    {group.items && group.items.map((item, itemIdx) => {
                                        const isActive = pathname === item.url;
                                        // Dynamic Icon resolve
                                        const IconComponent = Icons[item.iconName] || Icons.GridViewIcon;

                                        const linkContent = (
                                            <Link
                                                href={item.url}
                                                className={cn(
                                                    "relative flex items-center justify-between rounded-[8px] transition-all duration-300 group/item",
                                                    isCollapsed
                                                        ? "px-0 justify-center h-8 w-8 mx-auto"
                                                        : "px-[16px] py-[6px] w-full h-8"
                                                    ,
                                                    isActive
                                                        ? "bg-secondary/[0.08] text-secondary font-medium"
                                                        : "text-light-gray hover:bg-secondary/[0.02] hover:text-white"
                                                )}
                                            >
                                                {isActive && (
                                                    <span className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-secondary rounded-r" />
                                                )}

                                                <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-[12px]")}>
                                                    {IconComponent && (
                                                        <IconComponent
                                                            className={cn(
                                                                "w-[18px] h-[18px] transition-colors duration-300 shrink-0",
                                                                isActive ? "text-secondary" : "text-light-gray group-hover/item:text-white"
                                                            )}
                                                        />
                                                    )}
                                                    <span className="text-[14px] not-italic font-normal leading-normal transition-all duration-300 ease-in-out opacity-100 group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:w-0 overflow-hidden whitespace-nowrap">
                                                        {item.title}
                                                    </span>
                                                </div>

                                                {isActive && !isCollapsed && (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 transition-all duration-300" />
                                                )}
                                            </Link>
                                        );

                                        return (
                                            <Tooltip key={itemIdx}>
                                                <TooltipTrigger asChild>
                                                    {linkContent}
                                                </TooltipTrigger>
                                                <TooltipContent
                                                    side="right"
                                                    hidden={!isCollapsed}
                                                >
                                                    {item.title}
                                                </TooltipContent>
                                            </Tooltip>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </SidebarContent>
                </div>
            </Sidebar>
        </TooltipProvider>
    )
}

export default CommonDashboardSidebar