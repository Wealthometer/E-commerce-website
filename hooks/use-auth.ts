import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  email: string
  name: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          })
          const data = await response.json()
          if (data.token && data.user) {
            set({ user: data.user, token: data.token })
          } else {
            throw new Error("Login failed")
          }
        } finally {
          set({ isLoading: false })
        }
      },
      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true })
        try {
          const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name }),
          })
          const data = await response.json()
          if (data.token && data.user) {
            set({ user: data.user, token: data.token })
          } else {
            throw new Error("Signup failed")
          }
        } finally {
          set({ isLoading: false })
        }
      },
      logout: () => {
        set({ user: null, token: null })
      },
      setUser: (user: User | null) => set({ user }),
      setToken: (token: string | null) => set({ token }),
    }),
    {
      name: "auth-storage",
    },
  ),
)
