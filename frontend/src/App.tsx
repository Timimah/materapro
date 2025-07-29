import React from "react"
import SmoothScroll from "./utils/SmoothScroll"
import AppRoutes from "./routes/AppRoutes"
import { AuthProvider } from "./contexts/AuthContext"

const App: React.FC = () => {
  return (
    <SmoothScroll>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </SmoothScroll>
  )
}

export default App
