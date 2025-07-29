import Button from "@/components/shared/Button"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

interface OnboardingSlideProps {
  title: string
  description: string
  image: React.ReactNode
}

export const OnboardingSlide = ({
  title,
  description,
  image,
}: OnboardingSlideProps) => {
  return (
    <div className='relative h-full w-full'>
      {/* Image section - centered in available space above the card */}
      <motion.div
        className='absolute inset-0 flex items-center justify-center px-6'
        style={{ bottom: "140px" }} // Leave space for the fixed card
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {image}
      </motion.div>

      {/* Bottom white card - absolutely positioned at screen bottom */}
      <motion.div
        className='absolute bottom-6 left-6 right-6 mx-auto max-w-md bg-white rounded-2xl px-6 py-6 shadow-lg'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
      >
        <div className='max-w-md mx-auto'>
          <h2 className='text-left font-semibold text-sm mb-4 text-gray-800'>
            {title} -{" "}
            <span className='font-normal text-gray-600'>{description}</span>
          </h2>
          <Link to='/client/welcome' className='cursor-pointer'>
            <Button
              label='Get started'
              className='bg-primary w-full text-white'
            />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
