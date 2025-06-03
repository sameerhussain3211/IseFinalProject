export interface User {
  id: string
  email: string
  username: string
  createdAt: string
  isAdmin?: boolean
}

export interface AuthState {
  user: (User & { isAdmin?: boolean }) | null
  isAuthenticated: boolean
  isLoading: boolean
}

export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User & { isAdmin?: boolean } }
  | { type: "LOGIN_ERROR" }
  | { type: "LOGOUT" }
  | { type: "SIGNUP_START" }
  | { type: "SIGNUP_SUCCESS"; payload: User }
  | { type: "SIGNUP_ERROR" }
