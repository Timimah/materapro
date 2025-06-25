import React, { useState } from "react"
import { motion } from "framer-motion"
import Accordion from "./Accordion"
import Support from "@assets/amico.png"
import { faqs } from "./data"

interface FAQSectionProps {
  inView: boolean
}

const FAQSection = ({ inView }: FAQSectionProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | false>(0)

  return (
    <motion.section
      initial='initial'
      animate={inView ? "animate" : "initial"}
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      }}
      className='mx-8 md:mx-18 flex flex-col md:justify-center gap-6 h-screen py-10 mb-20'
    >
      <div className='flex flex-col gap-2 mb-8'>
        <h2 className='text-2xl md:text-3xl text-left font-extrabold text-black'>
          We have 24/7 Support Available
        </h2>
        <p className='text-sm text-gray-600'>Get answers to your questions.</p>
      </div>

      <div className='flex md:flex-row flex-col justify-between items-center mb-100'>
        <div className='md:w-1/2 px-10 md:px-0 my-auto'>
          <img src={Support} alt='Support' />
        </div>

        <div className='md:w-1/2 h-[30em]'>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={expandedIndex === index}
              onClick={() =>
                setExpandedIndex(expandedIndex === index ? false : index)
              }
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default FAQSection
