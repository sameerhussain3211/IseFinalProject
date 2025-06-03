"use client"

import { useReducer, useEffect } from "react"
import type { AuthState, AuthAction } from "../types/auth"
import { authUtils } from "../utils/auth-utils"

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
    case "SIGNUP_START":
      return { ...state, isLoading: true }

    case "LOGIN_SUCCESS":
    case "SIGNUP_SUCCESS":
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      }

    case "LOGIN_ERROR":
    case "SIGNUP_ERROR":
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }

    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }

    default:
      return state
  }
}

export function useAuth() {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check for existing user on mount
  useEffect(() => {
    const user = authUtils.getCurrentUser()
    if (user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: user })
    }
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      dispatch({ type: "LOGIN_START" })
      const user = await authUtils.login(email, password)
      dispatch({ type: "LOGIN_SUCCESS", payload: user })
      return { success: true }
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR" })
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      }
    }
  }

  const signup = async (
    email: string,
    username: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      dispatch({ type: "SIGNUP_START" })
      const user = await authUtils.signup(email, username, password)
      dispatch({ type: "SIGNUP_SUCCESS", payload: user })
      return { success: true }
    } catch (error) {
      dispatch({ type: "SIGNUP_ERROR" })
      return {
        success: false,
        error: error instanceof Error ? error.message : "Signup failed",
      }
    }
  }

  const logout = () => {
    authUtils.logout()
    dispatch({ type: "LOGOUT" })
  }

  return {
    ...state,
    login,
    signup,
    logout,
  }
}
