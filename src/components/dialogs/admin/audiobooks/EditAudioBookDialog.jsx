"use client"

import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Upload, X, Plus, Music, Globe, ChevronLeft, ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Trash2 } from "lucide-react"
import { toast } from "sonner"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonSelectCards from "@/components/shared/CommonInputs/CommonInput/CommonSelectCards"
import CommonImageUpload from "@/components/shared/CommonInputs/CommonImageUpload/CommonImageUpload"
import CommonAudioInput from "@/components/shared/CommonInputs/CommonAudioInput/CommonAudioInput"
import CommonInputContainer from "@/components/shared/CommonInputs/CommonInput/CommonInputContainer"
import { useAdminDashboardAudioBooksStore } from "@/zustandStore/admin/adminStore/adminDashboardAudioBooksStore"

const VISIBILITY_OPTIONS = [
  { value: "publish", label: "Publish Now", icon: CheckCircle2 },
  { value: "schedule", label: "Schedule", icon: ClockIcon },
  { value: "draft", label: "Save as Draft", icon: FileTextIcon },
]

function ClockIcon(props) {
  return <Globe {...props} className="w-4 h-4" />
}
function FileTextIcon(props) {
  return <Music {...props} className="w-4 h-4" />
}

const EditAudioBookDialog = ({ book, children }) => {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Book Info, 2: Chapters, 3: Universe, 4: Publish

  const updateAudioBook = useAdminDashboardAudioBooksStore((state) => state.updateAudioBook)

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

  // Universe states
  const [universeState, setUniverseState] = useState("initial") // "initial" | "selection" | "form"
  const [relatedBooks, setRelatedBooks] = useState([])
  const [visibility, setVisibility] = useState("publish")

  // Sync initial values on open or book change
  useEffect(() => {
    if (book && open) {
      setTitle(book.title || "")
      setAuthor(book.artist || "")
      setNarrator(book.narrator || "")
      setGenre(book.category || "")
      setLanguage(book.language || "")
      setSynopsis(book.synopsis || "")
      setCoverImage(book.cover || null)

      // Sync chapter
      if (book.chapters && book.chapters.length > 0) {
        setChapterTitle(book.chapters[0].title || "")
        setChapterFile(book.chapters[0].audioFile || "chapter1.mp3")
      } else {
        setChapterTitle("")
        setChapterFile(null)
      }

      // Sync related books
      if (book.universeBooks && book.universeBooks.length > 0) {
        const mapped = book.universeBooks.map(ub => ({
          id: ub.id,
          type: ub.badge || "sequel",
          title: ub.title || "",
          narrator: ub.narrator || "",
          coverImage: ub.cover || null,
          chapterTitle: ub.episodes?.[0]?.title || "",
          chapterFile: ub.episodes?.[0]?.audioFile || "chapter1.mp3"
        }))
        setRelatedBooks(mapped)
        setUniverseState("form")
      } else {
        setRelatedBooks([])
        setUniverseState("initial")
      }

      setVisibility(
        book.status === "Published" 
          ? "publish" 
          : book.status === "Scheduled" 
            ? "schedule" 
            : "draft"
      )
    }
  }, [book, open])

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

  const handleAddRelatedBook = (type) => {
    setRelatedBooks([
      ...relatedBooks,
      {
        id: Date.now(),
        type: type, // "prequel" | "sequel"
        title: "",
        narrator: "",
        coverImage: null,
        chapterTitle: "",
        chapterFile: null
      }
    ])
    setUniverseState("form")
  }

  const handleUpdateRelatedBook = (id, field, value) => {
    setRelatedBooks(relatedBooks.map(b => b.id === id ? { ...b, [field]: value } : b))
  }

  const handleDeleteRelatedBook = (id) => {
    const updated = relatedBooks.filter(b => b.id !== id)
    setRelatedBooks(updated)
    if (updated.length === 0) {
      setUniverseState("initial")
    }
  }

  const handleSave = () => {
    const mappedUniverse = relatedBooks.map(b => ({
      id: b.id,
      title: b.title || "Related Book",
      artist: author || "Author",
      narrator: b.narrator || "Narrator",
      duration: "6h 20m",
      chaptersCount: 1,
      cover: typeof b.coverImage === "string" ? b.coverImage : "/audioBookImages/projectHill.png",
      badge: b.type,
      episodes: [
        { id: b.id + 10, title: b.chapterTitle || "Chapter 1", duration: "42 min" }
      ]
    }))

    const updatedBook = {
      title: title,
      artist: author,
      narrator: narrator,
      category: genre,
      language: language,
      synopsis: synopsis,
      cover: typeof coverImage === "string" ? coverImage : "/audioBookImages/projectHill.png",
      status: visibility === "publish" ? "Published" : visibility === "schedule" ? "Scheduled" : "Draft",
      chapters: [
        { id: book?.chapters?.[0]?.id || Date.now(), title: chapterTitle, duration: "42 min" }
      ],
      universeBooks: mappedUniverse
    }

    updateAudioBook(book.id, updatedBook)

    toast.success("Audiobook updated successfully!")
    setOpen(false)
    setCurrentStep(1)
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden flex flex-col bg-[#121212] border border-white/10 rounded-[24px] max-h-[95vh]">
        {/* Header Title */}
        <div className="p-4 flex items-center border-b border-white/5 bg-[#181818]">
          <DialogTitle className="text-[18px] font-semibold text-white truncate max-w-[450px]">
            {book?.title || "Edit Audiobook"}
          </DialogTitle>
        </div>

        {/* Wizard Progress Steps Bar */}
        <div className="grid grid-cols-4 text-center border-b border-white/5 py-3 bg-[#161616] text-[11px] font-semibold tracking-wide uppercase select-none shrink-0">
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
        <div className="p-6 overflow-y-auto flex-1 min-h-0 flex flex-col gap-5 scrollbar-thin">
          
          {/* STEP 1: BOOK INFO */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-4">
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

          {/* STEP 2: CHAPTERS */}
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

              <button
                type="button"
                onClick={() => toast.info("Creating multiple chapters is under development.")}
                className="flex py-2 px-3 justify-center items-center gap-2 rounded-xl border border-white/10 bg-white/5 text-light-gray hover:bg-white/10 text-xs font-normal text-center cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Another Chapter
              </button>
            </div>
          )}

          {/* STEP 3: UNIVERSE */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <h3 className="text-white text-[16px] font-semibold leading-tight">
                  In this Universe
                </h3>
                <span className="text-white/40 text-xs mt-0.5">
                  Add prequel or sequel books that belong to the same series or universe
                </span>
              </div>

              {/* Related Books Forms Grid */}
              {universeState === "form" && relatedBooks.map((relBook, index) => (
                <div key={relBook.id} className="border border-white/10 bg-[#161616] rounded-[16px] p-5 flex flex-col gap-4 relative">
                  
                  {/* Badge & Title header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${relBook.type === "prequel" ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-500" : "bg-purple-500/10 border border-purple-500/20 text-purple-500"}`}>
                        {relBook.type}
                      </span>
                      <span className="text-white text-sm font-semibold">Related Book {index + 1}</span>
                    </div>

                    <button 
                      onClick={() => handleDeleteRelatedBook(relBook.id)}
                      className="text-red-error hover:text-red-error/80 cursor-pointer border-0 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Related Book Cover and Inputs */}
                  <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                    <div className="w-28 h-28 shrink-0">
                      <CommonImageUpload
                        value={relBook.coverImage}
                        onChange={(file) => handleUpdateRelatedBook(relBook.id, "coverImage", file)}
                        className="h-full min-h-[110px]"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <CommonInput
                        label="Book Title *"
                        value={relBook.title}
                        onChange={(e) => handleUpdateRelatedBook(relBook.id, "title", e.target.value)}
                        placeholder="e.g. Project Hail Mary"
                      />
                      <CommonInput
                        label="Narrator *"
                        value={relBook.narrator}
                        onChange={(e) => handleUpdateRelatedBook(relBook.id, "narrator", e.target.value)}
                        placeholder="e.g. Ray Porter"
                      />
                    </div>
                  </div>

                  {/* Nested Chapters List */}
                  <div className="flex flex-col gap-3 border-t border-white/5 pt-3">
                    <span className="text-[12px] text-dark-gray font-semibold uppercase">Chapters</span>
                    <div className="border border-white/5 bg-[#20201F] rounded-xl p-4 flex flex-col gap-3">
                      <span className="text-white/60 text-xs font-semibold">1 Chapter 1</span>
                      
                      <CommonAudioInput
                        value={relBook.chapterFile}
                        onChange={(file) => handleUpdateRelatedBook(relBook.id, "chapterFile", file)}
                        title="Upload audio file"
                        subtitle="MP3, WAV · Max 500MB"
                      />
                      <CommonInput
                        label="Chapter Title *"
                        value={relBook.chapterTitle}
                        onChange={(e) => handleUpdateRelatedBook(relBook.id, "chapterTitle", e.target.value)}
                        placeholder="e.g. Chapter 1: The Eridian"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Initial / Button choice trigger */}
              {universeState === "initial" && (
                <div 
                  onClick={() => setUniverseState("selection")}
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
              )}

              {/* Selection cards state */}
              {universeState === "selection" && (
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => handleAddRelatedBook("prequel")}
                    className="border border-white/10 bg-white/5 hover:bg-white/10 rounded-[16px] p-6 flex flex-col items-center justify-center gap-3 text-center cursor-pointer transition-all active:scale-95"
                  >
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
                      <ArrowLeft className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-semibold">Add Prequel</span>
                      <span className="text-[11px] text-dark-gray mt-0.5">Came before this book</span>
                    </div>
                  </div>

                  <div 
                    onClick={() => handleAddRelatedBook("sequel")}
                    className="border border-white/10 bg-white/5 hover:bg-white/10 rounded-[16px] p-6 flex flex-col items-center justify-center gap-3 text-center cursor-pointer transition-all active:scale-95"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-semibold">Add Sequel</span>
                      <span className="text-[11px] text-dark-gray mt-0.5">Comes after this book</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Append button if forms exist */}
              {universeState === "form" && (
                <button
                  type="button"
                  onClick={() => setUniverseState("selection")}
                  className="flex py-3 px-4 justify-center items-center gap-2 rounded-xl border border-dashed border-white/10 bg-white/[0.02] text-light-gray hover:bg-white/[0.04] text-xs font-semibold cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Prequel or Sequel
                </button>
              )}
            </div>
          )}

          {/* STEP 4: PUBLISH / SUMMARY */}
          {currentStep === 4 && (
            <div className="flex flex-col gap-6">
              
              {/* Review Summary Container */}
              <div className="border border-white/10 bg-[#161616] rounded-[16px] p-5 flex flex-col gap-4">
                <h3 className="text-white text-sm font-semibold border-b border-white/5 pb-2.5">
                  Review Summary
                </h3>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-success" />
                      <span className="text-light-gray font-medium">Chapters uploaded</span>
                    </div>
                    <span className="text-white font-semibold">1 chapters</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-success" />
                      <span className="text-light-gray font-medium">Related books</span>
                    </div>
                    <span className="text-white font-semibold">{relatedBooks.length} book(s)</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      {coverImage ? (
                        <CheckCircle2 className="w-4 h-4 text-green-success" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-warning" />
                      )}
                      <span className="text-light-gray font-medium">Cover image</span>
                    </div>
                    <span className={`font-semibold ${coverImage ? "text-white" : "text-yellow-warning"}`}>
                      {coverImage ? "Uploaded" : "Not uploaded yet"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      {synopsis ? (
                        <CheckCircle2 className="w-4 h-4 text-green-success" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-warning" />
                      )}
                      <span className="text-light-gray font-medium">Synopsis</span>
                    </div>
                    <span className={`font-semibold ${synopsis ? "text-white" : "text-yellow-warning"}`}>
                      {synopsis ? "Filled" : "Not filled"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Visibility Cards Trigger Component */}
              <CommonSelectCards
                label="Visibility"
                options={VISIBILITY_OPTIONS}
                value={visibility}
                onChange={(val) => setVisibility(val)}
              />
            </div>
          )}
        </div>

        {/* Wizard Footer Buttons */}
        <div className="p-4 border-t border-white/5 mt-auto flex gap-4 bg-[#181818] shrink-0">
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
              Save & Next →
            </Button>
          ) : (
            <Button
              type="button"
              className="flex-1 rounded-full bg-gradient-to-r from-secondary to-[#B1FE4D] text-button-text font-semibold hover:opacity-90 border-0 h-11 cursor-pointer"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditAudioBookDialog
