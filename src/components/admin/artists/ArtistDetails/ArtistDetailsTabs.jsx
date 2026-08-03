"use client"

import React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import ArtistDetailOverview from "./ArtistDetailOverview"
import ArtistDetailKYC from "./ArtistDetailKYC"
import ArtistDetailSocials from "./ArtistDetailSocials"
import ArtistDetailMedia from "./ArtistDetailMedia"

const ArtistDetailsTabs = ({ artist }) => {
  return (
    <Tabs defaultValue="overview" className="w-full flex flex-col flex-1 min-h-0">
      <div className="border-b border-white/5">
        <TabsList className="bg-transparent h-12 p-0 gap-8 justify-start px-4 w-full">
          <TabsTrigger
            value="overview"
            className="h-full rounded-none border-0! border-b-2! border-transparent! data-active:border-secondary! bg-transparent! text-[14px] text-light-gray data-active:text-secondary! font-medium px-1 cursor-pointer transition-all"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="kyc"
            className="h-full rounded-none border-0! border-b-2! border-transparent! data-active:border-secondary! bg-transparent! text-[14px] text-light-gray data-active:text-secondary! font-medium px-1 cursor-pointer transition-all"
          >
            KYC Documents
          </TabsTrigger>
          <TabsTrigger
            value="socials"
            className="h-full rounded-none border-0! border-b-2! border-transparent! data-active:border-secondary! bg-transparent! text-[14px] text-light-gray data-active:text-secondary! font-medium px-1 cursor-pointer transition-all"
          >
            Social & Platforms
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="h-full rounded-none border-0! border-b-2! border-transparent! data-active:border-secondary! bg-transparent! text-[14px] text-light-gray data-active:text-secondary! font-medium px-1 cursor-pointer transition-all"
          >
            Media Assets
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview" className="flex-1 min-h-0 flex flex-col overflow-hidden m-0">
        <ArtistDetailOverview artist={artist} />
      </TabsContent>

      <TabsContent value="kyc" className="flex-1 min-h-0 flex flex-col overflow-hidden m-0">
        <ArtistDetailKYC artist={artist} />
      </TabsContent>

      <TabsContent value="socials" className="flex-1 min-h-0 flex flex-col overflow-hidden m-0">
        <ArtistDetailSocials artist={artist} />
      </TabsContent>

      <TabsContent value="media" className="flex-1 min-h-0 flex flex-col overflow-hidden m-0">
        <ArtistDetailMedia artist={artist} />
      </TabsContent>
    </Tabs>
  )
}

export default ArtistDetailsTabs
