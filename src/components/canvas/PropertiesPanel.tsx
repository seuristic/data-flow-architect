import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDataFlowStore } from '@/store/useStore'
import { getNodeStatusColor } from '@/utils'
import type { NodeStatus } from '@/types'

export default function PropertiesPanel() {
  const { currentFlow, selectedNodeId, updateNodeStatus, updateNodeConfiguration } = useDataFlowStore()

  if (!currentFlow || !selectedNodeId) {
    return (
      <div className="h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>Select a node to view its properties</p>
        </div>
      </div>
    )
  }

  const selectedNode = currentFlow.nodes.find(node => node.id === selectedNodeId)
  if (!selectedNode) return null

  const nodeData = selectedNode.data

  const handleStatusChange = (status: NodeStatus) => {
    updateNodeStatus(selectedNodeId, status)
  }

  const handleConfigChange = (key: string, value: string) => {
    const currentConfig = nodeData.configuration || {}
    updateNodeConfiguration(selectedNodeId, {
      ...currentConfig,
      [key]: value
    })
  }

  return (
    <div className="h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${getNodeStatusColor(nodeData.status)}`} />
              {nodeData.label}
            </CardTitle>
            <CardDescription>
              {nodeData.type.charAt(0).toUpperCase() + nodeData.type.slice(1)} Node
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
                  <span className="font-medium capitalize">{nodeData.status}</span>
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
                {(['pending', 'partial', 'complete', 'error'] as NodeStatus[]).map((status) => (
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
                <div>
                  <label className="text-xs text-gray-500">Name</label>
                  <Input
                    value={(nodeData.configuration?.name as string) || ''}
                    onChange={(e) => handleConfigChange('name', e.target.value)}
                    placeholder="Enter node name"
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Description</label>
                  <Input
                    value={(nodeData.configuration?.description as string) || ''}
                    onChange={(e) => handleConfigChange('description', e.target.value)}
                    placeholder="Enter description"
                    className="text-sm"
                  />
                </div>
                {nodeData.type === 'source' && (
                  <div>
                    <label className="text-xs text-gray-500">Source Type</label>
                    <Input
                      value={(nodeData.configuration?.sourceType as string) || ''}
                      onChange={(e) => handleConfigChange('sourceType', e.target.value)}
                      placeholder="e.g., Database, API, File"
                      className="text-sm"
                    />
                  </div>
                )}
                {nodeData.type === 'destination' && (
                  <div>
                    <label className="text-xs text-gray-500">Destination Type</label>
                    <Input
                      value={(nodeData.configuration?.destinationType as string) || ''}
                      onChange={(e) => handleConfigChange('destinationType', e.target.value)}
                      placeholder="e.g., Warehouse, API, File"
                      className="text-sm"
                    />
                  </div>
                )}
                {nodeData.type === 'transform' && (
                  <div>
                    <label className="text-xs text-gray-500">Transform Type</label>
                    <Input
                      value={(nodeData.configuration?.transformType as string) || ''}
                      onChange={(e) => handleConfigChange('transformType', e.target.value)}
                      placeholder="e.g., Filter, Map, Aggregate"
                      className="text-sm"
                    />
                  </div>
                )}
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