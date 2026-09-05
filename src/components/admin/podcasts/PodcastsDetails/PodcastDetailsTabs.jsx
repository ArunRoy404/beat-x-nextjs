"use client"

import React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import PodcastDetailContent from "./PodcastDetailContent"
import PodcastDetailReviews from "./PodcastDetailReviews"
import PodcastDetailAnalytics from "./PodcastDetailAnalytics"

const PodcastDetailsTabs = ({ podcast }) => {
    return (
        <Tabs defaultValue="details" className="w-full flex flex-col flex-1 min-h-0">
            <div className="border-b border-white/5">
                <TabsList className="bg-transparent h-12 p-0 gap-8 justify-start px-4 w-full">
                    <TabsTrigger
                        value="details"
                        className="h-full rounded-none border-0! border-b-2! border-transparent! data-active:border-secondary! bg-transparent! text-[14px] text-light-gray data-active:text-secondary! font-medium px-1 cursor-pointer transition-all"
                    >
                        Details
                    </TabsTrigger>
                    <TabsTrigger
                        value="reviews"
                        className="h-full rounded-none border-0! border-b-2! border-transparent! data-active:border-secondary! bg-transparent! text-[14px] text-light-gray data-active:text-secondary! font-medium px-1 cursor-pointer transition-all"
                    >
                        Reviews
                    </TabsTrigger>
                    <TabsTrigger
                        value="analytics"
                        className="h-full rounded-none border-0! border-b-2! border-transparent! data-active:border-secondary! bg-transparent! text-[14px] text-light-gray data-active:text-secondary! font-medium px-1 cursor-pointer transition-all"
                    >
                        Analytics
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="details" className="flex-1 min-h-0 flex flex-col overflow-hidden m-0">
                <PodcastDetailContent podcast={podcast} />
            </TabsContent>

            <TabsContent value="reviews" className="flex-1 min-h-0 flex flex-col overflow-hidden m-0">
                <PodcastDetailReviews podcast={podcast} />
            </TabsContent>

            <TabsContent value="analytics" className="flex-1 min-h-0 flex flex-col overflow-hidden m-0">
                <PodcastDetailAnalytics podcast={podcast} />
            </TabsContent>
        </Tabs>
    )
}

export default PodcastDetailsTabs
