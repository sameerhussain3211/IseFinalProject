"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, EyeOff, Shield } from "lucide-react"
import AuthLayout from "./auth-layout"

interface LoginProps {
  onLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  onSwitchToSignup: () => void
  isLoading: boolean
}

export default function Login({ onLogin, onSwitchToSignup, isLoading }: LoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    const result = await onLogin(email, password)
    if (!result.success && result.error) {
      setError(result.error)
    }
  }

  const handleAdminLogin = () => {
    setEmail("admin@hackshield.com")
    setPassword("admin123")
  }

  const handleDemoLogin = () => {
    setEmail("demo@example.com")
    setPassword("demo123")
  }

  return (
    <AuthLayout title="Welcome to HackShield" subtitle="Sign in to continue your cybersecurity training">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert className="border-red-500/30 bg-red-500/10">
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-300">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 pr-10"
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-slate-400" />
              ) : (
                <Eye className="h-4 w-4 text-slate-400" />
              )}
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>

        <div className="space-y-3">
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-2">Quick Login Options:</div>
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAdminLogin}
                disabled={isLoading}
                className="w-full border-orange-500/30 text-orange-300 hover:bg-orange-600/10"
              >
                <Shield className="h-3 w-3 mr-2" />
                Login as Admin
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-600/10"
              >
                Login as Demo User
              </Button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500">
            Admin: admin@hackshield.com / admin123
            <br />
            Demo: demo@example.com / demo123
          </div>
        </div>

        <div className="text-center">
          <span className="text-slate-400">Don't have an account? </span>
          <Button
            type="button"
            variant="link"
            className="text-blue-400 hover:text-blue-300 p-0"
            onClick={onSwitchToSignup}
            disabled={isLoading}
          >
            Sign up
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}
