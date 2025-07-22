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
    setPrompt(examplePrompt)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
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
          <Card className="shadow-lg">
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
                className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
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

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">Describe Your Flow</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tell us about your data integration needs in simple terms
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">AI Conversation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI asks clarifying questions to understand your requirements
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">Visual Flow</h3>
              <p className="text-gray-600 dark:text-gray-300">
                See your data pipeline visualized as an interactive diagram
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 