import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import type { NodeProps } from '@xyflow/react'
import { getNodeTypeColor, getNodeStatusColor } from '../../utils'
import type { NodeData } from '../../types'

// Source Node Component
export const SourceNode = memo(({ data }: NodeProps) => {
  const nodeData = data as NodeData
  return (
    <div className={`w-32 h-20 rounded-lg shadow-lg border-2 border-white dark:border-gray-700 ${getNodeTypeColor(nodeData.type)} flex items-center justify-center relative`}>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-white border-2 border-gray-300" />
      
      <div className="text-center text-white">
        <div className="text-xs font-medium mb-1">SOURCE</div>
        <div className="text-sm font-bold">{nodeData.label}</div>
      </div>
      
      {/* Status Indicator */}
      <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${getNodeStatusColor(nodeData.status)} border-2 border-white dark:border-gray-700`} />
    </div>
  )
})

// Transform Node Component
export const TransformNode = memo(({ data }: NodeProps) => {
  const nodeData = data as NodeData
  return (
    <div className={`w-32 h-20 rounded-lg shadow-lg border-2 border-white dark:border-gray-700 ${getNodeTypeColor(nodeData.type)} flex items-center justify-center relative`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-white border-2 border-gray-300" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-white border-2 border-gray-300" />
      
      <div className="text-center text-white">
        <div className="text-xs font-medium mb-1">TRANSFORM</div>
        <div className="text-sm font-bold">{nodeData.label}</div>
      </div>
      
      {/* Status Indicator */}
      <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${getNodeStatusColor(nodeData.status)} border-2 border-white dark:border-gray-700`} />
    </div>
  )
})

// Destination Node Component
export const DestinationNode = memo(({ data }: NodeProps) => {
  const nodeData = data as NodeData
  return (
    <div className={`w-32 h-20 rounded-lg shadow-lg border-2 border-white dark:border-gray-700 ${getNodeTypeColor(nodeData.type)} flex items-center justify-center relative`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-white border-2 border-gray-300" />
      
      <div className="text-center text-white">
        <div className="text-xs font-medium mb-1">DESTINATION</div>
        <div className="text-sm font-bold">{nodeData.label}</div>
      </div>
      
      {/* Status Indicator */}
      <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${getNodeStatusColor(nodeData.status)} border-2 border-white dark:border-gray-700`} />
    </div>
  )
})

 