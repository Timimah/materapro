import React, { useState } from "react"
import { motion } from "framer-motion"
import Accordion from "./Accordion"
import Support from "@assets/amico.png"

interface FAQSectionProps {
  inView: boolean
}

const FAQSection = ({ inView }: FAQSectionProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | false>(0)

  const faqs = [
    {
      question: "What is MateraPro and what services do we render?",
      answer:
        "MateraPro is a digital platform providing procurement of construction materials and a showroom for excellent workers, empowering the construction industry through seamless collaboration and efficient processes.",
    },
    {
      question: "How do I register as a client or worker on MateraPro?",
      answer: "Registration process information would go here.",
    },
    {
      question:
        "What are the benefits of using our MateraPro for construction material procurement?",
      answer: "Benefits information would go here.",
    },
    {
      question: "Can I trust the workers listed on MateraPro's showroom?",
      answer: "Worker verification information would go here.",
    },
    {
      question:
        "How does MateraPro handle disputes between clients and workers?",
      answer: "Dispute handling information would go here.",
    },
    {
      question: "What is MateraPro’s mission?",
      answer: "MateraPro's mission would go here.",
    },
  ]

  return (
    <motion.section
      initial='initial'
      animate={inView ? "animate" : "initial"}
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      }}
      className='mx-60 flex flex-col justify-center gap-6 h-screen py-16'
    >
      <div className='flex flex-col gap-2 mb-8'>
        <h2 className='text-3xl font-extrabold text-black'>
          We have 24/7 Support Available
        </h2>
        <p className='text-sm text-gray-600'>Get answers to your questions.</p>
      </div>

      <div className='flex justify-between'>
        <div className='w-1/2'>
          <img src={Support} alt='Support' />
        </div>

        <div className='w-1/2 h-[30em] overflow-y-auto'>
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
