import { create } from "zustand"
import { persist } from "zustand/middleware"
import { MockAuthService } from "@/services/mockAuthService"
import { OnboardingData, User, UserType } from "@/types/user"

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  login: (email: string, password: string, userType?: UserType) => Promise<void>
  register: (userData: Partial<User>, password: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  clearError: () => void
  setLoading: (loading: boolean) => void
  refreshToken: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  verifyEmail: (token: string) => Promise<void>
  completeOnboarding: (onboardingData: unknown) => Promise<void>
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string, userType?: UserType) => {
        set({ isLoading: true, error: null })

        try {
          const response = await MockAuthService.login(
            email,
            password,
            userType
          )

          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Login failed",
            isLoading: false,
          })
          throw error
        }
      },

      register: async (userData: Partial<User>, password: string) => {
        set({ isLoading: true, error: null })

        try {
          const response = await MockAuthService.register(userData, password)

          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Registration failed",
            isLoading: false,
          })
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        })
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          })
        }
      },

      clearError: () => {
        set({ error: null })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      refreshToken: async () => {
        const currentToken = get().token
        if (!currentToken) throw new Error("No token available")

        try {
          const response = await MockAuthService.refreshToken(currentToken)
          set({ token: response.token })
        } catch (error) {
          // If refresh fails, logout user
          get().logout()
          throw error
        }
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null })

        try {
          await MockAuthService.resetPassword(email)
          set({ isLoading: false })
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Password reset failed",
            isLoading: false,
          })
          throw error
        }
      },

      verifyEmail: async (token: string) => {
        set({ isLoading: true, error: null })

        try {
          await MockAuthService.verifyEmail(token)

          const currentUser = get().user
          if (currentUser) {
            set({
              user: { ...currentUser, emailVerified: true },
              isLoading: false,
            })
          }
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Email verification failed",
            isLoading: false,
          })
          throw error
        }
      },

      completeOnboarding: async (onboardingData: unknown) => {
        set({ isLoading: true, error: null })

        try {
          const currentUser = get().user
          if (!currentUser) throw new Error("No user found")

          const updatedUser = await MockAuthService.completeOnboarding(
            currentUser.id,
            onboardingData as OnboardingData
          )

          set({
            user: updatedUser,
            isLoading: false,
          })
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Onboarding completion failed",
            isLoading: false,
          })
          throw error
        }
      },
    }),
    {
      name: "matera-auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
