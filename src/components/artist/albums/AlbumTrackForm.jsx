import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonInputContainer from "@/components/shared/CommonInputs/CommonInput/CommonInputContainer"

const AlbumTrackForm = ({ initialTitle = "", initialDuration = "3:30", submitLabel = "Add", onSubmit, onCancel }) => {
    const [title, setTitle] = useState(initialTitle)
    const [duration, setDuration] = useState(initialDuration)
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim()) {
            setError("Track title is required")
            return
        }
        onSubmit?.({ title, duration })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CommonInput
                label="Track Title"
                placeholder="e.g. Tumi Onek Dami"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                    if (error) setError("")
                }}
                error={error}
            />

            <CommonInputContainer className="sm:grid-cols-1">
                <CommonInput
                    label="Duration"
                    placeholder="4:20"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
            </CommonInputContainer>

            <div className="flex items-center gap-4 mt-2 shrink-0">
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full"
                    size="lg"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="gradient"
                    className="flex-1"
                    size="lg"
                >
                    {submitLabel}
                </Button>
            </div>
        </form>
    )
}

export default AlbumTrackForm
