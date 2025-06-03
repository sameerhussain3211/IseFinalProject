import type { User } from "../types/auth"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock user database (in real app, this would be a backend API)
const mockUsers: Array<User & { password: string; isAdmin?: boolean }> = [
  {
    id: "1",
    email: "demo@example.com",
    username: "demo",
    password: "demo123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "admin",
    email: "admin@hackshield.com",
    username: "admin",
    password: "admin123",
    isAdmin: true,
    createdAt: new Date().toISOString(),
  },
]

// Mock player progress data
export const mockPlayerProgress = [
  {
    userId: "1",
    username: "demo",
    email: "demo@example.com",
    gameScores: {
      phishingEmailHunt: { bestScore: 150, gamesPlayed: 5, lastPlayed: "2024-04-03" },
      quiz: { averageScore: 85, quizzesCompleted: 3, lastPlayed: "2024-04-02" },
    },
    joinDate: "2024-03-15",
  },
]

export const authUtils = {
  // Simulate login API call
  async login(email: string, password: string): Promise<User & { isAdmin?: boolean }> {
    await delay(1000) // Simulate network delay

    const user = mockUsers.find((u) => u.email === email && u.password === password)
    if (!user) {
      throw new Error("Invalid email or password")
    }

    const { password: _, ...userWithoutPassword } = user

    // Store in localStorage (in real app, you'd use secure tokens)
    localStorage.setItem("hackshield-user", JSON.stringify(userWithoutPassword))

    return userWithoutPassword
  },

  // Simulate signup API call
  async signup(email: string, username: string, password: string): Promise<User> {
    await delay(1000) // Simulate network delay

    // Check if user already exists
    if (mockUsers.find((u) => u.email === email)) {
      throw new Error("User with this email already exists")
    }

    if (mockUsers.find((u) => u.username === username)) {
      throw new Error("Username already taken")
    }

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email,
      username,
      password,
      createdAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)

    const { password: _, ...userWithoutPassword } = newUser

    // Store in localStorage
    localStorage.setItem("hackshield-user", JSON.stringify(userWithoutPassword))

    return userWithoutPassword
  },

  // Get current user from localStorage
  getCurrentUser(): (User & { isAdmin?: boolean }) | null {
    try {
      const stored = localStorage.getItem("hackshield-user")
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  },

  // Logout user
  logout(): void {
    localStorage.removeItem("hackshield-user")
  },

  // Admin functions
  async getAllUsers(): Promise<Array<User & { isAdmin?: boolean }>> {
    await delay(500)
    return mockUsers.map(({ password, ...user }) => user)
  },

  async resetUserPassword(userId: string, newPassword: string): Promise<void> {
    await delay(500)
    const userIndex = mockUsers.findIndex((u) => u.id === userId)
    if (userIndex !== -1) {
      mockUsers[userIndex].password = newPassword
    }
  },

  async deleteUser(userId: string): Promise<void> {
    await delay(500)
    const userIndex = mockUsers.findIndex((u) => u.id === userId)
    if (userIndex !== -1) {
      mockUsers.splice(userIndex, 1)
    }
  },

  async getPlayerProgress() {
    await delay(500)
    return mockPlayerProgress
  },
}
