import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useDataFlowStore } from '@/store/useStore'
import ChatInterface from '@/components/chat/ChatInterface'
import Canvas from '@/components/canvas/Canvas'

export default function ChatPage() {
  const navigate = useNavigate()
  const { currentFlow, messages } = useDataFlowStore()

  // Redirect to landing if no flow exists
  useEffect(() => {
    if (!currentFlow && messages.length === 0) {
      navigate('/')
    }
  }, [currentFlow, messages, navigate])

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Landing
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Data Flow Architect
              </h1>
              {currentFlow && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentFlow.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Split Pane */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Interface - Left Side */}
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-700">
          <ChatInterface />
        </div>

        {/* Canvas - Right Side */}
        <div className="w-1/2">
          <Canvas />
        </div>
      </div>
    </div>
  )
} 