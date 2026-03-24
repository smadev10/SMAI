import { Chat } from "./types"

export const initialChats: Chat[] = [
  {
    id: "chat-1",
    title: "Product Strategy",
    messages: [
      {
        id: "m-1",
        role: "assistant",
        content:
          "Tell me about the goal and timeline, and I will draft a plan.",
        timestamp: "09:12",
      },
      {
        id: "m-2",
        role: "user",
        content: "We need a 6-week rollout plan for the new onboarding flow.",
        timestamp: "09:13",
      },
    ],
  },
  {
    id: "chat-2",
    title: "Support Playbook",
    messages: [
      {
        id: "m-3",
        role: "assistant",
        content:
          "Share the top support pain points and I will help categorize them.",
        timestamp: "11:02",
      },
    ],
  },
  {
    id: "chat-3",
    title: "Launch Checklist",
    messages: [],
  },
]
