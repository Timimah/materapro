import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSwipeable } from "react-swipeable"
import { useNavigate } from "react-router-dom"
import { useOnboardingStore } from "@/hooks/useOnboardingStore"
import { OnboardingSlide } from "@/components/app/shared/OnboardingSlide"

const slides = [
  {
    title: "Material Procurement",
    description: "Access quality materials from trusted suppliers.",
    image: (
      <img
        src='/assets/illustrations/material.svg'
        alt='Material'
        className='w-60'
      />
    ),
  },
  {
    title: "Transparency & Quality",
    description: "Ensure project success with our vetted workers.",
    image: (
      <img
        src='/assets/illustrations/transparency.svg'
        alt='Transparency'
        className='w-60'
      />
    ),
  },
  {
    title: "Worker Showroom",
    description: "Find skilled workers for your project.",
    image: (
      <img
        src='/assets/illustrations/workers.svg'
        alt='Workers'
        className='w-60'
      />
    ),
  },
  {
    title: "Efficient Collaboration",
    description: "Connect with clients seamlessly.",
    image: (
      <img
        src='/assets/illustrations/collaboration.svg'
        alt='Collab'
        className='w-60'
      />
    ),
  },
]

export default function OnboardingPage() {
  const { step, next, prev } = useOnboardingStore()
  const [showSplash, setShowSplash] = useState(true)
  const navigate = useNavigate()

  // Hide splash after 2.5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 3500)
    return () => clearTimeout(timeout)
  }, [])

  const handleNext = () => {
    if (step < slides.length - 1) {
      next()
    } else {
      navigate("/client/login")
    }
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => prev(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  const progress = ((step + 1) / slides.length) * 100

  return (
    <AnimatePresence mode='wait'>
      {showSplash ? (
        <motion.div
          key='splash'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='min-h-screen flex items-center justify-center bg-white'
        >
          {/* Splash Screen Content */}
          <div className='flex flex-col items-center'>
            <img
              src='/assets/logo.svg'
              alt='App Logo'
              className='w-24 h-24 mb-4'
            />
            <h1 className='text-2xl font-bold text-primary'>MateraPro</h1>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key='onboarding'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          {...swipeHandlers}
          className='gradient min-h-screen flex flex-col items-center justify-between px-6 py-10'
        >
          {/* Progress Bar */}
          <div className='w-full max-w-md h-2 bg-white rounded-full mb-4 overflow-hidden'>
            <motion.div
              className='h-full bg-primary'
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Navigation buttons */}
          <div className='w-full max-w-md flex justify-between items-center mt-8'>
            {step > 0 ? (
              <button
                onClick={prev}
                className='text-blue-600 font-medium hover:underline'
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className='text-primary px-6 py-2 border-0 hover:text-lnblack transition'
            >
              {step < slides.length - 1 ? "Swipe" : ""}
            </button>
          </div>

          {/* Slide content */}
          <div className='flex-1 flex flex-col items-center justify-center w-full'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='text-center'
              >
                <OnboardingSlide
                  title={slides[step].title}
                  description={slides[step].description}
                  image={slides[step].image}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
