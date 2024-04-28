export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  id: string
  name?: string
}

export type AIState = {
  // chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]
