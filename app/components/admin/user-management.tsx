"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, Key, Shield } from "lucide-react"
import { authUtils } from "../../utils/auth-utils"
import type { User as AuthUser } from "../../types/auth"
import { User } from "lucide-react"

export default function UserManagement() {
  const [users, setUsers] = useState<Array<AuthUser & { isAdmin?: boolean }>>([])
  const [loading, setLoading] = useState(true)
  const [resetPasswordUserId, setResetPasswordUserId] = useState<string | null>(null)
  const [newPassword, setNewPassword] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const allUsers = await authUtils.getAllUsers()
      setUsers(allUsers)
    } catch (error) {
      setMessage("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (userId: string) => {
    if (!newPassword) {
      setMessage("Please enter a new password")
      return
    }

    try {
      await authUtils.resetUserPassword(userId, newPassword)
      setMessage("Password reset successfully")
      setResetPasswordUserId(null)
      setNewPassword("")
    } catch (error) {
      setMessage("Failed to reset password")
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    try {
      await authUtils.deleteUser(userId)
      setMessage("User deleted successfully")
      loadUsers()
    } catch (error) {
      setMessage("Failed to delete user")
    }
  }

  if (loading) {
    return (
      <Card className="bg-slate-800/90 border-blue-500/30 backdrop-blur">
        <CardContent className="p-6">
          <div className="text-center text-slate-300">Loading users...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800/90 border-blue-500/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl text-blue-100 flex items-center">
          <User className="h-5 w-5 mr-2" />
          User Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {message && (
          <Alert className="border-blue-500/30 bg-blue-500/10">
            <AlertDescription className="text-blue-400">{message}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {user.isAdmin ? (
                    <Shield className="h-5 w-5 text-orange-400" />
                  ) : (
                    <User className="h-5 w-5 text-blue-400" />
                  )}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-200 font-medium">{user.username}</span>
                      {user.isAdmin && <Badge className="bg-orange-600/20 text-orange-300">Admin</Badge>}
                    </div>
                    <div className="text-sm text-slate-400">{user.email}</div>
                    <div className="text-xs text-slate-500">
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {!user.isAdmin && (
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setResetPasswordUserId(user.id)}
                      className="border-yellow-500/30 text-yellow-300 hover:bg-yellow-600/10"
                    >
                      <Key className="h-3 w-3 mr-1" />
                      Reset Password
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteUser(user.id)}
                      className="border-red-500/30 text-red-300 hover:bg-red-600/10"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>

              {resetPasswordUserId === user.id && (
                <div className="mt-3 p-3 bg-slate-600/50 rounded border border-slate-500">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleResetPassword(user.id)}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      Reset
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setResetPasswordUserId(null)
                        setNewPassword("")
                      }}
                      className="border-slate-500 text-slate-300"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {users.length === 0 && <div className="text-center text-slate-400 py-8">No users found</div>}
      </CardContent>
    </Card>
  )
}
