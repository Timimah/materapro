import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSwipeable } from "react-swipeable"
import { useNavigate } from "react-router-dom"
import { useOnboardingStore } from "@/hooks/useOnboardingStore"
import { OnboardingSlide } from "@/components/app/shared/OnboardingSlide"
import logo from "@assets/shared/logo.png"
import slide1 from "@assets/app/client/amico.svg"
import slide2 from "@assets/app/client/bro.svg"
import slide3 from "@assets/app/client/pana.svg"
import slide4 from "@assets/app/client/cuate.svg"
import { FaChevronLeft } from "react-icons/fa"
import { HiOutlineChevronDoubleRight } from "react-icons/hi"

const slides = [
  {
    title: "Material Procurement",
    description: "Access quality materials from trusted suppliers.",
    image: <img src={slide1} alt='Material' className='w-60' />,
  },
  {
    title: "Transparency & Quality",
    description: "Ensure project success with our vetted workers.",
    image: <img src={slide2} alt='Transparency' className='w-60' />,
  },
  {
    title: "Worker Showroom",
    description: "Find skilled workers for your project.",
    image: <img src={slide3} alt='Workers' className='w-60' />,
  },
  {
    title: "Efficient Collaboration",
    description: "Connect with clients seamlessly.",
    image: <img src={slide4} alt='Collab' className='w-60' />,
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
      navigate("/client/welcome")
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
          <img src={logo} alt='App Logo' className='w-1/2 h-1/2 mb-4' />
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
          <div className='w-full max-w-md flex justify-between items-center z-20'>
            {step > 0 ? (
              <button
                onClick={prev}
                className='hidden md:block font-medium hover:underline text-primary'
              >
                <FaChevronLeft size={10} />
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className='text-primary text-sm border-0 hover:text-lnblack transition flex justify-end w-full items-center'
            >
              {step < slides.length - 1 ? (
                <div className='flex gap-1 text-xs items-center'>
                  Swipe{" "}
                  <HiOutlineChevronDoubleRight className='mt-0.5' size={12} />
                </div>
              ) : (
                ""
              )}
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
                className='absolute inset-0'
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
