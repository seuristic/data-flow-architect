import type {
  Node as ReactFlowNode,
  Edge as ReactFlowEdge,
} from '@xyflow/react'

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

// Custom node data interface
export interface NodeData {
  type: NodeType
  status: NodeStatus
  label: string
  description?: string
  configuration?: Record<string, unknown>
  [key: string]: unknown
}

// Type aliases for React Flow components
export type FlowNode = ReactFlowNode<NodeData>
export type FlowEdge = ReactFlowEdge

// Flow diagram data
export interface FlowDiagram {
  id: string
  nodes: FlowNode[]
  edges: FlowEdge[]
  title: string
  description: string
}

// Legacy interfaces for backward compatibility
export interface Node {
  id: string
  type: NodeType
  status: NodeStatus
  label: string
  description?: string
  position: { x: number; y: number }
  configuration?: Record<string, unknown>
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
