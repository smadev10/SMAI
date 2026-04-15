import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import { MessageSquare, MessageSquareOff } from "lucide-react"
import { ReactNode } from "react"

type ChatHeaderProps = {
  title: string
  subtitle?: string
  isEphemeralChat: boolean
  onToggleEphemeral: () => void
  sidebarTrigger?: ReactNode
}

export const ChatHeader = ({
  title,
  subtitle = "AI Assistant",
  isEphemeralChat,
  onToggleEphemeral,
  sidebarTrigger,
}: ChatHeaderProps) => (
  <div className="relative flex items-center justify-center border-b px-6 py-4">
    {sidebarTrigger}
    <div className="space-y-1 text-center">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-sm text-muted-foreground">{subtitle}</div>
    </div>
    <div className="absolute right-6 flex items-center gap-2">
      <Button
        variant={isEphemeralChat ? "secondary" : "ghost"}
        size="icon"
        className="rounded-full"
        onClick={onToggleEphemeral}
        aria-pressed={isEphemeralChat}
        aria-label={
          isEphemeralChat ? "Chat not saved enabled" : "Chat not saved disabled"
        }
      >
        {isEphemeralChat ? (
          <MessageSquareOff className="h-4 w-4" />
        ) : (
          <MessageSquare className="h-4 w-4" />
        )}
      </Button>
      <UserButton />
    </div>
  </div>
)
