import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Moon, Sun } from 'lucide-react'
import { examplePrompts } from '@/utils'
import { useDataFlowStore } from '@/store/useStore'
import { useTheme } from '@/hooks/useTheme'
import nexlaLogo from '@/assets/Nexla_Icon_Blue_RGB.png'

export default function LandingPage() {
  const [prompt, setPrompt] = useState('')
  const navigate = useNavigate()
  const { createFlowFromPrompt, resetState } = useDataFlowStore()
  const { theme, toggleTheme } = useTheme()

  // Reset state when landing page loads
  useEffect(() => {
    resetState()
  }, [resetState])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim()) {
      createFlowFromPrompt(prompt.trim())
      navigate('/chat')
    }
  }

  const handleExampleClick = (examplePrompt: string) => {
    createFlowFromPrompt(examplePrompt)
    navigate('/chat')
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img
                src={nexlaLogo}
                alt="Nexla"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Nexla
              </span>
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
      </nav>

      <div className="w-full flex-1 h-full flex flex-col">
        <div className="flex flex-col w-full pt-16 sm:pt-24">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Data Flow Architect
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              Describe your data integration needs in plain English and watch as
              we create interactive flow diagrams that visualize your data
              pipelines.
            </p>
          </div>

          <div className="max-w-3xl w-full mx-auto mb-12 sm:mb-16 mt-6 sm:mt-8 px-4">
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
              <CardHeader className="text-center">
                <CardTitle className="text-xl sm:text-2xl">
                  What data flow would you like to create?
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Describe your data integration requirements and we'll build a
                  visual flow diagram for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                    <Input
                      type="text"
                      placeholder="e.g., Connect Shopify orders to BigQuery for analytics..."
                      value={prompt}
                      onChange={e => setPrompt(e.target.value)}
                      className="flex-1 text-base sm:text-lg"
                      required
                    />
                    <Button
                      type="submit"
                      size="lg"
                      disabled={!prompt.trim()}
                      className="w-full sm:w-auto"
                    >
                      Create Flow
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="max-w-3xl w-full mx-auto px-4">
          <h2 className="text-lg sm:text-xl font-semibold text-center text-gray-900 dark:text-white mb-4 sm:mb-6">
            Try these examples
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 justify-items-center">
            {examplePrompts.map(example => (
              <Card
                key={example.id}
                className="justify-between gap-2 w-full max-w-sm cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80"
                onClick={() => handleExampleClick(example.prompt)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm sm:text-base">
                    {example.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    {example.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs sm:text-sm"
                  >
                    Use This Example
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center md:mt-auto py-8 sm:py-0">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2025 Nexla. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
