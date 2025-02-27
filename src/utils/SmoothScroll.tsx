import { useScroll, useSpring, useTransform, motion } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"

interface SmoothScrollProps {
  children: React.ReactNode
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number>(0)

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContentHeight(containerRef.current.scrollHeight)
      }
    }

    updateDimensions()

    // Set up ResizeObserver
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Clean up
    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const { scrollY } = useScroll()
  const transform = useSpring(scrollY, {
    damping: 15,
    mass: 0.27,
    stiffness: 55,
  })

  const y = useTransform(transform, [0, contentHeight], [0, -contentHeight], {
    clamp: false,
  })

  return (
    <>
      <div className='w-full' style={{ height: contentHeight }} />
      <motion.div
        ref={containerRef}
        className='fixed top-0 left-0 right-0 w-full'
        style={{ y }}
      >
        {children}
      </motion.div>
    </>
  )
}

export default SmoothScroll
