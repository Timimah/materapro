// routes/ProtectedRoutes.tsx
import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { UserType } from "@/types/user"
import PageLoader from "@/utils/PageLoader"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserType[]
  requireOnboarding?: boolean
  requireEmailVerification?: boolean
}

// Base Protected Route
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  requireOnboarding = false,
  requireEmailVerification = false,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <PageLoader />
  }

  if (!isAuthenticated || !user) {
    return <Navigate to='/client/login' state={{ from: location }} replace />
  }

  // Check if user role is allowed
  if (allowedRoles && !allowedRoles.includes(user.type)) {
    // Redirect to appropriate dashboard based on user type
    const redirectPath = `/${user.type}/dashboard`
    return <Navigate to={redirectPath} replace />
  }

  // Check email verification requirement
  if (requireEmailVerification && !user.emailVerified) {
    return <Navigate to='/verify-email' replace />
  }

  // Check onboarding requirement
  if (requireOnboarding && !user.isOnboarded) {
    const onboardingPath = `/${user.type}/onboarding`
    return <Navigate to={onboardingPath} replace />
  }

  return <>{children}</>
}

// Public Route (accessible to non-authenticated users)
export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>
}

// Auth Route (only accessible when not authenticated)
export const AuthRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <PageLoader />
  }

  // If user is authenticated, don't redirect automatically
  // Let them access auth pages like account setup
  if (isAuthenticated && user) {
    // Only redirect if they're trying to access login/register pages
    // and they're fully set up
    const currentPath = window.location.pathname
    if (
      (currentPath.includes("/login") || currentPath.includes("/register")) &&
      user.isOnboarded
    ) {
      return <Navigate to={`/${user.type}/dashboard`} replace />
    }
  }

  return <>{children}</>
}

// Role-specific route components
export const ClientRoute: React.FC<
  Omit<ProtectedRouteProps, "allowedRoles">
> = (props) => <ProtectedRoute {...props} allowedRoles={["client"]} />

export const ArtisanRoute: React.FC<
  Omit<ProtectedRouteProps, "allowedRoles">
> = (props) => (
  <ProtectedRoute {...props} allowedRoles={["artisan", "supervisor"]} />
)

export const SupervisorRoute: React.FC<
  Omit<ProtectedRouteProps, "allowedRoles">
> = (props) => <ProtectedRoute {...props} allowedRoles={["supervisor"]} />

export const AdminRoute: React.FC<Omit<ProtectedRouteProps, "allowedRoles">> = (
  props
) => <ProtectedRoute {...props} allowedRoles={["admin"]} />

export const SupplierRoute: React.FC<
  Omit<ProtectedRouteProps, "allowedRoles">
> = (props) => <ProtectedRoute {...props} allowedRoles={["supplier"]} />
