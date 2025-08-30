import { useMutation, useQuery } from "@tanstack/react-query"
import { useState, useCallback } from "react"

// Tipos mejorados para la API
interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
  metadata?: Record<string, any>
}

interface ChatRequest {
  message: string
  history?: ChatMessage[]
  context?: {
    userInfo?: Record<string, any>
    pageContext?: Record<string, any>
    sessionId?: string
    preferences?: Record<string, any>
  }
}

// Tipo más específico para metadata
interface ChatMetadata {
  confidence?: number
  responseType?: 'school_list' | 'course_info' | 'pricing' | 'general'
  entities?: Array<{
    type: string
    value: string
    confidence: number
  }>
}

interface ChatResponse {
  response: string
  messageId?: string
  suggestions?: string[]
  metadata?: ChatMetadata
  conversationId?: string
}

interface ChatBotConfig {
  apiEndpoint: string
  apiHeaders?: Record<string, string>
  retryAttempts?: number
  timeout?: number
  enableTypingDelay?: boolean
  typingDelayMs?: number
  enableContextPersistence?: boolean
  maxHistoryLength?: number
}

// Hook mejorado para manejar el chat
export const useChatBot = (config: ChatBotConfig) => {
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [context, setContext] = useState<Record<string, any>>({})
  const [isTypingSimulation, setIsTypingSimulation] = useState(false)

  // Función para simular typing delay realista
  const simulateTyping = useCallback(async (responseLength: number) => {
    if (!config.enableTypingDelay) return
    
    // Calcular delay basado en la longitud de la respuesta
    const baseDelay = config.typingDelayMs || 1000
    const calculatedDelay = Math.min(baseDelay + (responseLength / 10), 5000)
    
    setIsTypingSimulation(true)
    await new Promise(resolve => setTimeout(resolve, calculatedDelay))
    setIsTypingSimulation(false)
  }, [config.enableTypingDelay, config.typingDelayMs])

  // Función para procesar y estructurar la respuesta
  const processResponse = useCallback((rawResponse: any): ChatResponse => {
    let response = rawResponse
    
    // Manejar diferentes formatos de respuesta de la API
    if (typeof rawResponse === 'string') {
      response = { response: rawResponse }
    } else if (rawResponse.data) {
      if (typeof rawResponse.data === 'string') {
        response = { response: rawResponse.data }
      } else if (rawResponse.data.message) {
        response = { response: rawResponse.data.message, ...rawResponse.data }
      } else if (rawResponse.data.response) {
        response = rawResponse.data
      }
    } else if (rawResponse.message) {
      response = { response: rawResponse.message, ...rawResponse }
    }

    // Detectar tipo de respuesta automáticamente
    const responseText = response.response || ''
    let responseType: ChatMetadata['responseType'] = 'general'
    
    if (responseText.includes('**') && (responseText.includes('Descripción') || responseText.includes('Precio'))) {
      responseType = 'school_list'
    } else if (responseText.includes('curso') && responseText.includes('€')) {
      responseType = 'course_info'
    } else if (responseText.includes('precio') && responseText.includes('€')) {
      responseType = 'pricing'
    }

    // Crear metadata con valores por defecto
    const metadata: ChatMetadata = {
      ...response.metadata,
      responseType,
      confidence: response.metadata?.confidence || 0.9
    }

    return {
      ...response,
      metadata
    }
  }, [])

  // Mutation mejorada para enviar mensajes
  const sendMessage = useMutation({
    mutationFn: async (request: ChatRequest): Promise<ChatResponse> => {
      const controller = new AbortController()
      
      const timeoutId = setTimeout(() => {
        controller.abort()
      }, config.timeout || 30000)

      try {
        // Preparar contexto enriquecido
        const enrichedContext = {
          ...request.context,
          conversationId,
          timestamp: new Date().toISOString(),
          sessionContext: context
        }

        // Limitar historial si es necesario
        const limitedHistory = request.history
          ? request.history.slice(-(config.maxHistoryLength || 10))
          : []

        const requestBody = {
          message: request.message,
          history: limitedHistory,
          context: enrichedContext
        }

        const response = await fetch(config.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...config.apiHeaders
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(
            errorData.message || 
            errorData.error || 
            `HTTP ${response.status}: ${response.statusText}`
          )
        }

        const data = await response.json()
        const processedResponse = processResponse(data)
        
        // Actualizar conversationId si se proporciona
        if (processedResponse.conversationId && !conversationId) {
          setConversationId(processedResponse.conversationId)
        }

        // Persistir contexto si está habilitado
        if (config.enableContextPersistence && processedResponse.metadata) {
          setContext(prev => ({
            ...prev,
            lastResponseType: processedResponse.metadata?.responseType,
            lastMessageTimestamp: new Date().toISOString()
          }))
        }

        // Simular typing delay si está habilitado
        if (config.enableTypingDelay) {
          await simulateTyping(processedResponse.response.length)
        }

        return processedResponse
        
      } catch (error) {
        clearTimeout(timeoutId)
        
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            throw new Error('La solicitud tardó demasiado tiempo. Por favor, intenta de nuevo.')
          }
          
          // Mejorar mensajes de error específicos
          if (error.message.includes('Failed to fetch')) {
            throw new Error('Error de conexión. Verifica tu conexión a internet.')
          }
          
          if (error.message.includes('401')) {
            throw new Error('Error de autenticación. Verifica tu configuración.')
          }
          
          if (error.message.includes('429')) {
            throw new Error('Demasiadas solicitudes. Espera un momento antes de intentar de nuevo.')
          }
          
          if (error.message.includes('500')) {
            throw new Error('Error del servidor. Nuestro equipo está trabajando en solucionarlo.')
          }
        }
        
        throw error
      }
    },
    retry: (failureCount, error) => {
      // No reintentar para errores de autenticación o rate limiting
      if (error && typeof error === 'object' && 'message' in error) {
        const errorMessage = error.message as string
        if (errorMessage.includes('401') || errorMessage.includes('403') || errorMessage.includes('429')) {
          return false
        }
      }
      return failureCount < (config.retryAttempts || 2)
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000)
  })

  // Query para obtener historial de conversación
  const getConversationHistory = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: async () => {
      if (!conversationId) return null
      
      const historyEndpoint = config.apiEndpoint.replace('/chat', `/conversation/${conversationId}`)
      
      const response = await fetch(historyEndpoint, {
        headers: config.apiHeaders
      })
      
      if (!response.ok) {
        throw new Error('Error fetching conversation history')
      }
      
      return response.json()
    },
    enabled: !!conversationId && config.enableContextPersistence,
    staleTime: 5 * 60 * 1000,
    retry: 1
  })

  // Función para resetear la conversación
  const resetConversation = useCallback(() => {
    setConversationId(null)
    setContext({})
  }, [])

  // Función para actualizar contexto manualmente
  const updateContext = useCallback((newContext: Record<string, any>) => {
    setContext(prev => ({ ...prev, ...newContext }))
  }, [])

  return {
    sendMessage,
    conversationHistory: getConversationHistory.data,
    isLoadingHistory: getConversationHistory.isLoading,
    isTyping: sendMessage.isPending || isTypingSimulation,
    resetConversation,
    updateContext,
    conversationId,
    context,
    // Estados adicionales útiles
    isConnected: !sendMessage.isError,
    lastError: sendMessage.error as Error | null,
    retryLastMessage: sendMessage.mutate
  }
}

// Configuraciones mejoradas para diferentes proveedores
export const chatBotConfigs = {
  openai: {
    apiEndpoint: '/api/chat/openai',
    apiHeaders: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    enableTypingDelay: true,
    typingDelayMs: 1500,
    maxHistoryLength: 15
  },
  anthropic: {
    apiEndpoint: '/api/chat/anthropic',
    apiHeaders: {
      'x-api-key': `${process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY}`,
      'anthropic-version': '2023-06-01'
    },
    enableTypingDelay: true,
    typingDelayMs: 2000,
    maxHistoryLength: 20
  },
  custom: {
    apiEndpoint: '/api/chat/custom',
    apiHeaders: {
      'X-API-Key': `${process.env.NEXT_PUBLIC_CUSTOM_API_KEY}`,
    },
    enableTypingDelay: true,
    typingDelayMs: 1200,
    enableContextPersistence: true,
    maxHistoryLength: 25
  }
}

// Utilidades mejoradas
export const formatMessageForAPI = (
  content: string, 
  sender: 'user' | 'bot',
  metadata?: Record<string, any>
): ChatMessage => ({
  role: sender === 'user' ? 'user' : 'assistant',
  content,
  timestamp: new Date().toISOString(),
  metadata
})

export const createChatContext = (
  userInfo?: any, 
  pageContext?: any,
  preferences?: any
) => ({
  user: userInfo,
  page: {
    ...pageContext,
    url: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
  },
  preferences,
  timestamp: new Date().toISOString(),
  sessionId: crypto?.randomUUID?.() || Date.now().toString(),
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
})

// Hook para analytics del chatbot
export const useChatAnalytics = () => {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    // Integrar con tu servicio de analytics preferido
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, properties)
    }
  }, [])

  const trackMessageSent = useCallback((messageLength: number, responseTime?: number) => {
    trackEvent('chat_message_sent', {
      message_length: messageLength,
      response_time: responseTime
    })
  }, [trackEvent])

  const trackMessageRated = useCallback((rating: 'positive' | 'negative', messageType?: string) => {
    trackEvent('chat_message_rated', {
      rating,
      message_type: messageType
    })
  }, [trackEvent])

  return {
    trackEvent,
    trackMessageSent,
    trackMessageRated
  }
}