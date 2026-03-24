import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Message } from "../types"

type MessageListProps = {
  messages: Message[]
}

export const MessageList = ({ messages }: MessageListProps) => (
  <div className="flex flex-col gap-6">
    {messages.map((entry) => (
      <div
        key={entry.id}
        className={`flex items-start gap-3 ${
          entry.role === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <Avatar className="h-9 w-9 ring-1 ring-border">
          <AvatarFallback
            className={
              entry.role === "user"
                ? "bg-primary text-primary-foreground"
                : undefined
            }
          >
            {entry.role === "user" ? "ME" : "AI"}
          </AvatarFallback>
        </Avatar>
        <div
          className={`flex max-w-[72%] flex-col gap-1 ${
            entry.role === "user" ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ring-1 ring-border/60 ${
              entry.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted/60 text-foreground"
            }`}
          >
            {entry.content}
          </div>
          <div className="text-[11px] text-muted-foreground">
            {entry.timestamp}
          </div>
        </div>
      </div>
    ))}
  </div>
)
