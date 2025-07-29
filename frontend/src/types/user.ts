// types/user.ts
export type UserType =
  | "client"
  | "artisan"
  | "supervisor"
  | "admin"
  | "supplier"

export interface User {
  id: string
  email: string
  type: UserType
  isOnboarded: boolean
  emailVerified: boolean
  // Add other user properties as needed
  name?: string
  phone?: string
  profileImage?: string
  createdAt?: string
  updatedAt?: string
  // Role-specific fields can be added based on user type
  companyName?: string // for clients
  skills?: string[] // for artisans
  certifications?: string[] // for artisans/supervisors
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface AuthResponse {
  token: string
  user: User
  message?: string
}

export interface OnboardingData {
  // This will be filled based on your onboarding requirements
  personalInfo?: {
    firstName: string
    lastName: string
    phone: string
    dateOfBirth?: string
  }
  professionalInfo?: {
    skills: string[]
    experience: string
    certifications: string[]
  }
  preferences?: {
    notifications: boolean
    privacy: string
  }
}
