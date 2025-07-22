# Data Flow Architect

A conversational data integration platform that visualizes data pipelines through interactive flow diagrams. Built with React, TypeScript, and modern web technologies.

## 🚀 Features

- **Conversational AI Interface** - Describe your data integration needs in plain English
- **Interactive Flow Diagrams** - Visual representation of data pipelines using React Flow
- **Real-time Configuration** - Configure data sources, transformations, and destinations through chat
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Dark/Light Theme** - Toggle between themes with persistent preferences
- **Modern UI/UX** - Clean interface built with Shadcn UI components
- **TypeScript Support** - Full type safety throughout the application
- **State Management** - Global state management with Zustand

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Flow Diagrams**: React Flow (@xyflow/react)
- **Icons**: Lucide React
- **Theme**: Custom dark/light mode implementation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd data-flow-architect
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at:

- **Local**: http://localhost:5173/
- **Network**: http://your-ip:5173/ (for mobile testing)

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
data-flow-architect/
├── src/
│   ├── assets/                 # Static assets (images, icons)
│   ├── components/             # Reusable UI components
│   │   ├── canvas/            # Flow diagram components
│   │   ├── chat/              # Chat interface components
│   │   └── ui/                # Shadcn UI components
│   ├── contexts/              # React contexts
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Page components
│   ├── store/                 # Zustand store
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── App.tsx               # Main app component
│   ├── index.css             # Global styles
│   └── main.tsx              # App entry point
├── public/                    # Public assets
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # This file
```

## 🎯 Usage

### Creating a Data Flow

1. **Landing Page**: Start by describing your data integration needs
2. **Example Prompts**: Use pre-built examples or create custom flows
3. **Chat Interface**: Configure each component through conversational AI
4. **Visual Canvas**: See your data pipeline visualized in real-time
5. **Properties Panel**: View and edit node configurations

### Example Workflows

- **E-commerce Integration**: Connect Shopify to BigQuery for analytics
- **CRM Sync**: Sync Salesforce contacts to Mailchimp
- **Database Integration**: Extract PostgreSQL data and send to webhooks
- **Payment Analysis**: Analyze Stripe payments in Google Sheets

## 🎨 Customization

### Adding New Node Types

1. Define the node type in `src/types/index.ts`
2. Create a custom node component in `src/components/canvas/`
3. Register the node type in `src/components/canvas/nodeTypes.ts`

### Styling

The application uses Tailwind CSS v4 with custom CSS variables for theming. Modify `src/index.css` for global styles and component-specific styles in their respective files.

### State Management

The application uses Zustand for global state management. The main store is located in `src/store/useStore.ts` and includes:

- Chat messages and AI interactions
- Flow diagram data
- Node configurations and status
- Theme preferences

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Style

The project uses Prettier for code formatting with the following configuration:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

### Git Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Commit with descriptive messages
5. Push and create a pull request

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Dependencies Issues**

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors**

```bash
# Run type checking
npm run type-check
```

### Performance Optimization

- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Optimize bundle size with code splitting
- Use lazy loading for routes

## 📱 Mobile Support

The application is fully responsive and optimized for mobile devices:

- **Touch-friendly interface**
- **Responsive layout** (vertical on mobile, horizontal on desktop)
- **Optimized for small screens**
- **Gesture support** for canvas interactions

## 🔒 Security

- No sensitive data is stored locally
- All configurations are client-side only
- No external API calls (demo mode)
- Input sanitization for user messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Flow** for the flow diagram functionality
- **Shadcn UI** for the beautiful component library
- **Tailwind CSS** for the utility-first styling
- **Zustand** for the lightweight state management

## 📞 Support

For support and questions:

- Create an issue in the repository
- Check the troubleshooting section
- Review the documentation
