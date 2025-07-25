import { useCallback, useEffect } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react'
import type { Connection } from '@xyflow/react'
import { useDataFlowStore } from '../../store/useStore'
import { nodeTypes } from './nodeTypes'
import type { FlowNode, FlowEdge } from '../../types'
import { useTheme } from '@/hooks/useTheme'

export default function Canvas() {
  const { currentFlow, setSelectedNode } = useDataFlowStore()
  const { theme } = useTheme()

  const initialNodes: FlowNode[] = currentFlow?.nodes || []
  const initialEdges: FlowEdge[] = currentFlow?.edges || []

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    if (currentFlow) {
      setNodes(currentFlow.nodes)
      setEdges(currentFlow.edges)
    }
  }, [currentFlow, setNodes, setEdges])

  const onConnect = useCallback(
    (params: Connection) => setEdges(eds => addEdge(params, eds)),
    [setEdges]
  )

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: FlowNode) => {
      setSelectedNode(node.id)
    },
    [setSelectedNode]
  )

  if (!currentFlow) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No flow diagram available</p>
          <p className="text-sm">
            Start a conversation to create your data flow
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-2 flex-shrink-0">
        <h3 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
          Flow Diagram
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {nodes.length} nodes • {edges.length} connections
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.5}
          maxZoom={2}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        >
          <Background
            color={theme === 'dark' ? '#374151' : '#e5e7eb'}
            gap={20}
          />
          <Controls className="scale-75 sm:scale-100" />
        </ReactFlow>
      </div>
    </div>
  )
}
