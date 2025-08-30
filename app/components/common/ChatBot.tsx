"use client"

import type React from "react"
import { useState, useRef, useEffect, useLayoutEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Send, 
  Bot, 
  User, 
  MessageCircle, 
  X, 
  Minimize2,
  RotateCcw,
  Download,
  Mic,
  MicOff,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check
} from "lucide-react"
import Image from "next/image"
import { MessageRenderer } from "./chatbot/MessageRenderer"

export interface ChatBotProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  showLauncher?: boolean
  anchorElementId?: string
  anchorGap?: number
  anchorOffsetY?: number 
  panelSize?: { width: number; height: number }
  apiEndpoint: string
  welcomeMessage?: string
  companyName?: string
  enableVoice?: boolean
  maxMessages?: number
  persistMessages?: boolean
  apiHeaders?: Record<string, string>
  onError?: (error: Error) => void
}

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  rating?: 'positive' | 'negative' | null
  isError?: boolean
}

interface QuickReply {
  text: string
  action: string
}

const defaultQuickReplies: QuickReply[] = [
  { text: "¿Qué cursos ofrecen?", action: "courses" },
  { text: "Quiero información sobre precios", action: "pricing" },
  { text: "¿Cómo funciona el matching?", action: "matching" },
  { text: "Hablar con un asesor", action: "advisor" }
]

export default function ChatBot({
  open,
  defaultOpen = false,
  onOpenChange,
  showLauncher = true,
  anchorElementId,
  anchorGap = 12,
  anchorOffsetY = 16,
  panelSize = { width: 384, height: 600 },
  apiEndpoint,
  welcomeMessage = "¡Hola! Soy tu asistente inteligente. ¿En qué puedo ayudarte hoy?",
  companyName = "MatchMyCourse",
  enableVoice = false,
  maxMessages = 100,
  persistMessages = true,
  apiHeaders = {},
  onError
}: ChatBotProps) {
  const isControlled = typeof open === "boolean"
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [isMinimized, setIsMinimized] = useState(false)
  
  const isOpen = isControlled ? (open as boolean) : internalOpen
  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  // Estados del chat
  const [messages, setMessages] = useState<Message[]>(() => {
    if (persistMessages && typeof window !== 'undefined') {
      try {
        const saved = window.localStorage?.getItem(`chatbot-messages-${companyName}`)
        if (saved) {
          const parsedMessages = JSON.parse(saved)
          return parsedMessages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }
      } catch (e) {
        console.warn('Error loading saved messages:', e)
      }
    }
    
    return [{
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Date.now().toString(),
      content: welcomeMessage,
      sender: "bot",
      timestamp: new Date()
    }]
  })

  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)

  // React Query mutation
  const sendMessageMutation = useMutation({
    mutationFn: async ({ message, history }: { message: string; history: Message[] }) => {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...apiHeaders
        },
        body: JSON.stringify({ 
          message, 
          history: history.slice(-10).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content
          }))
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      const botMessage: Message = {
        id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Date.now().toString(),
        content: data.data?.data?.message || data.data?.message || data.message || "Respuesta recibida",
        sender: "bot",
        timestamp: new Date()
      }
      
      setMessages(prev => {
        const newMessages = [...prev, botMessage]
        if (newMessages.length > maxMessages) {
          return newMessages.slice(-maxMessages)
        }
        return newMessages
      })
      
      setShowQuickReplies(true)
    },
    onError: (error: Error) => {
      console.error('Error sending message:', error)
      
      const errorMessage: Message = {
        id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Date.now().toString(),
        content: "Lo siento, ocurrió un error. Por favor, intenta de nuevo.",
        sender: "bot",
        timestamp: new Date(),
        isError: true
      }
      
      setMessages(prev => [...prev, errorMessage])
      setShowQuickReplies(true)
      onError?.(error)
    }
  })

  const isTyping = sendMessageMutation.isPending
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [coords, setCoords] = useState<{ bottom: number; right: number }>({ bottom: 24, right: 24 })
  
  const formatTime = (timestamp: Date | string | number) => {
    try {
      const date = new Date(timestamp)
      if (isNaN(date.getTime())) {
        return new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
      }
      return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
    } catch (error) {
      return new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
    }
  }
  
  const currentPanelSize = isMinimized 
    ? { width: panelSize.width, height: 80 }
    : panelSize

  // Effects
  useEffect(() => {
    if (persistMessages && messages.length > 0 && typeof window !== 'undefined') {
      try {
        window.localStorage?.setItem(`chatbot-messages-${companyName}`, JSON.stringify(messages))
      } catch (e) {
        console.warn('Error saving messages:', e)
      }
    }
  }, [messages, persistMessages, companyName])

  const updateCoords = () => {
    if (!anchorElementId || typeof window === 'undefined') return
    const el = document.getElementById(anchorElementId)
    if (!el) return
    const rect = el.getBoundingClientRect()
    const right = Math.max(8, window.innerWidth - rect.left + anchorGap)
    const bottom = Math.max(8, window.innerHeight - rect.bottom + anchorOffsetY)
    setCoords({ bottom, right })
  }

  useLayoutEffect(() => {
    if (!isOpen) return
    updateCoords()
    const onResize = () => updateCoords()
    const onScroll = () => updateCoords()
    window.addEventListener("resize", onResize)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("scroll", onScroll)
    }
  }, [isOpen, anchorElementId, anchorGap])

  const scrollToBottom = () => {
    const host = scrollAreaRef.current
    if (!host) return
    const viewport = host.querySelector<HTMLElement>("[data-radix-scroll-area-viewport]")
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight
    }
  }

  useEffect(() => {
    const host = scrollAreaRef.current
    const viewport = host?.querySelector<HTMLElement>("[data-radix-scroll-area-viewport]")
    if (viewport) {
      viewport.style.scrollbarGutter = "stable"
      viewport.style.overflowY = "scroll"
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
    if (!isOpen) {
      const newMessages = messages.filter(m => m.timestamp > new Date(Date.now() - 30000))
      setUnreadCount(newMessages.filter(m => m.sender === 'bot').length)
    } else {
      setUnreadCount(0)
    }
  }, [messages, isOpen])

  // Handlers
  const handleSendMessage = async () => {
    const text = inputValue.trim()
    if (!text || isTyping) return

    const userMessage: Message = {
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Date.now().toString(),
      content: text,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setShowQuickReplies(false)
    
    sendMessageMutation.mutate({ 
      message: text, 
      history: [...messages, userMessage] 
    })
  }

  const handleQuickReply = (reply: QuickReply) => {
    setInputValue(reply.text)
    setTimeout(() => handleSendMessage(), 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleVoiceInput = () => {
    if (!enableVoice) return
    
    if (typeof window === 'undefined' || !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Reconocimiento de voz no disponible en este navegador')
      return
    }

    if (isListening) {
      setIsListening(false)
      return
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'es-ES'

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInputValue(transcript)
    }

    recognition.start()
  }

  const rateMessage = (messageId: string, rating: 'positive' | 'negative') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, rating } : msg
      )
    )
  }

  const copyMessage = async (content: string, messageId: string) => {
    if (typeof window === 'undefined' || !navigator.clipboard) return
    
    try {
      await navigator.clipboard.writeText(content)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (err) {
      console.error('Error copying message:', err)
    }
  }

  const resetChat = () => {
    setMessages([{
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Date.now().toString(),
      content: welcomeMessage,
      sender: "bot",
      timestamp: new Date()
    }])
    setShowQuickReplies(true)
    if (persistMessages && typeof window !== 'undefined') {
      try {
        window.localStorage?.removeItem(`chatbot-messages-${companyName}`)
      } catch (e) {
        console.warn('Error removing saved messages:', e)
      }
    }
  }

  const exportChat = () => {
    if (typeof window === 'undefined') return
    
    const chatContent = messages.map(msg => 
      `[${formatTime(msg.timestamp)}] ${msg.sender.toUpperCase()}: ${msg.content}`
    ).join('\n')
    
    const blob = new Blob([chatContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chat-${companyName}-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {showLauncher && !isOpen && (
        <Button
          onClick={() => setOpen(true)}
          className="bottom-6 right-6 h-16 w-16 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-2xl transition-all duration-300 hover:scale-110 z-50 relative group"
          aria-label="Abrir chat"
        >
          <MessageCircle className="h-8 w-8 transition-transform group-hover:scale-110" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </Badge>
          )}
        </Button>
      )}

      {isOpen && (
        <div
          className="fixed z-50 transition-all duration-200 ease-out [will-change:transform]"
          style={{ 
            bottom: coords.bottom, 
            right: coords.right, 
            width: currentPanelSize.width, 
            height: currentPanelSize.height 
          }}
          role="dialog"
          aria-label={`ChatBot ${companyName}`}
        >
          <Card className="h-full flex flex-col shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden rounded-2xl">
            {/* Header estilo TestGorilla mejorado */}
            <div className="flex items-center gap-3 p-4 bg-[#5472FE] dark:bg-gray-800 text-white">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-white p-2 shadow-md flex items-center justify-center">
                  <Image src="/logos/favicon.png" alt="Logo" width={20} height={20} className="w-5 h-5 object-contain" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-bold text-lg truncate">ChatBot {companyName}</h1>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-sm opacity-90">
                    {isTyping ? 'Escribiendo...' : 'En línea'}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-1">
                <Button
                  onClick={() => setIsMinimized(!isMinimized)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-white/20 text-white rounded-full"
                  aria-label={isMinimized ? "Expandir" : "Minimizar"}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                
                <Button
                  onClick={resetChat}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-white/20 text-white rounded-full"
                  aria-label="Reiniciar chat"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                
                <Button
                  onClick={() => setOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-white/20 text-white rounded-full"
                  aria-label="Cerrar chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Área de mensajes estilo TestGorilla */}
                <ScrollArea ref={scrollAreaRef} className="flex-1 p-6 bg-gray-50 dark:bg-gray-800">
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex gap-3 group ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                        {message.sender === "bot" && (
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-gray-400 dark:bg-gray-500 flex items-center justify-center shadow-md">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}

                        <div className={`max-w-[80%] relative ${
                          message.sender === "user" 
                            ? "ml-auto" 
                            : ""
                        }`}>
                          <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                            message.sender === "user" 
                              ? "bg-gray-900 dark:bg-gray-700 text-white ml-auto" 
                              : message.isError
                              ? "bg-red-50 text-red-800 border border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800"
                              : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
                          }`}>
                            <MessageRenderer content={message.content} sender={message.sender} />
                          </div>
                          
                          {/* Timestamp y controles */}
                          <div className={`flex items-center gap-2 mt-2 px-2 ${
                            message.sender === "user" ? "justify-end" : "justify-start"
                          }`}>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatTime(message.timestamp)}
                            </p>
                            
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                onClick={() => copyMessage(message.content, message.id)}
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
                                title="Copiar mensaje"
                              >
                                {copiedMessageId === message.id ? 
                                  <Check className="h-3 w-3 text-green-500" /> : 
                                  <Copy className="h-3 w-3 text-gray-400" />
                                }
                              </Button>
                              
                              {message.sender === "bot" && !message.isError && (
                                <>
                                  <Button
                                    onClick={() => rateMessage(message.id, 'positive')}
                                    variant="ghost"
                                    size="sm"
                                    className={`h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full ${
                                      message.rating === 'positive' ? 'text-green-500' : 'text-gray-400'
                                    }`}
                                    title="Me gusta"
                                  >
                                    <ThumbsUp className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    onClick={() => rateMessage(message.id, 'negative')}
                                    variant="ghost"
                                    size="sm"
                                    className={`h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full ${
                                      message.rating === 'negative' ? 'text-red-500' : 'text-gray-400'
                                    }`}
                                    title="No me gusta"
                                  >
                                    <ThumbsDown className="h-3 w-3" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {message.sender === "user" && (
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-gray-400 dark:bg-gray-500 flex items-center justify-center shadow-md">
                              <User className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Indicador de escritura estilo TestGorilla */}
                    {isTyping && (
                      <div className="flex gap-3 animate-in slide-in-from-left duration-300">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gray-400 dark:bg-gray-500 flex items-center justify-center shadow-md">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-2xl px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-600">
                          <div className="flex gap-1 items-center">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                              Escribiendo...
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Respuestas rápidas estilo TestGorilla */}
                    {showQuickReplies && !isTyping && messages.length <= 2 && (
                      <div className="space-y-4 pt-4">
                        <div className="grid grid-cols-1 gap-3">
                          {defaultQuickReplies.map((reply, index) => (
                            <Button
                              key={index}
                              onClick={() => handleQuickReply(reply)}
                              variant="outline"
                              className="h-auto p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 justify-start text-left"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                                  <span className="text-sm">💬</span>
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {reply.text}
                                </span>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input estilo TestGorilla */}
                <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-3 items-end">
                    <div className="flex-1 relative">
                      <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Haz una pregunta..."
                        className="pr-12 py-3 text-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 rounded-2xl placeholder:text-gray-400"
                        disabled={isTyping}
                        aria-label="Escribir mensaje"
                      />
                      
                      {enableVoice && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Button
                            onClick={toggleVoiceInput}
                            variant="ghost"
                            size="sm"
                            className={`h-8 w-8 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              isListening ? 'text-red-500' : 'text-gray-400'
                            }`}
                            disabled={isTyping}
                          >
                            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="h-12 w-12 rounded-2xl bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white shadow-lg transition-all duration-150 flex-shrink-0 disabled:opacity-50"
                      aria-label="Enviar mensaje"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {/* Footer estilo TestGorilla */}
                  <div className="flex items-center justify-center mt-3">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <span>⚡</span>
                      Powered by {companyName}
                    </p>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  )
}