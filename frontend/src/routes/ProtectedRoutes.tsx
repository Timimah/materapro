import { useAuthStore } from "@/hooks/useAuthStore"
import { JSX } from "react"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element
}) {
  const user = useAuthStore((state) => state.user)
  return user ? children : <Navigate to='/login' />
}
