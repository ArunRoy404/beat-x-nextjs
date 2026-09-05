"use client"

import React, { useState } from "react"
import { PlusCircle } from "lucide-react"
import ChapterRow from "./ChapterRow"
import AddChapterForm from "./AddChapterForm"

const AudioBookDetailChapters = ({ book, chapters: chaptersProp = [] }) => {
    const [showAddForm, setShowAddForm] = useState(false)
    const chapters = [...chaptersProp].sort(
        (a, b) => (a.chapterNumber ?? 0) - (b.chapterNumber ?? 0)
    )

    return (
        <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h3 className="text-white text-[18px] font-semibold leading-normal font-sans">
                        Chapters
                    </h3>
                    <span className="text-[#ADAAAA] text-[12px] font-semibold uppercase tracking-wider mt-0.5">
                        {chapters.length} chapter{chapters.length === 1 ? "" : "s"}
                    </span>
                </div>
                {!showAddForm && (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[rgba(204,151,255,0.20)] bg-[rgba(204,151,255,0.10)] text-[#CC97FF] hover:bg-[rgba(204,151,255,0.15)] text-[12px] font-medium cursor-pointer transition-colors"
                    >
                        <PlusCircle className="w-3.5 h-3.5" /> Add Chapter
                    </button>
                )}
            </div>

            {showAddForm && (
                <AddChapterForm
                    audiobookId={book?._id}
                    onDone={() => setShowAddForm(false)}
                    onCancel={() => setShowAddForm(false)}
                />
            )}

            <div className="flex flex-col gap-3">
                {chapters.map((chapter, index) => (
                    <ChapterRow key={chapter._id} audiobookId={book?._id} book={book} chapter={chapter} index={index} />
                ))}
                {chapters.length === 0 && !showAddForm && (
                    <div className="py-10 text-center text-muted-foreground bg-white/[0.02] border border-white/5 rounded-[16px] text-sm">
                        No chapters yet.
                    </div>
                )}
            </div>
        </div>
    )
}

export default AudioBookDetailChapters
