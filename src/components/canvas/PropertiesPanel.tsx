import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useDataFlowStore } from '@/store/useStore'
import { getNodeStatusColor } from '@/utils'
import type { NodeStatus } from '@/types'

export default function PropertiesPanel() {
  const {
    currentFlow,
    selectedNodeId,
    updateNodeStatus,
    updateNodeConfiguration,
  } = useDataFlowStore()

  if (!currentFlow || !selectedNodeId) {
    return (
      <div className="h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Properties Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex-shrink-0">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Properties
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Configure selected node
          </p>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>Select a node to view its properties</p>
          </div>
        </div>
      </div>
    )
  }

  const selectedNode = currentFlow.nodes.find(
    node => node.id === selectedNodeId
  )
  if (!selectedNode) return null

  const nodeData = selectedNode.data

  const handleStatusChange = (status: NodeStatus) => {
    updateNodeStatus(selectedNodeId, status)
  }

  const handleConfigChange = (key: string, value: string) => {
    const currentConfig = nodeData.configuration || {}
    updateNodeConfiguration(selectedNodeId, {
      ...currentConfig,
      [key]: value,
    })
  }

  return (
    <div className="h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Properties Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex-shrink-0">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Properties
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Configure selected node
        </p>
      </div>

      {/* Properties Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full ${getNodeStatusColor(
                  nodeData.status
                )}`}
              />
              {nodeData.label}
            </CardTitle>
            <CardDescription>
              {nodeData.type.charAt(0).toUpperCase() + nodeData.type.slice(1)}{' '}
              Node
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Node Information */}
            <div>
              <h4 className="text-sm font-medium mb-2">Node Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span className="font-medium">{nodeData.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-medium capitalize">
                    {nodeData.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Position:</span>
                  <span className="font-medium">
                    ({selectedNode.position.x}, {selectedNode.position.y})
                  </span>
                </div>
              </div>
            </div>

            {/* Status Control */}
            <div>
              <h4 className="text-sm font-medium mb-2">Status</h4>
              <div className="grid grid-cols-2 gap-2">
                {(
                  ['pending', 'partial', 'complete', 'error'] as NodeStatus[]
                ).map(status => (
                  <Button
                    key={status}
                    variant={nodeData.status === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleStatusChange(status)}
                    className="text-xs"
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>

            {/* Configuration */}
            <div>
              <h4 className="text-sm font-medium mb-2">Configuration</h4>
              <div className="space-y-2">
                {nodeData.configuration &&
                Object.keys(nodeData.configuration).length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(nodeData.configuration).map(
                      ([key, value]) => (
                        <div key={key}>
                          <label className="text-xs text-gray-500 capitalize">
                            {key}
                          </label>
                          <div className="text-sm font-medium bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded border">
                            {String(value)}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 italic">
                    No configuration set yet. Use the chat to configure this
                    node.
                  </div>
                )}

                <div>
                  <label className="text-xs text-gray-500">
                    Additional Name
                  </label>
                  <Input
                    value={(nodeData.configuration?.name as string) || ''}
                    onChange={e => handleConfigChange('name', e.target.value)}
                    placeholder="Enter additional name"
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Description</label>
                  <Input
                    value={
                      (nodeData.configuration?.description as string) || ''
                    }
                    onChange={e =>
                      handleConfigChange('description', e.target.value)
                    }
                    placeholder="Enter description"
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <h4 className="text-sm font-medium mb-2">Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Test Connection
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  View Logs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
