# Data Flow Architect

A modern React application built with Vite, TypeScript, Tailwind CSS v4, Zustand for state management, and shadcn/ui for beautiful UI components.

## 🚀 Features

- **⚡ Vite** - Lightning fast build tool and dev server
- **⚛️ React 18** - Latest React with concurrent features
- **📘 TypeScript** - Type-safe development
- **🎨 Tailwind CSS v4** - Latest version with Vite plugin integration
- **🔄 Zustand** - Lightweight state management
- **🎯 shadcn/ui** - Beautiful, accessible UI components
- **🌙 Dark/Light Mode** - Theme switching capability
- **📱 Responsive Design** - Mobile-first approach
- **🔧 Path Aliases** - Clean imports with `@/` prefix

## 🛠️ Tech Stack

- **Build Tool**: Vite
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Package Manager**: npm

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd data-flow-architect
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components
├── store/
│   └── useStore.ts   # Zustand store
├── lib/
│   └── utils.ts      # Utility functions
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles with Tailwind CSS
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Styling

This project uses **Tailwind CSS v4** with the new Vite plugin integration. The setup includes:

- Modern CSS features with the latest Tailwind CSS
- Dark/Light mode support
- Responsive design utilities
- Custom component styling with shadcn/ui

## 🔄 State Management

Zustand is used for global state management with TypeScript support. The store includes:

- Counter state with increment/decrement actions
- User authentication state
- Theme switching (dark/light mode)

## 🎯 UI Components

shadcn/ui components are used throughout the application:

- **Button** - Various button styles and variants
- **Card** - Content containers with headers and descriptions
- **Input** - Form input fields
- More components can be added using `npx shadcn@latest add <component-name>`

## 🌙 Theme System

The application supports both light and dark themes:

- Automatic theme switching
- Persistent theme state
- Smooth transitions between themes
- Tailwind CSS dark mode utilities

## 📱 Responsive Design

The application is built with a mobile-first approach using Tailwind CSS responsive utilities:

- Mobile-friendly layouts
- Responsive grid systems
- Adaptive typography
- Touch-friendly interactions

## 🔧 Development

### Adding New shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

### Path Aliases

Use `@/` prefix for imports from the `src/` directory:

```typescript
import { Button } from '@/components/ui/button'
import { useStore } from '@/store/useStore'
```

### TypeScript Configuration

The project includes proper TypeScript configuration with:

- Strict type checking
- Path mapping for clean imports
- Modern ES2022 target
- React JSX support

## 🚀 Deployment

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.
