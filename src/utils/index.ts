import type { ExamplePrompt } from '@/types'

// Generate unique IDs
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15)
}

// Example prompts for the landing page
export const examplePrompts: ExamplePrompt[] = [
  {
    id: '1',
    title: 'Connect Shopify to BigQuery',
    description: 'Sync your e-commerce data to Google BigQuery for analytics',
    prompt: 'Connect Shopify orders and customers to BigQuery for data analysis'
  },
  {
    id: '2',
    title: 'Sync Salesforce to Mailchimp',
    description: 'Automatically sync contacts between CRM and email marketing',
    prompt: 'Sync Salesforce contacts and leads to Mailchimp for email campaigns'
  },
  {
    id: '3',
    title: 'Stream Stripe to Google Sheets',
    description: 'Real-time payment data streaming to spreadsheets',
    prompt: 'Stream Stripe payment transactions to Google Sheets for reporting'
  }
]

// Node type colors for styling
export const getNodeTypeColor = (type: 'source' | 'transform' | 'destination'): string => {
  switch (type) {
    case 'source':
      return 'bg-blue-500'
    case 'transform':
      return 'bg-purple-500'
    case 'destination':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

// Node status colors
export const getNodeStatusColor = (status: 'pending' | 'partial' | 'complete' | 'error'): string => {
  switch (status) {
    case 'pending':
      return 'bg-orange-500'
    case 'partial':
      return 'bg-blue-500'
    case 'complete':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

// Format timestamp for messages
export const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
} 