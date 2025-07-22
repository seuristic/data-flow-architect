import { create } from 'zustand'
import type { Message, FlowDiagram, Node, AppState } from '@/types'
import { generateId } from '@/utils'

interface DataFlowStore extends AppState {
  addMessage: (content: string, type: 'user' | 'ai') => void
  setLoading: (loading: boolean) => void
  setCurrentFlow: (flow: FlowDiagram | null) => void
  setSelectedNode: (nodeId: string | null) => void
  updateNodeStatus: (nodeId: string, status: Node['status']) => void
  updateNodeConfiguration: (
    nodeId: string,
    config: Record<string, unknown>
  ) => void
  clearMessages: () => void
  createFlowFromPrompt: (prompt: string) => void
  resetState: () => void
  processUserInput: (input: string) => void
}

export const useDataFlowStore = create<DataFlowStore>(set => ({
  currentFlow: null,
  messages: [],
  selectedNodeId: null,
  isLoading: false,

  addMessage: (content: string, type: 'user' | 'ai') => {
    const message: Message = {
      id: generateId(),
      content,
      type,
      timestamp: new Date(),
    }

    set(state => ({
      messages: [...state.messages, message],
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
    set(state => ({
      currentFlow: state.currentFlow
        ? {
            ...state.currentFlow,
            nodes: state.currentFlow.nodes.map(node =>
              node.id === nodeId ? { ...node, status } : node
            ),
          }
        : null,
    }))
  },

  updateNodeConfiguration: (
    nodeId: string,
    config: Record<string, unknown>
  ) => {
    set(state => ({
      currentFlow: state.currentFlow
        ? {
            ...state.currentFlow,
            nodes: state.currentFlow.nodes.map(node =>
              node.id === nodeId ? { ...node, configuration: config } : node
            ),
          }
        : null,
    }))
  },

  clearMessages: () => {
    set({ messages: [] })
  },

  createFlowFromPrompt: (prompt: string) => {
    set({ isLoading: true })

    setTimeout(() => {
      const sourceId = generateId()
      const transformId = generateId()
      const destinationId = generateId()

      const flow: FlowDiagram = {
        id: generateId(),
        title: 'Data Flow',
        description: prompt,
        nodes: [
          {
            id: sourceId,
            type: 'source',
            position: { x: 100, y: 200 },
            data: {
              type: 'source',
              status: 'pending',
              label: 'Source',
              description: 'Data source',
            },
          },
          {
            id: transformId,
            type: 'transform',
            position: { x: 300, y: 200 },
            data: {
              type: 'transform',
              status: 'pending',
              label: 'Transform',
              description: 'Data transformation',
            },
          },
          {
            id: destinationId,
            type: 'destination',
            position: { x: 500, y: 200 },
            data: {
              type: 'destination',
              status: 'pending',
              label: 'Destination',
              description: 'Data destination',
            },
          },
        ],
        edges: [
          {
            id: generateId(),
            source: sourceId,
            target: transformId,
            type: 'smoothstep',
          },
          {
            id: generateId(),
            source: transformId,
            target: destinationId,
            type: 'smoothstep',
          },
        ],
      }

      set(state => ({
        currentFlow: flow,
        isLoading: false,
        messages: [
          ...state.messages,
          {
            id: generateId(),
            content: `I've created a data flow based on your request: "${prompt}". Let me ask you some questions to configure each component.`,
            type: 'ai',
            timestamp: new Date(),
          },
          {
            id: generateId(),
            content:
              'What source would you like to use for your data? (e.g., Shopify, Salesforce, PostgreSQL, etc.)',
            type: 'ai',
            timestamp: new Date(),
          },
        ],
      }))
    }, 1500)
  },

  resetState: () => {
    set({
      currentFlow: null,
      messages: [],
      selectedNodeId: null,
      isLoading: false,
    })
  },

  processUserInput: (input: string) => {
    set(state => {
      // Add user message
      const userMessage: Message = {
        id: generateId(),
        content: input,
        type: 'user',
        timestamp: new Date(),
      }

      // Find the next pending node to configure
      const pendingNode = state.currentFlow?.nodes.find(
        node => node.data.status === 'pending'
      )

      if (!pendingNode) {
        // All nodes configured - handle follow-up questions
        const lowerInput = input.toLowerCase()
        let aiResponse = ''

        if (
          lowerInput.includes('status') ||
          lowerInput.includes('complete') ||
          lowerInput.includes('done')
        ) {
          aiResponse =
            'Yes, your data pipeline is complete! All three nodes (source, transform, and destination) have been configured. You can view the details in the properties panel by clicking on each node.'
        } else if (
          lowerInput.includes('test') ||
          lowerInput.includes('run') ||
          lowerInput.includes('execute')
        ) {
          aiResponse =
            "Great idea! To test your pipeline, you can click on each node in the canvas and use the 'Test Connection' button in the properties panel. This will validate the configuration for each component."
        } else if (
          lowerInput.includes('new') ||
          lowerInput.includes('start over') ||
          lowerInput.includes('reset')
        ) {
          aiResponse =
            'To start a new data pipeline, click the back button to return to the home page. This will reset everything and let you create a fresh flow.'
        } else if (
          lowerInput.includes('help') ||
          lowerInput.includes('what') ||
          lowerInput.includes('how')
        ) {
          aiResponse =
            "I can help you with: checking pipeline status, testing connections, viewing node configurations, or starting a new flow. Just ask me what you'd like to do!"
        } else {
          aiResponse =
            'Your data pipeline is complete! All nodes have been configured. You can start a new flow by going back to the home page, or I can help you with additional questions about your current pipeline.'
        }

        const aiMessage: Message = {
          id: generateId(),
          content: aiResponse,
          type: 'ai',
          timestamp: new Date(),
        }

        return {
          messages: [...state.messages, userMessage, aiMessage],
          isLoading: false,
        }
      }

      // Update node configuration based on type
      let config: Record<string, unknown> = {}
      let status: Node['status'] = 'partial'
      let aiResponse = ''

      switch (pendingNode.data.type) {
        case 'source':
          config = { source: input }
          aiResponse = `Great! I've configured the source as "${input}". Now, what type of data transformation would you like to apply?`
          break
        case 'transform':
          config = { transformation: input }
          aiResponse = `Perfect! I've set the transformation to "${input}". Finally, where should the processed data be sent?`
          break
        case 'destination':
          config = { destination: input }
          aiResponse = `Excellent! I've configured the destination as "${input}". Your data pipeline is now complete!`
          status = 'complete'
          break
      }

      // Update the node
      const updatedFlow = state.currentFlow
        ? {
            ...state.currentFlow,
            nodes: state.currentFlow.nodes.map(node =>
              node.id === pendingNode.id
                ? {
                    ...node,
                    data: {
                      ...node.data,
                      status,
                      configuration: config,
                      label: input,
                    },
                  }
                : node
            ),
          }
        : null

      // Add AI response
      const aiMessage: Message = {
        id: generateId(),
        content: aiResponse,
        type: 'ai',
        timestamp: new Date(),
      }

      return {
        currentFlow: updatedFlow,
        messages: [...state.messages, userMessage, aiMessage],
        isLoading: false,
      }
    })
  },
}))
