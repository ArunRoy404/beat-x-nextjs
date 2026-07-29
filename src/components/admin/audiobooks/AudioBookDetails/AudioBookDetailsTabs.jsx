"use client"

import React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import AudioBookDetailContent from "./AudioBookDetailContent"
import AudioBookDetailChapters from "./AudioBookDetailChapters"
import AudioBookDetailAnalytics from "./AudioBookDetailAnalytics"

const AudioBookDetailsTabs = ({ book }) => {
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
                        value="chapters"
                        className="h-full rounded-none border-0! border-b-2! border-transparent! data-active:border-secondary! bg-transparent! text-[14px] text-light-gray data-active:text-secondary! font-medium px-1 cursor-pointer transition-all"
                    >
                        Chapters & Universe
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
                <AudioBookDetailContent book={book} />
            </TabsContent>

            <TabsContent value="chapters" className="flex-1 min-h-0 flex flex-col overflow-hidden m-0">
                <AudioBookDetailChapters book={book} />
            </TabsContent>

            <TabsContent value="analytics" className="flex-1 min-h-0 flex flex-col overflow-hidden m-0">
                <AudioBookDetailAnalytics book={book} />
            </TabsContent>
        </Tabs>
    )
}

export default AudioBookDetailsTabs
