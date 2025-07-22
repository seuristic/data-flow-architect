import { create } from 'zustand'
import type { Message, FlowDiagram, Node, AppState } from '@/types'
import { generateId } from '@/utils'

interface DataFlowStore extends AppState {
  // Actions
  addMessage: (content: string, type: 'user' | 'ai') => void
  setLoading: (loading: boolean) => void
  setCurrentFlow: (flow: FlowDiagram | null) => void
  setSelectedNode: (nodeId: string | null) => void
  updateNodeStatus: (nodeId: string, status: Node['status']) => void
  updateNodeConfiguration: (nodeId: string, config: Record<string, unknown>) => void
  clearMessages: () => void
  createFlowFromPrompt: (prompt: string) => void
}

export const useDataFlowStore = create<DataFlowStore>((set) => ({
  // Initial state
  currentFlow: null,
  messages: [],
  selectedNodeId: null,
  isLoading: false,

  // Actions
  addMessage: (content: string, type: 'user' | 'ai') => {
    const message: Message = {
      id: generateId(),
      content,
      type,
      timestamp: new Date(),
    }
    
    set((state) => ({
      messages: [...state.messages, message]
    }))
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },

  setCurrentFlow: (flow: FlowDiagram | null) => {
    set({ currentFlow: flow })
  },

  setSelectedNode: (nodeId: string | null) => {
    set({ selectedNodeId: nodeId })
  },

  updateNodeStatus: (nodeId: string, status: Node['status']) => {
    set((state) => ({
      currentFlow: state.currentFlow ? {
        ...state.currentFlow,
        nodes: state.currentFlow.nodes.map(node =>
          node.id === nodeId ? { ...node, status } : node
        )
      } : null
    }))
  },

  updateNodeConfiguration: (nodeId: string, config: Record<string, unknown>) => {
    set((state) => ({
      currentFlow: state.currentFlow ? {
        ...state.currentFlow,
        nodes: state.currentFlow.nodes.map(node =>
          node.id === nodeId ? { ...node, configuration: config } : node
        )
      } : null
    }))
  },

  clearMessages: () => {
    set({ messages: [] })
  },

  createFlowFromPrompt: (prompt: string) => {
    // Simulate AI processing and flow creation
    set({ isLoading: true })
    
    setTimeout(() => {
      const flow: FlowDiagram = {
        id: generateId(),
        title: 'Data Flow',
        description: prompt,
        nodes: [
          {
            id: generateId(),
            type: 'source',
            status: 'pending',
            label: 'Source',
            position: { x: 100, y: 200 }
          },
          {
            id: generateId(),
            type: 'transform',
            status: 'pending',
            label: 'Transform',
            position: { x: 300, y: 200 }
          },
          {
            id: generateId(),
            type: 'destination',
            status: 'pending',
            label: 'Destination',
            position: { x: 500, y: 200 }
          }
        ],
        connections: []
      }

      set((state) => ({
        currentFlow: flow,
        isLoading: false,
        messages: [...state.messages, {
          id: generateId(),
          content: `I've created a data flow based on your request: "${prompt}". Let me ask you some questions to configure each component.`,
          type: 'ai',
          timestamp: new Date()
        }]
      }))
    }, 1500)
  }
})) 