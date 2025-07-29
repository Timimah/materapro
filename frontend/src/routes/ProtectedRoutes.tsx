import { useAuthStore } from "@/hooks/useAuthStore"
import { Navigate } from "react-router-dom"
import { JSX } from "react"

export default function ProtectedRoute({
  children,
  role,
  requireOnboarding = false,
}: {
  children: JSX.Element
  role?: "client" | "artisan"
  requireOnboarding?: boolean
}) {
  const { user, isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return <div className='text-center py-10'>Loading...</div>
  }

  if (!isAuthenticated || !user) {
    return <Navigate to='/login' replace />
  }

  if (role && user.type !== role) {
    return <Navigate to='/' replace />
  }

  if (requireOnboarding && !user.isOnboarded) {
    return <Navigate to={`/${user.type}/onboarding`} replace />
  }

  return children
}
