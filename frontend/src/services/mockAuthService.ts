/* eslint-disable @typescript-eslint/no-unused-vars */
// services/mockAuthService.ts
import { User, UserType, AuthResponse, OnboardingData } from "@/types/user"

// Mock users for testing
const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    email: "client@test.com",
    password: "password123",
    name: "John Doe",
    type: "client",
    isOnboarded: false,
    emailVerified: true,
    phone: "+1234567890",
    companyName: "Doe Construction",
  },
  {
    id: "2",
    email: "artisan@test.com",
    password: "password123",
    name: "Jane Smith",
    type: "artisan",
    isOnboarded: false,
    emailVerified: true,
    phone: "+1234567891",
    skills: ["plumbing", "electrical"],
    certifications: ["licensed plumber"],
  },
  {
    id: "3",
    email: "supervisor@test.com",
    password: "password123",
    name: "Mike Johnson",
    type: "supervisor",
    isOnboarded: true,
    emailVerified: true,
    phone: "+1234567892",
    skills: ["project management", "construction"],
    certifications: ["PMP", "Construction Safety"],
  },
  {
    id: "4",
    email: "supplier@test.com",
    password: "password123",
    name: "Sarah Wilson",
    type: "supplier",
    isOnboarded: true,
    emailVerified: true,
    phone: "+1234567893",
    companyName: "Wilson Materials",
  },
  {
    id: "5",
    email: "admin@test.com",
    password: "password123",
    name: "Admin User",
    type: "admin",
    isOnboarded: true,
    emailVerified: true,
    phone: "+1234567894",
  },
]

// Mock delay to simulate network request
const mockDelay = (ms: number = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms))

// Generate mock JWT token
const generateMockToken = (userId: string): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const payload = btoa(
    JSON.stringify({
      userId,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      iat: Date.now(),
    })
  )
  const signature = btoa("mock-signature-" + userId)
  return `${header}.${payload}.${signature}`
}

export class MockAuthService {
  static async login(
    email: string,
    password: string,
    userType?: UserType
  ): Promise<AuthResponse> {
    await mockDelay(1000) // Simulate network delay

    const user = mockUsers.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password &&
        (!userType || u.type === userType)
    )

    if (!user) {
      throw new Error("Invalid email or password")
    }

    const { password: _password, ...userWithoutPassword } = user
    const token = generateMockToken(user.id)

    return {
      token,
      user: userWithoutPassword,
      message: "Login successful",
    }
  }

  static async register(
    userData: Partial<User>,
    userPassword: string
  ): Promise<AuthResponse> {
    await mockDelay(1000)

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === userData.email)
    if (existingUser) {
      throw new Error("User already exists with this email")
    }

    const newUser: User & { password: string } = {
      id: (mockUsers.length + 1).toString(),
      email: userData.email!,
      password: userPassword,
      name: userData.name || "",
      type: userData.type!,
      isOnboarded: false,
      emailVerified: false,
      ...userData,
    }

    mockUsers.push(newUser)

    const { password: _password, ...userWithoutPassword } = newUser
    const token = generateMockToken(newUser.id)

    return {
      token,
      user: userWithoutPassword,
      message: "Registration successful",
    }
  }

  static async refreshToken(currentToken: string): Promise<{ token: string }> {
    await mockDelay(500)

    // In a real app, you'd validate the current token
    // For mock, we'll just generate a new one
    try {
      const payload = JSON.parse(atob(currentToken.split(".")[1]))
      const newToken = generateMockToken(payload.userId)
      return { token: newToken }
    } catch {
      throw new Error("Invalid token")
    }
  }

  static async resetPassword(email: string): Promise<void> {
    await mockDelay(1000)

    const user = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    )
    if (!user) {
      throw new Error("No user found with this email")
    }

    // In a real app, you'd send a reset email
    console.log(`Password reset email sent to ${email}`)
  }

  static async verifyEmail(token: string): Promise<void> {
    await mockDelay(1000)

    // In a real app, you'd validate the token and update user
    console.log(`Email verified with token: ${token}`)
  }

  static async completeOnboarding(
    userId: string,
    onboardingData: OnboardingData
  ): Promise<User> {
    await mockDelay(1000)

    const userIndex = mockUsers.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      isOnboarded: true,
      ...onboardingData,
    }

    const { password: _password, ...userWithoutPassword } = mockUsers[userIndex]
    return userWithoutPassword
  }

  // Utility method to get all mock users (for testing)
  static getMockUsers(): Omit<(typeof mockUsers)[0], "password">[] {
    return mockUsers.map(({ password: _password, ...user }) => user)
  }
}
