import React, { useState } from "react"
import { motion } from "framer-motion"
import { faqs } from "@/components/website/data"
import Accordion from "@/components/website/Accordion"

const FAQPage = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | false>(0)

  return (
    <div className='relative mx-auto text-lnblack flex flex-col'>
      {/* Hero Section */}
      <section className='gradient relative w-full flex flex-col h-[20em] md:h-[30em] gap-10 md:gap-20'>
        <div className='w-full text-center flex flex-col gap-5 items-center h-[25em] mt-30 md:mt-60'>
          <p className='text-xs md:text-sm text-white font-bold p-2 bg-secondary rounded-lg w-fit'>
            FAQS
          </p>
          <p className='text-2xl md:text-5xl text-black font-extrabold'>
            Frequently Asked Questions
          </p>
          <p className='md:w-[55em] text-sm md:text-lg px-8 md:px-0'>
            Get answers to your questions about MateraPro's digital platform for
            construction material procurement and connecting with excellent
            workers.
          </p>
        </div>
        {/* <div className='bg-white border border-grey p-1 rounded-2xl h-[20em] md:h-[25em] mx-8 md:mx-18 shadow-md'>
          <img
            src={faqHero}
            alt='FAQ Hero image'
            className='relative rounded-xl object-cover h-full w-full z-20'
          />
        </div> */}
      </section>

      {/* FAQ Section */}
      <motion.section
        initial='initial'
        animate='animate'
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        }}
        className='mx-8 md:mx-18 flex flex-col justify-center gap-6 pt-5'
      >
        <div className='max-w-4xl mx-auto w-full'>
          <div className='flex flex-col gap-4'>
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
    </div>
  )
}

export default FAQPage
