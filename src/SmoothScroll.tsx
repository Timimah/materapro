// import {
//   useScroll,
//   useSpring,
//   useTransform,
//   motion,
//   useMotionValueEvent,
// } from "motion/react"
// import React, { useEffect, useRef, useState } from "react"

// const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [isLoading, setIsLoading] = useState(true)
//   const contentRef = useRef<HTMLDivElement>(null)
//   const [contentHeight, setContentHeight] = useState(0)
//   const [windowHeight, setWindowHeight] = useState(0)

//   useEffect(() => {
//     const handleResize = () => {
//       if (contentRef.current !== null) {
//         setContentHeight(contentRef.current.scrollHeight)
//       }
//       setWindowHeight(window.innerHeight)
//     }
//     handleResize()
//     window.addEventListener("resize", handleResize)
//     return () => {
//       window.removeEventListener("resize", handleResize)
//     }
//   }, [contentRef])

//   const { scrollYProgress } = useScroll()
//   const smoothProgress = useSpring(scrollYProgress, {
//     mass: 0.1,
//     stiffness: 100,
//     damping: 20,
//     restDelta: 0.001,
//   })
//   useMotionValueEvent(smoothProgress, "change", (latest) => {
//     if (latest === 0) {
//       setIsLoading(false)
//     }
//   })

//   const y = useTransform(smoothProgress, (value) => {
//     return value * -(contentHeight - windowHeight)
//   })

//   return (
//     <>
//       <div style={{ height: contentHeight }} />
//       <motion.div
//         className='w-screen fixed top-0 flex flex-col transition-opacity duration-400 ease-in-out'
//         ref={contentRef}
//         style={{ y: isLoading ? 0 : y, opacity: isLoading ? 0 : 1 }}
//       >
//         {children}
//       </motion.div>
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa porro sequi,
//       odio labore eligendi facere? Hic, consequuntur fugit dolore illum
//       perspiciatis natus necessitatibus, voluptates harum commodi, odio fuga
//       alias! Velit?
//     </>
//   )
// }

// export default SmoothScroll

import {
  useScroll,
  useSpring,
  useTransform,
  motion,
  useMotionValueEvent,
} from "motion/react"
import React, { useEffect, useRef, useState } from "react"

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current !== null) {
        setContentHeight(contentRef.current.scrollHeight)
      }
      setWindowHeight(window.innerHeight)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [contentRef])

  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 100,
    restDelta: 0.001,
  })

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest === 0) {
      setIsLoading(false)
    }
  })

  const y = useTransform(smoothProgress, (value) => {
    return value * -(contentHeight - windowHeight)
  })

  return (
    <>
      <div style={{ height: contentHeight }} />
      <motion.div
        className='w-screen fixed top-0 flex flex-col transition-opacity duration-400 ease-in-out'
        ref={contentRef}
        style={{ y: isLoading ? 0 : y, opacity: isLoading ? 0 : 1 }}
      >
        {children}
      </motion.div>
    </>
  )
}

export default SmoothScroll
