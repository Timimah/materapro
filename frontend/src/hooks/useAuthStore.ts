import { create } from "zustand"
import { persist } from "zustand/middleware"
import axios from "axios"

export type UserType = "client" | "artisan"

export interface User {
  id: string
  email: string
  type: UserType
  isOnboarded: boolean
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: {
    user: User
    accessToken: string
    refreshToken: string
  }) => void
  logout: () => void
  refresh: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,

      login: ({ user, accessToken, refreshToken }) => {
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        })
        // Optionally: redirect or clear localStorage
      },

      refresh: async () => {
        const { refreshToken } = get()
        if (!refreshToken) return get().logout()

        try {
          const res = await axios.post("/api/auth/refresh", {
            refreshToken,
          })
          const { accessToken } = res.data
          set({ accessToken, isAuthenticated: true })
        } catch (err) {
          get().logout()
          console.log(err)
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
