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
import { DialogClose } from "@/components/ui/dialog"
import { Upload, X, Plus, Music, Globe, ChevronLeft } from "lucide-react"
import { toast } from "sonner"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonImageUpload from "@/components/shared/CommonInputs/CommonImageUpload/CommonImageUpload"
import CommonAudioInput from "@/components/shared/CommonInputs/CommonAudioInput/CommonAudioInput"
import CommonInputContainer from "@/components/shared/CommonInputs/CommonInput/CommonInputContainer"
import { useAdminDashboardAudioBooksStore } from "@/zustandStore/admin/adminStore/adminDashboardAudioBooksStore"

const UploadAudioBookDialog = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Book Info, 2: Chapters, 3: Universe, 4: Publish

  // Form states
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [narrator, setNarrator] = useState("")
  const [genre, setGenre] = useState("")
  const [language, setLanguage] = useState("")
  const [synopsis, setSynopsis] = useState("")
  const [coverImage, setCoverImage] = useState(null)

  // Chapter states
  const [chapterTitle, setChapterTitle] = useState("")
  const [chapterFile, setChapterFile] = useState(null)

  const handleNext = () => {
    if (currentStep === 1) {
      if (!title || !author || !narrator || !genre || !language) {
        toast.error("Please fill in all required fields marked with *")
        return
      }
    }
    if (currentStep === 2) {
      if (!chapterTitle) {
        toast.error("Please enter a chapter title")
        return
      }
    }
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handlePublish = () => {
    // Add item to Zustand store
    const newBook = {
      id: Date.now(),
      title: title || "New Audiobook",
      artist: author || "Unknown Author",
      narrator: narrator || "Unknown Narrator",
      duration: "12h 40m",
      chaptersCount: 1,
      streams: "0",
      released: new Date().toISOString().split('T')[0],
      status: "Published",
      cover: "/audioBookImages/projectHill.png",
      category: genre || "Biography",
      badge: "sequel",
      language: language || "Bengali",
      episode: "1",
      synopsis: synopsis || "No synopsis provided.",
      chapters: [
        { id: Date.now() + 1, title: chapterTitle || "Chapter 1", duration: "42 min" }
      ],
      universeBooks: []
    }

    // Call store action
    const storeState = useAdminDashboardAudioBooksStore.getState()
    if (storeState.setAudioBooksList) {
      storeState.setAudioBooksList([newBook, ...storeState.audioBooksList])
    }

    toast.success("Audiobook uploaded and published successfully!")
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setCurrentStep(1)
    setTitle("")
    setAuthor("")
    setNarrator("")
    setGenre("")
    setLanguage("")
    setSynopsis("")
    setCoverImage(null)
    setChapterTitle("")
    setChapterFile(null)
  }

  const genreOptions = [
    { value: "Biography", label: "Biography" },
    { value: "Fiction", label: "Fiction" },
    { value: "Self-Help", label: "Self-Help" }
  ]

  const languageOptions = [
    { value: "Bengali", label: "Bengali" },
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" }
  ]

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetForm(); }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden flex flex-col bg-[#121212] border border-white/10 rounded-[24px]">
        {/* Header Title */}
        <div className="p-4 flex items-center justify-between border-b border-white/5 bg-[#181818]">
          <DialogTitle className="text-[18px] font-semibold text-white">
            Upload New Audiobook
          </DialogTitle>
          <DialogClose className="text-light-gray hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </DialogClose>
        </div>

        {/* Wizard Progress Steps Bar */}
        <div className="grid grid-cols-4 text-center border-b border-white/5 py-3 bg-[#161616] text-[11px] font-semibold tracking-wide uppercase select-none">
          <span className={`px-2 transition-colors ${currentStep === 1 ? "text-[#CC97FF] border-b-2 border-[#CC97FF] pb-1.5" : "text-dark-gray"}`}>
            1. Book Info
          </span>
          <span className={`px-2 transition-colors ${currentStep === 2 ? "text-[#CC97FF] border-b-2 border-[#CC97FF] pb-1.5" : "text-dark-gray"}`}>
            2. Chapters
          </span>
          <span className={`px-2 transition-colors ${currentStep === 3 ? "text-[#CC97FF] border-b-2 border-[#CC97FF] pb-1.5" : "text-dark-gray"}`}>
            3. Universe
          </span>
          <span className={`px-2 transition-colors ${currentStep === 4 ? "text-[#CC97FF] border-b-2 border-[#CC97FF] pb-1.5" : "text-dark-gray"}`}>
            4. Publish
          </span>
        </div>

        {/* Dynamic Wizard Steps Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] flex flex-col gap-5">
          {currentStep === 1 && (
            <div className="flex flex-col gap-4">
              {/* Row 1: Cover Upload & Inputs */}
              <div className="flex flex-col sm:flex-row gap-5 items-stretch">
                
                {/* Left side Cover Upload */}
                <div className="w-36 h-36 sm:w-44 shrink-0 flex flex-col justify-between">
                  <CommonImageUpload
                    value={coverImage}
                    onChange={(file) => setCoverImage(file)}
                    className="h-full min-h-[144px]"
                  />
                </div>

                {/* Right side Text Inputs */}
                <div className="flex-1 w-full flex flex-col gap-3 justify-between">
                  <CommonInput
                    label="Audiobook Title *"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Project Hail Mary"
                  />
                  <CommonInput
                    label="Author *"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Andy Weir"
                  />
                  <CommonInput
                    label="Narrator *"
                    value={narrator}
                    onChange={(e) => setNarrator(e.target.value)}
                    placeholder="e.g. Ray Porter"
                  />
                </div>
              </div>

              {/* Dropdowns Row */}
              <CommonInputContainer>
                <CommonSelect
                  label="Genre *"
                  value={genre}
                  onChange={(val) => setGenre(val)}
                  options={genreOptions}
                  placeholder="Select genre *"
                />
                <CommonSelect
                  label="Language *"
                  value={language}
                  onChange={(val) => setLanguage(val)}
                  options={languageOptions}
                  placeholder="Select language *"
                />
              </CommonInputContainer>

              {/* Synopsis TextArea */}
              <CommonInput
                label="Synopsis *"
                type="textarea"
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                placeholder="Provide a compelling description of this audiobook..."
                rows={4}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col">
                  <h3 className="text-white text-[16px] font-semibold leading-tight">
                    Chapter List
                  </h3>
                  <span className="text-white/40 text-xs">
                    Upload each chapter's audio file and set its title
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full border border-[#CC97FF]/20 bg-[#CC97FF]/10 text-[#CC97FF] text-[10px] font-semibold uppercase select-none">
                  1 chapters
                </span>
              </div>

              {/* Chapter Card Item */}
              <div className="border border-white/10 bg-[#161616] rounded-[16px] p-5 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#CC97FF]/20 text-[#CC97FF] flex items-center justify-center text-xs font-semibold">
                    1
                  </div>
                  <span className="text-white text-sm font-semibold">Chapter 1</span>
                </div>

                {/* Upload File Zone */}
                <CommonAudioInput
                  value={chapterFile}
                  onChange={(file) => setChapterFile(file)}
                  title="Upload audio file"
                  subtitle="MP3, WAV, FLAC · Max 500MB"
                />

                <CommonInput
                  label="Chapter Title *"
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  placeholder="e.g. Chapter 1: The Eridian"
                />
              </div>

              {/* Add another chapter mockup */}
              <button
                type="button"
                onClick={() => toast.info("Creating multiple chapters is under development.")}
                className="flex py-2 px-3 justify-center items-center gap-2 rounded-xl border border-white/10 bg-white/5 text-light-gray hover:bg-white/10 text-xs font-normal text-center cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Another Chapter
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col mb-2">
                <h3 className="text-white text-[16px] font-semibold leading-tight">
                  In this Universe
                </h3>
                <span className="text-white/40 text-xs">
                  Add prequel or sequel books that belong to the same series or universe
                </span>
              </div>

              {/* Add Sequel block replica */}
              <div 
                onClick={() => toast.info("Adding sequel relationships is under development.")}
                className="border-dashed border-2 border-white/10 bg-white/[0.02] hover:bg-white/[0.04] py-10 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center"
              >
                <div className="w-9 h-9 rounded-lg bg-[#CC97FF]/10 border border-[#CC97FF]/20 flex items-center justify-center text-[#CC97FF]">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-xs text-white/70 font-medium">
                  Add Prequel or Sequel
                </span>
                <span className="text-[10px] text-dark-gray">
                  Optional — leave empty if this is a standalone book
                </span>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex flex-col items-center text-center p-8 gap-4 border border-white/5 bg-white/[0.02] rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-green-success/10 border border-green-success/20 flex items-center justify-center text-green-success">
                <Globe className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-white text-[18px] font-semibold">Ready to Publish</h3>
                <p className="text-light-gray text-xs max-w-sm">
                  You are about to upload & publish "{title || "New Audiobook"}" by {author || "Unknown Author"}. It will be immediately available in the catalog list.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Buttons */}
        <div className="p-4 border-t border-white/5 mt-auto flex gap-4 bg-[#181818]">
          {currentStep === 1 ? (
            <DialogClose asChild className="flex-1">
              <Button variant="outline" className="rounded-full cursor-pointer h-11">
                Cancel
              </Button>
            </DialogClose>
          ) : (
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 rounded-full cursor-pointer h-11 flex items-center justify-center gap-2"
              onClick={handleBack}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
          )}

          {currentStep < 4 ? (
            <Button
              type="button"
              className="flex-1 rounded-full bg-gradient-to-r from-secondary to-[#B1FE4D] text-button-text font-semibold hover:opacity-90 border-0 h-11 cursor-pointer"
              onClick={handleNext}
            >
              {currentStep === 1 && "Next: Chapters →"}
              {currentStep === 2 && "Next: Universe →"}
              {currentStep === 3 && "Next: Publish →"}
            </Button>
          ) : (
            <Button
              type="button"
              className="flex-1 rounded-full bg-gradient-to-r from-secondary to-[#B1FE4D] text-button-text font-semibold hover:opacity-90 border-0 h-11 cursor-pointer"
              onClick={handlePublish}
            >
              Publish Audiobook
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UploadAudioBookDialog
