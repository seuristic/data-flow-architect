import { useDataFlowStore } from '@/store/useStore'
import { getNodeTypeColor, getNodeStatusColor } from '@/utils'
import type { Node, Connection } from '@/types'

export default function Canvas() {
  const { currentFlow, selectedNodeId, setSelectedNode } = useDataFlowStore()

  if (!currentFlow) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No flow diagram available</p>
          <p className="text-sm">Start a conversation to create your data flow</p>
        </div>
      </div>
    )
  }

  const renderNode = (node: Node) => {
    const isSelected = selectedNodeId === node.id
    
    return (
      <div
        key={node.id}
        className={`absolute cursor-pointer transition-all duration-200 ${
          isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
        }`}
        style={{
          left: node.position.x,
          top: node.position.y,
        }}
        onClick={() => setSelectedNode(node.id)}
      >
        {/* Node Body */}
        <div className={`w-32 h-20 rounded-lg shadow-lg border-2 border-white dark:border-gray-700 ${
          getNodeTypeColor(node.type)
        } flex items-center justify-center relative`}>
          <div className="text-center text-white">
            <div className="text-xs font-medium mb-1">{node.type.toUpperCase()}</div>
            <div className="text-sm font-bold">{node.label}</div>
          </div>
          
          {/* Status Indicator */}
          <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${
            getNodeStatusColor(node.status)
          } border-2 border-white dark:border-gray-700`} />
        </div>
      </div>
    )
  }

  const renderConnection = (connection: Connection) => {
    const sourceNode = currentFlow.nodes.find(n => n.id === connection.sourceNodeId)
    const targetNode = currentFlow.nodes.find(n => n.id === connection.targetNodeId)
    
    if (!sourceNode || !targetNode) return null

    const startX = sourceNode.position.x + 128 // 128px = node width
    const startY = sourceNode.position.y + 40  // 40px = half node height
    const endX = targetNode.position.x
    const endY = targetNode.position.y + 40

    return (
      <svg
        key={connection.id}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="#6B7280"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
      </svg>
    )
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Canvas Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Flow Diagram
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {currentFlow.nodes.length} nodes • {currentFlow.connections.length} connections
        </p>
      </div>

      {/* Canvas Area */}
      <div className="relative h-full overflow-auto">
        {/* Arrow marker definition */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#6B7280"
              />
            </marker>
          </defs>
        </svg>

        {/* Connections */}
        {currentFlow.connections.map(renderConnection)}

        {/* Nodes */}
        {currentFlow.nodes.map(renderNode)}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
          <h4 className="text-xs font-medium text-gray-900 dark:text-white mb-2">Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Source</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Transform</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Destination</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 