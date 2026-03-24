"use client"

import { useMemo, useState } from "react"
import { initialChats } from "../data"
import { Chat, Message } from "../types"

const createTimestamp = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

export const useChatState = () => {
  const [chats, setChats] = useState<Chat[]>(initialChats)
  const [activeChatId, setActiveChatId] = useState(initialChats[0]?.id)
  const [message, setMessage] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isEphemeralChat, setIsEphemeralChat] = useState(false)

  const activeChat = useMemo(
    () => chats.find((chat) => chat.id === activeChatId) ?? chats[0],
    [activeChatId, chats]
  )

  const sendMessage = () => {
    if (!message.trim() || !activeChat) return

    const nextMessage: Message = {
      id: `${Date.now()}-user`,
      role: "user",
      content: message.trim(),
      timestamp: createTimestamp(),
    }

    const targetChatId = activeChat.id

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === targetChatId
          ? { ...chat, messages: [...chat.messages, nextMessage] }
          : chat
      )
    )
    setMessage("")

    setTimeout(() => {
      const reply: Message = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content:
          "Got it. I can summarize next steps or draft a plan if you want.",
        timestamp: createTimestamp(),
      }
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === targetChatId
            ? { ...chat, messages: [...chat.messages, reply] }
            : chat
        )
      )
    }, 600)
  }

  const newChat = () => {
    const newChatItem: Chat = {
      id: `chat-${Date.now()}`,
      title: `New chat ${chats.length + 1}`,
      messages: [],
    }
    setChats((prev) => [newChatItem, ...prev])
    setActiveChatId(newChatItem.id)
  }

  const toggleEphemeralChat = () => {
    setIsEphemeralChat((prev) => !prev)
  }

  return {
    chats,
    activeChat,
    activeChatId,
    setActiveChatId,
    message,
    setMessage,
    sidebarOpen,
    setSidebarOpen,
    isEphemeralChat,
    toggleEphemeralChat,
    sendMessage,
    newChat,
  }
}
