export interface OnboardingStep {
  id: number
  title: string
  description: string
  image: string
  buttonText: string
}

export interface OnboardingState {
  currentStep: number
  isComplete: boolean
  hasSkipped: boolean
}
