import { create } from 'zustand'

interface AppState {
  count: number
  user: {
    name: string
    email: string
  } | null
  theme: 'light' | 'dark'
  increment: () => void
  decrement: () => void
  setUser: (user: { name: string; email: string } | null) => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useStore = create<AppState>((set) => ({
  count: 0,
  user: null,
  theme: 'light',
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setUser: (user) => set({ user }),
  setTheme: (theme) => set({ theme }),
})) 