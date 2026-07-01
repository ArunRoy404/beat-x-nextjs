import React from "react"
import { Search, Eye, Edit, Trash2, TrendingUp } from "lucide-react"
import CommonAvatar from "@/components/shared/CommonAvatar"

const SongsTable = ({ songs = [] }) => {
  const tabs = ["All", "Published", "Under Review", "Scheduled", "Rejected", "My Songs"]
  const activeTab = "All"

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full z-10 relative">
        {/* Tab pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab
            return (
              <span
                key={tab}
                className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 select-none whitespace-nowrap ${
                  isActive
                    ? "bg-[#1E245766] border border-secondary text-secondary"
                    : "bg-white/[0.03] text-light-gray border border-transparent"
                }`}
              >
                {tab}
              </span>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-light-gray" />
          <input
            type="text"
            placeholder="Search ....."
            readOnly
            className="w-full pl-10 pr-4 py-2 text-sm bg-transparent border border-border rounded-full text-whitetext placeholder-dark-gray focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto rounded-none relative z-10 bg-transparent">
        {/* Background Image Layer (10% Opacity) */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-10"
          style={{ 
            backgroundImage: "url('/bg-images/card_bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* 50% Black Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none" />

        <table className="w-full border-collapse text-left relative z-10">
          {/* Table Header */}
          <thead className="bg-[#0E0E0E]">
            <tr className="border-0">
              <th className="p-4 w-12 text-center">
                <input 
                  type="checkbox" 
                  disabled
                  className="w-4 h-4 rounded border-border bg-transparent text-secondary focus:ring-secondary/50" 
                />
              </th>
              <th className="p-4 text-[16px] font-normal text-light-gray">Songs</th>
              <th className="p-4 text-[16px] font-normal text-light-gray">Album</th>
              <th className="p-4 text-[16px] font-normal text-light-gray">Genre</th>
              <th className="p-4 text-[16px] font-normal text-light-gray">Streams</th>
              <th className="p-4 text-[16px] font-normal text-light-gray">Released</th>
              <th className="p-4 text-[16px] font-normal text-light-gray">Status</th>
              <th className="p-4 text-[16px] font-normal text-light-gray text-right pr-6">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {songs.map((song) => {
              const hasStreams = parseFloat(song?.streams) > 0
              
              return (
                <tr 
                  key={song?.id} 
                  className="border-0 transition-colors bg-transparent"
                >
                  {/* Checkbox */}
                  <td className="p-4 text-center">
                    <input 
                      type="checkbox" 
                      disabled
                      className="w-4 h-4 rounded border-border bg-transparent text-secondary focus:ring-secondary/50" 
                    />
                  </td>

                  {/* Songs info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <CommonAvatar 
                        src={song?.cover} 
                        className="w-10 h-10 rounded-[8px]" 
                        alt={song?.title} 
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-whitetext text-[14px] font-normal truncate">
                          {song?.title}
                        </span>
                        <span className="text-dark-gray text-[12px] font-normal">
                          {song?.duration}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Album */}
                  <td className="p-4 text-light-gray text-[14px] font-normal truncate max-w-[120px]">
                    {song?.album}
                  </td>

                  {/* Genre */}
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full border border-white/10 text-light-gray text-[12px] uppercase font-normal">
                      {song?.genre}
                    </span>
                  </td>

                  {/* Streams */}
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {hasStreams ? (
                        <>
                          <TrendingUp className="w-3.5 h-3.5 text-green-success shrink-0" />
                          <span className="text-green-success text-[14px] font-normal">{song?.streams}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[14px] font-normal text-dark-gray">~ 0</span>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Released */}
                  <td className="p-4 text-light-gray text-[14px] font-normal">
                    {song?.released}
                  </td>

                  {/* Status Badge */}
                  <td className="p-4">
                    {song?.status === "Published" && (
                      <span className="border border-green-success/20 bg-green-success/10 text-green-success text-[12px] font-normal px-2.5 py-0.5 rounded-full">
                        Published
                      </span>
                    )}
                    {song?.status === "Under Review" && (
                      <span className="border border-yellow-warning/20 bg-yellow-warning/10 text-yellow-warning text-[12px] font-normal px-2.5 py-0.5 rounded-full">
                        Under Review
                      </span>
                    )}
                    {song?.status === "Scheduled" && (
                      <span className="border border-[#FFAE00]/40 bg-[#FFAE00]/10 text-[#FFAE00] text-[12px] font-normal px-2.5 py-0.5 rounded-full">
                        Scheduled
                      </span>
                    )}
                    {song?.status === "Draft" && (
                      <span className="border border-white/10 bg-white/[0.05] text-light-gray text-[12px] font-normal px-2.5 py-0.5 rounded-full">
                        Draft
                      </span>
                    )}
                    {song?.status === "Rejected" && (
                      <span className="border border-red-error/20 bg-red-error/10 text-red-error text-[12px] font-normal px-2.5 py-0.5 rounded-full">
                        Rejected
                      </span>
                    )}
                  </td>

                  {/* Actions (Static layout presentation) */}
                  <td className="p-4 text-right pr-6">
                    <div className="flex items-center justify-end gap-3.5">
                      {/* Details button */}
                      <span
                        className="border border-[#3ADFFA] bg-[#3ADFFA]/15 text-[#3ADFFA] text-[11px] font-semibold py-1 px-3 rounded-full flex items-center gap-1 select-none"
                      >
                        <Eye className="w-3.5 h-3.5 shrink-0" />
                        <span>Details</span>
                      </span>
                      
                      {/* Edit icon */}
                      <span className="text-[#3ADFFA]">
                        <Edit className="w-4 h-4 shrink-0" />
                      </span>

                      {/* Delete icon */}
                      <span className="text-red-error">
                        <Trash2 className="w-4 h-4 shrink-0" />
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SongsTable
