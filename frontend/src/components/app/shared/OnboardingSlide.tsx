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
    <motion.div
      className='relative w-full h-full flex flex-col items-center justify-between pt-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Centered image */}
      <div className='flex-1 flex items-center justify-center px-6'>
        {image}
      </div>

      {/* Bottom white section with margin */}
      <div className='md:w-full md:max-w-md w-5/6 mx-auto bg-white rounded-2xl text-sm px-6 py-6 shadow-md fixed bottom-4 left-0 right-0'>
        <h2 className='text-left font-semibold mb-2'>
          {title} - <span className='font-normal'>{description}</span>
        </h2>
        <Link to='/login' className='cursor-pointer'>
          <Button label='Get Started' className='bg-primary w-full' />
        </Link>
      </div>
    </motion.div>
  )
}
