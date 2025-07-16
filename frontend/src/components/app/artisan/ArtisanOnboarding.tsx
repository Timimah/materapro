// import { useAuth } from "@/hooks/useAuth"
import Onboarding from "@/pages/shared/OnboardingPage"
import React from "react"
import { useNavigate } from "react-router-dom"

export const ArtisanOnboarding: React.FC = () => {
  const navigate = useNavigate()
  const { completeOnboarding } = useAuth()

  const handleSkip = () => {
    completeOnboarding()
    navigate("/artisan")
  }

  const handleFinish = () => {
    completeOnboarding()
    navigate("/artisan")
  }

  return (
    <Onboarding
      onSkip={handleSkip}
      onFinish={handleFinish}
      userType='artisan'
    />
  )
}
