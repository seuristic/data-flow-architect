import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { useDataFlowStore } from '@/store/useStore'
import { useTheme } from '@/hooks/useTheme'
import ChatInterface from '../components/chat/ChatInterface'
import Canvas from '../components/canvas/Canvas'
import nexlaLogo from '@/assets/Nexla_Icon_Blue_RGB.png'

export default function ChatPage() {
  const navigate = useNavigate()
  const { isLoading, currentFlow, messages } = useDataFlowStore()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (!isLoading && !currentFlow && messages.length === 0) {
      navigate('/')
    }
  }, [isLoading, currentFlow, messages, navigate])

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <img
                src={nexlaLogo}
                alt="Nexla"
                className="w-10 h-10 object-contain"
              />
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
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="flex items-center gap-2"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <ChatInterface />
        </div>
        <div className="w-2/3 flex flex-col">
          <Canvas />
        </div>
      </div>
    </div>
  )
}
