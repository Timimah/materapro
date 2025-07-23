export type UserType = "client" | "artisan"

export interface User {
  id: string
  email: string
  type: UserType
  isOnboarded: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
