import { motion } from "motion/react"
import React from "react"

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -20, opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
)

export default PageWrapper
