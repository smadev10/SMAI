"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { File, Image, Paperclip, Send } from "lucide-react"

type MessageComposerProps = {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export const MessageComposer = ({
  value,
  onChange,
  onSend,
  placeholder = "Message SMAI...",
  className = "",
  disabled = false,
}: MessageComposerProps) => {
  const attachmentMenuRef = useRef<HTMLDetailsElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const closeAttachmentMenu = () => {
    if (attachmentMenuRef.current) {
      attachmentMenuRef.current.open = false
    }
  }

  const handleSelectFiles = () => {
    closeAttachmentMenu()
    fileInputRef.current?.click()
  }

  const handleSelectImages = () => {
    closeAttachmentMenu()
    imageInputRef.current?.click()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      onSend()
    }
  }

  return (
    <div
      className={`flex w-full items-center gap-2 rounded-full border bg-background px-3 py-2 shadow-sm ${className}`}
    >
      <input ref={fileInputRef} type="file" className="hidden" multiple />
      <input
        ref={imageInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        multiple
      />
      <details ref={attachmentMenuRef} className="relative">
        <Button asChild variant="ghost" size="sm" className="rounded-full">
          <summary className="list-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2">
              <Paperclip className="h-4 w-4" />
              Attach
            </span>
          </summary>
        </Button>
        <div className="absolute bottom-full left-0 z-10 mb-2 w-44 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          <button
            type="button"
            onClick={handleSelectFiles}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
          >
            <File className="h-4 w-4" />
            Upload file
          </button>
          <button
            type="button"
            onClick={handleSelectImages}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
          >
            <Image className="h-4 w-4" />
            Upload image
          </button>
        </div>
      </details>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        className="h-9 border-0 bg-transparent px-2 shadow-none focus-visible:ring-0"
      />
      <Button
        onClick={onSend}
        disabled={disabled}
        size="icon"
        className="h-9 w-9 rounded-full"
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  )
}
