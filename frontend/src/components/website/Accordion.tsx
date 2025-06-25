import { motion, AnimatePresence } from "framer-motion"
import React from "react"
import { PiMinus, PiPlus } from "react-icons/pi"

interface AccordionProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}

const Accordion = ({ question, answer, isOpen, onClick }: AccordionProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <motion.header
        initial={false}
        className={`flex justify-between items-center py-4 cursor-pointer ${
          isOpen ? "text-primary" : "text-black"
        }`}
        onClick={onClick}
      >
        <p className='text-lg font-bold'>{question}</p>
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
          className='text-xl'
        >
          {isOpen ? <PiPlus /> : <PiMinus />}
        </motion.span>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: "auto", marginBottom: "1rem" },
              collapsed: { opacity: 0, height: 0, marginBottom: "0" },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className='pb-4 text-sm'>{answer}</div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Accordion
