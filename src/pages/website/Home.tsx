import React from "react"
import LandingPage from "@/components/website/LandingPage"
import Hero from "@/components/website/Hero"

const Home: React.FC = () => {
  return (
    <div className=''>
      {/* Hero Section */}
      <Hero />
      <LandingPage />
    </div>
  )
}

export default Home
