import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { examplePrompts } from '@/utils'
import { useDataFlowStore } from '@/store/useStore'

export default function LandingPage() {
  const [prompt, setPrompt] = useState('')
  const navigate = useNavigate()
  const { createFlowFromPrompt } = useDataFlowStore()

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
    <div className="min-h-screen w-full">
      <div className="w-full px-4 py-16 min-h-screen">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Data Flow Architect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Describe your data integration needs in plain English and watch as we create 
            interactive flow diagrams that visualize your data pipelines.
          </p>
        </div>

        {/* Main Input Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">What data flow would you like to create?</CardTitle>
              <CardDescription>
                Describe your data integration requirements and we'll build a visual flow diagram for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    type="text"
                    placeholder="e.g., Connect Shopify orders to BigQuery for analytics..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1 text-lg"
                    required
                  />
                  <Button type="submit" size="lg" disabled={!prompt.trim()}>
                    Create Flow
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Example Prompts */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-8">
            Try these examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {examplePrompts.map((example) => (
              <Card 
                key={example.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80"
                onClick={() => handleExampleClick(example.prompt)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{example.title}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleExampleClick(example.prompt)}
                  >
                    Use This Example
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2025 Nexla. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
} 