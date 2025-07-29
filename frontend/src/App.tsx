import React from "react"
import SmoothScroll from "./utils/SmoothScroll"
import AppRoutes from "./routes/AppRoutes"

const App: React.FC = () => {
  return (
    <SmoothScroll>
      <AppRoutes />
    </SmoothScroll>
  )
}

export default App
