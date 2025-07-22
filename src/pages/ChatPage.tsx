import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { useDataFlowStore } from '@/store/useStore'
import { useTheme } from '@/hooks/useTheme'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import ChatInterface from '../components/chat/ChatInterface'
import Canvas from '../components/canvas/Canvas'

export default function ChatPage() {
  const navigate = useNavigate()
  const { isLoading, currentFlow, messages } = useDataFlowStore()
  const { theme, toggleTheme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkScreenWidth()

    window.addEventListener('resize', checkScreenWidth)

    return () => window.removeEventListener('resize', checkScreenWidth)
  }, [])

  useEffect(() => {
    if (!isLoading && !currentFlow && messages.length === 0) {
      navigate('/')
    }
  }, [isLoading, currentFlow, messages, navigate])

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1 max-w-[calc(100%-64px)]">
            <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
              Data Flow Architect
            </h1>
            {currentFlow && (
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                {currentFlow.description}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="shrink-0"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      <ResizablePanelGroup
        direction={isMobile ? 'vertical' : 'horizontal'}
        className="flex-1 min-h-0"
      >
        <ResizablePanel defaultSize={30} minSize={20}>
          <ChatInterface />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70} minSize={30}>
          <Canvas />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
