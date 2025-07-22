import { useStore } from './store/useStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

function App() {
  const { count, user, theme, increment, decrement, setUser, setTheme } = useStore()

  const handleLogin = () => {
    setUser({ name: 'John Doe', email: 'john@example.com' })
  }

  const handleLogout = () => {
    setUser(null)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Data Flow Architect</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Vite + React + TypeScript + Tailwind CSS v4 + Zustand + shadcn/ui
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Counter Card */}
          <Card>
            <CardHeader>
              <CardTitle>Counter with Zustand</CardTitle>
              <CardDescription>
                Global state management demonstration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <span className="text-3xl font-bold">{count}</span>
              </div>
              <div className="flex gap-2 justify-center">
                <Button onClick={decrement} variant="outline">
                  Decrease
                </Button>
                <Button onClick={increment}>
                  Increase
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User Management Card */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                User state management example
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {user ? (
                <div className="space-y-2">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <Button onClick={handleLogout} variant="destructive">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-500">No user logged in</p>
                  <Button onClick={handleLogin}>
                    Login
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Theme Toggle Card */}
          <Card>
            <CardHeader>
              <CardTitle>Theme Toggle</CardTitle>
              <CardDescription>
                Dark/Light mode switching
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={toggleTheme} 
                variant="outline"
                className="w-full"
              >
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
              </Button>
            </CardContent>
          </Card>

          {/* Input Demo Card */}
          <Card>
            <CardHeader>
              <CardTitle>Input Component</CardTitle>
              <CardDescription>
                shadcn/ui input component demo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Enter your name..." />
              <Input placeholder="Enter your email..." type="email" />
              <Button className="w-full">
                Submit
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features List */}
        <Card>
          <CardHeader>
            <CardTitle>Project Features</CardTitle>
            <CardDescription>
              Everything that's been set up in this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">✅ Core Setup</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• Vite with React and TypeScript</li>
                  <li>• Tailwind CSS v4 with Vite plugin</li>
                  <li>• Git integration</li>
                  <li>• Proper TypeScript configuration</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">✅ State Management</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• Zustand for global state</li>
                  <li>• TypeScript interfaces</li>
                  <li>• Counter, user, and theme state</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">✅ UI Components</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• shadcn/ui setup</li>
                  <li>• Button, Card, Input components</li>
                  <li>• Dark/Light theme support</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">✅ Development</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• Hot module replacement</li>
                  <li>• Path aliases (@/ for src/)</li>
                  <li>• Comprehensive .gitignore</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
