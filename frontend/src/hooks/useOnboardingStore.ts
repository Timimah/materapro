// import { OnboardingState, OnboardingStep } from "@/types/onboarding"
// import { useState, useCallback } from "react"

// export const useOnboarding = (steps: OnboardingStep[]) => {
//   const [state, setState] = useState<OnboardingState>({
//     currentStep: 0,
//     isComplete: false,
//     hasSkipped: false,
//   })

//   const nextStep = useCallback(() => {
//     setState((prev) => ({
//       ...prev,
//       currentStep: Math.min(prev.currentStep + 1, steps.length - 1),
//     }))
//   }, [steps.length])

//   const previousStep = useCallback(() => {
//     setState((prev) => ({
//       ...prev,
//       currentStep: Math.max(prev.currentStep - 1, 0),
//     }))
//   }, [])

//   const skipOnboarding = useCallback(() => {
//     setState((prev) => ({
//       ...prev,
//       hasSkipped: true,
//       isComplete: true,
//     }))
//   }, [])

//   return {
//     ...state,
//     nextStep,
//     previousStep,
//     skipOnboarding,
//     currentStepData: steps[state.currentStep],
//   }
// }
import { create } from "zustand"

interface OnboardingState {
  step: number
  next: () => void
  prev: () => void
  setStep: (step: number) => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 0,
  next: () => set((state) => ({ step: Math.min(state.step + 1, 3) })),
  prev: () => set((state) => ({ step: Math.max(state.step - 1, 0) })),
  setStep: (step) => set({ step }),
}))
