import { ReactNode } from "react"

export interface OnboardingStep {
  id: number
  title: string
  description: string
  illustration: string | ReactNode
  color: string
}

export interface TouchPosition {
  x: number
  y: number
}

export interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void
  onTouchMove: (e: React.TouchEvent) => void
  onTouchEnd: () => void
}

export interface AutoAdvanceTimer {
  resetTimer: () => void
}

export type LogoSize = "sm" | "md" | "lg"
export type ButtonVariant = "primary" | "secondary" | "disabled"
export type ScreenType = "welcome" | "onboarding"
