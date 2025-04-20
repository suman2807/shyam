"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type UserType = "farmer" | "consumer"

interface User {
  id: number
  name: string
  email: string
  userType: UserType
  location?: string
  joinDate?: string
  profileImage?: string
  bio?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string, userType: UserType) => Promise<boolean>
  logout: () => void
  updateUserProfile: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database for demo purposes
const MOCK_USERS = [
  {
    id: 1,
    name: "Rajesh Patel",
    email: "farmer@example.com",
    password: "password123",
    userType: "farmer" as UserType,
    location: "Nashik, Maharashtra",
    joinDate: "January 2023",
    profileImage: "/placeholder.svg?height=200&width=200",
    bio: "Third-generation farmer specializing in organic vegetables and sustainable farming practices.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "consumer@example.com",
    password: "password123",
    userType: "consumer" as UserType,
    location: "Mumbai, Maharashtra",
    joinDate: "March 2023",
    profileImage: "/placeholder.svg?height=200&width=200",
    bio: "Passionate about supporting local farmers and eating fresh, organic produce.",
  },
]

/**
 * Provides authentication context to its children components.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components that need access to the authentication context.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("krishijyothi_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("krishijyothi_user", JSON.stringify(user))
    }
  }, [user])

  /**
   * Asynchronously logs a user in by verifying their email and password.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<boolean>} A promise that resolves to true if the login is successful, otherwise false.
   *
   * @example
   * login('user@example.com', 'password123')
   *   .then((success) => {
   *     if (success) {
   *       console.log('Login successful');
   *     } else {
   *       console.log('Login failed');
   *     }
   *   });
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      // Remove password before storing in state
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  /**
   * Simulates user signup by creating a new user if the email does not already exist.
   *
   * @param {string} name - The user's name.
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @param {UserType} userType - The type of the user (e.g., 'admin', 'customer').
   * @returns {Promise<boolean>} - A promise that resolves to true if signup is successful, false otherwise.
   *
   * @throws {Error} - Throws an error if there is a problem during the signup process.
   */
  const signup = async (name: string, email: string, password: string, userType: UserType): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const userExists = MOCK_USERS.some((u) => u.email === email)

    if (userExists) {
      setIsLoading(false)
      return false
    }

    // Create new user
    const newUser = {
      id: MOCK_USERS.length + 1,
      name,
      email,
      userType,
      location: "",
      joinDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" }),
      profileImage: "/placeholder.svg?height=200&width=200",
      bio: "",
    }

    // In a real app, we would save this to a database
    // For demo, we'll just set the current user
    setUser(newUser)
    setIsLoading(false)
    return true
  }

  /**
   * Updates the user profile with the provided updates.
   *
   * @param {Partial<User>} updates - An object containing the partial update to be applied to the user profile.
   * @throws {Error} If `user` is not defined, an error will be thrown indicating that the user is not logged in.
   */
  const updateUserProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("krishijyothi_user", JSON.stringify(updatedUser))
    }
  }

  /**
   * Logs out the user by removing their session information from local storage,
   * setting the user state to null, and navigating to the home page.
   *
   * @function
   * @name logout
   */
  const logout = () => {
    localStorage.removeItem("krishijyothi_user")
    setUser(null)
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to access authentication context.
 *
 * @returns {Object} The authentication context provided by AuthProvider.
 * @throws {Error} Throws an error if used outside of an AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
