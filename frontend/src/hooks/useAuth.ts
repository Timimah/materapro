// hooks/useAuth.ts
import { useAuthStore } from "./useAuthStore"
import { LoginCredentials } from "@/types/user"

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login: loginStore,
    register,
    logout,
    updateUser,
    clearError,
    setLoading,
    refreshToken,
    resetPassword,
    verifyEmail,
    completeOnboarding,
  } = useAuthStore()

  const login = async (credentials: LoginCredentials) => {
    // try {
    await loginStore(credentials.email, credentials.password)
    // } catch (error) {
    //   throw error
    // }
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateUser,
    clearError,
    setLoading,
    refreshToken,
    resetPassword,
    verifyEmail,
    completeOnboarding,
  }
}
