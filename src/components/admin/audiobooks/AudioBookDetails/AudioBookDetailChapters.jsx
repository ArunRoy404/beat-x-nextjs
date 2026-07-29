"use client"

import React, { useState } from "react"
import { Play as PlayIcon, ChevronDown, ChevronUp, BookOpen } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

const AudioBookDetailChapters = ({ book }) => {
    const [showSequelChapters, setShowSequelChapters] = useState(true)
    const [showMoreMainChapters, setShowMoreMainChapters] = useState(false)

    // Main chapters list from dummy data (or fallback)
    const mainChapters = book?.chapters || []
    
    // Mock for extra chapters if they click +13 more chapters
    const extraChapters = [
        { id: 106, title: "Chapter 6: Deepening Conflict", duration: "45 min" },
        { id: 107, title: "Chapter 7: The Refugee Trails", duration: "48 min" },
        { id: 108, title: "Chapter 8: Night Raid", duration: "40 min" },
        { id: 109, title: "Chapter 9: The Guerrilla Base", duration: "50 min" },
        { id: 110, title: "Chapter 10: Code of Honor", duration: "42 min" }
    ]

    const displayedMainChapters = showMoreMainChapters 
        ? [...mainChapters, ...extraChapters]
        : mainChapters

    // Sequel book details with robust fallback to ensure Universe section is never empty
    const defaultSequel = {
        title: `${book?.title || "Ekatturer Diary"}: Untold Stories`,
        artist: book?.artist || "Humayun Ahmed",
        narrator: book?.narrator || "Abul Hayat",
        duration: "6h 20m",
        chaptersCount: 3,
        cover: book?.cover || "/audioBookImages/projectHill.png",
        badge: "sequel",
        episodes: [
          { id: 9901, title: "Chapter 1: The Beginning", duration: "42 min" },
          { id: 9902, title: "Chapter 1: The Beginning", duration: "42 min" },
          { id: 9903, title: "Chapter 1: The Beginning", duration: "42 min" }
        ]
    }
    const sequelBook = book?.universeBooks?.[0] || defaultSequel

    return (
        <div className="p-4 flex flex-col gap-6 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
            
            {/* 1. Main Chapters Block */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h3 className="text-white text-[18px] font-semibold leading-normal font-sans">
                            Main Chapters
                        </h3>
                        <span className="text-[#ADAAAA] text-[12px] font-semibold uppercase tracking-wider mt-0.5">
                            {displayedMainChapters.length} of {book?.chaptersCount || 18} shown
                        </span>
                    </div>
                    <span className="text-[#ADAAAA] text-[12px] font-normal">
                        {book?.duration || "12h 40m"}
                    </span>
                </div>

                {/* Chapters List */}
                <div className="flex flex-col gap-3">
                    {displayedMainChapters.map((ch, index) => (
                        <div 
                            key={ch.id} 
                            className="flex p-4 items-center gap-4 align-stretch rounded-[16px] border border-[#6B6B6B] bg-[#20201F]"
                        >
                            {/* Play Button Icon */}
                            <button
                                onClick={() => toast.success(`Playing ${ch.title}...`)}
                                className="w-8 h-8 rounded-full border border-[#ADAAAA] bg-[#20201F] flex items-center justify-center text-white cursor-pointer hover:bg-white/5 active:scale-95 shrink-0"
                            >
                                <PlayIcon className="w-3.5 h-3.5 fill-white ml-0.5" />
                            </button>
                            <div className="flex flex-col min-w-0 flex-1">
                                <span className="text-[#ADAAAA] text-[12px] font-semibold leading-none mb-1">
                                    Chapter {index + 1}
                                </span>
                                <span className="text-white text-[16px] font-semibold leading-normal truncate">
                                    {ch.title}
                                </span>
                            </div>
                            <span className="text-[#ADAAAA] text-[12px] font-normal shrink-0 self-center">
                                {ch.duration}
                            </span>
                        </div>
                    ))}

                    {/* More Chapters Button */}
                    {!showMoreMainChapters && mainChapters.length > 0 && (
                        <button
                            onClick={() => setShowMoreMainChapters(true)}
                            className="flex p-2 px-3 justify-center items-center gap-2 align-stretch rounded-xl border border-[rgba(204,151,255,0.20)] bg-[rgba(204,151,255,0.10)] text-[#CC97FF] hover:bg-[rgba(204,151,255,0.15)] text-[12px] font-normal text-center cursor-pointer transition-colors"
                        >
                            + {book?.chaptersCount - mainChapters.length || 13} more chapters
                        </button>
                    )}
                </div>
            </div>

            {/* 2. In this Universe Block */}
            {sequelBook && (
                <div className="flex flex-col gap-4 border-t border-white/5 pt-4">
                    <div className="flex items-center gap-3">
                        <h3 className="text-white text-[18px] font-semibold leading-normal font-sans">
                            In this Universe
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-light-gray text-[10px] font-semibold uppercase tracking-wide">
                            1 Books
                        </span>
                    </div>

                    {/* Sequel Book Card */}
                    <div className="border border-white/10 bg-white/5 rounded-[16px] p-4 flex flex-col gap-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                {/* Sequel Cover */}
                                <div className="w-12 h-12 rounded-[10px] overflow-hidden relative border border-white/10 shrink-0">
                                    <Image
                                        src={sequelBook.cover}
                                        alt={sequelBook.title}
                                        fill
                                        sizes="48px"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="text-white text-[14px] font-semibold truncate leading-tight">
                                            {sequelBook.title}
                                        </span>
                                        <span className="px-1.5 py-0.5 rounded-md border border-[#CC97FF]/20 bg-[#CC97FF]/10 text-[#CC97FF] text-[8px] font-bold uppercase tracking-wider scale-90">
                                            {sequelBook.badge}
                                        </span>
                                    </div>
                                    <span className="text-[#ADAAAA] text-[12px] font-normal truncate mt-0.5 leading-none">
                                        Narrated by {sequelBook.narrator}
                                    </span>
                                </div>
                            </div>

                            {/* Show/Hide button */}
                            <button
                                onClick={() => setShowSequelChapters(!showSequelChapters)}
                                className="h-8 border border-white/10 hover:bg-white/5 text-light-gray text-xs rounded-lg px-2.5 flex items-center gap-1 cursor-pointer transition-colors active:scale-95 shrink-0"
                            >
                                {showSequelChapters ? (
                                    <>
                                        Hide Chapters <ChevronUp className="w-3.5 h-3.5" />
                                    </>
                                ) : (
                                    <>
                                        Show Chapters <ChevronDown className="w-3.5 h-3.5" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Sequel stats summary */}
                        <div className="text-[12px] text-dark-gray font-normal flex items-center gap-2 leading-none border-t border-white/5 pt-2">
                            <span>{sequelBook.duration}</span>
                            <span>·</span>
                            <span>{sequelBook.chaptersCount} chapters</span>
                        </div>

                        {/* Expanded Sequel Chapters list */}
                        {showSequelChapters && sequelBook.episodes && (
                            <div className="flex flex-col gap-2.5 border-t border-white/5 pt-3 pl-2">
                                {sequelBook.episodes.map((ep, idx) => (
                                    <div 
                                        key={ep.id} 
                                        className="flex p-3 items-center gap-4 align-stretch rounded-[12px] border border-white/10 bg-[#20201F]"
                                    >
                                        <button
                                            onClick={() => toast.success(`Playing Sequel ${ep.title}...`)}
                                            className="w-7 h-7 rounded-full border border-[#ADAAAA] bg-[#20201F] flex items-center justify-center text-white cursor-pointer hover:bg-white/5 active:scale-95 shrink-0"
                                        >
                                            <PlayIcon className="w-3 h-3 fill-white ml-0.5" />
                                        </button>
                                        <div className="flex flex-col min-w-0 flex-1">
                                            <span className="text-[#ADAAAA] text-[10px] font-semibold leading-none mb-0.5">
                                                Chapter {idx + 1}
                                            </span>
                                            <span className="text-white text-[14px] font-semibold truncate">
                                                {ep.title}
                                            </span>
                                        </div>
                                        <span className="text-[#ADAAAA] text-[11px] font-normal shrink-0 self-center">
                                            {ep.duration}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AudioBookDetailChapters
