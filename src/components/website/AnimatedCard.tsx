import { motion, useInView } from "framer-motion"
import { useEffect, useState, useRef } from "react"

const AnimatedCard = () => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = 500
    const duration = 10000
    const stepTime = duration / end

    const timer = setInterval(() => {
      start += 5
      if (start >= end) {
        start = end
        clearInterval(timer)
      }
      setCount(start)
    }, stepTime)

    return () => clearInterval(timer)
  }, [isInView])

  return (
    <div className='flex flex-col md:flex-row gap-6 p-4 justify-center items-center py-10'>
      <motion.div
        className='bg-gray2 w-65 h-30 text-center flex flex-col items-center justify-center rounded-lg'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className='text-xl md:text-2xl font-bold text-black'>2024</p>
        <p className='text-sm'>Available for construction since</p>
      </motion.div>

      <motion.div
        ref={ref}
        className='bg-gray2 w-65 h-30 text-center flex flex-col items-center justify-center rounded-lg'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className='text-xl md:text-2xl font-bold text-black'>{count}+</p>
        <p className='text-sm'>Used by different industries and individuals</p>
      </motion.div>
    </div>
  )
}

export default AnimatedCard
