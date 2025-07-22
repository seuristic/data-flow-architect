// Message types for chat interface
export interface Message {
  id: string
  content: string
  type: 'user' | 'ai'
  timestamp: Date
  isLoading?: boolean
}

// Node types for the canvas
export type NodeType = 'source' | 'transform' | 'destination'
export type NodeStatus = 'pending' | 'partial' | 'complete' | 'error'

export interface Node {
  id: string
  type: NodeType
  status: NodeStatus
  label: string
  description?: string
  position: { x: number; y: number }
  configuration?: Record<string, unknown>
}

// Flow diagram data
export interface FlowDiagram {
  id: string
  nodes: Node[]
  connections: Connection[]
  title: string
  description: string
}

export interface Connection {
  id: string
  sourceNodeId: string
  targetNodeId: string
  label?: string
}

// Application state
export interface AppState {
  currentFlow: FlowDiagram | null
  messages: Message[]
  selectedNodeId: string | null
  isLoading: boolean
}

// Example prompts for landing page
export interface ExamplePrompt {
  id: string
  title: string
  description: string
  prompt: string
} 